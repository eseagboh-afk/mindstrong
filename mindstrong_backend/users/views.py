from rest_framework import generics, permissions, views, response, status
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, UserProfileSerializer, SleepEntrySerializer, ExerciseEntrySerializer, FoodEntrySerializer, MoodEntrySerializer, JournalEntrySerializer
from django.contrib.auth.models import User
from .models import UserProfile
from django.contrib.auth import authenticate


    
class SignupView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    
    def perform_create(self, serializer):
        user = serializer.save()
        Token.objects.create(user=User)
        UserProfile.objects.create(user=user)
        print(token.key)
        
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        profile,created=UserProfile.objects.get_or_create(user=self.request.user)
        return profile

class SleepEntryView(generics.ListCreateAPIView):
    serializer_class = SleepEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return SleepEntry.objects.filter(user=self.request.user).order_by('-created_at')[:21]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class ExerciseEntryView(generics.ListCreateAPIView):
    serializer_class = ExerciseEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return ExerciseEntry.objects.filter(user=self.request.user).order_by(
        '-created_at')[:21]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class FoodEntryView(generics.ListCreateAPIView):
    serializer_class = FoodEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return (
            FoodEntry.objects
            .filter(user=self.request.user)
            .order_by('-timestamp')[:21]
        )
        
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
            
class MoodEntryView(generics.ListCreateAPIView):
    serializer_class = MoodEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return (
            MoodEntry.objects
            .filter(user=self.request.user)
            .order_by('-timestamp')[:21]
        )
        
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class JournalEntryView(generics.ListCreateAPIView):
    serializer_class = JournalEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return (
            JournalEntry.objects
            .filter(user=self.request.user)
            .order_by('-timestamp')[:21]
        )
        
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AnalysisView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        cutoff = timezone.now() - timedelta(days=21)
        
        sleep = SleepEntry.objects.filter(user=user, created_at_gte=cutoff)
        mood = MoodEntry.objects.filter(user=user, created_at_gte=cutoff)
        food = FoodEntry.objects.filter(user=user, created_at_gte=cutoff)
        exercise = ExerciseEntry.objects.filter(user=user, created_at_gte=cutoff)
        journal = JournalEntry.objects.filter(user=user, created_at_gte=cutoff)
        
        
        
# Create your views here.
