from django.urls import path, include
from rest_framework.routers import DefaultRouter

from trackerapp import views

router = DefaultRouter()
router.register('users', views.UserViewSet, basename='user')
router.register('habits', views.HabitViewSet, basename='habit')
urlpatterns = [
    path('', include(router.urls)),
]
