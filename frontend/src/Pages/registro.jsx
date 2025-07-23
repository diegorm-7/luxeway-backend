import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/pantallas.css';
import axios from 'axios';

const Registro = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/registro/', form);
      setMensaje(res.data.mensaje);
    } catch (err) {
      setMensaje('Error al registrarse. Verifica los datos.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" name="username" placeholder="Usuario" onChange={handleChange} required />
        <input className="form-control my-2" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control my-2" type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <button className="btn btn-primary" type="submit">Registrarse</button>
      </form>
      {mensaje && <p className="mt-3">{mensaje}</p>}
    </div>
  );
};

export default Registro;
