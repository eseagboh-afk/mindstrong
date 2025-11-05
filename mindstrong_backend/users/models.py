from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    dob = models.DateField(null=True, blank=True)
    genderIdentity = models.CharField(max_length=100, blank=True)
    genderAtBirth = models.CharField(max_length=100, blank=True)
    employmentStatus = models.CharField(max_length=100, blank=True)
    relationshipStatus = models.CharField(max_length=100, blank=True)
    griefStatus = models.CharField(max_length=100, blank=True)
    relocationStatus = models.CharField(max_length=100, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Profile of {self.user.pseudonym}"

# Create your models here.
