import { useEffect, useMemo, useState } from "react";
import MapaRutas from "../components/MapaRutas";
import Sidebar from "../components/Sidebar";
import FormularioPaquete from "../components/FormularioPaquete";
import EstadisticasPanel from "../components/EstadisticasPanel";
import { obtenerRutasOptimizadas } from "../services/rutas.service";
import FormularioVehiculo from "../components/FormularioVehiculo";


export default function Dashboard() {
  const [rutas, setRutas] = useState([]);
  const [vehiculoActivo, setVehiculoActivo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [resumen, setResumen] = useState(null);

  async function recargarRutas() {
    const data = await obtenerRutasOptimizadas();

    setRutas(Array.isArray(data.rutas) ? data.rutas : []);
    setResumen(data);
  }

  useEffect(() => {
    async function cargar() {
      try {
        setCargando(true);
        setError("");
        await recargarRutas();
      } catch (err) {
        setError(
          err.response?.data?.detalle ||
            err.response?.data?.error ||
            "No fue posible cargar las rutas optimizadas."
        );
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, []);

  const rutasFiltradas = useMemo(() => {
    if (vehiculoActivo === null) return rutas;
    return rutas.filter((ruta) => ruta.vehiculo?.id === vehiculoActivo);
  }, [rutas, vehiculoActivo]);

  return (
    <main className="contenedor">
      <Sidebar
        cargando={cargando}
        error={error}
        resumen={resumen}
        rutas={rutas}
        rutasFiltradas={rutasFiltradas}
        vehiculoActivo={vehiculoActivo}
        setVehiculoActivo={setVehiculoActivo}
      />

      <section className="contenido-principal">
        <div className="mapa">
          <MapaRutas rutas={rutasFiltradas} />
        </div>

        <FormularioPaquete onPaqueteCreado={recargarRutas} />

        <FormularioVehiculo onVehiculoCreado={recargarRutas} />

        <EstadisticasPanel rutas={rutas} resumen={resumen} />
      </section>
    </main>
  );
}