from django.conf import settings
import boto3
import datetime
import requests
from rest_framework.authentication import BaseAuthentication
from firebase_admin import credentials, auth
import firebase_admin
from jose import jwt, jwk, exceptions
from django.contrib.auth.backends import ModelBackend
from .models import CustomUser
from django.core.cache import cache
from requests.exceptions import RequestException
from rest_framework.response import Response

from backend.settings.base import (
    AWS_COGNITO_REGION_NAME,
    AWS_COGNITO_APP_CLIENT_ID,
    AWS_COGNITO_USER_POOL_ID,
    FIREBASE_ACCOUNT_TYPE,
    FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_CLIENT_ID,
    FIREBASE_AUTH_URI,
    FIREBASE_TOKEN_URI,
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    FIREBASE_CLIENT_X509_CERT_URL
)


class CognitoAuthentication(ModelBackend):
    def __init__(self):
        self.cognito_client = boto3.client(
            'cognito-idp', region_name=AWS_COGNITO_REGION_NAME
        )
        self.jwks_uri = f'https://cognito-idp.{AWS_COGNITO_REGION_NAME}.amazonaws.com/{AWS_COGNITO_USER_POOL_ID}/.well-known/.jwks.json'

    def authenticate(self, request, email=None, password=None):
        access_token = request.META.get('HTTP_AUTHORIZATION')

        # Decode the token without verification to get the payload
        payload = jwt.get_unverified_claims(access_token)

        # Verify the token
        headers = jwt.get_unverified_header(access_token)
        kid = headers['kid']
        jwks = self.get_jwks()
        jwk = [key for key in jwks['keys'] if key['kid'] == kid][0]
        pem = self.jwk_to_pem(jwk)

        try:
            payload = jwt.decode(
                access_token,
                pem,
                algorithms=['RS256'],
                audience='AWS_COGNITO_APP_CLIENT_ID',
                issuer=f'https://cognito-idp.{AWS_COGNITO_REGION_NAME}.amazonaws.com/{AWS_COGNITO_USER_POOL_ID}'
            )
        except exceptions.JWTClaimsError as e:
            raise Exception("Claims in the token are invalid")
        except exceptions.JWTError as e:
            raise Exception("Token is invalid or expired")
        except Exception as e:
            raise Exception(
                "An unknown error occurred while verifying the token")

        # Check if the token is expired
        exp = payload.get('exp')
        if exp is not None and int(exp) < datetime.datetime.utcnow().timestamp():

            # Get the refresh token stored in the user model
            user = CustomUser.objects.get(email=email)
            refresh_token = user.refresh_token

            # Refresh the tokens
            tokens = self.refresh_tokens(refresh_token)

            # Update the access token in the request
            request.META['HTTP_AUTHORIZATION'] = tokens.get('AccessToken')

            # Update the refresh token in the user model
            user.refresh_token = tokens.get('RefreshToken')
            user.save()

        # Authenticate the user with AWS Cognito
        try:
            if email:
                response = self.cognito_client.initiate_auth(
                    AuthFlow='USER_PASSWORD_AUTH',
                    AuthParameters={
                        'USERNAME': email,
                        'PASSWORD': password,
                    },
                    ClientId=AWS_COGNITO_APP_CLIENT_ID
                )
            else:
                raise Exception("Email cannot be None")
        except self.cognito_client.exceptions.NotAuthorizedException:
            raise Exception("The username or password is incorrect")
        except self.cognito_client.exceptions.UserNotFoundException:
            raise Exception("The user does not exist")
        except self.cognito_client.exceptions.UserNotConfirmedException:
            raise Exception("The user has not confirmed their account")

        # If the authentication is successful, return the user.
        # If not, return None or raise an exception.

    def get_user(self, user_id):
        """
        Retrieve the user's entry in the User model if it exists
        """
        try:
            return CustomUser.objects.get(pk=user_id)
        except CustomUser.DoesNotExist:
            return None

    def refresh_tokens(self, refresh_token):
        """
        Refresh the ID and access tokens
        """
        response = self.cognito_client.initiate_auth(
            AuthFlow='REFRESH_TOKEN_AUTH',
            AuthParameters={
                'REFRESH_TOKEN': refresh_token,
            },
            ClientId=AWS_COGNITO_APP_CLIENT_ID,
            UserPoolId=AWS_COGNITO_USER_POOL_ID
        )
        return response.get('AuthenticationResult')

    def get_jwks(self):
        """
        Retrieve the JSON Web Key Set (JWKS) from AWS Cognito. 
        Use caching to avoid unnecessary network requests.
        """
        jwks = cache.get('jwks')
        if not jwks:
            try:
                response = requests.get(self.jwks_uri)
                response.raise_for_status()
                jwks = response.json()
                cache.set('jwks', jwks, 86400)  # Cache JWKS for 24 hours
            except RequestException:
                raise Exception("Could not retrieve JWKS from Cognito")
        return jwks

    def jwk_to_pem(self, jwk):
        """
        Convert a JSON Web Key (JWK) to PEM format
        """
        return jwk.jwk_to_pem(jwk)


# SETUP FIREBASE CREDENTIALS
cred = credentials.Certificate({
    "type": FIREBASE_ACCOUNT_TYPE,
    "project_id": FIREBASE_PROJECT_ID,
    "private_key_id": FIREBASE_PRIVATE_KEY_ID,
    "private_key": FIREBASE_PRIVATE_KEY.replace('\\n', '\n'), # type: ignore
    "client_email": FIREBASE_CLIENT_EMAIL,
    "client_id": FIREBASE_CLIENT_ID,
    "auth_uri": FIREBASE_AUTH_URI,
    "token_uri": FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": FIREBASE_CLIENT_X509_CERT_URL
})
default_app = firebase_admin.initialize_app(cred)

# FIREBASE AUTHENTICATION


class FirebaseAuthentication(BaseAuthentication):
    # Override authenticate method and write our custom firebase authentication.
    def authenticate(self, request):
        # Get the authorization Token, It raise exception when no authorization Token is given
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if not auth_header:
            return Response({"message": "No auth token provided"}, status=400)

        # Decoding the Token. It raises an exception when decode fails.
        id_token = auth_header.split(" ").pop()
        decoded_token = None
        try:
            decoded_token = auth.verify_id_token(id_token)
        except Exception:
            return Response({"message": "Invalid auth token"}, status=401)

        # Return None if there is no token or the decoded_token is not valid
        if not id_token or not decoded_token:
            return None

        # If the token is valid and the decoding process didn't raise an exception,
        # we return a successful response.
        return Response({"message": "Sign up successful"}, status=200)

        # Return None if there is no token or the decoded_token is not valid
        if not id_token or not decoded_token:
            return None

        # If the token is valid and the decoding process didn't raise an exception
        return decoded_token
