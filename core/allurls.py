from django.urls import path
from core.views import home,login,reg
app_name = "core"

urlpatterns = [
    
    path("login/",login),
    
]