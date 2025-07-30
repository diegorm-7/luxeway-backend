import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Catalogo.css';

const API_URL = 'https://luxeway-backend.onrender.com';

const Catalogo = () => {
  const [relojes, setRelojes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/relojes/`)
      .then(res => {
        setRelojes(res.data);
        console.log('RELOJES CARGADOS:', res.data); // <- Debug
      })
      .catch(err => console.error('Error al obtener los relojes:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleReservar = (id) => {
    navigate(`/reloj/${id}`); 
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Catálogo de Relojes</h2>

      {loading ? (
        <div className="text-center">
          <p>Cargando relojes...</p>
        </div>
      ) : relojes.length === 0 ? (
        <p className="text-center">No hay relojes disponibles.</p>
      ) : (
        <div className="row">
          {relojes.map((reloj) => (
            <div key={reloj.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow">
                <img 
                  src={reloj.imagen_url} 
                  alt={`${reloj.marca} ${reloj.modelo}`} 
                  className="card-img-top" 
                  style={{ height: '250px', objectFit: 'cover' }} 
                  onError={(e) => e.target.src = '/default_watch.png'}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalogo;
