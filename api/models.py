from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=500)
    content = models.TextField()
    cover = models.FileField(upload_to='cover_pic/',null=True,blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')  
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_comments')  
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

