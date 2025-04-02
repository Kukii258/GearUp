from django.contrib import admin

from .models import Korisnik


# Register your models here.
@admin.register(Korisnik)
class KorisnikAdmin(admin.ModelAdmin):
    pass
