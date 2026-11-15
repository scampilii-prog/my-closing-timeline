# MY CLOSING TIMELINE — V11 · ARQUITECTURA MAESTRA VIGENTE
**Aprobado por el propietario: 15 de noviembre de 2026.**
**ESTE ES EL ÚNICO DOCUMENTO NORMATIVO PARA LA RECONSTRUCCIÓN V11.**

> En caso de contradicción, este documento prevalece sobre instrucciones históricas de diseño, handoffs, prototipos, CSS antiguos y recomendaciones de chats anteriores. Los documentos históricos siguen disponibles como registro y fuente de funciones para recuperar, pero NO como autoridad para reconstruir la estructura. Ninguna modificación de V11 puede alterar producción sin aprobación y pruebas.

## 1. Objetivo
Construir MyClosingTimeline.com como sitio elegante, claro, accesible, confiable y útil en cuatro categorías: **Real Estate; Business & Projects; Services & Contractors; Personal & Home**. Experiencia comprensible, prueba gratuita funcional, planes transparentes y posibilidad de recibir comentarios, solicitudes y quejas. No prometer beneficios, servicios, privacidad certificada ni funciones no implementadas.

## 2. Regla de propiedad: UNA SOLA FUENTE ESTRUCTURAL
- **MODELO.html** es la referencia visual y de integración de la plantilla maestra; **los archivos comunes compartidos son la fuente ejecutable de verdad**. El navegador no hereda código de MODELO.html automáticamente.
- **Solo `shared/` puede definir o modificar la estructura exterior**: header fijo y estable, logo original, navegación, idiomas, Sign In, Register, Menu, ancho y alineación del contenedor, comportamiento responsive, footer, enlaces legales y controles exteriores.
- Cada página de contenido consume esa estructura, pero **no puede sobrescribir estilos, IDs, eventos ni dimensiones estructurales**. Prohibido introducir reglas globales, estilos duplicados, parches de `!important` o scripts que reubiquen componentes comunes.
- Las páginas administran exclusivamente su **contenido interior**: títulos de sección, tarjetas, fotografías, tablas, formularios, lógica y acciones específicas. Sus CSS y JS se limitan al espacio interior propio.
- Un defecto estructural se arregla una sola vez en `shared/`; un defecto interior se arregla en la página propietaria. Si un cambio requiere ambas capas, documentar el contrato de integración y modificar cada capa por separado.

## 3. Contrato de estructura compartida
**Header:** identidad MyClosingTimeline.com, logo original (no emoji ni sustituto), ancho y alineación según referencia aprobada V10, menú y enlaces funcionales; estable durante scroll y resize, sin temblores ni desplazamientos.
**Contenedor:** anchura máxima común medida de la referencia V10, centrado, márgenes simétricos y responsive; los módulos internos no redefinen su geometría.
**Footer:** lema «Your Clients. Your Records. Your Privacy.», enlaces legales y textos comunes; accesibilidad y diseño coherente.
**Botones exteriores:** izquierdo «Back to top» con flecha ascendente; derecho «Lía · Ask Timeline» con el **mismo icono gráfico del logo**. Ambos elegantes, idénticas dimensiones y distancia exacta a los límites laterales del contenedor; sin solapamiento, sin cambiar tamaño al redimensionar; el primero aparece al desplazarse y lleva al inicio; el segundo abre y cierra un panel de ayuda accesible. El asistente se identifica como virtual; no se anuncia IA en vivo hasta existir integración real. Posición y límites adaptables a móvil sin ocultar contenido.
**Navegación:** rutas reales, misma pestaña para enlaces internos, indicadores de estado y teclado accesibles. No botones decorativos que aparenten funcionalidad.

## 4. Archivos y límites de responsabilidad
```text
MCT-V11/
  MODELO.html                   # referencia y prueba de la estructura
  index.html                    # Choose Your Timeline, cuatro categorías
  real-estate.html              # contenido Real Estate (sin PRO en título público)
  business-projects.html
  services-contractors.html
  personal-home.html
  shared/
    layout.css                  # geometría y estilo EXTERIOR únicos
    shell.js                    # header, footer, botones y carga común
    navigation.js               # rutas, menú e idiomas
    assistant.js                # panel común Lía
  pages/
    index.css / index.js        # solo contenido interior de index
    real-estate.css / real-estate.js
    ...
  assets/
    logo/                       # gráficos originales, compartidos
    images/                     # fotografías reales, no capturas de la UI
  DOCUMENTO-MAESTRO.md
```
La distribución final puede adaptarse a las necesidades de despliegue, pero nunca la separación de responsabilidades.

## 5. Orden obligatorio
**FASE 1 — MODELO:** construir estructura compartida y MODELO.html. Verificar logo, enlaces, menú, idiomas, footer, dos botones, asistente, scroll, resize, anchos de V10 y ausencia de reglas estructurales duplicadas. **No importar todavía las tablas antiguas.**
**FASE 2 — INDEX:** recuperar Choose Your Timeline con cuatro categorías, fotografías auténticas, textos correctos, enlaces y acciones. Sin CSS estructural propio.
**FASE 3 — REAL ESTATE:** recuperar Contract Setup, Contract Tasks, Follow-Up, Summary, guardado, Communication Center y lógica probada de V10, una función a la vez; sin trasladar estilos antiguos conflictivos.
**FASE 4 — DEMÁS CATEGORÍAS:** Business & Projects, Services & Contractors y Personal & Home con la misma plantilla y lógica interior aislada.
**FASE 5 — SERVICIOS Y LANZAMIENTO:** verificar cuentas, aislamiento entre proyectos, prueba gratuita, precios vigentes, pagos en sandbox, email, privacidad, quejas/reviews, seguridad y despliegue antes de activar cobros reales.

## 6. Criterios de aceptación
- Cambio de header/footer/botones en un solo archivo común afecta correctamente a todas las páginas.
- Cambio de una tabla/tarjeta interior no altera ninguna otra página.
- Sin CSS/JS global duplicado en páginas individuales, sin estilos de captura de pantalla.
- Ventanas estrechas y anchas: márgenes simétricos, botones accesibles y sin superposiciones.
- Header estable al desplazarse; links reales, teclado y foco visibles; asistencia claramente descrita.
- Registro, guardado, plazos, comunicaciones y pagos solo se declaran funcionales tras pruebas reales.
- V10 y documentos antiguos permanecen como respaldo histórico, no se eliminan.
- Ningún ZIP ni commit equivale por sí mismo a validación visual o despliegue de producción.

## 7. Gobernanza de cambios
1. Identificar si la solicitud es estructural o interior.
2. Editar exclusivamente el propietario correspondiente.
3. Probar el componente afectado y una página diferente para descartar regresión.
4. Registrar cambios y resultados comprobados, no supuestos.
5. No incorporar archivos históricos completos; extraer solo funciones inspeccionadas y reimplementarlas de forma aislada.
6. Si hay discrepancia comercial o jurídica, confirmar la regla vigente antes de programarla.

**Siguiente paso aprobado:** terminar primero MODELO V11 y obtener su aceptación visual y funcional; únicamente entonces construir index.html.
