# OPTIRUTA+ 🚚📍

Sistema web de optimización logística para planificación de rutas de entrega utilizando algoritmos híbridos, visualización geográfica y restricciones de capacidad.

---

# 👨‍💻 Integrantes

- Dilan Fernando Gutierrez
- Luis Manuel Osorio Saenz

---



# 📖 Descripción

OPTIRUTA+ es una plataforma desarrollada para optimizar rutas de entrega de última milla mediante el uso de diferentes paradigmas de diseño de algoritmos.

El sistema permite:

- Registrar paquetes y entregas.
- Registrar vehículos.
- Geocodificar direcciones automáticamente.
- Asignar paquetes según peso y volumen.
- Calcular rutas optimizadas.
- Visualizar recorridos en mapas interactivos.
- Mostrar estadísticas y métricas logísticas.

---

# 🎯 Objetivo del Proyecto

Diseñar e implementar un sistema capaz de optimizar rutas de distribución logística respetando restricciones de:

- peso,
- volumen,
- capacidad vehicular,
- ubicación geográfica,
- distancia recorrida.

---

# 🧠 Algoritmos Implementados

El proyecto integra múltiples algoritmos y estrategias híbridas:

| Algoritmo | Función |
|---|---|
| Mochila / Best Fit | Asignación de paquetes |
| Kruskal | Generación de MST |
| DFS | Recorrido del MST |
| Backtracking con poda | Mejora de rutas |
| OSRM | Distancias y geometrías reales |

---

# 🏗️ Arquitectura General

```text
Frontend React
      ↓
Axios Services
      ↓
Express API
      ↓
Controllers
      ↓
Algoritmos y Servicios
      ↓
MySQL + OSRM + OpenStreetMap
```

---

# ⚙️ Tecnologías Utilizadas

## Backend

- Node.js
- Express
- MySQL
- mysql2
- Axios
- dotenv
- cors

---

## Frontend

- React
- Vite
- Axios
- Leaflet
- React-Leaflet

---

## Servicios Externos

| Servicio | Función |
|---|---|
| OpenStreetMap | Geocodificación |
| Nominatim | Conversión dirección → coordenadas |
| OSRM | Distancias y rutas reales |

---

# 🚀 Instalación del Proyecto

## 1. Clonar repositorio

```bash
git clone https://github.com/TU_REPOSITORIO/OPTIRUTA.git
```

---

## 2. Instalar dependencias Backend

```bash
1. cd BACKEND
2. npm init -y
3. npm install express dotenv
4. npm install -D nodemon

```

---

## 3. Instalar dependencias Frontend

```bash
1. npm create vite@latest mi-frontend
    ✔ Seleciona como framework: › React
    ✔ Selecciona la variante: › JavaScript

2. cd mi-frontend
3. npm install
4. npm install axios
```

---

# 🛠️ Configuración Backend

Crear archivo `.env` dentro de `BACKEND/`

```env
PORT="establecer puerto de la BD"

DB_HOST="localhost"
DB_USER="tu usuario"
DB_PASSWORD="tu contraseña"
DB_NAME="Nombre de la BD"
```

---

# 🗄️ Base de Datos

Importar el archivo:

```text
BACKEND/optiruta.sql --> ejemplo
```

en MySQL.

---

# ▶️ Ejecutar Backend

```bash
cd BACKEND
npm run dev
```

Servidor backend:

```text
http://localhost:3000
```

---

# ▶️ Ejecutar Frontend

```bash
cd mi-frontend
npm run dev
```

Aplicación frontend:

```text
http://localhost:5173 --> puerto predeterminado
```

---

# 📡 Endpoints Principales

| Endpoint | Método | Función |
|---|---|---|
| /api/entregas | GET | Listar entregas |
| /api/entregas | POST | Crear entrega |
| /api/vehiculos | GET | Listar vehículos |
| /api/vehiculos | POST | Crear vehículo |
| /api/rutas/optimizar | GET | Optimizar rutas | --> importante

---

# 🔄 Flujo del Sistema

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
DFS
   ↓
Backtracking
   ↓
OSRM
   ↓
Mapa Final
```

---

# 📊 Métricas del Sistema

El sistema genera:

- Distancia total.
- Tiempo estimado.
- Peso utilizado.
- Volumen utilizado.
- Porcentaje de ocupación.
- Nodos explorados.
- Podas realizadas.
- Mejoras sobre Kruskal.

---

# 📈 Resultados Experimentales

Pruebas realizadas con:

```json
"totalEntregas": 100
```

Resultados obtenidos:

| Vehículo | Uso Peso |
|---|---|
| MOT-101 | 99% |
| CAR-202 | 99.8% |
| CAM-301 | 100% |

Backtracking logró mejorar rutas generadas inicialmente por Kruskal:

```json
"mejoroKruskal": true
```

---

# 🧩 Componentes Principales

## Backend

| Archivo | Función |
|---|---|
| entrega.controller.js | Gestión de entregas |
| vehiculos.controller.js | Gestión de vehículos |
| rutas.controller.js | Optimización logística |
| mochila.js | Asignación de paquetes |
| kruskal.js | Construcción de MST |
| backtracking.js | Optimización exhaustiva |
| osrm.js | Distancias y geometrías |
| geocoding.service.js | Geocodificación |

---

## Frontend

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

# 🗺️ Visualización Geográfica

El sistema utiliza:

- Leaflet
- OpenStreetMap
- OSRM

para renderizar:

- rutas,
- entregas,
- geometrías reales,
- recorridos optimizados.

---

# 📌 Características Principales

✅ Optimización híbrida de rutas  
✅ Geocodificación automática  
✅ Visualización GIS  
✅ Restricciones de peso y volumen  
✅ Métricas logísticas  
✅ Arquitectura modular  
✅ Backend desacoplado  
✅ Integración con APIs externas  

---

# ⚠️ Limitaciones

- Backtracking tiene complejidad factorial.
- Dependencia de APIs externas.
- La heurística de mochila no garantiza óptimo global.
- Geocodificación depende de OpenStreetMap.

---

