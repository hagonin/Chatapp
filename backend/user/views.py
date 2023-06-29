from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from firebase_admin import auth as firebase_auth
from botocore.exceptions import BotoCoreError
import boto3

from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes


@extend_schema(
    request=OpenApiTypes.OBJECT,  # Replace with your actual request schema
    responses=OpenApiTypes.OBJECT,  # Replace with your actual response schema
    description="Create a new user in AWS Cognito and Firebase.",
    parameters=[
        OpenApiParameter(
            name="username", description="Username", required=True, type=OpenApiTypes.STR
        ),
        OpenApiParameter(
            name="password", description="Password", required=True, type=OpenApiTypes.STR
        ),
        OpenApiParameter(
            name="email", description="Email", required=True, type=OpenApiTypes.STR
        ),
        OpenApiParameter(
            name="phone_number", description="Phone number", required=False, type=OpenApiTypes.STR
        ),
    ],
)
@api_view(['POST'])
def register(request):
    """Create a new user."""
    # Get data from the request
    data = request.data
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    phone_number = data.get('phone_number')

    # Use AWS SDK to create a new user in Cognito
    client = boto3.client('cognito-idp')
    try:
        response = client.sign_up(
            ClientId='<COGNITO_APP_CLIENT_ID>',
            Username=username,
            Password=password,
            UserAttributes=[
                {
                    'Name': 'email',
                    'Value': email
                },
                {
                    'Name': 'phone_number',
                    'Value': phone_number
                },
            ]
        )
    except BotoCoreError as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # If a phone number was provided, also create the user in Firebase
    if phone_number:
        try:
            user = firebase_auth.create_user(
                uid=username,
                email=email,
                email_verified=False,
                password=password,
                phone_number=phone_number,
                disabled=False
            )
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'detail': 'User created successfully'}, status=status.HTTP_201_CREATED)
