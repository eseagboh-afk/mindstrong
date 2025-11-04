from django.urls import path
from .views import UserList, SignupView, LoginView, UserDetail

urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', UserDetail.as_view(), name='user-detail'), 
]

