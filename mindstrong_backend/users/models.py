#Import necessary classes#

from django.db import models
from django.conf import settings


class UserProfile(models.Model):

#Each record matches to exactly one user#
#The user model used is derived from settings file#
#If the user deletes their profile, the entire record is deleted#

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
#Attributes of the user profile#
    
    pseudonym = models.CharField(max_length=100, blank=True)
    dob = models.DateField(null=True, blank=True)
    genderIdentity = models.CharField(max_length=100, blank=True)
    genderAtBirth = models.CharField(max_length=100, blank=True)
    employmentStatus = models.CharField(max_length=100, blank=True)
    relationshipStatus = models.CharField(max_length=100, blank=True)
    griefStatus = models.CharField(max_length=100, blank=True)
    relocationStatus = models.CharField(max_length=100, blank=True)

#Track when the profile was created and updated#

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.pseudonym}'s profile"

