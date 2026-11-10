# My Closing Timeline — arquitectura definitiva (Website 31 → 32)

## Regla comercial invariable
Home es la única presentación conjunta de Real Estate y Project Timeline. Después de elegir uno, el visitante solo ve navegación, práctica FREE, explicación PRO, ofertas, registro, pago y espacio de trabajo de ese producto. No solicitar nuevamente el tipo de producto durante el pago. Los usuarios existentes regresan a su producto guardado. No implementar sesiones persistentes sin revisar autenticación y seguridad.

## Diseño único
Usar Home como referencia: header y footer unificados, hero fotográfico de ancho completo, títulos y contenido alineados al ancho máximo de 1420 px, Manrope, azul marino, dorado y acentos discretos; accesibilidad móvil. Consolidar CSS existente, no sumar parches conflictivos. Mantener EN/ES/IT/PT y no eliminar funciones.

## Inventario inicial (46 HTML incluyendo backups)
Real Estate: real-estate-timeline.html, my-closings.html, closing-workspace-preview.html (verificar preview).
Project: project-timeline.html, other-projects.html (verificar duplicidad).
Comunes: index.html, contact.html, privacy.html, login.html (redireccionamiento actual).
A separar: pricing.html, pro-get-started.html, pro-timeline.html, pro-plan.html, workspace.html.
Privadas/pruebas: admin-gift-codes, admin-invitations, personal-sabatino, customer-preview, customer-review, realtor-private-test, realtor-registration-preview, step3-new-table-preview, backups y otros; auditar referencias antes de retirar de navegación.

## Estado comprobado
- Home ya tiene botones separados para Real Estate y Project Timeline; último commit de Home: 9e15a7c.
- first-closing-free.html indica que la promoción terminó; no anunciar regalo vencido.
- pro-get-started.html anuncia Stripe Sandbox simulado: NO prometer cobro real.
- project-timeline.html dice que cuentas, compras y recordatorios PRO de Other Projects aún no están disponibles; no ofrecer compra hasta implementarlos y probarlos.
- 2026-11-02: se sustituyeron en Project Timeline dos enlaces cruzados a Real Estate y un CTA de registro PRO prematuro por enlaces a FREE y PRO Preview del propio proyecto. Commit 9345846.

## Secuencia de trabajo
1. Auditar cada HTML activo y sus enlaces, redirecciones, dependencias y funciones. Clasificar público, privado, legacy o duplicado.
2. Definir componentes compartidos header/hero/footer y patrón único; migrar por lotes, con verificación de regresiones.
3. Construir explicaciones y precios PRO específicos para Real Estate y Project, sin cruces.
4. Separar registro y retorno al producto sin duplicar cuentas; verificar estado real de Stripe y permisos.
5. Probar FREE, PRO, enlaces, móvil, idiomas, recordatorios y sesiones seguras antes de anunciar disponibilidad.

Nunca afirmar publicación visual ni compras operativas sin comprobarlas.

## CLEAN BUILD #5 — registro de pruebas y pendientes (2026-11-09)

**Fuente de trabajo:** Real Estate PRO V5 · Closing Workspace, probado localmente desde ZIP/HTML. No asumir que el último ZIP esté publicado en GitHub o Cloudflare. Conservar una copia maestra estable y los recursos con sus nombres exactos. No sustituir la V5 con ZIP antiguos ni añadir parches CSS/JS contradictorios.

### Pruebas confirmadas por el usuario
- Contactos: Add Contact abre formulario, permite guardar y recuperar el contacto al refrescar; Delete Contact confirmado en pruebas anteriores.
- Change Email: recupera correo de contacto, permite cambiarlo y persiste después de refrescar y volver a seleccionar el contacto.
- Email: campo de mensaje se expande automáticamente; asunto y mensaje personalizados permanecen al refrescar.
- Plantillas: desplegable con flecha dorada, título destacado y Click to open / Click to close; las plantillas de asunto y mensaje rellenan sus campos y se conservan tras refrescar.
- Clear Email: botón junto a Email subject, borra asunto y mensaje y mantiene ambos vacíos después de refrescar; no debe borrar contactos.
- Las pruebas anteriores (hasta TEST 17) fueron aprobadas en la sesión de usuario. Evitar repetirlas todas innecesariamente, pero ejecutar pruebas de regresión antes de publicar.

### Problemas abiertos — TEST 18, NO APROBADO
1. **Transferencia de tareas:** en Contract Tasks & Deadlines se marcan las tareas 5 y 6, pero Prepare & Share muestra `0 selected · 0 to send` y tabla vacía. Corregir la conexión usando una única fuente de verdad para selección, persistencia, contador y filas de tabla de envío. Probar en navegador que aparecen tareas, Days y Due Date; no basta validar sintaxis JavaScript.
2. **Fechas:** Effective Date y Closing Date quedan bloqueadas y no se pueden editar. Deben existir controles visibles, funcionales y coherentes para desbloquear/modificar fechas y **Clear Dates**, con confirmaciones apropiadas, preservando tareas y notas. Revisar comportamiento después de Start Closing, cálculo de plazos y guardado.
3. Varias versiones ZIP etiquetadas como reparadas NO resolvieron los dos fallos anteriores. No declararlos solucionados ni enviar nuevas versiones sin prueba funcional.

### Criterios de aceptación y disciplina
- TEST 18 aprobado solo cuando el usuario seleccione 5 y 6 y ambas aparezcan en Prepare & Share con fechas y días correctos, y persistan o se sincronicen coherentemente tras refrescar.
- Fechas aprobadas solo cuando puedan editarse/desbloquearse y borrarse realmente desde la interfaz, sin pérdida involuntaria de tareas ni errores de cálculo.
- Mantener la estética V5, las tablas existentes, contactos, Change Email, plantillas, Clear Email y demás funciones aprobadas.
- Trabajar sobre **una sola versión base** identificada, eliminar instrucciones duplicadas/conflictivas y registrar qué archivo y función se cambió. Diferenciar **archivo preparado**, **sintaxis validada**, **prueba en navegador aprobada** y **publicado**.
- Evitar que el usuario tenga que descargar muchos ZIP o repetir pruebas aprobadas. No prometer publicación en Cloudflare si solo se modificó un archivo local.
