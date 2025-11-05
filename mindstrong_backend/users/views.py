from django.shortcuts import render
from rest_framework import generics, permissions
from .serializers import UserSerializer, UserProfileSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .models import UserProfile
from django.contrib.auth import authenticate

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class SignupView(generics.CreateAPIView):
    permissions_classes = [permissions.AllowAny]
    
    def post(self, request):
        pseudonym = request.data.get('pseudonym')
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = User.objects.create_user(pseudonym=pseudonym, email=email, password=password)
        
        profile_data = {
        
            'dob' : request.data.get('dob'),
            'genderIdentity' : request.data.get('genderIdentity'),
            'genderAtBirth' : request.data.get('genderAtBirth'),
            'employmentStatus' : request.data.get('employmentStatus'),
            'relationshipStatus' : request.data.get('relationshipStatus'),
            'griefStatus' : request.data.get('griefStatus'),
            'relocationStatus' : request.data.get('relocationStatus'),
        }
        
        UserProfile.objects.create(user=user, **profile_data)
        
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'pseudonym': user.pseudonym, 'email':user.email})
    
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

        
class UserDetail(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
        
    def get_object(self):
        return self.request.user
            

# Create your views here.
