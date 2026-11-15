# Recuperación de Ask Timeline V10 → V11

**Fuente inspeccionada:** `assets/ask-timeline.js` de la rama `main` (V10).  
**Estado:** inventario de contenido recuperado; no implica aprobación de tarifas ni activación de funciones.

## Contenido real encontrado

El archivo V10 contiene cinco conjuntos de preguntas y respuestas, seleccionados según la URL:

- **General (4):** What can I do here?; Is FREE really free?; What does Real Estate PRO cost?; Can I pay with a real card now?
- **Real Estate (5):** What dates should I enter?; Can the timeline verify legal deadlines?; What is the difference between FREE and PRO?; How much is Real Estate PRO?; Should I enter client details?
- **Project (4):** What is Project Timeline?; Can I practice for free?; What will Project PRO cost?; Can I buy Project PRO now?
- **Pricing (4):** What are the Real Estate PRO prices?; Do Real Estate credits renew monthly?; Is the checkout live?; What does Project PRO cost?
- **Workspace (5):** How do I open my existing closing?; What does Start New Closing do?; How do I update a follow-up?; What does Done mean?; How do I buy another credit?

**Total: 22 entradas** (con preguntas repetidas entre categorías).

## Comportamiento comprobable por lectura del código

- Renderiza preguntas con `details/summary` y respuestas de texto preparadas.
- Selecciona el conjunto por el pathname: `project|other-project|timeline-plus`, `pricing|pro-get-started`, `my-closings`, o `real-estate`; de otro modo general.
- Panel flotante con abrir/cerrar y tecla Escape.
- No usa un modelo de IA, no hace búsquedas en vivo y no ofrece envío de mensajes.
- El diseño CSS de V10 está embebido en el JS: **no trasladarlo a V11**.

## Precauciones antes de integrar

1. Los precios, promociones, modalidades FREE/PRO y estado de Stripe que figuran en V10 pueden estar desactualizados respecto al modelo comercial de noviembre 2026. **No publicarlos sin contrastarlos con la configuración vigente.**
2. Mantener el diseño visual V11 de Lía, con icono del logo, área de preguntas, texto libre y nota de limitaciones.
3. El campo libre de V11 no debe fingir un chat de IA: se puede implementar búsqueda local sobre preguntas aprobadas, con mensaje claro si no hay coincidencias.
4. Mantener la información de privacidad y advertencias de fechas contractuales; revisar redacción contra políticas actuales.
5. Separar datos en `MCT-V11/shared/ask-timeline-content.js`, comportamiento en `MCT-V11/shared/assistant.js` y apariencia en CSS compartido.
6. Probar teclado, móvil, apertura, cierre, filtros y resultados vacíos antes de sustituir el prototipo.

## Próximo paso

Comparar las 22 respuestas literales de `assets/ask-timeline.js` con el plan comercial vigente, marcar aprobadas o pendientes y después integrar la lógica de búsqueda local. Conservar V10 intacto.
