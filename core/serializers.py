from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Reloj, Reserva, Comentario

# Usuario (puede servir para mostrar nombre de quien comenta o reserva)
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# Reloj
class RelojSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reloj
        fields = ['id', 'marca', 'modelo', 'precio_oficial', 'precio_retail', 'imagen_url']



# Reserva
class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = ['id', 'usuario', 'reloj', 'fecha_reserva']
        read_only_fields = ['fecha_reserva']


# Comentario
class ComentarioSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)  # Muestra el nombre del user

    class Meta:
        model = Comentario
        fields = ['id', 'usuario', 'reloj', 'texto', 'fecha']
        read_only_fields = ['fecha']
