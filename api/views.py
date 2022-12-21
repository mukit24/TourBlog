from .models import Post, Comment, LoveReact
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import PostSerializer, RegistrationUserSerializer, CommentSerializer, UserSerializer
from django.db.models import Q

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializer(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register_user(request):
    register_user_serializer = RegistrationUserSerializer(data=request.data)
    if register_user_serializer.is_valid():
        user = register_user_serializer.save()
        return Response(register_user_serializer.data, status=status.HTTP_201_CREATED)
    return Response({'detail': 'Username Already Exists'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def post_index(resquest):
    posts = Post.objects.all().order_by('-love_count')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def post_index_trending(resquest):
    posts = Post.objects.all().order_by('-love_count')[:6]
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def post_details(request, id):
    try:
        post = Post.objects.get(id=id)
        serializer = PostSerializer(post)
        return Response(serializer.data)
    except:
        return Response({'msg': 'The post does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    data = request.data
    data['author'] = request.user.id
    serializer = PostSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response({'detail': serializer.errors, 'msg': 'Sorry! Operation Can not be performed'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def post_update_delete(request, id):
    try:
        post = Post.objects.get(id=id)
    except:
        return Response({'msg': 'The post does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    if post.author != request.user:
        return Response({'msg': 'Not Authorized'},status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PUT':
        data = request.data
        data['author'] = request.user.id
        serializer = PostSerializer(post, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'detail': serializer.errors, 'msg': 'Sorry! Operation Can not be performed'}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        post.delete()
        return Response({'msg': 'Post was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request, id):
    try:
        post = Post.objects.get(id=id)
    except:
        return Response({'msg': 'The post does not exist'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    data['author'] = request.user.id
    data['post'] = post.id
    serializer = CommentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response({'msg': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def comment_update_delete(request, post_id, comment_id):
    try:
        post = Post.objects.get(id=post_id)
    except:
        return Response({'msg': 'The post does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        comment = Comment.objects.get(id=comment_id)
    except:
        return Response({'msg': 'The comment does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    print(request.user)
    print(comment.author)
    if comment.author != request.user:
        return Response({'msg': 'Not Authorized'},status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PUT':
        data = request.data
        data['author'] = request.user.id
        data['post'] = post.id
        serializer = CommentSerializer(comment, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'msg': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        comment.delete()
        return Response({'msg': 'Comment was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def hit_love(request, id):
    post = Post.objects.get(id=id)
    user = request.user

    isLoved = LoveReact.objects.filter(Q(user=user) & Q(post=post))
    print(isLoved)

    if isLoved:
        return Response({'msg':"You've already loved this post."}, status=status.HTTP_403_FORBIDDEN)
    else:
        react = LoveReact.objects.create(
            post = post,
            user = user
        )
        post.love_count += 1
        post.save()

        return Response({'msg': 'SuccessFull'},status=status.HTTP_201_CREATED)
