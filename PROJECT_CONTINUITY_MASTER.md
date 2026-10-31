# MY CLOSING TIMELINE — DOCUMENTO MAESTRO DE CONTINUIDAD

**Decisiones posteriores Website 17 (29 oct 2026):** manténganse dos productos comerciales separados: Real Estate PRO (1/2/5 cierres por paquete, máximo 90 días del Effective Date original por cada cierre, extensión 90 días a mitad del precio regular básico vigente, sin descuentos) y Other Projects (90/180/365 días por plan, cuentas/entitlements propios, primer plan 90 días reservado gratis por email, FREE navegador 8 tareas, PRO tarea personalizada y recurrente, alerta persistente 15 días antes de vencimiento en el sistema real, renovación no automática). Igual escala propuesta de $29.90/$59.80/$149.50 y campaña $19.90/$34.90/$84.90 para ambos productos hasta 31 marzo 2027, revisiones trimestrales. **Código ya guardado**: Pricing, fechas/cierre, demo Other, invitaciones, login sesión deslizante 30 días. **NO IMPLEMENTADOS / NO VERIFICADOS**: cobro de extensión $14.95, cuentas y pagos independientes de Other, alertas reales, promo única por cada producto (índice actual es por email global), QA Cloudflare/D1/Resend/Stripe y prueba visual. Ver `NEXT_CHAT_START_HERE.md` y `PROJECT_CHANGELOG.md` para tareas precisas.



**Website 17 (29 oct 2026):** HOME mantiene mensaje original Closing y dispone de una sola invitación clara a Other Projects (`mct-hero-other-projects`, hasta 8 tareas FREE y PRO solo preview). Commit `db193ea1639099d933dc22d774292fea157f3097`, `index.html`. Las seis tarjetas aprobadas (START HERE, Today & Tomorrow, Privacy First; Beyond Real Estate, FREE Timeline, privacidad local) permanecen sin alteraciones y siguen en 2 filas con reglas desktop/mobile. Inspección estática OK; **NO se ha certificado render de Cloudflare ni operatividad de D1/Resend/Stripe ni archivado de invitaciones en producción.** La continuidad detallada más reciente está al principio de `NEXT_CHAT_START_HERE.md`.


**Website 15 — creado 2026-10-28. Actualizar después de cada sesión importante.**

**PARA INICIAR CHAT NUEVO:** usar primero **[NEXT_CHAT_START_HERE.md](NEXT_CHAT_START_HERE.md)**. Es el resumen breve vigente y la lista priorizada de acciones; este MASTER mantiene los detalles históricos. **Estado Website 15:** todas las páginas a máximo 1420px (`mct-hero-left-edge-20261028.css?v=6`) y CTA `Create & Share Your FREE Summary` dorado con texto azul marino (`data-mct-cta-version="gold-20261028-v2"`). El propietario respondió «Perfecto» tras el último arreglo. Código confirmado GitHub; publicación/QA de Cloudflare no certificada independientemente.


> Este archivo reúne decisiones aprobadas de las conversaciones Website 1–14 y el estado contrastado con GitHub. **No equivale a certificación de producción.** En caso de discrepancia entre una decisión histórica y el código actual, inspeccionar el código y confirmar la decisión más reciente antes de actuar. Nunca dar por probados los servicios externos por la sola presencia del código.


## Historial anterior — Website 15: ampliación inicial a 1280px (SUPERADA por decisión 1420px)
- **El propietario confirmó que HOME estaba demasiado estrecho.** Se aprueba un **ancho de contenido exterior máximo común de 1280px**, centrado, para HOME, FREE, PRO, Pricing, Other Projects, Help y páginas de Admin, privadas y auxiliares.
- **No mantener HOME más estrecho que las demás páginas.** La regla anterior de 1140px corresponde al estado histórico de Website 14 y queda superada.
- Implementado en el código: `assets/mct-hero-left-edge-20261028.css`, cargado con `?v=5` en 22 archivos HTML. Se mantienen las imágenes de fondo y se alinean sus textos con las tarjetas inferiores.
- La apariencia responsive y el despliegue Cloudflare siguen **PENDIENTES de certificación visual**. No se alteraron funciones contractuales ni pagos.
- **Siguiente tarea:** revisar el aspecto real (escritorio/móvil) de HOME, FREE, PRO, Pricing, Other Projects y Admin; comprobar alineación, tablas, márgenes y commit publicado. Corregir solo regresiones comprobadas.

