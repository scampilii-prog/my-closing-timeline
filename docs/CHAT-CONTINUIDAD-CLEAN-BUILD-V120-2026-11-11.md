# My Closing Timeline — Continuidad de chat (11 noviembre 2026)

> Documento de traspaso del trabajo de Real Estate PRO V6 CLEAN BUILD. **Resumen detallado de la conversación, no transcripción literal.** No implica que los cambios estén desplegados en producción.

## Objetivo y reglas de trabajo

El usuario está refinando una vista **local HTML/ZIP** de MyClosingTimeline.com, en Chrome/Mac, no una versión desplegada. Busca una sola tabla elegante y funcional de **Contract Tasks & Deadlines**, con las seis tareas iniciales, bordes visibles, controles compactos, encabezados alineados y sin scroll horizontal. Conservar funcionalidad existente; no añadir capas CSS contradictorias ni duplicar tablas/controles. No tocar GitHub/Cloudflare del sitio sin instrucción explícita. El usuario pide modificaciones concretas, pruebas reales y un ZIP verificable, evitando promesas de cambios que luego no se ven.

## Archivo y secuencia

- **V106**: `MCT-V106-COLUMNAS-REAJUSTADAS(1).zip`, aportado por el usuario como base para sustituir la tabla vieja.
- **V107**: `MCT-V107-MARCO-COMPLETO.zip`, respaldo visual preferido. V108–V112 presentaron regresiones (estilos rotos, tabla vieja, botones mezclados, tareas adicionales). Usuario eliminó V112 y descartó V111.
- **V113**: `MCT-V113-V106-TABLA-UNICA.zip`, nueva tabla independiente con seis tareas y botón ✓ Done. Captura mostró botones dentro del encabezado de Task / Reminder.
- **V114–V117**: iteraciones de encabezado, barra de controles, ancho de columnas y botón Apply.
- **V118**: `MCT-V118-CONTROLES-Y-TITULOS-ALINEADOS.zip`, es la **base de referencia a recuperar** para la siguiente corrección. Captura del usuario mostró seis tareas, encabezado compacto, ✓ Apply dentro de Days, pero **dos botones Delete Selected** visibles. Corregir duplicado en una futura intervención independiente o cuidadosamente controlada.
- **V119**: `MCT-V119-DAYS-COMPACTO-TASK-AMPLIADO.zip`. **Rechazada** porque se encogió el botón ✓ Apply, no solamente la columna. Usuario pidió borrarla y volver atrás.
- **V120**: `MCT-V120-DAYS-ESTRECHO-APPLY-ORIGINAL.zip`, basada en V118, intenta Days 5%→4%, Task / Reminder 31%→32%, manteniendo Apply de 84px. **NO está validada visualmente**. El propio asistente advirtió que Apply puede sobresalir de Days y superponerse a la columna vecina. No considerarla aprobada sin captura.

## Última instrucción de diseño (CRÍTICA)

El usuario dijo: «Noooo, borro este .zip y devuélvete. Has puesto más pequeño Apply; lo que debes hacer [es] achicar en ancho la columna [Days] **sin tocar el botón Apply**, y luego ensanchar la columna **Task / Reminder** para que gane el mismo espacio que quitaste a Days».

Esto significa:
1. **NO cambiar el ancho, alto, padding ni tamaño de letra de ✓ Apply**.
2. Estrechar **solamente** el ancho asignado a la columna Days y entregar exactamente el espacio liberado a Task / Reminder.
3. Evitar desbordamiento, superposición y clipping: el botón debe seguir enteramente visible y usable. Si el ancho físico mínimo del botón impide reducir más la columna, explicar el límite real en vez de producir un layout roto.
4. **#** debe seguir compacta, los títulos alineados en una sola fila; mantener el resto de columnas intactas.
5. Eliminar el **Delete Selected** duplicado visto en V118, sin romper su evento ni añadir otro botón.
6. El usuario aprecia los botones compactos con jerarquía: + Add Task verde; Choose Template dorado; Save My Table verde suave; Restore Current Table blanco/borde azul; Delete Selected rojo discreto. Controles arriba de la tabla, no dentro de los encabezados.
7. **Select** sirve para seleccionar tareas que compartir/borrar, **✓ Done** sirve exclusivamente para completarlas/reabrirlas. No confundir.

## Seis Contract Tasks iniciales

1. 1st Deposit — 3 días después de Effective Date
2. 2nd Deposit — 5 días después de Effective Date
3. Loan Application — 5 días después de Effective Date
4. Condo Application — 5 días después de Effective Date
5. Property Inspection deadline w/right to cancel — 7 días después de Effective Date
6. LOAN APPROVAL - Notify seller if NO LOAN APPROVAL — 30 días después de Effective Date

Sin fechas definidas: no inventar vencimientos ni mostrar falsos Overdue. Puede haber 11 tareas si el navegador restaura una lista antigua desde almacenamiento local. No borrar datos del usuario sin permiso; Restore 6 Tasks reemplaza la lista.

## Reglas funcionales del proyecto

- Fecha efectiva (ED), cierre (CD), Days Between Dates y Deadline Counting; Reset Dates y Start Closing.
- ✓ Apply aplica cambios de Days y fechas; comprobarlo con valores de prueba.
- ✓ Done/Reopen actualiza estados y contadores.
- Save My Table, Restore Current Table, Choose Template, Add Task, Select All y Delete Selected deben conservar comportamiento.
- Follow-Up Tasks debe conservarse; no editar otras secciones por accidente.
- El diseño es local de prueba, no portal seguro ni prueba de sincronización en producción.
- Flujo superior: 01 MY CLOSING; 02 MY TASKS; 03 COMMUNICATION; estados Not Started/In Progress/Completed, marcando progreso solo después de cambio real y guardado.

## Próximo paso recomendado

**Primero inspeccionar V118 y V120 reales, CSS/HTML y capturas**. No agregar un override más sin entender reglas anteriores. Ajustar el colgroup o widths reales de Days/Task, mantener dimensiones originales del botón Apply y comprobar con navegador/renderizado si es posible. El cambio debe ser mínimo, con prueba de que no se solapan columnas y de que el encabezado sigue alineado. Guardar respaldo de V118. Solo entregar ZIP si está realmente creado y verificado; explicar cualquier límite de pruebas.

## Nota sobre este archivo

Esta nota documenta la conversación para continuar en un nuevo chat. No contiene toda la transcripción ni todos los archivos ZIP. Los ZIP locales del Mac no se subieron a este repositorio como parte de esta operación. El usuario puede adjuntar el ZIP aprobado cuando haga falta.
