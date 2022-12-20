from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=500)
    content = models.TextField()
    cover = models.FileField(upload_to='cover_pic/',null=True,blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    love_count = models.IntegerField(default=0)  
    publishedAt = models.DateField(null=True,blank=True,auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_comments')  
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

class LoveReact(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_love')

