from rest_framework import generics, permissions, views, response, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from .serializers import UserSerializer, UserProfileSerializer, SleepEntrySerializer, ExerciseEntrySerializer, FoodEntrySerializer, MoodEntrySerializer, JournalEntrySerializer
from django.contrib.auth.models import User
from .models import UserProfile
from django.contrib.auth import authenticate


    
class SignupView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        UserProfile.objects.create(user=user)
        headers = self.get_success_headers(serializer.data)
        print(token.key)
        return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_201_CREATED, headers=headers)
        
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        if not user:
            return Response({"error": "Invalid credentials"}, status=400)
        
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "username": user.username
        })
        
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        profile,created=UserProfile.objects.get_or_create(user=self.request.user)
        return profile

class SleepEntryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = SleepEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
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
