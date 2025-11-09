from django.urls import path
from .views import SignupView, UserProfileView, SleepEntryView, ExerciseEntryView, FoodEntryView, MoodEntryView, JournalEntryView, AnalysisView
from rest_framework.authtoken import Token

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('sleep_entries/', SleepEntryView.as_view(), name='sleep_entries'),
    path('exercise_entries/', ExerciseEntryView.as_view(), name='exercise_entries'),
    path('food_entries/', FoodEntryView.as_view(), name='food_entries'),
    path('mood_entries/', MoodEntryView.as_view(), name='mood_entries'),
    path('journal_entries/', JournalEntryView.as_view(), name='journal_entries'),
    path('analysis/', AnalysisView.as_view(), name='analysis'),
    path('token-auth/', obtain_auth_token, name='api_token_auth'),
]

