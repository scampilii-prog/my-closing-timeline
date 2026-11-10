# MY CLOSING TIMELINE — CLEAN BUILD V5 — HANDOFF COMPLETO (10 nov 2026)

## Alcance y fuente
Registro de las decisiones y observaciones de este chat, para continuar sin repetir instrucciones. **El trabajo más reciente se prueba en archivos ZIP locales abiertos con Chrome (file://), NO se considera publicado en GitHub/Cloudflare.** Los ZIP entregados en la conversación no equivalen a código subido al repositorio. Capturas del usuario son la prueba visual principal; integridad ZIP/sintaxis JS no certifican funcionamiento.

## Filosofía de diseño aprobada
- Elegancia, claridad, practicidad, altura mínima, información instantánea, sin tablas enormes ni desplazamiento horizontal.
- Mantener tres pasos operativos: **01 Contract Tasks & Deadlines**, **02 Follow-Up Tasks**, **03 Communication Center**. En el encabezado introductorio se ve aún el error **«04–05 Communication»**; debe corregirse a **«03 Communication»** sin afectar los pasos reales.
- Los informes **Closing Progress & Activity** y **Today & Tomorrow** NO son pasos; **sin números 04/05**. Se sitúan antes del encabezado 01, en **dos franjas horizontales independientes**, compactas, claramente separadas.
- Closing Progress: franja azul marino, muestra **Total, Open, Done, Overdue** de ambas tablas siempre visibles, con contraste suficiente. **NO lleva Show details** (el usuario aprobó eliminar ese botón). Las estadísticas se actualizan automáticamente.
- Today & Tomorrow: franja clara con **Overdue, Today, Tomorrow**, cifras visibles; único informe con botón **Show details +** para abrir y **Hide details −** para cerrar con el MISMO botón. Cerrada, la franja no crece; abierta, mostrar tareas con nombre, fecha y procedencia Contract/Follow-Up. No hacer crecer toda la página con 31 o más tareas; listas desplazables internamente.
- Captura del 10 nov ~15:16: el informe compacto cerrado ya se ve bien; abierto Today & Tomorrow todavía muestra tres columnas, con Overdue/Tomorrow vacías y Today con muchas tareas en columna angosta. **Última mejora propuesta:** dentro de detalles, usar pestañas **Overdue | Today | Tomorrow**, mostrar una sola lista ancha y legible por vez, con desplazamiento interno y contadores; al cerrar volver a franja mínima. La última entrega del chat se tituló **MCT-V5-TODAY-TOMORROW-DETALLE-COMPACTO.zip**, pero la prueba en Chrome de esta última mejora **está pendiente**.
- Si un cambio rompe el estilo, revisar primero rutas HTML y carpeta hermana `Real Estate PRO V5 · Closing Workspace_files`. Hubo una entrega donde el nombre de carpeta no coincidía y 40 recursos locales no cargaban. Conservar HTML y carpeta _files juntos, y no renombrar a ciegas. Evitar CSS heredado contradictorio y ZIPs sin prueba real.

## Reglas funcionales de ambas tablas (01 y 02)
- Contrato: 6 tareas base, fechas editables; Follow-Up: 40 sugeridas y personalizables; una tabla activa guardada por proyecto, restauración y conservación de notas, selecciones y estado.
- **Effective Date** editable durante el proyecto; recalcular vencimientos dependientes sin perder notas, Done ni selecciones. **Closing Date** no limitada a 60 días; vigencia del acceso al servicio es independiente del plazo contractual. Días calendario/laborables, fechas Before Closing y After ED, Apply & Reorder, Add Task, Delete, Done/Reopen, Notes.
- Regla solicitada: cada tarea se **apaga/bloquea al día siguiente de su Due Date**, pero **NO se marca Done automáticamente**; sigue pendiente/vencida y debe recuperarse solo con **Action → Reopen**. Probar que Reopen de vencida quede realmente editable y no se rebloquee inmediatamente. Nunca borrar información.
- Colores coherentes en las dos tablas para tareas de igual estado/fecha: **Today amarillo, Tomorrow azul claro, Overdue gris/bloqueada, Done verde claro**. Las tareas de igual fecha deben verse iguales. Verificar consistencia de los indicadores de ambas tablas y de Today & Tomorrow.
- Probar cambios de fecha, persistencia tras refresh, bloqueo automático al cambio de día, Done/Reopen, notas expandibles, selección y cálculos. Pruebas de sintaxis no sustituyen navegador.

## Sección 03 Communication Center
- Mantener selección independiente de Contract y Follow-Up, contactos y mensajes editables, My Email Studio, copia y preview, destinatarios y plantillas. No mezclar tareas de las tablas ni borrar mensajes anteriores de forma imprevista. Problemas históricos de textarea que no se expande o no se limpia: revisar antes de aprobar.
- No confundir el rótulo antiguo «STEP 3 · CLOSING OVERVIEW» con la sección 03 real de comunicación; eliminar el rótulo obsoleto.

## Observaciones exactas de pruebas de este chat
- Captura ~14:43: encabezados 04/05 inicialmente muy altos y resultados desproporcionados.
- Captura ~14:55: paneles lado a lado con alturas diferentes; T&T crecía por la lista.
- Captura ~15:02: dos franjas, pero valores de Closing Progress casi invisibles (blanco sobre blanco) y T&T desalineado.
- Captura ~15:04: al abrir T&T, 31 tareas aparecían en una columna demasiado estrecha y larguísima.
- Captura ~15:07: una entrega perdió CSS por rutas/carpeta de recursos.
- Captura ~15:10: CSS restaurado; abrir Closing Progress duplicaba un panel grande; se decidió **quitar su botón**.
- Captura ~15:12: Closing Progress abierto más legible; Today & Tomorrow aún requería rediseño.
- Captura ~15:16: **aprobado Closing Progress sin botón** y Today & Tomorrow cerrado compacto. Al abrir T&T todavía había columnas vacías y lista central estrecha. Próximo test: ZIP con pestañas de prioridades.

## Estado y siguiente acción concreta
1. Abrir el **último ZIP local** `MCT-V5-TODAY-TOMORROW-DETALLE-COMPACTO.zip` (obtenerlo de los adjuntos de este chat, no asumir que GitHub lo contiene), extraerlo completo y comprobar que los recursos cargan.
2. Pulsar Show details + en Today & Tomorrow: confirmar tres pestañas, selección de una sola categoría, nombres/fechas/origen legibles, scroll interno; volver a pulsar Hide details − y comprobar que se cierra. Comprobar números Total 46, Open 46, Done 0, Overdue 0, Today 31 **solo como valores de la captura, no como datos fijos**.
3. Si falla, inspeccionar CSS y JS efectivos, no agregar más reglas contradictorias. Entregar un ZIP realmente corregido y verificar rutas, sintaxis y prueba visual si es posible.
4. Continuar pruebas funcionales de 01/02, luego 03 y estadísticas de ambas franjas; después persistencia y modelo comercial.
5. **No afirmar que el sitio publicado se actualizó**: todo lo reciente es prototipo local. Guardar decisiones en GitHub no despliega código ni ZIPs.

## Negocio: decisiones históricas pendientes de reconciliar
En chats recientes se mencionaron una prueba de 21 días y continuación $40/60 días, mientras que documentos antiguos de GitHub conservan otros planes (primer cierre gratis 60 días; $20/60 días; welcome 2/$35; BUY 5 GET 1 FREE). **Son versiones contradictorias. No activar pagos ni actualizar textos comerciales hasta que el propietario confirme el modelo final.** La regla de recompensas server-side figura como no activa en `docs/closing-rewards-automation.md`.

## Instrucción para el próximo chat
«Continuemos My Closing Timeline — Clean Build V5. Lee en GitHub `docs/CLEAN_BUILD_V5_HANDOFF_2026-11-10.md` y `NEXT_CHAT_START_HERE.md`. Estamos probando ZIPs locales, no Cloudflare. Conserva las franjas compactas aprobadas y verifica primero Show details/Hide details y las pestañas Overdue/Today/Tomorrow del último ZIP. No cambies lo que ya funciona.»
