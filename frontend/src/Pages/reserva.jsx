import React, { useEffect, useState } from 'react';
import '../Styles/Reservas.css';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('reservas');
    if (stored) {
      setReservas(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="reservas-container">
      <h2 className="titulo">Tus Reservas</h2>
      {reservas.length > 0 ? (
        <div className="reservas-grid">
          {reservas.map((reserva, index) => (
            <div className="reserva-card" key={index}>
              <img src={reserva.imagen_url} alt={`${reserva.marca} ${reserva.modelo}`} onError={(e) => e.target.src = '/default_watch.png'} />
              <h4>{reserva.marca} - {reserva.modelo}</h4>
              <p><strong>Precio Oficial:</strong> ${reserva.precio_oficial}</p>
              <p><strong>Precio Retail:</strong> ${reserva.precio_retail}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="sin-reservas">No tienes reservas activas.</p>
      )}
    </div>
  );
};

export default Reservas;