## DECISIÓN VIGENTE — Website 15 (28 oct 2026): todas las páginas a 1420px
- El propietario confirmó expresamente: **“pon todas las paginas del mismo ancho de 1.420 pixeles”**. Es la instrucción de diseño más reciente y **reemplaza las anteriores medidas de 1140px y 1280px**.
- Máximo uniforme del lienzo de contenido **1420px**, centrado y responsive (margen lateral de 20px en escritorio, 12px en móviles). HOME, FREE, PRO, Pricing, Help, Other Projects, Admin, invitaciones, paneles privados y páginas auxiliares deben usarlo.
- Las fotografías de cabecera pueden conservar su fondo a todo lo ancho, pero los títulos han de alinearse con la izquierda de los paneles interiores de 1420px. No estirar tablas/campos ilegiblemente ni cambiar lógica.
- Implementado en GitHub: `assets/mct-hero-left-edge-20261028.css` y versión de carga `?v=6` en 22 páginas HTML. Las páginas sin contenido sustantivo que redirigen (login legado, pro-plan, personal-sabatino.htm) no deben rediseñarse; proteger los cuadros de acceso privado.
- **PENDIENTE:** prueba visual real en Cloudflare Pages, escritorio y móvil; el dominio no fue accesible durante la auditoría. No confundir archivos GitHub con despliegue verificado.
- Siguiente tarea: contrastar la versión desplegada y revisar HOME/PRO lado a lado, después FREE, Pricing, Other Projects, Admin y páginas secundarias; corregir únicamente diferencias reales sin interferir con funciones.

## 1. Identidad y repositorio
- Producto y dominio: **My Closing Timeline**, https://myclosingtimeline.com
- Repositorio único: `scampilii-prog/my-closing-timeline`; rama principal: `main`.
- Hosting previsto: Cloudflare Pages + Pages Functions; base de datos Cloudflare D1 (`PRO_DB`); correo Resend; pagos **exclusivamente Stripe Sandbox** mientras no se apruebe el lanzamiento.
- Filosofía aprobada: **“Your Clients. Your Records. Your Privacy.”** Debe permanecer visible con elegancia sin falsas promesas de privacidad certificada.
- Identidad visual: Manrope, azul marino y dorado, logo de HOME como referencia, encabezado fijo y pie coherentes; EN/ES/IT/PT; enlaces internos en **la misma pestaña**; Back to Top funcional; tipografía suficientemente grande; los botones equivalentes mantienen tamaño y estilo uniforme.
- No iniciar un sitio alternativo, no reemplazar módulos aprobados, no quitar funciones existentes para simplificar. El usuario prefiere enlaces de revisión y explicaciones breves, **no HTML, CSS ni ZIP**.

