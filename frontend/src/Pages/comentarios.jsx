import React, { useState, useEffect } from 'react';
import '../Styles/pantallas.css';

function Comentarios() {
  const [comentarios, setComentarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/comentarios/`)
      .then(res => res.json())
      .then(data => setComentarios(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/api/comentarios/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, mensaje }),
    })
      .then(res => res.json())
      .then(data => {
        setComentarios([data, ...comentarios]);
        setNombre('');
        setMensaje('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="feedback-container">
      <h2>Comentarios</h2>
      <p>Aquí podrás dejar tu opinión y feedback.</p>

      <form onSubmit={handleSubmit} className="form-comentario">
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Escribe tu comentario aquí..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>

      <div className="comentarios-lista">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="comment-box">
            <div className="comment-header">
              <span className="comment-nombre">{comentario.nombre}</span>
              <span>{new Date(comentario.creado_en).toLocaleString()}</span>
            </div>
            <p>{comentario.mensaje}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comentarios;
