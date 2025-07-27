import React, { useEffect, useState } from 'react';
import '../Styles/pantallas.css';

function AdminPanel() {
  const [relojes, setRelojes] = useState([]);

  useEffect(() => {
   fetch(`${process.env.REACT_APP_API_URL}/api/relojes/`)
      .then(res => res.json())
      .then(data => setRelojes(data))
      .catch(err => console.error('Error en admin panel:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Panel de Administración</h2>
      {relojes.map(r => (
        <div key={r.id} style={{ borderBottom: '1px solid gray', marginBottom: '1rem' }}>
          <strong>{r.modelo}</strong> - ${r.precio_oficial}
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;