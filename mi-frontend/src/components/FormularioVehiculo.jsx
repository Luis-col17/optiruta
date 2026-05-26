import { useState } from "react";
import { crearVehiculo } from "../services/vehiculos.service";

const estadoInicial = {
  tipo: "Moto",
  placa: "",
  capacidad_kg: "",
  capacidad_volumen_m3: "",
};

const capacidadesPorTipo = {
  Moto: {
    peso: 10,
    volumen: 0.1,
  },
  Carro: {
    peso: 50,
    volumen: 1.5,
  },
  Camion: {
    peso: 200,
    volumen: 10,
  },
};

export default function FormularioVehiculo({ onVehiculoCreado }) {
  const [formulario, setFormulario] = useState({
    ...estadoInicial,
    capacidad_kg: capacidadesPorTipo.Moto.peso,
    capacidad_volumen_m3: capacidadesPorTipo.Moto.volumen,
  });

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;

    if (name === "tipo") {
      setFormulario((actual) => ({
        ...actual,
        tipo: value,
        capacidad_kg: capacidadesPorTipo[value]?.peso || "",
        capacidad_volumen_m3: capacidadesPorTipo[value]?.volumen || "",
      }));

      return;
    }

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  };

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    try {
      setCargando(true);
      setMensaje("");
      setError("");

      await crearVehiculo({
        ...formulario,
        capacidad_kg: Number(formulario.capacidad_kg),
        capacidad_volumen_m3: Number(formulario.capacidad_volumen_m3),
        disponible: 1,
      });

      setFormulario({
        ...estadoInicial,
        capacidad_kg: capacidadesPorTipo.Moto.peso,
        capacidad_volumen_m3: capacidadesPorTipo.Moto.volumen,
      });

      setMensaje("Vehiculo agregado correctamente.");

      if (onVehiculoCreado) {
        await onVehiculoCreado();
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "No se pudo agregar el vehiculo."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="formulario-panel">
      <h2>Agregar vehiculo</h2>

      <form onSubmit={enviarFormulario} className="formulario-grid">
        <label>
          Tipo
          <select
            name="tipo"
            value={formulario.tipo}
            onChange={cambiarCampo}
            required
          >
            <option value="Moto">Moto</option>
            <option value="Carro">Carro</option>
            <option value="Camion">Camion</option>
          </select>
        </label>

        <label>
          Placa
          <input
            name="placa"
            value={formulario.placa}
            onChange={cambiarCampo}
            placeholder="ABC-123"
            required
          />
        </label>

        <label>
          Capacidad kg
          <input
            name="capacidad_kg"
            type="number"
            min="0.1"
            step="0.1"
            value={formulario.capacidad_kg}
            onChange={cambiarCampo}
            required
          />
        </label>

        <label>
          Volumen m3
          <input
            name="capacidad_volumen_m3"
            type="number"
            min="0.001"
            step="0.001"
            value={formulario.capacidad_volumen_m3}
            onChange={cambiarCampo}
            required
          />
        </label>

        <button type="submit" disabled={cargando}>
          {cargando ? "Agregando..." : "Agregar vehiculo"}
        </button>
      </form>

      {mensaje && <p className="estado exito">{mensaje}</p>}
      {error && <p className="estado error">{error}</p>}
    </section>
  );
}