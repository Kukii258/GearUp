# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from .models import Korisnik
from .serializers import ItemSerializer


def index(request):
    return render(request, "htmls/index.html")


def dashboard(request):
    return render(request, "htmls/dashboard.html")

def vozila(request):
    return render(request, "htmls/vozila.html")

def popravci(request):
    return render(request, "htmls/popravci.html")

def racuni(request):
    return render(request, "htmls/racuni.html")

def radionica(request):
    return render(request, "htmls/radionica.html")

def nadolazeci_servisi(request):
    return render(request, "htmls/nadolazeci_servisi.html")

def statistika(request):
    return render(request, "htmls/statistika.html")



class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Korisnik.objects.all()
    serializer_class = ItemSerializer

class ItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Korisnik.objects.all()
    serializer_class = ItemSerializer