## 2. Estado comprobado de GitHub al cerrar Website 14
- Último commit observado antes de este documento: `1aa7770631882417777768ed484ac75932b01591` — 2026-10-28 20:09:09 UTC — «Refresh shared hero alignment stylesheet v4 in closing-workspace-preview.html».
- Varios commits consecutivos del 28 de octubre añadieron o actualizaron la carga de `assets/mct-hero-left-edge-20261028.css?v=4` en páginas HOME, FREE, PRO, pricing, Help & Contact, Other Projects, Admin y páginas auxiliares.
- La hoja compartida establece `--mct-approved-page-width:1140px`, contenido centrado, márgenes laterales y alineación horizontal del texto sobre las fotografías con el contenido inferior. En móviles fija márgenes de 12px. Se corrige un intento anterior que había extendido páginas a todo el ancho.
- **Website 14 se interrumpió inmediatamente después de esa tanda de commits.** La presencia de commits demuestra cambios en GitHub, **no una revisión visual validada** ni despliegue Cloudflare.
- Archivos de referencia ya existentes: `FIRST_FREE_LAUNCH_CHECKLIST.md`, `PRIVACY_FIRST_REQUIREMENTS.md`, `PRO_SETUP.md`.
- El acceso directo al dominio y a `/api/pro/health` no pudo verificarse desde la sesión Website 15: **Cloudflare, bindings y funcionalidades en vivo quedan sin certificar**. No hay evidencia de ejecución de pruebas en producción.
- El middleware `functions/_middleware.js` está programado para mostrar **Under Construction / Coming Soon** a visitantes anónimos en `/`, mientras permite al propietario autenticado ver HOME. No confundir el comportamiento previsto en el código con observación directa de la web publicada.

## 3. Última decisión visual — prioridad inmediata
1. Los **tres primeros enlaces del header (HOME, FREE Timeline y PRO Timeline)** deben llevar a páginas con **la misma anchura de contenido que la referencia PRO Timeline**, no a un diseño que ocupe todo el viewport.
2. Títulos/textos de la foto de cada página alineados exactamente con el borde izquierdo del panel inferior; aplicar coherentemente a las páginas restantes, incluida Admin Console donde proceda.
3. Evitar nuevas franjas, espacio vertical extra, colisiones, títulos superpuestos, fotografías desproporcionadas y el retorno del defecto de «todo el ancho». Conservar el diseño publicitario aprobado de HOME.
4. Verificar primero en navegador escritorio y móvil, en especial HOME, FREE, PRO, Pricing, Help & Contact, Beyond Real Estate y Admin. **No marcar como terminado hasta confirmarlo visualmente**.
5. Otros cambios aprobados en Website 14: acceso destacado **«NOT A REALTOR? START HERE»** hacia Other Projects / Beyond Real Estate; categorías visibles y uso intuitivo para quien no es Realtor; bloque **PRIVACY FIRST** elegante y bien ubicado, sin cubrir la tabla; campaña First Closing FREE separada del mensaje de privacidad.
6. El lema «Your Clients. Your Records. Your Privacy.» se integra con la estética del sitio; no multiplicar insignias ni duplicarlo sobre capturas. Priorizar la ubicación aprobada bajo la zona fotográfica cuando el diseño lo permita.

## 4. Producto FREE, PRO y Admin — decisiones que deben preservarse
- **Una sola lógica maestra** de cronograma y fechas; FREE, PRO y las pruebas del administrador deben conservar consistencia sin romperse mutuamente.
- **FREE**: Steps 1 y 2, sin Step 3 persistente. Se acordaron seis tareas iniciales de plazos contractuales y hasta dos tareas adicionales gratuitas. Planeación local/no se guarda como closing asociado a cuenta. Resultados claros Today & Tomorrow, email/copiar, advertencias sobre fechas del contrato.
- **PRO**: Steps 1, 2 y 3, seguimiento diario y acceso autenticado a My Closings; un crédito por nuevo closing iniciado, incluso si vino de un código de regalo. Permitir agregar/editar tareas futuras, cambiar Closing Date con motivo y recálculo futuro; fechas vencidas no deben reescribirse retroactivamente; doble confirmación en acciones irreversibles. Una transacción archivada debe ser de solo lectura. Revisar en código cada detalle antes de afirmar que fue probado.
- **Step 1**: referencia privada sin identificación, fechas Effective Date y Closing Date, zona horaria y opciones aplicables. Decisiones antiguas de introducir nombres de clientes, dirección, precio, empresa o datos de contacto quedan **supeditadas a la revisión Privacy First**: jamás reintroducir esos identificadores en la transacción web por conveniencia.
- **Step 2**: tareas de plazos contractuales editables con días, tipo/calendario, recordatorios, estado, fecha exacta y alertas, sumas por Calendar / Business days según contrato. Las fechas sugeridas no sustituyen el contrato firmado.
- **Step 3**: checklist PRO de seguimiento — HOA/condo, estoppel, reparaciones, inspecciones, seguro, títulos, cierre, llaves, utilities y demás; el backend contiene tareas sugeridas para nuevos closings. Preservar Today & Tomorrow y Follow-Up con presentación consistente.
- **Contract form for deadline guidance**: menú inicialmente vacío a elección del cliente, libre para agregar (+ Add) contratos, riders y addenda sin límite. El usuario PRO puede guardar plantillas reutilizables, borrar y establecer una como predeterminada; no representar estas etiquetas como asesoramiento legal o documentos oficiales.
- **Admin Console**: puerta privada separada de cuentas PRO; acceso a pruebas, gestión de invitaciones, códigos y revisión del flujo sin hacer cambios invisibles en datos de clientes.
- Diseño de acciones: botones alineados, estilos homogéneos, avisos importantes legibles y elegantes, tareas con igual Reminder Date usando colores equivalentes.

