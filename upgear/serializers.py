from rest_framework import serializers

from .models import Korisnik


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Korisnik
        fields = "__all__"
