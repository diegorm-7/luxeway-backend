from django.contrib import admin
from django.urls import path, include
from backend import views
from backend.views import RelojListView, RegistroUsuario
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Django Admin
    path('admin/', admin.site.urls),

    # HTML views
    path('', views.index),
    path('catalogo/', views.catalogo),
    path('login/', views.login_view),
    path('registro/', views.registro),
    path('presentacion/', views.presentacion),
    path('comentarios/', views.comentarios),
    path('admin-panel/', views.admin_panel),
    path('feedback/', views.feedback_view, name='feedback'),

    # API REST
 #   path('api/', include('core.urls')),  

    path('api/relojes/', views.ListaRelojesView.as_view(), name='lista_relojes'),
    path('api/relojes/<int:pk>/', views.DetalleRelojView.as_view(), name='detalle_reloj'),
    path('api/reservas/', views.CrearReservaView.as_view(), name='crear_reserva'),
    path('api/comentarios/', views.ComentariosDeRelojView.as_view(), name='comentarios_reloj'),
    path('api/comentarios/crear/', views.CrearComentarioView.as_view(), name='crear_comentario'),

    # Auth
    path('api/registro/', RegistroUsuario.as_view(), name='registro_usuario'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/relojes-lista/', RelojListView.as_view(), name='lista_relojes_alt'),
]
