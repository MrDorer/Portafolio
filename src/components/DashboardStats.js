import React, { useEffect, useState } from "react";
import nube from "../assets/nube2.jpg"; // Importa la imagen de fondo de la ciudad
import nube2 from "../assets/nube.jpeg" // Importa la imagen de fondo de la página
import img3 from "../assets/img3.jpg"
import img4 from "../assets/im4.jpg"
const estiloSelect = {
  padding: "10px",
  fontSize: "16px",
  width: "300px",
  borderRadius: "8px",
  marginBottom: "20px",
  backgroundColor: "#FFFFF",
  background: `url(${nube2})`, // Usa la imagen de fondo de la ciudad importada
  backgroundSize: "cover",
  textAlign: "center",
};

const estiloCityInfo = {
  marginBottom: "10px",
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "8px",
  background: `url(${nube2})`, // Usa la imagen de fondo de la ciudad importada
  backgroundSize: "cover",
  maxWidth: "300px",
  margin: "0 auto",
  color: "#000", // Cambia el color del texto a negro (#000)
};

const estiloContainer = {
  
  textAlign: "center",
  padding: "20px",
};

const estiloTitle = {
  fontSize: "48px",
  color: "#00000",
  
};
const estiloBody = {
  background: `url(${nube2})`, // Usa la imagen de fondo de la página importada
  backgroundSize: "cover",
  backgroundAttachment: "fixed", // Fondo estático
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#000", // Cambia el color del texto a negro (#000)
};

const estiloColumns = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
};

const estiloColumn = {
  width: "100%",
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
