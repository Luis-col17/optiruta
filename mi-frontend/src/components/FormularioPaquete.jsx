import { useState } from "react";
import { crearEntrega } from "../services/entregas.service";

const estadoInicial = {
  cliente: "",
  barrio: "",
  direccion: "",
  tipo_paquete: "",
  peso_kg: "",
  volumen_m3: "",
};

export default function FormularioPaquete({ onPaqueteCreado }) {
  const [formulario, setFormulario] = useState(estadoInicial);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;

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

      await crearEntrega({
        ...formulario,
        peso_kg: Number(formulario.peso_kg),
        volumen_m3: Number(formulario.volumen_m3),
      });

      setFormulario(estadoInicial);
      setMensaje("Paquete agregado correctamente.");

      if (onPaqueteCreado) {
        await onPaqueteCreado();
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "No se pudo agregar el paquete."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="formulario-panel">
      <h2>Agregar paquete</h2>

      <form onSubmit={enviarFormulario} className="formulario-grid">
        <label>
          Cliente
          <input
            name="cliente"
            value={formulario.cliente}
            onChange={cambiarCampo}
            required
          />
        </label>

        <label>
          Barrio
          <input
            name="barrio"
            value={formulario.barrio}
            onChange={cambiarCampo}
            required
          />
        </label>

        <label className="campo-doble">
          Direccion
          <input
            name="direccion"
            value={formulario.direccion}
            onChange={cambiarCampo}
            required
          />
        </label>

        <label>
          Tipo de paquete
          <input
            name="tipo_paquete"
            value={formulario.tipo_paquete}
            onChange={cambiarCampo}
            required
          />
        </label>

        <label>
          Peso kg
          <input
            name="peso_kg"
            type="number"
            min="0.1"
            step="0.1"
            value={formulario.peso_kg}
            onChange={cambiarCampo}
            required
          />
        </label>

        <label>
          Volumen m3
          <input
            name="volumen_m3"
            type="number"
            min="0.001"
            step="0.001"
            value={formulario.volumen_m3}
            onChange={cambiarCampo}
            required
          />
        </label>

        <button type="submit" disabled={cargando}>
          {cargando ? "Agregando..." : "Agregar paquete"}
        </button>
      </form>

      {mensaje && <p className="estado exito">{mensaje}</p>}
      {error && <p className="estado error">{error}</p>}
    </section>
  );
}