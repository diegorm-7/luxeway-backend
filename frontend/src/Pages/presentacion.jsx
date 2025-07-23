import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/presentacion.css';

const Presentacion = () => {
  const [relojes, setRelojes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/relojes/')
      .then(res => setRelojes(res.data))
      .catch(err => console.error('Error al obtener los relojes:', err));
  }, []);

  return (
    <div className="presentacion-container d-flex flex-column align-items-center justify-content-center">
      
      {/* Carrusel */}
      {relojes.length > 0 && (
        <div id="carruselRelojes" className="carousel slide mb-5" data-bs-ride="carousel">
          <div className="carousel-inner">
            {relojes.slice(0, 5).map((reloj, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={reloj.id}>
                <img src={reloj.imagen_url} className="d-block w-100 carrusel-img" alt={reloj.modelo} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carruselRelojes" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" />
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carruselRelojes" data-bs-slide="next">
            <span className="carousel-control-next-icon" />
          </button>
        </div>
      )}

      {/* Tarjeta de bienvenida */}
      <div className="card text-center shadow-lg p-4 bg-white rounded">
        <h2 className="mb-3 fw-bold">LuxeWayDR</h2>
        <p className="mb-4">
          Tu plataforma para explorar, comparar y reservar los relojes más exclusivos del mundo.
        </p>
        <Link to="/catalogo" className="btn btn-primary fw-semibold">
          Ir al Catálogo
        </Link>
      </div>
    </div>
  );
};

export default Presentacion;
