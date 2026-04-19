from django.test import TestCase
from .models import User, Team, Activity, LeaderboardEntry, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(username='testuser', password='testpass')
        self.assertEqual(user.username, 'testuser')

class TeamModelTest(TestCase):
    def test_create_team(self):
        user = User.objects.create_user(username='member', password='pass')
        team = Team.objects.create(name='Test Team')
        team.members.add(user)
        self.assertEqual(team.name, 'Test Team')
        self.assertIn(user, team.members.all())

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        user = User.objects.create_user(username='activityuser', password='pass')
        activity = Activity.objects.create(user=user, activity_type='Run', duration=30, date='2024-01-01')
        self.assertEqual(activity.activity_type, 'Run')

class LeaderboardEntryModelTest(TestCase):
    def test_create_leaderboard_entry(self):
        user = User.objects.create_user(username='leader', password='pass')
        team = Team.objects.create(name='Leaderboard Team')
        entry = LeaderboardEntry.objects.create(user=user, team=team, score=100, rank=1)
        self.assertEqual(entry.rank, 1)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        user = User.objects.create_user(username='workoutuser', password='pass')
        workout = Workout.objects.create(user=user, name='Morning Cardio', description='Cardio session', date='2024-01-01')
        self.assertEqual(workout.name, 'Morning Cardio')
