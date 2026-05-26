import TarjetaVehiculo from "./TarjetaVehiculo";

export default function Sidebar({
  cargando = false,
  error = "",
  resumen = null,
  rutas = [],
  rutasFiltradas = [],
  vehiculoActivo,
  setVehiculoActivo,
}) {
  const obtenerResumenVehiculo = (idVehiculo) => {
    return resumen?.asignacion?.find((item) => String(item.id) === String(idVehiculo));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>OptiRuta</h1>
        <p>Rutas optimizadas por vehiculo</p>
      </div>

      {cargando && <p className="estado">Cargando rutas...</p>}
      {error && <p className="estado error">{error}</p>}

      {resumen && !error && (
        <div className="resumen-general">
          <strong>{resumen.totalEntregas}</strong>
          <span>entregas procesadas</span>
        </div>
      )}

      <div className="filtros">
        <button
          className={vehiculoActivo === null ? "activo" : ""}
          onClick={() => setVehiculoActivo(null)}
          type="button"
        >
          Mostrar todos
        </button>

        {rutas.map((ruta) => (
          <button
            key={ruta.vehiculo?.id}
            className={vehiculoActivo === ruta.vehiculo?.id ? "activo" : ""}
            onClick={() => setVehiculoActivo(ruta.vehiculo?.id)}
            type="button"
          >
            {ruta.vehiculo?.tipo || "Vehiculo"} #{ruta.vehiculo?.id}
          </button>
        ))}
      </div>

      <div className="resumen">
        {rutasFiltradas.length === 0 && !cargando && !error && (
          <p className="estado">No hay rutas para mostrar.</p>
        )}

        {rutasFiltradas.map((ruta) => (
          <TarjetaVehiculo
            key={ruta.vehiculo?.id}
            ruta={ruta}
            resumenVehiculo={obtenerResumenVehiculo(ruta.vehiculo?.id)}
          />
        ))}
      </div>
    </aside>
  );
}