# core/management/commands/cargar_relojes.py
import csv
from django.core.management.base import BaseCommand
from core.models import Reloj

class Command(BaseCommand):
    help = 'Carga relojes desde un archivo CSV'

    def handle(self, *args, **kwargs):
        with open('relojes.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                reloj, creado = Reloj.objects.get_or_create(
                    modelo=row['modelo'],
                    marca=row['marca'],
                    precio_oficial=row['precio_oficial'],
                    precio_retail=row['precio_retail'],
                    imagen_url=row.get('imagen_url', '')
                )
                self.stdout.write(self.style.SUCCESS(
                    f"{'Creado' if creado else 'Existente'}: {reloj.modelo}"))

