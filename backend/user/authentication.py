import boto3
import datetime
from jose import jwt
from django.contrib.auth.backends import ModelBackend
from .models import CustomUser

from backend.settings.base import (
    AWS_COGNITO_REGION_NAME,
    AWS_ACCESS_KEY_ID,
    AWS_COGNITO_APP_CLIENT_ID,
    AWS_COGNITO_USER_POOL_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_COGNITO_APP_CLIENT_ID
)


class CognitoAuthentication(ModelBackend):
    def __init__(self):
        self.cognito_client = boto3.client(
            'cognito-idp', region_name=AWS_COGNITO_REGION_NAME)

    def authenticate(self, request, email=None, password=None, phone_number=None):
        # Get the access token from the request
        access_token = request.META.get('HTTP_AUTHORIZATION')

        # Decode the token without verification to get the payload
        payload = jwt.get_unverified_claims(access_token)

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
            elif phone_number:
                response = self.cognito_client.initiate_auth(
                    AuthFlow='USER_PASSWORD_AUTH',
                    AuthParameters={
                        'USERNAME': phone_number,
                        'PASSWORD': password,
                    },
                    ClientId=AWS_COGNITO_APP_CLIENT_ID
                )
            else:
                raise Exception("Both phone number and email cannot be None")
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
