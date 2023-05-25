from django.urls import path, include
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()
# router.register(r'users', UserViewSet, basename='user')
# router.register(r'profile', ProfileViewSet, basename='profile')

urlpatterns = [
    path('', include(router.urls)),
]