## 5. PRIVACY FIRST — mandato superior y QA pendiente
Documento vinculante: `PRIVACY_FIRST_REQUIREMENTS.md`.
- FREE/PRO no deben **solicitar, almacenar ni sincronizar** nombres de compradores/vendedores, agentes, direcciones de propiedades, precios ni documentos confidenciales de closings.
- Nuevos closings PRO identificados únicamente por referencia tipo `CL-XXXXXXXX`, fechas y tareas genéricas; el backend guarda dirección vacía. FREE no almacena transacciones en D1.
- Los datos personales opcionales se completan **solo en PDF rellenable descargado y editado localmente** por el cliente, sin subir el PDF a la web.
- Atención: títulos/notes de texto libre, D1 legado, registros técnicos y emails de cuenta todavía requieren auditoría. No proclamar “100% anonymous” ni “no PII stored” sin pruebas exhaustivas.
- No borrar ni migrar masivamente históricos de D1 sin procedimiento y autorización. Revisar seguridad entre usuarios, autorización, consentimientos, políticas de retención, PDF local, UX y cláusulas legales.

## 6. FIRST CLOSING FREE — campaña aprobada de Website 13
Documento vinculante: `FIRST_FREE_LAUNCH_CHECKLIST.md`.
- Página pública `/first-closing-free.html`; gestión privada `/admin-invitations.html`.
- API `functions/api/first-free/[[path]].js`: solicitud, confirmación de correo, revisión/aprobación/declinación por administrador y envío mediante Resend.
- Un **crédito PRO gratis** para primer closing elegible; valor regular **previsto** $29.90; no requiere tarjeta si se aprueba; código único restringido al correo verificado, válido 30 días, canje único; no garantiza elegibilidad.
- Solicitud y marketing estrictamente separados. Casilla publicitaria **opcional y desmarcada por defecto**. Consentimiento registrado solo tras confirmar el correo; debe existir unsubscribe verificable. La base de datos utiliza `first_free_requests` y `marketing_consents` (migración `0005_first_free_invitations.sql`).
- Cuentas/clientes/closing y base de publicidad no se deben confundir. No usar emails de invitaciones para campañas sin consentimiento verificable.
- Todo lo anterior está presente en fuente; **NO certificar envío, Resend, D1, elegibilidad, revocación ni canje reales sin pruebas extremo a extremo**.

