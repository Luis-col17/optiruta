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
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "20px 16px",
          marginBottom: "24px"
        }}>
          <svg 
            width="50" 
            height="50" 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" rx="8" fill="#4f46e5" />
            
            <g transform="translate(8, 10)">
              <rect x="0" y="6" width="6" height="8" fill="white" />
              <rect x="6" y="4" width="10" height="10" fill="white" opacity="0.9" />
              <circle cx="3" cy="15" r="1.5" fill="white" />
              <circle cx="14" cy="15" r="1.5" fill="white" />
            </g>
            
            <path d="M 10 28 Q 15 24 20 28" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          
          <div>
            <h1 style={{
              margin: "0 0 4px 0",
              color: "#1f2937",
              fontSize: "24px",
              fontWeight: "700",
              letterSpacing: "-0.5px"
            }}>
              OptiRuta
            </h1>
            <p style={{
              margin: "0",
              color: "#6b7280",
              fontSize: "13px",
              fontWeight: "500"
            }}>
              Optimización de Rutas
            </p>
          </div>
        </div>
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