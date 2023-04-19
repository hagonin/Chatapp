from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CustomUser
from .serializers import CustomUserSerializer
from .authentication import FirebaseAuthenticationBackend


def handle_social_login(request):
    firebase_auth_backend = FirebaseAuthenticationBackend()
    try:
        user, _ = firebase_auth_backend.authenticate(request)
        serializer = CustomUserSerializer(user)
        return Response({"message": "User logged in successfully", "user": serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='register', permission_classes=[permissions.AllowAny])
    def register(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully", "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='login', permission_classes=[permissions.AllowAny])
    def login(self, request):
        firebase_auth_backend = FirebaseAuthenticationBackend()
        try:
            user, _ = firebase_auth_backend.authenticate(request)
            serializer = CustomUserSerializer(user)
            return Response({"message": "User logged in successfully", "user": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='login-google', permission_classes=[permissions.AllowAny])
    def login_google(self, request):
        return handle_social_login(request)
