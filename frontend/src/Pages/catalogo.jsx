import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Catalogo.css';

const Catalogo = () => {
  const [relojes, setRelojes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://luxeway-backend.onrender.com/api/relojes/')
      .then(res => setRelojes(res.data))
      .catch(err => console.error('Error al obtener los relojes:', err));
  }, []);

  const handleReservar = (id) => {
    navigate(`/reloj/${id}`); 
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Catálogo de Relojes</h2>
      <div className="row">
        {relojes.length > 0 ? relojes.map((reloj) => (
          <div key={reloj.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow">
              <img 
                src={reloj.imagen_url} 
                alt={`${reloj.marca} ${reloj.modelo}`} 
                className="card-img-top" 
                style={{ height: '250px', objectFit: 'contain' }} 
                onError={(e) => e.target.src = '/default_watch.png'} // Imagen por defecto
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{reloj.marca} - {reloj.modelo}</h5>
                <p><strong>Precio oficial:</strong> ${reloj.precio_oficial}</p>
                <p><strong>Precio retail:</strong> ${reloj.precio_retail}</p>
                <button 
                  onClick={() => handleReservar(reloj.id)} 
                  className="btn btn-primary mt-auto"
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        )) : (
          <p className="text-center">No hay relojes disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
