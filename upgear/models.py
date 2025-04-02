from django.db import models


class Korisnik(models.Model):
    ime = models.CharField(max_length=100, null=False, blank=False)
    prezime = models.CharField(max_length=150, null=False, blank=True)
    broj_mobitela = models.IntegerField(null=False, blank=False)
    email = models.CharField(max_length=150, null=False, blank=False)

    def __str__(self):
        return self.ime + " - " + self.prezime

    class Meta:
        verbose_name_plural = "Korisnici"
