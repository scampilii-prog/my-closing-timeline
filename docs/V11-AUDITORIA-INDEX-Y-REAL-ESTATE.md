# V11 — Auditoría de INDEX aprobado y puerta de entrada a Real Estate PRO

Fecha: 2026-11-15

## Estado
- Diseño visual de INDEX V11-33: **aprobado por el propietario**. No rediseñar sin solicitud explícita.
- Norma HOA: `docs/V11-ARQUITECTURA-HOA-REGLA-MAESTRA.md`.
- Este documento es un registro de auditoría y pendientes, no una fuente alternativa de órdenes.

## Hallazgos verificados en el paquete INDEX V11-33
1. `index.html` carga `shared/layout.css` y `shared/shell.js`: el header y footer se generan desde `shared/shell.js`. Bien.
2. `index.html` todavía contiene el HTML de `#back`, `#ask` y `#help`. Para cumplir plenamente la HOA, el marcado de estos controles compartidos también debe generarse desde el componente común, y no copiarse en cada página.
3. `shared/shell.js` contiene el selector de cuatro idiomas EN/ES/IT/PT; FR todavía no figura. El selector actual es una vista preliminar y no traduce toda la página.
4. El menú enlaza a `#categories`, pero INDEX no tiene un elemento con ese ID. Debe corregirse en el lugar propietario del enlace o del destino, sin parche duplicado.
5. El panel Lía de `index.html` contiene un mensaje de vista preliminar. Verificar el contenido y la interacción real antes de reutilizarlo en Real Estate.
6. `pages/index.css` está separado del estilo común. Mantener el aislamiento.

## Reglas para el siguiente trabajo
- No alterar el aspecto aprobado de INDEX.
- Corregir los elementos compartidos exclusivamente en `shared/`, probándolos primero en MODELO y luego en INDEX.
- Conservar el funcionamiento de Back to top (oculto al inicio y al bajar; visible al subir hasta llegar al inicio).
- No presentar como terminados idiomas, registro, asistente o páginas de trabajo si están en modo preliminar.
- Para Real Estate PRO, partir del último código funcional V10 comprobado, no reconstruir las tablas a partir de capturas.
- Mantener las funciones de Contract Setup, Contract Tasks, Follow-Up y Communication Center con envío independiente por tabla.
- Separar `pages/real-estate.css` y lógica de Real Estate de los componentes comunes.
- Antes de sustituir la versión anterior, probar navegación, selección, fechas, resúmenes, guardado y envío.

**Nota:** esta auditoría no constituye implementación ni prueba funcional en Chrome.
