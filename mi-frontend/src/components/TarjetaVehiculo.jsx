export default function TarjetaVehiculo({ ruta, resumenVehiculo }) {
  const vehiculo = ruta.vehiculo || {};
  const estadisticas = ruta.estadisticas;

  const pesoUsado = ruta.pesoTotal ?? resumenVehiculo?.pesoUsado ?? 0;
  const pesoMax = resumenVehiculo?.pesoMax;

  const volumenUsado =
    ruta.volumenTotal ?? resumenVehiculo?.volumenUsado ?? 0;

  const volumenMax = resumenVehiculo?.volumenMax;

  return (
    <article className="card">
      <h3>
        {vehiculo.tipo || "Vehiculo"} #{vehiculo.id || "N/A"}
      </h3>

      {vehiculo.placa && <p>Placa: {vehiculo.placa}</p>}

      <p>Paquetes: {ruta.totalPaquetes ?? 0}</p>

      <p>
        Peso: {Number(pesoUsado).toFixed(2)} kg
        {pesoMax ? ` / ${pesoMax} kg` : ""}
      </p>

      <p>
        Volumen: {Number(volumenUsado).toFixed(3)} m³
        {volumenMax ? ` / ${volumenMax} m³` : ""}
      </p>

      {resumenVehiculo?.usoPeso && <p>Uso peso: {resumenVehiculo.usoPeso}</p>}

      {resumenVehiculo?.usoVolumen && (
        <p>Uso volumen: {resumenVehiculo.usoVolumen}</p>
      )}

      <p>Distancia: {ruta.distanciaKm ?? "0.00"} km</p>
      <p>Tiempo: {ruta.duracionMin ?? "Sin calcular"} min</p>

      <hr />

      <h4>Metricas</h4>

      <p>Algoritmo: {ruta.algoritmoUsado || "Sin dato"}</p>

      {estadisticas ? (
        <>
          <p>Nodos explorados: {estadisticas.nodosExplorados}</p>
          <p>Podas distancia: {estadisticas.podasDistancia}</p>
          <p>Podas capacidad: {estadisticas.podasCapacidad}</p>
          <p>Podas volumen: {estadisticas.podasVolumen}</p>
          <p>
            Mejoro Kruskal: {estadisticas.mejoroKruskal ? "Si" : "No"}
          </p>
        </>
      ) : (
        <p>Metricas de backtracking no aplican para esta ruta.</p>
      )}
    </article>
  );
}