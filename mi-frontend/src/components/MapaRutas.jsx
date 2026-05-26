import { Fragment } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const colores = ["#2563eb", "#dc2626", "#16a34a", "#ea580c", "#7c3aed", "#111827"];

export default function MapaRutas({ rutas = [] }) {
  return (
    <MapContainer
      center={[4.4389, -75.2322]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {rutas.map((rutaData, index) => {
        const color = colores[index % colores.length];

        const polyline = Array.isArray(rutaData.geometria)
          ? rutaData.geometria
              .map((coord) => [Number(coord[1]), Number(coord[0])])
              .filter(([lat, lng]) => !Number.isNaN(lat) && !Number.isNaN(lng))
          : [];

        return (
          <Fragment key={rutaData.vehiculo?.id || index}>
            {polyline.length > 0 && (
              <Polyline positions={polyline} pathOptions={{ color, weight: 5 }} />
            )}

            {rutaData.ruta?.map((nodo, i) => {
              const lat = Number(nodo.lat);
              const lng = Number(nodo.lng);

              if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

              return (
                <Marker key={`${rutaData.vehiculo?.id || index}-${i}`} position={[lat, lng]}>
                  <Popup>
                    <div>
                      <h3>Entrega #{i + 1}</h3>
                      <p><b>Cliente:</b> {nodo.cliente || "Sin nombre"}</p>
                      <p><b>Direccion:</b> {nodo.direccion || "Sin direccion"}</p>
                      <p><b>Barrio:</b> {nodo.barrio || "Sin barrio"}</p>
                      <p><b>Peso:</b> {nodo.peso_kg || 0} kg</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </Fragment>
        );
      })}
    </MapContainer>
  );
}