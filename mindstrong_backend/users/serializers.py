from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
        extra_kwargs = { 'password': {'write_only': True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        
class UserProfileSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    
    class Meta:
        model = UserProfile
        fields = [
            'user',
            'pseudonym',
            'dob', 'genderIdentity', 'genderAtBirth',
            'employmentStatus', 'relationshipStatus',
            'griefStatus', 'relocationStatus', 'created_at', 'updated_at'
        ]
        
        read_only_field = ['created_at', 'updated_at', 'dob', 'genderAtBirth']
        
    def create(self, validated_data):
    
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        profile = UserProfile.objects.create(user=user, **validated_data)
        
        return profile
        
