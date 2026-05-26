# RESULTADOS EXPERIMENTALES - OPTIRUTA+

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


# 1. Objetivos Experimentales

## Objetivo General

Evaluar el rendimiento y comportamiento del sistema OPTIRUTA+ utilizando métricas reales de optimización logística.

---

## Objetivos Específicos

- Analizar el comportamiento de la heurística de mochila.
- Medir la utilización de capacidad por vehículo.
- Evaluar la reducción de estados mediante poda.
- Comparar resultados de Kruskal y Backtracking.
- Validar la integración con OSRM.
- Analizar la escalabilidad parcial del sistema.

---

# 2. Escenario Experimental

## Dataset utilizado

Las pruebas se realizaron utilizando:

```json
"totalEntregas": 100
```

Las entregas contienen:

- coordenadas geográficas,
- peso,
- volumen,
- dirección,
- tipo de paquete.

---

## Vehículos utilizados

| Tipo | Cantidad | Peso Máximo | Volumen Máximo |
|---|---|---|---|
| Moto | 3 | 10 kg | 0.10 m³ |
| Carro | 2 | 50 kg | 1.50 m³ |
| Camión | 1 | 200 kg | 10 m³ |

---

# 4. Flujo Experimental

El flujo utilizado durante las pruebas fue:

1. Registro de entregas.
2. Registro de vehículos.
3. Geocodificación automática.
4. Asignación de paquetes.
5. Construcción de matriz de distancias.
6. Ejecución de Kruskal.
7. Aplicación de Backtracking.
8. Obtención de geometrías reales.
9. Generación de métricas.
10. Visualización de resultados.


---

# 5. Resultados de Asignación Logística

La heurística tipo mochila permitió distribuir las entregas respetando restricciones de peso y volumen.

## Resultados obtenidos

| Vehículo | Paquetes | Peso Usado | Uso Peso | Volumen Usado | Uso Volumen |
|---|---|---|---|---|---|
| MOT-101 | 3 | 9.9 / 10 kg | 99.0% | 0.10 / 0.10 | 100.0% |
| MOT-102 | 3 | 9.1 / 10 kg | 91.0% | 0.10 / 0.10 | 100.0% |
| MOT-103 | 3 | 8.6 / 10 kg | 86.0% | 0.10 / 0.10 | 100.0% |
| CAR-201 | 5 | 43.4 / 50 kg | 86.8% | 1.50 / 1.50 | 100.0% |
| CAR-202 | 8 | 49.9 / 50 kg | 99.8% | 1.49 / 1.50 | 99.3% |
| CAM-301 | 55 | 200 / 200 kg | 100.0% | 6.03 / 10 | 60.3% |

---

## Análisis

Los resultados muestran un alto nivel de utilización logística, especialmente en:

- motocicletas,
- carros,
- camiones.

La heurística logró:

- minimizar capacidad desperdiciada,
- distribuir carga de manera balanceada,
- respetar restricciones físicas.

El sistema alcanzó porcentajes cercanos al 100% de utilización en múltiples vehículos.

---

# 6. Resultados de Kruskal

Kruskal fue utilizado para generar un Árbol de Recubrimiento Mínimo (MST) y construir una ruta base.

## Beneficios observados

- reducción inicial de distancia,
- generación rápida de rutas,
- disminución del espacio de búsqueda,
- construcción eficiente de solución inicial.

---

## Complejidad observada

La complejidad teórica del algoritmo es:

```text
O(n² log n)
```

A pesar de trabajar con múltiples entregas, el algoritmo mantuvo tiempos aceptables de ejecución.

---

# 7. Resultados de Backtracking

Backtracking fue aplicado únicamente en rutas pequeñas debido a su complejidad factorial.

## Restricción utilizada

```js
const MAX_BT = 10;
```

---

## Métricas reales

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

## Análisis Experimental

Los resultados demuestran que:

- el algoritmo exploró múltiples estados,
- las podas redujeron significativamente el espacio de búsqueda,
- la solución obtenida mejoró la ruta inicial generada por Kruskal.

La presencia de:

```json
"mejoroKruskal": true
```

confirma que Backtracking logró encontrar rutas más eficientes.

---

# 8. Análisis de Poda

La poda fue uno de los elementos más importantes del sistema.

## Tipos de poda implementados

| Tipo de Poda | Función |
|---|---|
| Distancia | Descarta rutas peores |
| Capacidad | Descarta exceso de peso |
| Volumen | Descarta exceso de volumen |

---

## Resultado observado

```json
"nodosExplorados": 11,
"podasDistancia": 5
```

Esto indica que aproximadamente el 45% de los caminos potenciales fueron descartados antes de completarse.

---

## Impacto de la poda

La poda permitió:

- reducir tiempo de ejecución,
- disminuir estados explorados,
- mejorar eficiencia,
- controlar explosión combinatoria.

---

# 9. Comparación Kruskal vs Backtracking

| Métrica | Kruskal | Backtracking |
|---|---|---|
| Tipo | Heurístico | Exhaustivo con poda |
| Complejidad | O(n² log n) | O(n!) |
| Escalabilidad | Alta | Baja |
| Calidad de ruta | Buena | Mejor |
| Tiempo | Bajo | Alto |
| Uso en sistema | Base inicial | Mejora local |

---

## Conclusiones de comparación

Kruskal proporciona una solución inicial rápida y eficiente, mientras que Backtracking mejora rutas pequeñas utilizando exploración controlada.

La combinación de ambos algoritmos permitió:

- reducir distancia,
- disminuir estados innecesarios,
- mantener tiempos aceptables.

---

# 10. Integración con OSRM

OSRM permitió obtener:

- distancias reales,
- tiempos estimados,
- geometrías navegables.

## Ejemplo real

```json
"distanciaKm": "11.30",
"duracionMin": 13
```

---

## Beneficios observados

- mayor precisión geográfica,
- rutas más realistas,
- visualización sobre calles reales.

---

# 11. Visualización Geográfica

El sistema utiliza Leaflet para representar:

- rutas,
- entregas,
- recorridos,
- geometrías obtenidas desde OSRM.

También se generan visualizaciones SVG del MST construido mediante Kruskal.

---

# 12. Escalabilidad

El sistema fue probado con:

```json
"totalEntregas": 100
```

Los resultados muestran que:

- la heurística de mochila escala adecuadamente,
- Kruskal mantiene tiempos eficientes,
- Backtracking requiere limitación de tamaño.

---

## Estrategia híbrida

La combinación de algoritmos permitió:

- usar heurísticas rápidas para datasets grandes,
- usar búsqueda exhaustiva en subconjuntos pequeños,
- equilibrar precisión y rendimiento.

---

# 13. Limitaciones Encontradas

Durante las pruebas se identificaron algunas limitaciones:

- Backtracking presenta crecimiento factorial.
- Dependencia de APIs externas.
- Posibles retrasos en geocodificación.
- Variabilidad en tiempos de respuesta de OSRM.

---

# 14. Conclusiones Experimentales

Los resultados experimentales demuestran que OPTIRUTA+ logra integrar exitosamente múltiples paradigmas algorítmicos para resolver problemas logísticos reales.

La heurística de mochila permitió maximizar el uso de capacidad de los vehículos, mientras que Kruskal generó rutas base eficientes y Backtracking logró mejorar soluciones mediante exploración controlada y poda.

Las métricas obtenidas muestran:

- alta utilización logística,
- reducción efectiva del espacio de búsqueda,
- optimización de rutas,
- integración geográfica precisa.

El sistema demostró capacidad para trabajar con datasets medianos y generar resultados consistentes utilizando técnicas híbridas de optimización.

---