## 7. PRO comercial, Stripe, D1 y Resend
Documento vinculante: `PRO_SETUP.md`.
- La API define en código: 1 crédito $29.90; 2 por $59.80; 5 por $149.50. Oferta de lanzamiento `LAUNCH90`: $19.90 / $34.90 / $84.90. Estos son valores actuales del código, no una autorización de venta; anteriores propuestas de $20 por closing están superadas como referencia de programación.
- `functions/api/pro/[[path]].js`: registro, verificación de email, sesiones, planes, códigos, closings, tareas, cambios de fecha y plantillas. `functions/api/pro/webhook.js`: firma de Stripe e idempotencia prevista.
- `migrations/0001...` hasta `0005...`: existen en GitHub; **no consta su aplicación real a D1 producción**. Comprobar configuración `PRO_DB`, `RESEND_API_KEY`, `MCT_FROM_EMAIL`, `PERSONAL_PRACTICE_PASSWORD`, `STRIPE_SECRET_KEY` **de test**, y `STRIPE_WEBHOOK_SECRET` sin mostrar ni copiar secretos en documentos públicos.
- Nunca activar cobros reales, ni abrir la publicidad general de PRO, antes de comprobaciones de Cloudflare y legales.

## 8. Matriz de estado — no confundir código con producción
| Área | Fuente GitHub | Cloudflare/browser/servicios |
|---|---|---|
| Header / 1140 px / fotos / páginas | Estilos v4 guardados | Visual sin certificar |
| HOME e invitación / Coming Soon | Código y middleware presentes | Respuesta pública sin certificar |
| FREE / timeline y PDF local | Código presente | Funciones, fechas y PDF sin certificar |
| PRO / cuentas / credits / tasks | Código presente | Auth/D1/aislamiento sin certificar |
| Stripe | Sandbox y webhook en código | Checkout / firma / idempotencia sin certificar |
| Resend | Rutas de envío en código | Dominio, secretos, entrega sin certificar |
| First Closing FREE | Página + APIs + migración | Formulario→email→admin→canje sin certificar |
| Privacidad | Reglas y cambios parciales documentados | Auditoría/legacy/legal sin certificar |

## 9. Próximas tareas, EN ORDEN
1. **Continuar justo donde quedó Website 14**: comprobar que `mct-hero-left-edge-20261028.css?v=4` se carga realmente en la web desplegada y confirmar HOME/FREE/PRO misma anchura; titulares sobre foto alineados con sección inferior, todas las páginas y móvil. Corregir solo fallos comprobados, sin reabrir decisiones aprobadas.
2. Verificar la última publicación Cloudflare Pages y commit desplegado; separar `main` de producción. En ausencia de acceso Cloudflare, estado **NO VERIFICADO**, nunca “listo”.
3. Ejecutar la matriz de pruebas FREE/PRO/Admin (fechas, tareas, cambios, bloqueo de vencidos, PDFs locales, email, login, privacidad, cuentas aisladas).
4. Ejecutar checklist First Closing FREE sobre D1 real de pruebas y Resend (consentimiento, confirmación, owner, invitación, código, caducidad, canje, unsubscribe).
5. Probar Stripe **Sandbox** y webhook; resolver asuntos de retención, seguridad y avisos legales; solo después considerar lanzamiento al público.

## 10. Protocolo obligatorio para Website 16, 17, etc.
1. Leer **este archivo**, `PROJECT_CHANGELOG.md`, documentos FIRST_FREE/PRIVACY/PRO y los commits recientes de `main`.
2. Describir qué existe en código, qué se probó en Cloudflare y qué está pendiente; no rellenar pruebas no realizadas.
3. Cambiar la menor cantidad de archivos posible y preservar flujos aprobados. Ninguna credencial o registro real de cliente entra en GitHub ni en el changelog.
4. Tras cada grupo de cambios, registrar commit, archivos, motivo, prueba concreta, resultado, limitaciones y próxima tarea en `PROJECT_CHANGELOG.md`; actualizar este maestro cuando cambien decisiones o estado.
5. Mantener un vínculo visible entre tareas pendientes y evidencia reproducible; evitar dar “terminado” por hecho si falta una prueba en producción.

