from django.urls import path
from django.views import defaults as default_views
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

from upgear.views import ItemListCreateView, ItemDetailView

urlpatterns = [
path('items/', ItemListCreateView.as_view(), name='item-list'),
path('items/<int:pk>/', ItemDetailView.as_view(), name='item-detail'),  # Get token
]
