# Auditoría de cascada CSS — V12-216 (23/11/2026)

**Fuente:** ZIP local `MCT-V12-216-REGISTRATION-FLOW-DRAFT.zip`, archivo `real-estate-guided.html`. Revisión de solo lectura, sin navegador ni Cloudflare.

## Orden efectivo de carga de las capas que afectan el encabezado de Summary

| Posición entre 37 CSS | Archivo | Background del encabezado | Color del título |
|---|---|---|---|
| 8 | `pages/summary-header-v12-119.css` | `#153d52 !important` | blanco |
| 17 | `pages/table-summary-focus-v12-108.css` | `#fff0c9 !important` | `#67430c` |
| 18 | `pages/interface-clean-v12-109.css` | `#fff0be !important` | `#694613` |
| 20 | `pages/table-summary-unified-v12-111.css` | `transparent !important` | `#18384e` |
| 21 | `pages/table-summary-clear-v12-112.css` | `#153d52 !important` | blanco |

Todas estas capas utilizan selectores `#contract-section .re-summary-heading, #follow-section .re-summary-heading` de igual especificidad para `background`. Por tanto, en el HTML inspeccionado, **la última declaración coincidente de estas cinco capas es la de v12-112**, con fondo azul marino. Esto es una deducción de cascada CSS estática; estilos inline, reglas posteriores, media queries y condiciones de DOM podrían alterar el resultado observado.

**Riesgo de diseño:** los dos Summary reciben reglas comunes, mientras la decisión aprobada distingue Contract Summary ocre/dorado de Follow-Up Summary ciruela/burdeos. Antes de refactorizar, contrastar el DOM real, los estilos computados y las capturas aprobadas. No eliminar capas solo por antigüedad.

## Acción segura siguiente

1. Localizar los nodos de cada Summary y las reglas posteriores a v12-112 que los afecten.
2. Comparar colores y comportamiento real con la decisión vigente del documento maestro (sección 11).
3. Solo entonces crear un override mínimo y probar apertura/cierre por selección, ambas tablas independientes y versión móvil.
4. Mantener V12-216 intacta, sin despliegue.
