from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        
    def create(self, validated_data):
        user = User.objects.create_user(
        pseudonym=validated_data['psuedonym'],
        email=validated_data.get('email', ''),
        password=validated_data['password'])
        
        return user
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'dob', 'genderIdentity', 'genderAtBirth',
            'employmentStatus', 'relationshipStatus',
            'griefStatus', 'relocationStatus'
        ]
        
