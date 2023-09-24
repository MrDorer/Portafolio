import React, { useEffect, useState } from "react";
import nube from "../assets/nube2.jpg";

import nube2 from "../assets/nube.jpeg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/im4.jpg";


const estiloSelect = {
  padding: "10px",
  fontSize: "16px",
  width: "300px",
  borderRadius: "8px",
  backgroundColor: "#FFFFF",
  background: `url(${nube2})`,
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Añadir sombra
};

const estiloCityInfo = {
  marginBottom: "10px",
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "8px",
  background: `url(${nube2})`,
  backgroundSize: "cover",
  maxWidth: "300px",
  margin: "0 auto",
  color: "#000",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Añadir sombra

};

const estiloContainer = {
  textAlign: "center",
  padding: "20px",
  maxWidth: "calc(100% - 250px)", // Adjust the width to leave space for the sidebar
};

const estiloTitle = {
  fontSize: "48px",
  color: "#00000",
};

const estiloBody = {
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

const estiloColumns = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  justifyContent: "center", /* Add this line to center the grid horizontally */
  alignItems: "center", /* Add this line to center the grid vertically */
};

const estiloColumn = {
  width: "100%",
  textAlign: "center", /* Center the content within each column */
};

const estiloSidebar = {
  background: "#333",
  color: "white",
  width: "200px",
  padding: "20px",
  height: "100vh",
  position: "fixed",
};

function DashboardStats() {
  const url = "https://api.datos.gob.mx/v1/condiciones-atmosfericas";
  const estadosMx = [
    { id: 1, name: "Aguascalientes" },
    { id: 2, name: "Baja California" },
    { id: 3, name: "Baja California Sur" },
    { id: 4, name: "Campeche" },
    { id: 5, name: "Chiapas" },
    { id: 6, name: "Chihuahua" },
    { id: 7, name: "Ciudad de Mexico" },
    { id: 8, name: "Coahuila" },
    { id: 9, name: "Colima" },
    { id: 10, name: "Durango" },
    { id: 11, name: "Guanajuato" },
    { id: 12, name: "Guerrero" },
    { id: 13, name: "Hidalgo" },
    { id: 14, name: "Jalisco" },
    { id: 15, name: "Mexico" },
    { id: 16, name: "Michoacán" },
    { id: 17, name: "Morelos" },
    { id: 18, name: "Nayarit" },
    { id: 19, name: "Nuevo León" },
    { id: 20, name: "Oaxaca" },
    { id: 21, name: "Puebla" },
    { id: 22, name: "Queretaro" },
    { id: 23, name: "Quintana Roo" },
    { id: 24, name: "San Luis Potosí" },
    { id: 25, name: "Sinaloa" },
    { id: 26, name: "Sonora" },
    { id: 27, name: "Tabasco" },
    { id: 28, name: "Tamaulipas" },
    { id: 29, name: "Tlaxcala" },
    { id: 30, name: "Veracruz" },
    { id: 31, name: "Yucatan" },
    { id: 32, name: "Zacatecas" },
  ];

  const [datos, setDatos] = useState([]);
  const [estadoActual, setEstadoActual] = useState("Quintana Roo");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const consultarDatos = () => {
    setLoading(true);
    setError(null);

    fetch(`${url}?state=${estadoActual}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("La respuesta de la red no fue válida");
        }
        return res.json();
      })
      .then((condicionAtm) => {
        setDatos(condicionAtm.results);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error al obtener datos. Por favor, inténtalo de nuevo más tarde.");
        setLoading(false);
        console.error("Error al obtener datos:", error);
      });
  };

  useEffect(() => {
    consultarDatos();
  }, [estadoActual]);

  useEffect(() => {
    const datosFiltrados = datos.filter(
      (ciudad) => ciudad.state === estadoActual
    );
    setEstadoSeleccionado(datosFiltrados);
  }, [estadoActual, datos]);

  return (
    <div style={estiloBody}>
      <div style={estiloContainer}>
        <h1 style={estiloTitle}>Estado del Tiempo</h1>
        <div style={{ marginBottom: "20px" }}>
          <select
            style={estiloSelect}
            onChange={(e) => setEstadoActual(e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            {estadosMx.map((opcion) => (
              <option key={opcion.id} value={opcion.name}>
                {opcion.name}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <p>Cargando datos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div style={estiloColumns}>
            {estadoSeleccionado.map((ciudad, index) => (
              <div key={index} style={estiloColumn}>
                <div style={estiloCityInfo}>
                  <p>
                    {ciudad.name} - <i>{ciudad.skydescriptionlong}</i>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardStats;
