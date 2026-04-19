from django.core.management.base import BaseCommand
from octofit_tracker.api import models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        models.User.objects.all().delete()
        models.Team.objects.all().delete()
        models.Activity.objects.all().delete()
        models.Leaderboard.objects.all().delete()
        models.Workout.objects.all().delete()

        # Create teams
        marvel = models.Team.objects.create(name='Team Marvel')
        dc = models.Team.objects.create(name='Team DC')

        # Create users (superheroes)
        users = [
            models.User.objects.create(email='tony@stark.com', username='IronMan', team=marvel),
            models.User.objects.create(email='steve@rogers.com', username='CaptainAmerica', team=marvel),
            models.User.objects.create(email='bruce@wayne.com', username='Batman', team=dc),
            models.User.objects.create(email='clark@kent.com', username='Superman', team=dc),
        ]

        # Create activities
        activities = [
            models.Activity.objects.create(user=users[0], type='Run', duration=30, distance=5),
            models.Activity.objects.create(user=users[1], type='Swim', duration=45, distance=2),
            models.Activity.objects.create(user=users[2], type='Cycle', duration=60, distance=20),
            models.Activity.objects.create(user=users[3], type='Run', duration=25, distance=6),
        ]

        # Create workouts
        workouts = [
            models.Workout.objects.create(name='Morning Cardio', description='Cardio for all heroes'),
            models.Workout.objects.create(name='Strength Training', description='Strength for all heroes'),
        ]

        # Create leaderboard
        models.Leaderboard.objects.create(user=users[0], score=100)
        models.Leaderboard.objects.create(user=users[1], score=90)
        models.Leaderboard.objects.create(user=users[2], score=95)
        models.Leaderboard.objects.create(user=users[3], score=85)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
