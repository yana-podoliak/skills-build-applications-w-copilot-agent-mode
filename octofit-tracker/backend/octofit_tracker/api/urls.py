from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'leaderboard', views.LeaderboardEntryViewSet)
router.register(r'workouts', views.WorkoutViewSet)

# API root that returns the Codespace URL using the environment variable
@api_view(['GET'])
def api_root(request):
    codespace_name = os.environ.get('CODESPACE_NAME', '')
    if codespace_name:
        base_url = f"https://{codespace_name}-8000.app.github.dev/api/"
    else:
        base_url = "http://localhost:8000/api/"
    return Response({
        'users': base_url + 'users/',
        'teams': base_url + 'teams/',
        'activities': base_url + 'activities/',
        'leaderboard': base_url + 'leaderboard/',
        'workouts': base_url + 'workouts/',
    })

urlpatterns = [
    path('', api_root, name='api_root'),
    path('', include(router.urls)),
]
