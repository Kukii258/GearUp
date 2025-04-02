# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Korisnik
from .serializers import ItemSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Korisnik.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]


from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path(
        "api/token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),  # Get token
    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),  # Refresh token
]
