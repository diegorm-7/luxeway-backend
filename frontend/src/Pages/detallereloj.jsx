import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/DetalleReloj.css';

const DetalleReloj = () => {
  const { id } = useParams();
  const [reloj, setReloj] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/relojes/${id}/`)
      .then(res => setReloj(res.data))
      .catch(err => console.error('Error al obtener detalles del reloj:', err));
  }, [id]);

  const handleReservar = () => {
    // Aquí podrías hacer una petición POST si tienes backend para reservas
    setMensaje('✅ Reserva exitosa');
    setTimeout(() => {
      setMensaje('');
      navigate('/reservas');
    }, 1500);
  };

  if (!reloj) return <div className="cargando">Cargando detalles del reloj...</div>;

  return (
    <div className="detalle-reloj-container">
      <div className="detalle-reloj-card">
        <img 
          src={reloj.imagen_url} 
          alt={`${reloj.marca} ${reloj.modelo}`} 
          className="detalle-reloj-imagen"
          onError={(e) => e.target.src = '/default_watch.png'}
        />
        <div className="detalle-reloj-info">
          <h2>{reloj.marca} {reloj.modelo}</h2>
          <p><strong>Precio Oficial:</strong> ${reloj.precio_oficial}</p>
          <p><strong>Precio Retail:</strong> ${reloj.precio_retail}</p>
          <button className="btn-reservar" onClick={handleReservar}>
            Confirmar reserva
          </button>
          {mensaje && <div className="mensaje-reserva">{mensaje}</div>}
        </div>
      </div>
    </div>
  );
};

export default DetalleReloj;

