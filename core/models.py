from django.db import models
from django.contrib.auth.models import User


class Reloj(models.Model):
    modelo = models.CharField(max_length=100)
    marca = models.CharField(max_length=100)
    precio_oficial = models.DecimalField(max_digits=10, decimal_places=2)
    precio_retail = models.DecimalField(max_digits=10, decimal_places=2)
    imagen_url = models.URLField(max_length=500, blank=True, null=True)  # <--- este es el campo que falta

    def __str__(self):
        return f"{self.marca} {self.modelo}"


    def valor_estimado(self):
        # Valoración objetiva basada en media de precio oficial y retail
        return round((self.precio_oficial + self.precio_retail) / 2, 2)

    def __str__(self):
        return f"{self.marca} {self.modelo}"


class Reserva(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    reloj = models.ForeignKey(Reloj, on_delete=models.CASCADE)
    fecha_reserva = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('usuario', 'reloj')  # Evita reservas duplicadas

    def __str__(self):
        return f"{self.usuario.username} reservó {self.reloj}"


class Comentario(models.Model):
    reloj = models.ForeignKey(Reloj, on_delete=models.CASCADE, related_name='comentarios')
    nombre = models.CharField(max_length=100)
    mensaje = models.TextField()
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} en {self.reloj.modelo}"


class Feedback(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(blank=True, null=True)
    mensaje = models.TextField()
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback de {self.nombre}"
