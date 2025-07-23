import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">LuxeWayDR</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/catalogo">Catálogo</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/comentarios">Comentarios</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/reserva">Reservas</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/registro">Registro</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

