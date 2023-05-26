# accounts/views.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import CustomUser
from .serializers import CustomUserSerializer
from .authentication import CognitoAuthentication


class UserViewSet(viewsets.ViewSet):
    authentication_classes = [CognitoAuthentication]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def create(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Register the user using AWS Cognito 
                # If registration is successful, return a success status
                return Response({'status': 'User registered successfully'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def login(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Authenticate the user using AWS Cognito 
                # If authentication is successful, return a success status and the access token
                return Response({'status': 'User authenticated successfully', 'token': 'access_token'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
