# ------------------------
# Vistas tradicionales (renderizado de plantillas)
# ------------------------

from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def catalogo(request):
    return render(request, 'catalogo.html')

def login_view(request):
    return render(request, 'login.html')

def registro(request):
    return render(request, 'registro.html')

def presentacion(request):
    return render(request, 'presentacion.html')

def comentarios(request):
    return render(request, 'comentarios.html')

def admin_panel(request):
    return render(request, 'admin_panel.html')

def feedback_view(request):
    return render(request, 'feedback.html')


# ------------------------
# Vistas API (Django REST Framework)
# ------------------------

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from core.models import Reserva, Reloj
from core.serializers import ReservaSerializer, RelojSerializer

# Crear reserva de un reloj
class CrearReservaView(generics.CreateAPIView):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        usuario = self.request.user
        reloj = serializer.validated_data['reloj']

        if Reserva.objects.filter(usuario=usuario, reloj=reloj).exists():
            raise ValidationError("Ya has reservado este reloj.")

        serializer.save(usuario=usuario)


# Obtener detalle de un reloj por ID
class DetalleRelojView(generics.RetrieveAPIView):
    queryset = Reloj.objects.all()
    serializer_class = RelojSerializer
    permission_classes = [permissions.AllowAny]


from core.models import Comentario
from core.serializers import ComentarioSerializer


class ComentariosDeRelojView(generics.ListAPIView):
    serializer_class = ComentarioSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        reloj_id = self.request.query_params.get('reloj_id')
        return Comentario.objects.filter(reloj__id=reloj_id).order_by('-fecha')

class CrearComentarioView(generics.CreateAPIView):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class ListaRelojesView(generics.ListAPIView):
    queryset = Reloj.objects.all()
    serializer_class = RelojSerializer
    permission_classes = [permissions.AllowAny]

from rest_framework.generics import ListAPIView
from core.models import Reloj
from core.serializers import RelojSerializer

class RelojListView(ListAPIView):
    queryset = Reloj.objects.all()
    serializer_class = RelojSerializer

    
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import RegistroSerializer


class RegistroUsuario(APIView):
    def post(self, request):
        serializer = RegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'mensaje': 'Usuario registrado correctamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
