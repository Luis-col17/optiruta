# ARQUITECTURA DEL SISTEMA - OPTIRUTA+

## Universidad Minuto de Dios
### Materia: Diseño de Algoritmos
### Docente: Esteban Hernesto

---

## Integrantes

- Dilan Fernando Gutierrez
- Luis Manuel Osorio Saenz

---

## Fecha

26/05/2026

---

# 1. Arquitectura General del Sistema

La arquitectura general de OPTIRUTA+ está compuesta por cinco capas principales:

```text
┌────────────────────────────┐
│        FRONTEND            │
│ React + Vite + Leaflet     │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│         SERVICIOS          │
│ Axios / HTTP Requests      │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│          BACKEND           │
│ Node.js + Express          │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│   ALGORITMOS Y SERVICIOS   │
│ Mochila / Kruskal / BT     │
│ OSRM / Geocoding           │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│      BASE DE DATOS         │
│          MySQL             │
└────────────────────────────┘
```

---

# 2. Arquitectura por Capas

El sistema utiliza una arquitectura desacoplada por capas.

| Capa | Función |
|---|---|
| Presentación | Interfaz gráfica React |
| Servicios | Comunicación HTTP |
| API REST | Exposición de endpoints |
| Negocio | Algoritmos de optimización |
| Persistencia | Base de datos MySQL |
| Servicios externos | OSRM y OpenStreetMap |

---

# 3. Arquitectura Frontend

El frontend fue desarrollado utilizando React y Vite.

Su función principal es:

- interacción con usuarios,
- visualización geográfica,
- formularios,
- estadísticas,
- renderizado de rutas.

---

## 3.1 Estructura Frontend

```text
mi-frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── api/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── vite.config.js
└── package.json
```

---

## 3.2 Componentes Principales

| Componente | Función |
|---|---|
| Dashboard.jsx | Vista principal |
| MapaRutas.jsx | Visualización GIS |
| Sidebar.jsx | Panel lateral |
| TarjetaVehiculo.jsx | Resumen por vehículo |
| FormularioPaquete.jsx | Registro de entregas |
| FormularioVehiculo.jsx | Registro de vehículos |
| EstadisticasPanel.jsx | Métricas del sistema |

---

## 3.3 Flujo Frontend

```text
Usuario
   ↓
Formulario React
   ↓
Axios Service
   ↓
API Backend
   ↓
Respuesta JSON
   ↓
Renderizado Leaflet
```

---

# 4. Arquitectura Backend

El backend fue desarrollado con Node.js y Express.

Implementa:

- API REST,
- controladores,
- lógica de negocio,
- algoritmos,
- integración geográfica.

---

## 4.1 Estructura Backend

```text
BACKEND/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── algoritmos/
│   ├── services/
│   ├── utils/
│   ├── config/
│   └── app.js
│
├── scripts/
├── index.js
└── optiruta.sql
```

---

## 4.2 Controladores

Los controladores gestionan las solicitudes HTTP y coordinan la lógica del sistema.

| Controlador | Función |
|---|---|
| entrega.controller.js | Gestión de entregas |
| vehiculos.controller.js | Gestión de vehículos |
| rutas.controller.js | Optimización logística |

---

## 4.3 Rutas API

| Endpoint | Función |
|---|---|
| /api/entregas | CRUD entregas |
| /api/vehiculos | CRUD vehículos |
| /api/rutas/optimizar | Optimización de rutas |

---

# 5. Arquitectura Algorítmica

La arquitectura algorítmica es el núcleo principal del sistema.

Se implementó una estrategia híbrida combinando:

- heurísticas,
- grafos,
- exploración de estados,
- poda.

---

## 5.1 Pipeline Algorítmico

```text
Entregas
   ↓
Vehículos
   ↓
Mochila / Best Fit
   ↓
Matriz de Distancias
   ↓
Kruskal (MST)
   ↓
DFS sobre MST
   ↓
Backtracking con poda
   ↓
OSRM
   ↓
Geometría final
```

---

