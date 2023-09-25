import React from 'react';
import clima from "../assets/clima.png";
import inicio from "../assets/inicio.png";

function Sidebar({ currentPage, setCurrentPage }) {

  const iconoEstilo = {
    width: '40px',
    height: '40px',
  }

  const botonTexto = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: '10px',  // Añade un espacio alrededor del contenido del botón
    outline: 'none', 
    fontSize: '16px',      // Tamaño de fuente deseado
    borderRadius: '20px',  // Bordes redondos
    border: '2px solid white',  // Borde blanco
    background: '#8F8F8F',
    marginBottom: '10px',
  }

  return (
    <div className="sidebar">

          <button onClick={() => setCurrentPage('inicio')} style={botonTexto} >
            <img src={inicio} style={iconoEstilo} alt="Inicio"/>
            Inicio
          </button>
          <button onClick={() => setCurrentPage('clima')} style={botonTexto} >
            <img src={clima} style={iconoEstilo} alt="Clima"/>
            Clima
          </button>
    </div>
  );
}

export default Sidebar;
