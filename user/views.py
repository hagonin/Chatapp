from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from rest_framework.permissions import IsAuthenticated

from .exceptions import InvalidCredentialsException, NoAuthToken
from firebase_admin import auth
from .models import CustomUser, Profile
from .serializers import CustomUserSerializer, ProfileSerializer
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

    @extend_schema(request=CustomUserSerializer)
    @action(detail=False, methods=['post'], url_path='register', permission_classes=[permissions.AllowAny])
    def register(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully", "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(parameters=[OpenApiParameter(name='oobCode', description='Out of band code for email verification')])
    @action(detail=False, methods=['GET'], url_path='verify-email', permission_classes=[permissions.AllowAny])
    def verify_email(self, request):
        action_code = request.GET.get('oobCode', None)
        if action_code:
            try:
                auth.apply_action_code(action_code)
                return Response({"message": "Email verified successfully"}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Invalid action code"}, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        parameters=[OpenApiParameter(name='Authorization', description='Firebase ID token', required=True, location='header', examples=[
                                    OpenApiExample('Bearer <ID_TOKEN>', summary='Firebase ID token', value='Bearer <ID_TOKEN>')])]
    )
    @action(detail=False, methods=['post'], url_path='login', permission_classes=[permissions.AllowAny])
    def login(self, request):
        firebase_auth_backend = FirebaseAuthenticationBackend()
        try:
            user, _ = firebase_auth_backend.authenticate(request)
            serializer = CustomUserSerializer(user)
            return Response({"message": "User logged in successfully", "user": serializer.data}, status=status.HTTP_200_OK)
        except NoAuthToken as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            raise InvalidCredentialsException()

    @extend_schema(request=None, responses=CustomUserSerializer)
    @action(detail=False, methods=['post'], url_path='login-google', permission_classes=[permissions.AllowAny])
    def login_google(self, request):
        return handle_social_login(request)


class ProfileViewSet(viewsets.GenericViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    @extend_schema(
        summary="Retrieve the user's profile",
        description="Endpoint to retrieve the authenticated user's profile.",
        responses={200: ProfileSerializer},
    )
    @action(detail=False, methods=['GET'])
    def retrieve_profile(self, request):
        profile = request.user.profile
        serializer = self.get_serializer(profile)
        return Response(serializer.data)
    
    @extend_schema(
        summary="Create a new user profile",
        description="Endpoint to create a new user profile. Requires authentication.",
        request=ProfileSerializer,
        responses={201: ProfileSerializer},
    )
    @action(detail=False, methods=['POST'])
    def create_profile(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(
        summary="Update the user's profile",
        description="Endpoint to update the authenticated user's profile.",
        request=ProfileSerializer,
        responses={200: ProfileSerializer},
    )
    @action(detail=False, methods=['PUT'])
    def update_profile(self, request):
        profile = request.user.profile
        serializer = self.get_serializer(
            profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data)
