# MANUAL DE USUARIO - OPTIRUTA+ 🚚📍

## Universidad Minuto de Dios
### Materia: Diseño de Algoritmos
### Docente: Esteban Hernesto

---

# Integrantes

- Dilan Fernando Gutierrez
- Luis Manuel Osorio Saenz

---

# Fecha

26/05/2026

---


# 1. Requisitos del Sistema

## Software requerido

- Node.js
- MySQL
- npm
- Navegador web moderno

---

## Librerías principales

### Backend

- Express
- mysql2
- axios
- dotenv
- cors

### Frontend

- React
- Vite
- Leaflet
- React-Leaflet

---

# 2. Instalación del Sistema

---

## 2.1 Clonar el repositorio

```bash
git clone https://github.com/TU_REPOSITORIO/OPTIRUTA.git
```

---


## 2.2. Instalar dependencias Backend

```bash
1. cd BACKEND
2. npm init -y
3. npm install express dotenv
4. npm install -D nodemon

```

---

## 2.3. Instalar dependencias Frontend

```bash
1. npm create vite@latest mi-frontend
    ✔ Seleciona como framework: › React
    ✔ Selecciona la variante: › JavaScript

2. cd mi-frontend
3. npm install
4. npm install axios
```

---

# 3. Configuración Backend

Crear archivo `.env` dentro de `BACKEND/`

```env
PORT="establecer puerto de la BD"

DB_HOST="localhost"
DB_USER="tu usuario"
DB_PASSWORD="tu contraseña"
DB_NAME="Nombre de la BD"
```

---

# 3.1 Base de Datos

Importar el archivo:

```text
BACKEND/optiruta.sql --> ejemplo
```

en MySQL.

---
# 4. Inicializadores 
# 4.1 Ejecutar Backend

```bash
cd BACKEND
npm run dev
```

Servidor backend:

```text
http://localhost:3000
```

---

# 4.2 Ejecutar Frontend

```bash
cd mi-frontend
npm run dev
```

Aplicación frontend:

```text
http://localhost:5173 --> puerto predeterminado
```

---

# 5. Interfaz Principal

La interfaz principal del sistema contiene:

- mapa interactivo,
- panel lateral,
- formularios,
- estadísticas,
- resumen por vehículo.

---

# 6. Registro de Entregas

---

## Paso 1

Dirigirse al formulario:

```text
FormularioPaquete, para registrar un nuevo paquete
```

---

## Paso 2

Ingresar:

- cliente,
- dirección,
- barrio,
- peso,
- volumen,
- tipo de paquete.

---

## Paso 3

Presionar:

```text
Guardar Entrega
```

---

## Resultado

El sistema:

- almacena la entrega,
- geocodifica la dirección,
- obtiene coordenadas,
- actualiza la base de datos.

---

# 7. Registro de Vehículos

---

## Paso 1

dirigirse al formulario para un nuevo vehiculo:

```text
FormularioVehiculo
```

---

## Paso 2

Ingresar:

- tipo de vehículo,
- placa,
- peso máximo,
- volumen máximo.

---

## Paso 3

Presionar:

```text
Registrar Vehículo
```

---

## Resultado

El vehículo queda disponible para asignación logística.

---

# 8. Optimización de Rutas

---

## Paso 1

Presionar el botón:

```text
Optimizar Rutas
```

---

## Paso 2

El sistema ejecuta:

1. Asignación de paquetes.
2. Matriz de distancias.
3. Kruskal.
4. DFS.
5. Backtracking.
6. OSRM.

---

## Resultado

El sistema:

- calcula rutas,
- genera métricas,
- renderiza recorridos,
- actualiza estadísticas.

---

# 9. Visualización del Mapa

El mapa interactivo utiliza:

- Leaflet,
- OpenStreetMap,
- OSRM.

---

## Elementos visuales

| Elemento | Función |
|---|---|
| Marcadores | Entregas |
| Líneas | Rutas |
| Colores | Vehículos |
| Popup | Información logística |

---

# 10. Estadísticas del Sistema

El panel estadístico muestra:

- total de paquetes,
- peso usado,
- volumen usado,
- distancia recorrida,
- tiempo estimado,
- algoritmo utilizado,
- nodos explorados,
- podas realizadas.

---

# 11. Interpretación de Métricas

---

## Uso de Peso

Indica el porcentaje de capacidad utilizada.

Ejemplo:

```text
99%
```

significa que el vehículo está casi lleno.

---

## Uso de Volumen

Muestra cuánto espacio físico está siendo utilizado.

---

## Distancia

Representa la distancia total estimada de la ruta.

---

## Nodos Explorados

Cantidad de estados evaluados por Backtracking.

---

## Podas

Cantidad de ramas descartadas durante la exploración.

---

# 12. Flujo General del Sistema

```text
Usuario
   ↓
Frontend React
   ↓
Formulario
   ↓
Axios
   ↓
Backend Express
   ↓
Algoritmos
   ↓
OSRM
   ↓
Respuesta JSON
   ↓
Mapa Leaflet
```

---

# 13. Algoritmos Utilizados

| Algoritmo | Función |
|---|---|
| Mochila / Best Fit | Asignación de paquetes |
| Kruskal | MST inicial |
| DFS | Recorrido base |
| Backtracking | Mejora de rutas |
| OSRM | Distancias reales |

---

# 14. Ejemplo de Funcionamiento

---

## Datos de prueba

```json
{
  "totalEntregas": 100
}
```

---

## Resultado

- asignación automática,
- cálculo de rutas,
- visualización geográfica,
- métricas logísticas.

---

# 15. Posibles Errores

| Error | Causa |
|---|---|
| Error MySQL | Base de datos apagada |
| Error CORS | Backend no iniciado |
| Dirección no encontrada | Error geográfico |
| Error OSRM | Sin conexión |

---

# 15. Recomendaciones

- Verificar conexión a internet.
- Mantener MySQL activo.
- Validar direcciones correctamente.
- No usar demasiados nodos para Backtracking.
- Revisar puertos configurados.

---

# 16. Limitaciones

- Backtracking tiene complejidad factorial.
- Dependencia de APIs externas.
- La heurística Best Fit no garantiza óptimo global.
- Geocodificación dependiente de OpenStreetMap.

---