# 6. Heurística de Mochila

El módulo `mochila.js` asigna paquetes respetando:

- peso máximo,
- volumen máximo,
- disponibilidad del vehículo.

---

## Función Arquitectónica

Este módulo:

- divide el problema global,
- genera subconjuntos de entregas,
- balancea carga logística.

---

# 7. Arquitectura de Grafos

El sistema utiliza estructuras de grafos para representar:

- distancias,
- conexiones,
- recorridos.

---

## 7.1 Kruskal

`kruskal.js` construye un MST usando:

- lista de aristas,
- Union-Find,
- ordenamiento por peso.

---

## 7.2 DFS sobre MST

Después del MST se aplica DFS para generar una ruta inicial.

Esto permite:

- recorrer nodos conectados,
- generar una secuencia base,
- reducir complejidad inicial.

---

# 8. Arquitectura de Backtracking

`backtracking.js` implementa exploración de estados con poda.

---

## Componentes principales

| Componente | Función |
|---|---|
| Estados | Permutaciones de rutas |
| Poda distancia | Evita rutas peores |
| Poda capacidad | Control de peso |
| Poda volumen | Control de volumen |
| Mejor solución | Optimización final |

---

## Restricción de Escalabilidad

```js
const MAX_BT = 10;
```

El sistema limita Backtracking para evitar explosión factorial.

---

# 9. Arquitectura Geográfica

OPTIRUTA+ integra servicios GIS para trabajar con coordenadas reales.

---

## 9.1 Geocoding

`geocoding.service.js` utiliza OpenStreetMap y Nominatim para:

- convertir direcciones,
- obtener coordenadas,
- validar ubicaciones.

---

## 9.2 OSRM

`osrm.js` consulta:

- matrices de distancia,
- geometrías,
- tiempos estimados,
- rutas reales.

---

## 9.3 Leaflet

Leaflet permite:

- renderizar mapas,
- mostrar rutas,
- dibujar geometrías,
- visualizar entregas.

---

# 10. Arquitectura de Datos

La base de datos utiliza MySQL.

---

## 10.1 Tabla Entregas

Almacena:

- cliente,
- dirección,
- barrio,
- peso,
- volumen,
- coordenadas.

---

## 10.2 Tabla Vehículos

Almacena:

- tipo,
- placa,
- capacidad,
- disponibilidad.

---

# 11. Flujo Completo del Sistema

```text
Usuario
   ↓
Frontend React
   ↓
Axios
   ↓
Express API
   ↓
Controllers
   ↓
MySQL
   ↓
Algoritmos
   ↓
OSRM
   ↓
JSON Resultado
   ↓
Leaflet
   ↓
Mapa Final
```

---

# 12. Modularidad del Sistema

El sistema fue diseñado utilizando separación modular.

---

## Beneficios

- reutilización,
- mantenimiento sencillo,
- desacoplamiento,
- escalabilidad,
- pruebas independientes.

---

## Ejemplo Modular

| Módulo | Independencia |
|---|---|
| mochila.js | Puede reemplazarse |
| kruskal.js | Independiente |
| backtracking.js | Independiente |
| osrm.js | Servicio desacoplado |

---

# 13. Escalabilidad Arquitectónica

La arquitectura permite:

- agregar nuevos algoritmos,
- incorporar nuevos vehículos,
- extender servicios GIS,
- integrar caché,
- distribuir lógica.

---

## Posibles mejoras futuras

- microservicios,
- balanceo de carga,
- Redis cache,
- colas de procesamiento,
- optimización distribuida.

---

# 14. Seguridad y Robustez

El sistema implementa:

- validación de datos,
- control de restricciones,
- separación backend/frontend,
- manejo de errores HTTP.

---

# 15. Ventajas Arquitectónicas

OPTIRUTA+ presenta múltiples ventajas arquitectónicas:

- arquitectura modular,
- separación de responsabilidades,
- integración híbrida de algoritmos,
- desacoplamiento frontend/backend,
- visualización GIS,
- facilidad de mantenimiento.

---