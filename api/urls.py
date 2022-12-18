from django.urls import path
from .views import post_index, post_details, register_user
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'api'

urlpatterns = [
    path('user/login/', TokenObtainPairView.as_view(), name='user-login'),
    path('user/register/',register_user,name='user-register'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('posts/',post_index,name='post-list'),
    path('posts/<int:id>/',post_details,name='post-details'),
]