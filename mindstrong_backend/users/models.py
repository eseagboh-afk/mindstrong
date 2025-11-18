#Import necessary classes#

from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class EmploymentStatus(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
        
        
class UserProfile(models.Model):

#Each record matches to exactly one user#
#The user model used is derived from settings file#
#If the user deletes their profile, the entire record is deleted#

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
#Attributes of the user profile#
    
    pseudonym = models.CharField(max_length=100)
    dob = models.DateField()
    genderIdentity = models.CharField(max_length=100)
    genderAtBirth = models.CharField(max_length=100)
    #employment_statuses = models.ManyToManyField(EmploymentStatus)#
    relationshipStatus = models.CharField(max_length=100)
    griefStatus = models.CharField(max_length=100)
    relocationStatus = models.CharField(max_length=100)

#Track when the profile was created and updated#

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return f"{self.user.pseudonym}'s profile"
        
class SleepEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sleep_entries")
    total_sleep_hours = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.total_sleep_hours} hrs ({self.created_at.date()})"

class ExerciseEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercised = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
class FoodEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"FoodEntry({self.user.username}, {self.timestamp.date()})"
        
class MoodEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mood = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"MoodEntry({self.user.username}, {self.timestamp.date()})"

class JournalEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    journaled_status = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    
