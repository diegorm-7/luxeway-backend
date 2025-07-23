import React from 'react';
import '../Styles/Login.css';

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Iniciar Sesión</h2>
        <form>
          <input type="text" placeholder="Usuario" className="form-control" />
          <input type="password" placeholder="Contraseña" className="form-control" />
          <button className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
