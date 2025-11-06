from rest_framework import generics, permissions
from .serializers import UserSerializer, UserProfileSerializer
from django.contrib.auth.models import User
from .models import UserProfile
from django.contrib.auth import authenticate

    
class SignupView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permissions_classes = [permissions.AllowAny]
        
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permissions_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)
            

# Create your views here.
