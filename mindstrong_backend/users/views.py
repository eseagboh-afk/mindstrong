from django.shortcuts import render
from rest_framework import generics, permissions
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permissions_classes = [permissions.AllowAny]
    
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        from django.contrib.auth import authenticate
        pseudonym = request.data.get('pseudonym')
        password = request.data.get('password')
        user = authenticate(pseudonym=pseudonym, password=password)
        
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'pseudonym': user.pseudonym})
        return Resposne({'error': 'Invalid credentials'}, status=400)
        
class UserDetail(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
        
    def get_object(self):
        return self.request.user
            

# Create your views here.
