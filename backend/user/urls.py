from django.urls import path
from .views import RegisterView, LoginView, LoginGoogleView, ProfileView, LoginFacebookView


app_name = 'user'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('login-google/', LoginGoogleView.as_view(), name='login-google'),
    path('login-facebook/', LoginFacebookView.as_view(), name='login-facebook'),
    path('profile/', ProfileView.as_view(), name='profile'),
]
