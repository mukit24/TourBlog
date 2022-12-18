from django.urls import path
from .views import post_index, post_details, register_user, create_post, post_update_delete, create_comment, comment_update_delete
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
    path('posts/create/',create_post, name='create-post'),
    path('posts/<int:id>/update_delete/',post_update_delete, name='update-delete-post'),
    path('comment/<int:id>/create/',create_comment,name='create-comment'),
    path('comment/<int:post_id>/update_delete/<int:comment_id>/',comment_update_delete,name='update-delete-comment')
]