from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .exceptions import InvalidCredentialsException, NoAuthToken
from .serializers import CustomUserSerializer, ProfileSerializer
from .authentication import FirebaseAuthentication

from drf_spectacular.utils import extend_schema, extend_schema_view
from .utils import get_social_user_info
from .exceptions import UserNotFoundError, FirebaseError


def handle_social_login(request, provider):
    firebase_auth_backend = FirebaseAuthentication()
    uid, email, name, picture = get_social_user_info(request, provider)

    try:
        user = firebase_auth_backend.get_user(uid)
        if user is None:
            raise UserNotFoundError()
    except FirebaseError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    user.email = email
    user.name = name
    user.picture = picture
    user.save()

    serializer = CustomUserSerializer(user)
    return Response({"message": "User logged in successfully", "user": serializer.data}, status=status.HTTP_200_OK)


@extend_schema_view(
    post=extend_schema(description="Register a new user",
                    responses={201: CustomUserSerializer})
)
class RegisterView(generics.GenericAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"message": "User registered successfully", "user": serializer.data}, status=status.HTTP_201_CREATED)


@extend_schema_view(
    post=extend_schema(description="Log in a user",
                    responses={200: CustomUserSerializer})
)
class LoginView(generics.GenericAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        firebase_auth_backend = FirebaseAuthentication()
        try:
            user, _ = firebase_auth_backend.authenticate(request)
            serializer = CustomUserSerializer(user)
            return Response({"message": "User logged in successfully", "user": serializer.data}, status=status.HTTP_200_OK)
        except NoAuthToken as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            raise InvalidCredentialsException()


@extend_schema_view(
    post=extend_schema(description="Log in a user with Google account", responses={
                    200: CustomUserSerializer})
)
class LoginGoogleView(generics.GenericAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        return handle_social_login(request, 'google')


@extend_schema_view(
    post=extend_schema(description="Log in a user with Facebook account", responses={
                    200: CustomUserSerializer})
)
class LoginFacebookView(generics.GenericAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        return handle_social_login(request, 'facebook')


@extend_schema_view(
    post=extend_schema(description="Create a new profile for the user", responses={
                    201: ProfileSerializer}),
    put=extend_schema(description="Update the user's profile",
                    responses={200: ProfileSerializer}),
    get=extend_schema(description="Retrieve the user's profile",
                    responses={200: ProfileSerializer}),
)
class ProfileView(generics.GenericAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        profile = request.user.profile
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        profile = request.user.profile
        serializer = self.get_serializer(
            profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response
