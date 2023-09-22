import React, { useEffect, useState } from "react";

const estiloSelect = {
  padding: "10px",
  fontSize: "16px",
  width: "300px",
  borderRadius: "8px",
  marginBottom: "20px",
  backgroundColor: "#FFFFF",
  textAlign: "center",
};

const estiloCityInfo = {
  marginBottom: "10px solid", // Margen inferior fijo para separación
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "8px",
  backgroundColor: "#FFFFFF",
  maxWidth: "300px",
  margin: "0 auto",
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
  background: "linear-gradient(to bottom, #C5FBFF, #B369F5)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
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
    { id: 7, name: "Ciudad de México" },
    { id: 8, name: "Coahuila" },
    { id: 9, name: "Colima" },
    { id: 10, name: "Durango" },
    { id: 11, name: "Guanajuato" },
    { id: 12, name: "Guerrero" },
    { id: 13, name: "Hidalgo" },
    { id: 14, name: "Jalisco" },
    { id: 15, name: "México" },
    { id: 16, name: "Michoacán" },
    { id: 17, name: "Morelos" },
    { id: 18, name: "Nayarit" },
    { id: 19, name: "Nuevo León" },
    { id: 20, name: "Oaxaca" },
    { id: 21, name: "Puebla" },
    { id: 22, name: "Querétaro" },
    { id: 23, name: "Quintana Roo" },
    { id: 24, name: "San Luis Potosí" },
    { id: 25, name: "Sinaloa" },
    { id: 26, name: "Sonora" },
    { id: 27, name: "Tabasco" },
    { id: 28, name: "Tamaulipas" },
    { id: 29, name: "Tlaxcala" },
    { id: 30, name: "Veracruz" },
    { id: 31, name: "Yucatán" },
    { id: 32, name: "Zacatecas" },
  ];

  const [datos, setDatos] = useState([]);
  const [estadoActual, setEstadoActual] = useState("Quintana Roo");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState([]);

  const consultarDatos = () => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((condicionAtm) => setDatos(condicionAtm.results))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    consultarDatos();
  }, []);

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
        <div>
          {estadoSeleccionado.map((ciudad, index) => (
            <div key={index} style={estiloCityInfo}>
              <p>
                {ciudad.name} - <i>{ciudad.skydescriptionlong}</i>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;