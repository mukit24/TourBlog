from django.contrib.auth.models import User
from .models import Post, Comment
from rest_framework import serializers
# from rest_framework_simplejwt.tokens import RefreshToken

class RegistrationUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password']
        extra_kwargs = {
            'password':{'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],password = validated_data['password']  ,email=validated_data['email'])
        return user

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