## 11. WEBSITE 22 — Reglas definitivas de flujo FREE → PRO y fechas (30 oct 2026)

Decisiones confirmadas por el propietario. Mantenerlas en TODOS los nuevos chats y antes de nuevos cambios técnicos:

1. **FREE — Tabla 2 = única fuente de datos contractuales visibles.** Sus tareas, fechas y cambios se reflejan íntegramente en **Closing Timeline Summary**. La persona puede usar **Open in Mail / Copy image for Mail** para enviar un email de felicitación y la tabla actual, incluso sin registrarse.
2. **Conversión FREE → cliente activado:** registro/código o crédito permitido, y luego habilitación de **Step 3 — Closing Follow-Up**. Step 3 debe importar las tareas y fechas definitivas de Tabla 2 y agregar las 40 tareas sugeridas de seguimiento, sin perder identidad, notas ni estados; evitar duplicaciones.
3. **Antes de iniciar Step 3 activado**, mostrar de forma clara **Effective Date y Closing Date importadas de Tabla 2**, y un botón de confirmación explícita. NO activar ni consumir crédito antes de confirmación según el flujo de activación aprobado.
4. **Effective Date es irrevocable después de la confirmación de inicio**. Closing Date sí puede actualizarse, dentro de **60 días** según la nueva decisión para este flujo; validar en forma inequívoca el límite y conciliación con reglas de duración y cobro existentes (antes existía máximo de 90 días PRO). No modificar esta regla silenciosamente.
5. **Fechas de Step 3:** tareas contractuales importadas de Tabla 2 + 40 sugerencias de seguimiento; orden ascendente por fecha real. En cada tarea, **After Effective Date = Effective Date + días**; **Before Closing Date = Closing Date − días**, con días positivos expresados para cada dirección, o signo negativo representado inequívocamente. No atribuir valores negativos a After Effective Date por error.
6. **Edición sin mover fila mientras se escribe:** cambios en Days, Date Basis o fecha se hacen en la posición actual. Incluir botón explícito **Apply & Reorder** por tarea (o equivalente claro). Solo al pulsar el botón se valida, recalcula y reubica la tarea una sola vez; luego resaltar/parpadear suavemente **8 segundos** y desplazar la vista para localizar la nueva posición.
7. **Identificación permanente:** # de tarea no cambia por ordenamiento. Conservar notas, estado, Done, alertas; fechas compartidas con Today & Tomorrow, sin otro recálculo que compita.
8. **Auditoría imprescindible:** un solo motor/fuente de fechas compartido por FREE/PRO; eliminar la coexistencia de cálculos y temporizadores contradictorios, examinar lock de vencidas, zona horaria, 29 febrero, cambios de mes/año, business vs calendar days, cambio de Closing Date, preview FREE vs datos persistentes PRO, Summary y email. Mantener diseño existente y evitar cambios cosméticos.
9. **Estado verificado a 30 oct:** código FREE todavía tiene controladores duplicados y fechas inconsistentes en capturas reales. Lo anterior es **especificación**, NO implementación completada ni prueba pasada en Cloudflare. Probar antes de anunciar funcionamiento.

## 12. WEBSITE 23 — Visitor FREE → registration → follow-up activation (30 oct 2026)

NEW definitive owner flow, superseding ambiguities in previous implementations:

- BEFORE anything else: fully test the replacement Step 3 table and its calculations, sorting, reminders, usability, date bases, and column widths. Do not launch account activation until it is reliable.
- Anonymous FREE visitor may practice with normal, fully editable Step 1 and Step 2; the Closing Timeline Summary must reflect exact current Step 2 tasks/dates. Visitor can copy/send congratulations email with the actual timeline to buyer agent, buyer, or any chosen recipient, using visitor's mail app and no card or registration. Do not store recipient personal information.
- While visitor is anonymous, Today & Tomorrow and new Step 3 follow-up must be VISIBLY PRESENT but 20% dimmer (approx. 80% opacity), completely noninteractive (not editable by mouse or keyboard). Preserve visible sample/value context where safe; no active functionality. Make the distinction clear and accessible.
- Use the existing section near Today & Tomorrow / FREE-to-PRO promotion as a tasteful registration activation invitation. Distinguish promotional PRO cards Save PDF/Print, Calendar & Reminders, More Tools from actual registration/activation.
- First eligible new user registers for one complimentary PRO closing credit without a payment card. Subsequent closings regular price currently described to visitors as $20 per closing (ensure pricing across site is verified and unified before launch; earlier project prices differ).
- When user returns authenticated, unlock Today & Tomorrow and Step 3 and recover/import the verified Step 2 exact contract tasks and dates, plus 40 follow-up suggestions, without duplicating and without losing the user's FREE inputs during signup redirect. Preserve privacy/no personal identifiers stored for closings.
- BEFORE starting the active closing present imported Effective Date and Closing Date from Step 2 in Step 3 or activation banner. User may edit Effective Date **before final confirmation only**, then explicitly confirm that it is definitive; after Start, Effective Date is NEVER editable. Confirm using clear irreversible warning and double confirmation as previously approved.
- Closing Date can be edited within **60 calendar days from Effective Date** (owner's stated limit for this activation flow), with dates recomputed accordingly; reconcile any older 90-day plan rule before implementing. Do not silently select contradictory limits.
- Only after confirming dates and activation will Step 3 and Today & Tomorrow function for actual follow-up until closing. Only active paid/gift registered project can persist tasks, notes, Done, alerts and dates. Maintain single clock/date engine, edit pending then Apply & Reorder, stable task identity and 8-second moved-row indicator.
- Current new Step 3 table is a PREVIEW embedded in FREE, not a completed integrated workflow. Legacy table is hidden, not removed from source. Do not claim complete activation, saved data, or production-tested behavior.
- All these requirements are part of definitive WEBSITE 23 continuation and should be retrieved at every new chat. Verify actual production deployment and behavior, and do not mistake code writes for tests.

### Texto explicativo aprobado para WEBSITE 23 — recorrido del cliente

**Objetivo comercial y operativo:** Primero permitir que el visitante conozca y utilice FREE; después ofrecerle gratuitamente su primer closing PRO y finalmente convertirlo en cliente recurrente.

**1. Visitante sin registro.** Utiliza Step 1 y Step 2, introduce fechas y obtiene Closing Timeline Summary, que coincide con la tabla contractual. Puede copiarlo y enviar desde su propio email la felicitación y el calendario a comprador, buyer agent o destinatario que elija, sin registrarse ni introducir tarjeta.

**2. Vista previa PRO.** Today & Tomorrow y Step 3 permanecen visibles pero con aproximadamente 20 % menos de claridad y bloqueadas para mouse y teclado. El visitante observa lo que recibirá al registrarse, sin que la vista previa guarde notas o activos.

**3. Registro y primer closing GRATIS.** Se ofrece Register — First Closing FREE y verificación de cuenta. El primer crédito PRO gratuito para quien reúna las condiciones no requiere tarjeta; los cierres siguientes son pagados al precio vigente que se deberá conciliar en todas las páginas.

**4. Confirmación de fechas.** Al regresar autenticado, recuperar los datos verdaderos de Step 2 y mostrar Effective Date y Closing Date. Antes de activar podrá corregirlos. Pedir confirmación explícita, incluyendo aviso de que Effective Date quedará irreversible después de Start; Closing Date podrá cambiarse dentro del límite acordado de 60 días desde Effective Date (conciliar con la regla anterior de 90 días).

**5. Seguimiento activo.** Se habilitan Step 3 y Today & Tomorrow; incorporar tareas de la tabla 2 y 40 tareas sugeridas sin duplicados innecesarios. Orden por fecha correcta; notas, alertas y Done funcionales, con cambios sujetos a Apply & Reorder y resaltado durante 8 segundos.

**Ubicación de la invitación de registro.** Aprovechar el espacio promocional cercano a Today & Tomorrow. Mantener Save PDF / Print, Calendar & Reminders y More Tools como presentación de beneficios PRO, diferenciados del botón de registro.

**Prioridad antes de activar clientes:** probar por completo la nueva Step 3 y todos los cálculos. Este texto es una especificación definitiva, NO una afirmación de que la activación y persistencia ya funcionen en producción.


## NORMA DE DISEÑO GLOBAL — 30 OCT 2026 (pendiente de auditoría)

- Antes de extender la alineación del hero a páginas existentes, corregir y verificar los errores en la página de referencia FREE Timeline. **No propagar estilos rotos.**
- Todo hero fotográfico debe alinear su contenido a los bordes reales del contenido principal inferior, con una sola regla de geometría activa por página; nada de padding/margins de generaciones anteriores que compitan.
- Mantener las imágenes y textos propios de cada página; no forzar la fotografía FREE a PRO, PLUS, Home, Login, Registro o Administración.
- Tarjeta Privacy First compacta, contenido comercial claro y sin superposición. Adaptación móvil real. Cabecera y navegación unificadas sin eliminar controles.
- Auditar CSS heredado y eliminar solo reglas obsoletas verificadas; conservar código funcional de fechas, tablas, formularios, registros, privacidad y pagos.
- Probar en el sitio publicado desktop y móvil antes de declarar todas las páginas arregladas.
- Esta norma **no implica que la revisión de todas las páginas ya esté completada**. El usuario ha reportado nuevos problemas visuales y requieren diagnóstico antes de despliegues generales.


## Approved business model — Real Estate & Project Timeline (2026-10-31)

- Two professional verticals: **Real Estate Closing Timeline** (Realtors, brokers, closing companies, transaction coordinators) and **Project Timeline** (other professionals). Preserve **FREE Timeline** and **PRO Timeline** as common service levels.
- For **both** groups: a verified new user receives **one first project with 60 days of PRO access FREE** to practice; this benefit is per eligible account, not a fresh trial for every project. Do not require a paid subscription to start that first complimentary project. Prevent duplicate claims by account/email; do not enable automatic renewal without clear consent.
- After eligibility is exhausted, **Real Estate**: $20 per closing/project, with at most **60 days** of paid access. Stop at closing/completion or expiration as defined in the eventual terms; no automatic monthly continuation. Effective/closing date limitations and existing business rules must be reconciled before activating billing.
- After eligibility is exhausted, **Project Timeline**: $20 upfront per new paid project for a **minimum initial 60-day term**; do not shorten or prorate the initial two months. If still active after those 60 days, bill **$10/month for each active project** via expressly authorized card subscription until the professional selects **Completed** or cancels. Avoid charging for completed projects after the applicable period; provide clear self-service cancellation and billing cutoff.
- The two professional verticals should share the same core timeline/task/date/follow-up engine, with separate suggestion catalogs and presentation. Both have completion, downloadable/local private client/project PDF fields, and privacy-first handling. Preserve private PDF fields on-device; do not upload sensitive customer records.
- **Implementation status:** pricing, automatic subscription renewal, 60-day free eligibility and new completion/payment workflow are **requirements, not live features**. Do not announce that they are operational or collect money until back-end, Stripe lifecycle, entitlements, cancellation and full end-to-end tests pass.
- Navigation concept: Home / Real Estate Closing Timeline / Project Timeline / FREE Timeline / PRO Timeline / Help & Contact. Existing FREE and PRO should continue to work; avoid broad header replacements until rollout tested.
- Pages created: `/real-estate-timeline.html` (preserves a copy of current FREE full planner, needs eventual integrated vertical navigation), `/timeline-plus.html` repurposed as the new Project Timeline landing. Eventually prefer a descriptive `/project-timeline.html` URL with appropriate redirect, after testing and SEO planning.
