# MY CLOSING TIMELINE — DOCUMENTO MAESTRO DE CONTINUIDAD
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
