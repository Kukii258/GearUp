# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from .models import Korisnik
from .serializers import ItemSerializer


def index(request):
    return render(request, "htmls/index.html")



class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Korisnik.objects.all()
    serializer_class = ItemSerializer

class ItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Korisnik.objects.all()
    serializer_class = ItemSerializer
