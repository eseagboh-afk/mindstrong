from rest_framework import generics, permissions
from .serializers import UserSerializer, UserProfileSerializer
from django.contrib.auth.models import User
from .models import UserProfile
from django.contrib.auth import authenticate

    
class SignupView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]
        
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        profile,created=UserProfile.objects.get_or_create(user=self.request.user)
        return profile
            

# Create your views here.
