from .models import Post
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import PostSerializer, RegistrationUserSerializer

@api_view(['POST'])
def register_user(request):
    register_user_serializer = RegistrationUserSerializer(data = request.data)
    if register_user_serializer.is_valid():
        user = register_user_serializer.save()
        return Response(register_user_serializer.data,status=status.HTTP_201_CREATED)
    return Response(register_user_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def post_index(resquest):
    posts = Post.objects.all().order_by('-createdAt')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def post_details(resquest, id):
    try:
        posts = Post.objects.get(id=id)
        serializer = PostSerializer(posts)
        return Response(serializer.data)
    except:
        return Response({'msg':'Post Does not exists'}, status = status.HTTP_404_NOT_FOUND)



