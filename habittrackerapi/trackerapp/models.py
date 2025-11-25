from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ActiveModel(models.Model):
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class User(AbstractUser, ActiveModel):
    full_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    avatar = CloudinaryField(null=True, blank=True, default='image/upload/v1763722568/avatar-trang-4_xjfk1u.jpg')

    class Meta:
        ordering = ['id']
        verbose_name = 'Người dùng'
        verbose_name_plural = 'Người dùng'

    def __str__(self):
        return self.username


class Habit(BaseModel, ActiveModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habits')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    start_date = models.DateField(blank=False, null=False, default=timezone.now)
    due_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Thói quen'
        verbose_name_plural = 'Thói quen'

    def __str__(self):
        return self.title


class HabitLog(BaseModel, ActiveModel):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='logs')
    date = models.DateTimeField(default=timezone.now)
    status = models.BooleanField(default=False)  # True if completed, False otherwise
    notes = RichTextField(blank=True, null=True)
    photo = CloudinaryField(null=True, blank=True)

    class Meta:
        ordering = ['-date']
        verbose_name = 'Nhật ký thói quen'
        verbose_name_plural = 'Nhật ký thói quen'
        unique_together = ('habit', 'date')

    def __str__(self):
        return f"{self.habit.title} - {self.date} - {'Completed' if self.status else 'Not Completed'}"