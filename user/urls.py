from .views import UserViewSet
from django.urls import path

app_name = 'user'


urlpatterns = [
    path('register/',
        UserViewSet.as_view({'post': 'create'}), name='register'),
    path('login/', UserViewSet.as_view({'post': 'login'}), name='login'),
]
