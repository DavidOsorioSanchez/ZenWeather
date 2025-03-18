export  function gradosACoordenadas(grados: number) {
    const radianes = grados * (Math.PI / 180);
    const x = Math.sin(radianes);
    const y = -Math.cos(radianes); // Invertir el eje y para que el norte esté arriba
    return { x, y };
}