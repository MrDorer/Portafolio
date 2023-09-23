const consultarDatos = () => {
    setLoading(true);
    setError(null);

    fetch(`${url}?state=${estadoActual}`)
        .then((res) => {
            if (!res) {
                throw new Error("La respuesta de la red no fue válida");
            }
            return res.json();
        })
        .then((condicionAtm) => {
            setDatos(condicionAtm.results);
            setClimaEstadoActual(condicionAtm.results[0]); 
            setLoading(false);
        })
        .catch((error) => {
            setError("Error al obtener datos. Por favor, inténtalo de nuevo más tarde.");
            setLoading(false);
            console.error("Error al obtener datos:", error);
        });
};

