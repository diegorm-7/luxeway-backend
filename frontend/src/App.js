import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';

// Páginas principales
import Presentacion from './Pages/presentacion';
import Catalogo from './Pages/catalogo';
import DetalleReloj from './Pages/detallereloj';
import Comentarios from './Pages/comentarios'; // Comentarios + Feedback unificado


import Login from './Pages/login';
import Registro from './Pages/registro';
import Reserva from './Pages/reserva'; // Detalle + Acción de reservar
import AdminPanel from './Pages/adminpanel'; // Panel administrativo

function App() {
  return (
    <Router basename="/Luxeway">
      <Navbar />
      <Routes>
        <Route path="/" element={<Presentacion />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/reloj/:id" element={<DetalleReloj />} />
        <Route path="/comentarios" element={<Comentarios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/reserva/:id" element={<Reserva />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;

