# INFORME TÉCNICO - OPTIRUTA+

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

# 1. Introducción

La optimización de rutas de entrega es uno de los principales problemas dentro de la logística de última milla. Empresas de transporte y distribución necesitan minimizar tiempos, distancias y costos operativos mientras administran restricciones de capacidad y múltiples puntos de entrega.

OPTIRUTA+ es una aplicación web orientada a la planificación y optimización de rutas logísticas utilizando algoritmos de grafos, heurísticas de asignación y técnicas de exploración de estados. El sistema permite registrar paquetes, gestionar vehículos, calcular rutas optimizadas y visualizar recorridos geográficos sobre mapas interactivos.

El proyecto combina diferentes paradigmas de diseño de algoritmos para resolver un problema logístico real, integrando:

- Programación dinámica y heurísticas de mochila.
- Algoritmos de grafos.
- Backtracking con poda.
- Exploración de estados.
- Optimización geográfica.
- Visualización GIS.

---

# 2. Objetivos

## 2.1 Objetivo General

Diseñar e implementar un sistema web capaz de optimizar rutas de entrega mediante algoritmos híbridos que minimicen recorridos y respeten restricciones logísticas.

---

## 2.2 Objetivos Específicos

- Registrar paquetes y vehículos desde una interfaz web.
- Geocodificar automáticamente direcciones.
- Asignar paquetes según capacidad de peso y volumen.
- Construir rutas base usando Kruskal.
- Mejorar rutas pequeñas mediante Backtracking con poda.
- Visualizar rutas reales sobre mapas interactivos.
- Generar métricas y estadísticas por vehículo.

---

# 3. Descripción General del Sistema

OPTIRUTA+ es una plataforma web compuesta por:

- Backend desarrollado en Node.js y Express.
- Frontend desarrollado en React y Vite.
- Base de datos MySQL.
- Integración con OSRM y OpenStreetMap.

El sistema administra entregas y vehículos para posteriormente calcular rutas optimizadas usando diferentes estrategias algorítmicas.

---

# 4. Arquitectura del Sistema

La arquitectura del sistema se divide en múltiples capas:

```text
Frontend React
      ↓
Axios Services
      ↓
Express API
      ↓
Controllers
      ↓
Algoritmos y Services
      ↓
MySQL + OSRM + OpenStreetMap
```

---

## 4.1 Frontend

El frontend está desarrollado con React y Vite. Sus principales responsabilidades son:

- Registrar entregas.
- Registrar vehículos.
- Visualizar rutas.
- Mostrar métricas.
- Mostrar estadísticas de optimización.

### Componentes principales

| Componente | Función |
|---|---|
| FormularioPaquete.jsx | Registro de entregas |
| FormularioVehiculo.jsx | Registro de vehículos |
| MapaRutas.jsx | Visualización geográfica |
| Sidebar.jsx | Resumen de vehículos |
| EstadisticasPanel.jsx | Métricas y estadísticas |

---

## 4.2 Backend

El backend utiliza Node.js y Express para exponer endpoints REST y ejecutar los algoritmos de optimización.

### Módulos principales

| Módulo | Función |
|---|---|
| entrega.controller.js | Gestión de entregas |
| vehiculos.controller.js | Gestión de vehículos |
| rutas.controller.js | Orquestación de optimización |
| mochila.js | Asignación de paquetes |
| kruskal.js | Construcción MST |
| backtracking.js | Mejora de rutas |
| osrm.js | Rutas y distancias reales |
| geocoding.service.js | Conversión dirección → coordenadas |

---

# 5. Tecnologías Utilizadas

## Backend

- Node.js
- Express
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
| Nominatim | Obtención de coordenadas |
| OSRM | Distancias y geometrías reales |

---

# 6. Base de Datos

La base de datos almacena:

- Entregas.
- Vehículos.
- Coordenadas geográficas.
- Restricciones logísticas.

## Tablas principales

| Tabla | Función |
|---|---|
| entregas | Información de paquetes |
| vehiculos | Información de flota |

---

# 7. Flujo General del Algoritmo

El proceso completo de optimización es:

1. Obtener entregas disponibles.
2. Obtener vehículos registrados.
3. Asignar paquetes usando heurística tipo mochila.
4. Generar matriz de distancias usando OSRM.
5. Construir MST mediante Kruskal.
6. Aplicar DFS sobre el MST.
7. Ejecutar Backtracking con poda.
8. Obtener geometría real mediante OSRM.
9. Generar métricas.
10. Visualizar resultados en el frontend.

---

# 8. Algoritmos Implementados

# 8.1 Heurística de Mochila / Best Fit

El algoritmo de mochila asigna paquetes a vehículos respetando:

- Peso máximo.
- Volumen máximo.

La estrategia utilizada es tipo Best Fit.

## Restricciones reales

| Vehículo | Peso Máximo | Volumen Máximo |
|---|---|---|
| Moto | 10 kg | 0.10 m³ |
| Carro | 50 kg | 1.50 m³ |
| Camión | 200 kg | 10 m³ |

---

## Funcionamiento

1. Los paquetes se ordenan por peso.
2. Se busca el vehículo con capacidad suficiente.
3. Se actualiza la capacidad restante.

---

## Complejidad

Si:

- n = paquetes
- v = vehículos

Entonces:

```text
Ordenamiento: O(n log n)
Asignación: O(n * v)
Total: O(n log n + n * v)
```

---

## Ventajas

- Rápido para datasets medianos.
- Fácil de integrar.
- Reduce sobrecarga logística.

---

## Limitaciones

