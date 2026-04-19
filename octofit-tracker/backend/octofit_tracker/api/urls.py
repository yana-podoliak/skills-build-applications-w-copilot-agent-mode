from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'leaderboard', views.LeaderboardEntryViewSet)
router.register(r'workouts', views.WorkoutViewSet)

urlpatterns = [
    path('', views.api_root, name='api_root'),
    path('', include(router.urls)),
]
