from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, SleepEntry, ExerciseEntry, FoodEntry, MoodEntry, JournalEntry

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
    
class SleepEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = SleepEntry
        fields = ['id', 'user', 'total_sleep_hours', 'created_at']
        read_only_field = ['user', 'created_at']
        
class ExerciseEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseEntry
        fields = ['id', 'user', 'exercised', 'timestamp']
        read_only_field = ['user', 'created_at']
        
class FoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodEntry
        fields = ['id', 'user', 'food', 'timestamp']
        read_only_field = ['user', 'created_at']

class MoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = ['id', 'user', 'mood', 'timestamp']
        read_only_field = ['user', 'created_at']
        
class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ['id', 'user', 'journaled', 'timestamp' ]
        read_only_field = ['user', 'created_at']
        