- No garantiza óptimo global.
- Depende del orden inicial.

---

# 8.2 Kruskal

Kruskal construye un Árbol de Recubrimiento Mínimo (MST) usando las distancias entre entregas.

El MST sirve como:

- ruta base,
- solución inicial,
- cota superior para Backtracking.

---

## Funcionamiento

1. Construcción de matriz de distancias.
2. Conversión a lista de aristas.
3. Ordenamiento por peso.
4. Unión de componentes.
5. Construcción del MST.
6. DFS sobre el MST para generar recorrido inicial.

---

## Complejidad

En un grafo completo:

```text
E = n(n - 1) / 2
```

Complejidad:

```text
O(E log E) ≈ O(n² log n)
```

---

## Ventajas

- Genera rutas base eficientes.
- Reduce el espacio de búsqueda.
- Sirve como referencia inicial.

---

# 8.3 Backtracking con Poda

Backtracking explora diferentes combinaciones de rutas para encontrar una mejor solución.

El sistema implementa podas para evitar exploraciones innecesarias.

---

## Restricción de ejecución

Para evitar explosión combinatoria:

```js
const MAX_BT = 10;
```

Solo se aplica Backtracking cuando el número de entregas es pequeño.

---

## Podas Implementadas

### Poda por distancia

Descarta rutas parciales peores que la mejor solución actual.

### Poda por capacidad

Descarta rutas que exceden peso permitido.

### Poda por volumen

Descarta rutas que exceden volumen permitido.

---

## Complejidad

Sin poda:

```text
O(n!)
```

Aunque el peor caso sigue siendo factorial, las podas reducen significativamente el número de estados explorados.

---

## Ejemplo real del sistema

```json
"estadisticas": {
    "nodosExplorados": 11,
    "podasDistancia": 5,
    "podasCapacidad": 0,
    "podasVolumen": 0,
    "mejoroKruskal": true
}
```

---

## Ventajas

- Mejora rutas pequeñas.
- Reduce distancia total.
- Usa Kruskal como cota inicial.

---

## Limitaciones

- Escalabilidad limitada.
- Complejidad factorial.

---

# 8.4 OSRM

OSRM se utiliza para:

- Obtener distancias reales.
- Calcular tiempos estimados.
- Obtener geometrías navegables.

---

## Beneficios

- Mayor precisión geográfica.
- Rutas reales sobre calles.
- Integración GIS.

---

# 9. Divide y Vencerás

El sistema implementa principios de Divide y Vencerás mediante:

- División de entregas por vehículo.
- Construcción de subconjuntos logísticos.
- Procesamiento independiente de rutas.
- DFS sobre subconjuntos generados por MST.

Esto permite reducir el problema global en problemas más pequeños y manejables.

---

# 10. Métricas del Sistema

El sistema genera múltiples métricas:

| Métrica | Descripción |
|---|---|
| totalPaquetes | Paquetes asignados |
| pesoUsado | Peso utilizado |
| usoPeso | Porcentaje de ocupación |
| volumenUsado | Volumen utilizado |
| distanciaKm | Distancia total |
| duracionMin | Tiempo estimado |
| nodosExplorados | Estados recorridos |
| podasDistancia | Podas aplicadas |
| mejoroKruskal | Mejora sobre MST |

---

# 11. Resultados Experimentales

## Dataset utilizado

El sistema fue probado con:

```json
"totalEntregas": 100
```

---

## Ejemplo de utilización logística

| Vehículo | Peso Utilizado | Uso |
|---|---|---|
| Moto MOT-101 | 9.9 / 10 kg | 99% |
| Carro CAR-202 | 49.9 / 50 kg | 99.8% |
| Camión CAM-301 | 200 / 200 kg | 100% |

---

## Resultados de Backtracking

```json
"nodosExplorados": 11,
"podasDistancia": 5,
"mejoroKruskal": true
```

Esto demuestra que el sistema logra:

- reducir espacio de búsqueda,
- mejorar soluciones iniciales,
- optimizar recorridos.

---

# 12. Visualización Geográfica

El sistema utiliza Leaflet para:

- mostrar entregas,
- visualizar rutas,
- representar recorridos reales,
- dibujar geometrías obtenidas desde OSRM.

También se generan visualizaciones SVG del MST de Kruskal.

---

# 13. Ventajas del Sistema

- Integración de múltiples paradigmas algorítmicos.
- Optimización logística híbrida.
- Uso de restricciones reales.
- Visualización geográfica interactiva.
- Arquitectura modular.
- Separación clara de responsabilidades.

---

# 14. Limitaciones

- Backtracking no escala bien para grandes datasets.
- Dependencia de APIs externas.
- La heurística de mochila no garantiza óptimo global.
- Precisión dependiente de geocodificación.

---

# 15. Conclusiones

OPTIRUTA+ demuestra cómo diferentes paradigmas de diseño de algoritmos pueden integrarse para resolver problemas logísticos reales.

La combinación de:

- heurísticas de mochila,
- grafos mediante Kruskal,
- exploración de estados con Backtracking,
- podas,
- geolocalización,

permite construir un sistema capaz de optimizar rutas respetando restricciones logísticas y generando métricas reales de rendimiento.

El sistema logra:

- distribuir paquetes eficientemente,
- minimizar recorridos,
- mejorar rutas mediante poda,
- visualizar recorridos geográficos reales.

Además, la implementación de métricas como:

- nodos explorados,
- podas realizadas,
- uso de capacidad,
- distancia recorrida,

permite realizar análisis experimental y validar el comportamiento de los algoritmos implementados.


