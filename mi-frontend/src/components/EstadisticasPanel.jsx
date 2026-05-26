export default function EstadisticasPanel({ rutas = [], resumen = null }) {
  const asignacion = resumen?.asignacion || [];

  const buscarAsignacion = (idVehiculo) => {
    return asignacion.find((item) => String(item.id) === String(idVehiculo));
  };

  return (
    <section className="estadisticas-panel">
      <h2>Estadisticas por vehiculo</h2>

      <div className="tabla-estadisticas">
        <table>
          <thead>
            <tr>
              <th>Vehiculo</th>
              <th>Paquetes</th>
              <th>Peso</th>
              <th>Volumen</th>
              <th>Distancia</th>
              <th>Tiempo</th>
              <th>Algoritmo</th>
              <th>Nodos</th>
              <th>Podas</th>
            </tr>
          </thead>

          <tbody>
            {rutas.map((ruta) => {
              const info = buscarAsignacion(ruta.vehiculo?.id);
              const estadisticas = ruta.estadisticas;

              const pesoUsado = ruta.pesoTotal ?? info?.pesoUsado ?? 0;
              const pesoMax = info?.pesoMax;

              const volumenUsado = ruta.volumenTotal ?? info?.volumenUsado ?? 0;
              const volumenMax = info?.volumenMax;

              const totalPodas =
                Number(estadisticas?.podasDistancia || 0) +
                Number(estadisticas?.podasCapacidad || 0) +
                Number(estadisticas?.podasVolumen || 0);

              return (
                <tr key={ruta.vehiculo?.id}>
                  <td>
                    {ruta.vehiculo?.tipo} #{ruta.vehiculo?.id}
                  </td>

                  <td>{ruta.totalPaquetes ?? 0}</td>

                  <td>
                    {Number(pesoUsado).toFixed(2)}
                    {pesoMax ? ` / ${pesoMax}` : ""} kg
                  </td>

                  <td>
                    {Number(volumenUsado).toFixed(3)}
                    {volumenMax ? ` / ${volumenMax}` : ""} m3
                  </td>

                  <td>{ruta.distanciaKm ?? "0.00"} km</td>

                  <td>{ruta.duracionMin ?? "N/A"} min</td>

                  <td>{ruta.algoritmoUsado || "N/A"}</td>

                  <td>{estadisticas?.nodosExplorados ?? "No aplica"}</td>

                  <td>{estadisticas ? totalPodas : "No aplica"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}