import React from 'react';
import nube2 from "../assets/nube.jpeg";
import logo from "../assets/logo.png";

export default function Inicio({ currentPage, setCurrentPage }) {
    const bodyInicio = {
        background: `url(${nube2})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
      
        flex: "1", // Take up all available space
        marginLeft: "200px", // Move content 200px to the right
    };

    const containerInicio = {
        textAlign: "center",
        padding: "20px",
        maxWidth: "calc(100% - 250px)", // Adjust the width to leave space for the sidebar
    };

    const imagenEstilo = {
        maxWidth: '100%',
        width: '200px',
        height: '200px',
    };

    const tituloEstilo = {
        fontSize: '46px', // Aumenta el tamaño de fuente para el encabezado h1
        fontWeight: 'bold', // Aplica negritas al encabezado h1
      };
    
    const botonEstilo = {
        backgroundColor: "#0A1C4A",
        color: "#fff",
        borderRadius: "10px",
        padding: "10px 20px",
        cursor: "pointer",
        
    };

    const creditosEstilo = {
        padding: '10px',
        textAlign: 'center',
        bottom: '0',
        fontSize: '18px',
        fontWeight: 'bold',
    };

    return (
        <div style={bodyInicio}>
            <div style={containerInicio}>
                <img src={logo} alt='logo clima' style={imagenEstilo} ></img>
                <h1 style={tituloEstilo} >Bienvenido a DevLink</h1>
                <button onClick={() => setCurrentPage('clima')} style={botonEstilo}>Pagina del Clima</button>
                <div style={creditosEstilo}>
                    <p>Integrantes del equipo:</p>
                    <p>Ethan Barea</p>
                    <p>Gabriel Garcia</p>
                    <p>Octavio Cruz</p>
                </div>
            </div>
        </div>
    );
}