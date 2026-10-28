# MY CLOSING TIMELINE — RESUMEN OPERATIVO PARA EL PRÓXIMO CHAT
## WEBSITE 16 · 28 oct 2026 · Invited FREE activation simplified + email logo repaired
- Usuario probó flujo real: recibió email con FREE code, pero el logo era un rectángulo de imagen rota; al pulsar `Redeem My FREE Closing` entró a `/pro-activate.html#gift=...` que mostraba a la vez FREE/Stripe y CTA de registro poco evidente.
- Cambiado `pro-activate.html` a recorrido claro en 2 pasos: **Create My FREE Account** (botón principal dorado) y **Already registered? Sign In** (blanco con borde azul), **alineados en la MISMA FILA** incluso en móvil. Paso 2: activar crédito $0.00. La opción de Stripe Sandbox se oculta si el visitante llegó con un código válido, pero sigue disponible en otras rutas cuando no hay código. Se mantiene identidad y callbacks.
- CSS en `assets/mct-pro-activation-20261028.css`; JS en `assets/mct-pro-activation-20261028.js`. Código del email se guarda 24h bajo las claves compatibles `mct-activation-code-pending-v1` (sessionStorage) y `mct-pending-private-gift-v1` (localStorage) para no perderlo al registrar/verificar e iniciar sesión. HTML carga CSS/JS con `?v=2`.
- Emails first-free `functions/api/first-free/[[path]].js`: eliminado `myclosingtimeline-email-logo-dark.png` (causaba imagen rota y recuadro muy alto). Ahora `brandMark` compartido dibuja un calendario blanco con check turquesa y wordmark navy/turquesa mediante tablas HTML de email **sin depender de imágenes remotas**; aplicado tanto a email de confirmar correo como a email que entrega código. Email de código explica que después del botón hay que pulsar el botón dorado o Sign In con mismo email.
- Commits clave: `82255a3b7e265d5d1533d9c7d47b7b3c78aa7966` HTML, `525779131d579fb1bf5c487f42644aadf4f98db9` y `9403772953101c543bfc778f9d7a1e5370105c1e` CSS, `061dde862306c6edc43ad77f824d4b68433a53f6` JS, `b4bfcd2a10e2954c03fd82e287bb593f98cef0b8` y `7b8420e3fe2719f4a7fa6dacc3042ac2a40e5266` email.
- QA: sintaxis JS para servidor (sin export) y cliente OK; IDs de formulario, límites una sola vez y endpoints conservados. **Cloudflare visual y entrega del nuevo formato todavía no verificadas**. Correos YA enviados no cambian. No recomendar resetear código mientras se está tratando de canjear el código actual.


## WEBSITE 16 · 28-oct-2026 · Owner Reset FREE Test corregido
- El propietario quiere usar **un solo email para todas las pruebas**. El dueño pulsa una sola vez **Reset FREE Test** en `/admin-invitations`; no hay diálogos. La pantalla ahora muestra **Ready for New Test** tras reset, no el confuso `Pending Verification`. Tras solicitar el nuevo código aparece `Awaiting Email Confirmation`. El objetivo es repetir el recorrido de visitante con el mismo correo, incluyendo confirmar el nuevo email, sin borrar cuentas, cierres ni créditos comprados.
- Se corrigió en `functions/api/first-free/[[path]].js` el bloqueo que antes impedía volver a solicitar códigos desde un correo previamente usado: `ownerResetReady` ahora se calcula antes de controles de IP y concede una excepción solo al siguiente intento expresamente autorizado por owner; `eligible()` no bloquea ese nuevo intento. Se conservan confirmación de correo, código un solo uso, fila única por email y límites normales de visitantes. El email-throttle se reinicia con cada owner reset; no se da acceso a reiniciar desde cuentas de clientes.
- En caso de fallo del proveedor de email, se conserva la fila preexistente para reintentar y no se borra historial. `admin/list` devuelve solo booleano `confirmation_sent`, sin exponer token. No afirmar funcionamiento publicado sin verificar Cloudflare + D1 y Resend.
- Commits: `7e905731784257c053987e659fb3602774734ee4` (API); `c298bc8fc3c3113c7228721eb9269c3add80e741` (Admin). QA estática de 4 archivos OK.


**Website 16 · actualización: 28 de octubre de 2026 · leer este archivo PRIMERO.**

> **Propósito:** conservar lo importante de Websites 1–15 sin copiar conversaciones extensas. Fuente de verdad: código actual de la rama `main` + este resumen. Para decisiones técnicas, consultar [PROJECT_CONTINUITY_MASTER.md](PROJECT_CONTINUITY_MASTER.md), [PROJECT_CHANGELOG.md](PROJECT_CHANGELOG.md), [PRIVACY_FIRST_REQUIREMENTS.md](PRIVACY_FIRST_REQUIREMENTS.md), [FIRST_FREE_LAUNCH_CHECKLIST.md](FIRST_FREE_LAUNCH_CHECKLIST.md) y [PRO_SETUP.md](PRO_SETUP.md). Este resumen no reemplaza una prueba del sitio publicado.

## WEBSITE 16 — START HERE: último diseño de destello ancho (28-oct-2026)
- Última preferencia: usuario aportó 4 imágenes de starburst; no quiere estrella pequeña de cinco puntas ni medallón. Cambiarla por un **estallido grande, ancho, con 16 puntas**, verde lima/marfil con perfil verde, debajo de START HERE.
- Se bajó el aviso verde a 12px dentro del marco exterior (antes estaba 6px POR ENCIMA), se reservó altura de 127px arriba, y se creó burst CSS de 192×72px (170×66px móvil). Debajo está el bloque crema con título PRO intacto. No invade el cuadro central ni foto superior.
- Archivo `index.html` commit `a0869bf3ed7f424ba6a199af8dfad8292fa34703`. Comprobación solo estática; verificar Cloudflare, desktop/móvil antes de afirmar acabado.
- Enlace revisión: https://myclosingtimeline.com/?mct_refresh=wide-burst-20261028#home-essentials

## WEBSITE 16 — Corrección final de estrella y color (28-oct-2026)
- El propietario rechazó la estrella pequeña en un medallón dentro del recuadro. Se corrigió: verde START HERE **centrado en el borde alto de la primera tarjeta**, estrella grande **debajo del letrero** dentro del mismo eje vertical, sobresaliendo apenas hacia arriba de la tarjeta, con suficiente espacio inferior para no tapar `Your First PRO Closing Could Be FREE.`. No tocar la foto, la tarjeta derecha ni TODAY & TOMORROW.
- Color estrella actualizado a **cobre rosado suave** (`#e7a990`) con borde marfil. Sin disco circular. Mantener verde del letrero; evitar volver al diseño de medallón anterior.
- `index.html`, commits `b384503ab54637a55f41af78d1018b7c34378316` y `f8e0dc038aeb6ab620996b5b1ff93648c558043f`. Probado estáticamente en GitHub, pendiente comprobar en Cloudflare y en navegador real.

## WEBSITE 16 — HOME: estrella bajo el aviso START HERE (28-oct-2026)
- Última solicitud aprobada: primera tarjeta HOME START HERE en verde más visible y una **estrella dorada ★ inmediatamente debajo**, dentro de un pequeño medallón luminoso. Se aplicó en `index.html`, commit `063d0aab349b1522a3af991bd0abbb72b6bc6398`.
- Preservar la presentación horizontal del intro, el bloque vertical etiqueta/estrella, los dos caminos Realtor FREE y primer PRO Closing gratis, y todos los cuadros restantes. Verificado solo estáticamente en GitHub; Cloudflare/móvil no certificados.
- Ver https://myclosingtimeline.com/?mct_refresh=start-here-star-20261028#home-essentials

## WEBSITE 16 — HOME: completar los cuadros acompañantes del START HERE (28-oct-2026)
- Última aprobación: el cuadro central **Today & Tomorrow** mantiene su ejemplo y agrega un panel práctico al fondo `YOUR NEXT STEP` con un único botón **Create My FREE Timeline** hacia `/free-timeline.html` (sin duplicar el antiguo CTA en el pie).
- La tarjeta derecha **Privacy First** eleva el título `Keep personal details private.` y explica visualmente qué sí escribir online (referencia privada, fechas, tareas genéricas) y qué conservar solo en el dispositivo (nombres, direcciones, precios y documentos). Mantener el aviso sobre salvaguardas aún bajo revisión, el enlace a Privacy y el slogan.
- Solo `index.html` (commits `21b9acc77b65d3fbdfeed0ce9bbb299351802825`, `85edd6d60a286d608cd22c8923302ba0bd695b42`). QA estático: bloques presentes y enlaces destino conservados; **publicación Cloudflare y prueba visual no verificadas**.
- Página: https://myclosingtimeline.com/?mct_refresh=home-companion-cards-20261028#home-essentials

## WEBSITE 16 — HOME: START HERE ahora es la PRIMERA tarjeta (28-oct-2026)
- Última preferencia del propietario: **START HERE va en la primera columna a la izquierda de HOME, debajo del hero fotográfico**; **Today & Tomorrow queda en el medio** y **Privacy First a la derecha**.
- El recuadro izquierdo contiene la orientación FREE/PRO y **Beyond Real Estate** debajo. Fondo exterior navy→turquesa con marco dorado y sombra; interior crema/dorado; dos opciones FREE teal/PRO dorado. El visitante debe reconocer dónde comenzar antes de ver el ejemplo de fechas.
- HTML `index.html` reordenado también a nivel DOM, adaptado a móvil apilando en el mismo orden. NO mover el recuadro sobre la foto a pantalla completa ni alterar rutas de Realtor/Other Projects.
- Commits `22c97288f0e3fec22d932b89d65c783636053956` + `dc5788ffbc041bb75a2ab286ce9a19e81a01bd96`. Orden/IDs/estilos comprobados estáticamente en GitHub. **Cloudflare, apariencia real y móvil pendientes**.
- Enlace para revisar como propietario: https://myclosingtimeline.com/?mct_refresh=start-first-20261028#home-essentials

## WEBSITE 16 — HOME: orientación inmediata del nuevo visitante (28-oct-2026)
- En `index.html` el recuadro CENTRAL de HOME (`#mct-first-free-offer`, arriba de Beyond Real Estate) ahora incluye un distintivo verde **START HERE** y explica claramente dos opciones ALTERNATIVAS: abrir el Realtor FREE Timeline sin registro o solicitar un código del primer Realtor PRO Closing gratis sujeto a verificación/aprobación. Bajo ellas figura `Already have a code? Redeem & start`.
- Mantener título **Your First PRO Closing Could Be FREE.**, el botón Beyond Real Estate debajo y la guía Privacy First de la derecha. No agregar un segundo recuadro introductorio redundante.
- Cambios guardados solo en `index.html` + changelog. GitHub commit `1117b112b1871289493ae245b9699118d6cde0b5`; destinos existentes y único identificador de tarjeta comprobados. **Cloudflare/browser QA no verificados.** HOME pública sigue protegida por middleware, salvo propietario con sesión activa.
- Enlace: https://myclosingtimeline.com/?mct_refresh=start-here-20261028#home-essentials

## WEBSITE 16 — Actualización 28-oct-2026 · después de Website 15
- **Se continuó `main`, sin rehacer la web.** Los documentos maestros fueron leídos antes de cambiar archivos.
- **Other Projects FREE ya tiene un planificador de navegador para pruebas:** Step 1 referencia privada + inicio + fin opcional; Step 2 hasta 8 tareas editables, fechas, Done/Remove, resumen copiable y calendario .ics local. Ninguna tarea se sube ni se guarda en cuenta; recargar borra FREE.
- **Other Projects PRO SOLO DEMO:** Step 3 permite tareas propias, frecuencia once/daily/weekly/monthly, notas genéricas, responsable como función, última fecha de repetición, períodos de planificación 1/3/12 meses o indefinidos, historial de ocurrencias (sin el límite previo de 50 en nueva actividad), próximo vencimiento y Undo. Persistencia SOLO localStorage navegador del visitante, no D1 ni usuario autenticado; no emails de recordatorio ni pagos.
- **Separar duración de créditos:** desaparecieron precios inmobiliarios de botones mensuales. La regla futura es 1 proyecto PRO/1 crédito, independientemente de si el proyecto dura meses o es continuo; NO ofertar ni cobrar Other Projects hasta aprobación comercial y funcional.
- **Archivos:** `other-projects.html`, `assets/mpt-project-task-demo-20261028.js?v=16`, `assets/mpt-task-demo-20261028.css?v=16`. En Realtor FREE/PRO y APIs PRO inmobiliarias no hubo modificaciones.
- **QA:** sintaxis JS verificada, 34 IDs del script emparejan el HTML, sin duplicados, pruebas de fechas daily/weekly/monthly/once y fin de mes correctas. NO verificado navegador real, Cloudflare, backend, seguridad multiusuario ni envío de email.
- **Próximo:** comprobar UI/funcionalidad FREE y demo PRO en Cloudflare y móvil; introducir almacenamiento por usuario y aislamiento seguros en backend propio solo tras completar privacidad, migraciones y revisión comercial; no activar Stripe. Leer `PROJECT_CHANGELOG.md` para evidencias.
- **Página para comprobar:** https://myclosingtimeline.com/other-projects.html — enlace con anclas `#mpt-free-task-demo` y `#mpt-pro-task-demo`. Si faltan campos en producción, revisar primero si Cloudflare publicó la última versión.

## A. Identidad, modo de trabajo y decisiones INALTERABLES
- Web: **https://myclosingtimeline.com**; GitHub: **`scampilii-prog/my-closing-timeline`**, rama **`main`**; Cloudflare Pages + Functions, D1, Resend y Stripe **Sandbox**.
- **Continuar la web EXISTENTE**, no diseñar ni crear otra; no desmontar módulos aprobados ni romper FREE/PRO/Admin. El propietario prefiere que el asistente **haga cambios directamente en GitHub, muestre enlaces de la página, explique en español, sin HTML/CSS/ZIP**, con estilo elegante, legible, funcional, consistente, y enlaces en la misma pestaña.
- **Regla definitiva de ancho: 1.420 px máximos para TODAS las páginas**, HOME incluida. Centrado, adaptable a móvil (márgenes 20 px desktop / 12 px móvil). No volver a 1.140 ni 1.280 px. Fotografías de cabecera pueden cubrir el fondo completo, pero **sus textos se alinean con el borde izquierdo del contenido**. Header, logo, footer y tipografía Manrope uniformes; HOME es referencia para el logo. Alinear títulos también en Admin cuando aplique.
- **Slogan fijo:** `Your Clients. Your Records. Your Privacy.`, elegante, sin afirmaciones absolutas de seguridad aún no verificadas.
- **Other Projects / Beyond Real Estate** también debe ser claramente visible y accesible para quien no sea REALTOR®, con rutas separadas y descripción simple.

## B. Último cambio aprobado de Website 15
- Estilo compartido de ancho: **`assets/mct-hero-left-edge-20261028.css`**, referenciado como **`?v=6`** en **22 páginas HTML**, con máximo compartido de 1.420 px. Código guardado en GitHub; Cloudflare y aspecto en navegador todavía no certificados independientemente.
- HOME, sección FREE: el CTA **`Create & Share Your FREE Summary`** estaba ilegible (texto azul sobre botón azul oscuro). Última corrección: **fondo dorado, letras azul marino**, destino `free-timeline.html`; HTML del enlace lleva `data-mct-cta-version="gold-20261028-v2"`. Cambio guardado y comprobado en GitHub. El propietario respondió **«Perfecto»** tras este cambio. No regresar a la combinación anterior.
- Enlace visual: https://myclosingtimeline.com/?mct_refresh=20261028gold2#free-benefits . Si no coincide en pantalla, verificar caché/publicación Cloudflare antes de añadir CSS redundante.

## C. Qué debe funcionar en cada producto
- **Una lógica contractual maestra** compartida para FREE, PRO y pruebas Admin, con fechas y tareas coherentes. Las sugerencias nunca sustituyen las fechas del contrato firmado.
- **FREE:** Step 1 + Step 2, **sin Step 3 persistente**. Seis tareas contractuales sugeridas + **dos adicionales**, editable, Today & Tomorrow, email/copiar resumen, sin cuenta ni guardar closing en D1. FREE para probar sin costo.
- **PRO:** Step 1 (datos no identificables, fechas, referencia privada), Step 2 (plazos, Calendar/Business days según contrato, recordatorios, controles y bloqueo de vencidos) y **Step 3** (seguimiento diario: HOA, estoppel, title, insurance, repairs, keys, etc.). **40+ tareas sugeridas** de Follow-Up, edición futura, tareas propias, Today & Tomorrow, My Closings, resúmenes PDF/email y creación de nuevos closings con un crédito.
- **Fechas:** Effective Date protegida después de Start; Closing Date futura modificable con motivo y recálculo solamente de tareas futuras; acciones sensibles/cancelación con doble confirmación; no reescribir vencimientos pasados; archivados de solo lectura.
- **Contract form for deadline guidance:** no forzar valores preseleccionados; permitir crear, borrar y reutilizar etiquetas de contratos/riders/addenda según el usuario; plantillas guardadas en PRO.
- **Admin Console:** solo propietario, navegación a pruebas FREE/PRO, revisión de códigos, invitaciones, incidencias y flujos sin exponer datos o accesos privados.

## D. Privacidad, campaña y cobro
- **Privacy First:** NO solicitar ni guardar en transacciones web nombres de buyer/seller, agentes, dirección de la propiedad, precio o documentos privados. Usar referencias genéricas `CL-XXXXXXXX` y fechas/tareas no identificables. Los datos personales para un PDF opcional solo se rellenan **localmente en el navegador**. Auditar texto libre, D1 legado, logs, seguridad por usuario y promesas legales antes de vender o publicitar.
- **First Closing FREE:** visitante puede pedir código de primer crédito PRO sin costo (valor nominal previsto **$29.90**); verificar email, aprobación del administrador, código por correo/usuario, válido 30 días, un solo uso. Datos de marketing **separados**, casilla opcional inicialmente desmarcada, con baja/unsubscribe. Páginas: `/first-closing-free.html` y `/admin-invitations.html`. API `functions/api/first-free/[[path]].js`.
- **Precios previstos en código:** 1 crédito $29.90, 2 $59.80, 5 $149.50; campaña LAUNCH90 con descuentos. No asumir que estos precios están publicados o que se permite cobrar.
- **Stripe solo Sandbox**, no pagos reales aún. Confirmar primero Cloudflare Pages/D1 migrations 0001–0005, Resend, permisos, aislamiento por cuentas, emails/opt-out, webhooks, códigos, tests de fechas y revisión legal.

## D2. Nuevo recorrido aprobado — visitante por primera vez (Website 15)
- En `pro-get-started.html` hay ahora instrucciones más sencillas: **un crédito = un cierre PRO**; primero elegir solicitar invitación `First Closing FREE` o registrar cuenta y escoger un paquete de **pago TEST / Stripe Sandbox**. El botón de solicitud va a `first-closing-free.html`.
- Para FREE: completar correo en `first-closing-free.html` (marketing opcional desmarcado), confirmar email, esperar aprobación Admin, recibir código único vigente 30 días. Crear cuenta o iniciar sesión con **el mismo correo**, verificar cuenta, canjear código a $0 sin tarjeta. No concederlo sin aprobación ni confundir con `LAUNCH90` (descuento de compra, no crédito gratis).
- PRO: abrir `my-closings.html`, seleccionar `+ Start New Closing`, utilizar referencia privada `CL-XXXXXXXX` y fechas, seleccionar el cierre, descargar `Download Private Fillable PDF`; completar nombres/direcciones únicamente en el PDF guardado localmente.
- Cambios hechos SOLO de explicación y navegación (más `my-closings.html` texto de guía). No se han probado registros, emails, checkout, D1 ni PDF en Cloudflare en vivo. No activar pagos reales.
- Próxima acción del usuario: abrir `https://myclosingtimeline.com/first-closing-free.html` como nuevo visitante e informar en qué paso llega o qué error aparece. Tras un código aprobado, usar `https://myclosingtimeline.com/pro-get-started.html?auth=register&mode=gift#mct-account`.

## D5. Other Projects — encabezado full-width y Privacy First en el lado derecho (Website 15)
- El propietario pidió insertar el mensaje **Privacy First** a la derecha del encabezado fotográfico/degradado de **Other Projects**, con estilo nuevo elegante; después ordenó explícitamente que el cabezal ocupara **todo el ancho de la pantalla**.
- **Implementado en `other-projects.html`:** sección `.mpt-hero-wide` de `100vw` (borde a borde) con fondo degradado; texto y panel interno `.mpt-hero-shell` centrados a máximo **1420px**. A la izquierda sigue «Every project. One clear timeline.»; a la derecha aparece tarjeta elegante con «PRIVACY FIRST», icono escudo, slogan exacto «Your Clients. Your Records. Your Privacy.», nota «Privacy-first design. Improvements in progress.» y enlace a `privacy.html#mct-privacy-policy`. En móvil la tarjeta queda debajo del texto.
- **No se cambian** herramientas FREE/PRO de proyectos, que siguen como previews (COMING NEXT), seguridad, pagos ni otras páginas. Código guardado en GitHub; vista Cloudflare y QA visual aún pendientes.

## D4. Último ajuste: foto de HOME ocupa toda la pantalla
- HOME: la **fotografía superior es full-bleed (100vw)**, independiente del máximo 1420px de las secciones interiores. El propietario rechazó que se vea más estrecha. No volver a restringir su ancho al main.
- El menú Other Projects debe ser **BLANCO como los demás enlaces**, salvo activo o hover (dorado). CSS canónica v11.
- Actualizado en GitHub; apariencia desplegada en Cloudflare sin verificar todavía.

## D3. Website 15 — acceso permanente a clientes NO Realtors
- Decisión aprobada: mostrar **Other Projects** como **sexto enlace del header**, situado **entre PRO Timeline y Plans & Pricing**, accesible en la misma pestaña en las **21 páginas con navegación pública canónica** (incluyendo las privadas que comparten ese header). En la propia `other-projects.html`, el enlace debe ser el activo.
- Abre **`https://myclosingtimeline.com/other-projects.html`**. Presenta alternativas de organización para negocios, construcción, servicios y proyectos personales. **FREE y PRO de Other Projects están señalados como preview/COMING NEXT**; no prometer herramientas ni pagos que aún no estén publicados.
- Estilo dorado discreto `mct-nav-other-projects` en `assets/header-canonical-20261027.css?v=10`; `assets/navigation-extras.js?v=20261028-other-projects` aporta las traducciones ES/IT/PT del nuevo nombre. Se conservan ancho máximo de contenido 1420px, logo, registro, HOME y demás enlaces.
- Cambios confirmados en GitHub; despliegue en Cloudflare/visualización móvil todavía pendientes de verificar. Ante caché, recargar la página.

## D6. Privacy First explicado en palabras sencillas — HOME y Other Projects
- El propietario señaló que el cuadro vino/rojo **no se entendía**. Decisión: el slogan `Your Clients. Your Records. Your Privacy.` sigue, pero como firma secundaria; NO sustituye una instrucción práctica.
- **HOME `index.html`:** reemplazada la antigua caja `.mct-brand-slogan` por `.mct-home-privacy-guide`, un cuadro elegante que explica: usar referencia de closing en lugar de nombres/direcciones online, completar información personal en el PDF local, y que las protecciones aún están en revisión. Con enlace a política de privacidad. La etiqueta verde PRIVACY FIRST y escudo son compactos.
- **Other Projects `other-projects.html`:** tarjeta maroon a la derecha del hero explica evitar nombres, direcciones y datos privados en tareas/notas; deja claro que los proyectos son PREVIEWS y que los controles de privacidad siguen bajo revisión.
- No cambiar por un slogan ambiguo ni prometer almacenamiento cifrado/verificado sin auditoría. Código en GitHub; QA visual Cloudflare pendiente.
- **HOME fotografía:** `<main id="home-overview">` corregido a ancho total en estilo `mct-home-hero-full-bleed-v2-20261028`. Solo los paneles inferiores siguen centrados a 1420px; el cabezal superior debe extenderse de borde a borde.

## D7. Privacy First explicado también en PRO Timeline — Website 15
- **Solicitud sobre captura 5:12 PM:** el recuadro rojo/derecho de `/pro-get-started.html`, al lado de «Real Estate Closing or Other Projects?», debe explicar la privacidad igual que HOME y no mostrar solo un slogan.
- **Implementado:** se reemplazó únicamente la tarjeta privada `.mct-brand-slogan` de `.mct-pro-privacy-standalone` por `.mct-pro-privacy-guide`, con etiqueta pequeña PRIVACY FIRST, escudo, título «Keep client details private», instrucciones: online solo referencia y fechas, nunca nombres/direcciones/precios; PDF guardado y completado localmente; protecciones bajo revisión; enlace a política. El slogan se conserva como pie discreto. Diseño responsive, sin tocar la selección de productos, registro, promociones ni checkout.
- **Estado:** confirmación del archivo/commit en GitHub; publicación Cloudflare y QA visual pendientes. No afirmar medidas de seguridad no auditadas.

## D8. FREE y PRO: aviso visible para visitantes que NO son Realtors — Website 15
- El propietario pidió que las páginas **FREE Timeline** (`free-timeline.html`) y **PRO Timeline** (`pro-get-started.html`) expliquen claramente que también existe **Other Projects** para dueños de negocios, contratistas, proveedores de servicios y planes personales.
- **Implementación GitHub:** debajo del selector «Real Estate Closing or Other Projects?» se añadió en ambas páginas un panel diferente y elegante con la etiqueta «NOT A REALTOR? THIS IS FOR YOU», el título «Organize your own business or personal projects», un resumen y el botón **«Explore Other Projects →»**. Todos los accesos de esas dos páginas (menú, selector, botón) llevan directamente a `/other-projects.html`, sin parámetros innecesarios y en la misma pestaña.
- **Estilo compartido:** `assets/mct-project-path-20261028.css?v=2`, responsive, tarjeta turquesa suave, CTA azul marino de alto contraste y aviso «FREE & PRO previews · Tools coming soon».
- **QA:** inspección estática de todos los enlaces internos de ambas páginas contra los archivos GitHub y anclas locales: **0 destinos inexistentes**; referencias CSS y destino directo comprobados. **No equivale a prueba runtime ni publicación Cloudflare**: acceso HTTP del dominio no disponible desde el navegador de verificación.
- **Regla de honestidad:** Other Projects FREE y PRO son aún vistas previas; no anunciar creación, guardado ni pago como disponibles hasta completar el desarrollo y las pruebas.

## D9. Títulos de FREE y PRO sin confusión entre Realtors y otros profesionales
- Decisión Website 15: el usuario quiere **los dos títulos (uno en FREE, otro en PRO)** explícitos para explicar que el sitio contempla Realtors y otros profesionales que necesitan programar tareas de sus propios negocios. No anunciar general project tools ya operativos.
- En `free-timeline.html` y `pro-get-started.html`, título del selector ahora: **“Real Estate Closings & Business Projects — Choose Your Timeline.”** con intro `FOR REALTORS & OTHER PROFESSIONALS`, explicando en un párrafo diferencia entre herramientas inmobiliarias y modelos futuros de negocios y servicios.
- En ambos avisos el título: **“Realtors: manage closings. Other professionals: plan your own tasks.”** La descripción aclara que **Other Projects FREE & PRO son previews, todavía no funcionan como proyectos editables**; enlace directo a `/other-projects.html`.
- CSS de presentación uniforme `assets/mct-project-path-20261028.css?v=3`. Código y links confirmados GitHub; QA visual y Cloudflare pendientes.

## D10. Elección definitiva y elegante de audiencias — FREE y PRO (Website 15)
- El propietario rechazó textos redundantes que confundían al visitante. En ambas páginas `free-timeline.html` y `pro-get-started.html` hay **UN SOLO selector** con encabezado «Choose your timeline.» y DOS tarjetas grandes de colores: **azul marino/dorado «I'm a Realtor»** y **verde turquesa «I'm another professional»**. Su jerarquía: categoría, título grande destacado y subrayado fino, objetivo breve, disponibilidad y botón claro abajo.
- La tarjeta Realtor lleva a la herramienta inmobiliaria de la misma página (`#mct-free-transaction` en FREE o `#mct-start-choice` en PRO); la tarjeta Other Professional abre **`/other-projects.html`** en la misma pestaña. Distingue claramente que los modelos generales son **PREVIEW ONLY — coming soon**. Se retiraron cuadros extra repetitivos.
- CSS centralizado `assets/mct-project-path-20261028.css?v=6`, adaptable a móvil. Verificados en GitHub los 2 enlaces y el código/estilos. No se modificaron motores de fechas, acceso ni pagos. QA de Cloudflare sin certificar.

## D11. Other Projects: ejemplos concretos de 20 tareas de seguimiento PRO (Website 15)
- Petición del propietario: la sección «FREE · Two simple steps» de `other-projects.html` no debía mostrar filas vacías; mostrar unos **20 ejemplos comunes de tareas de seguimiento** para que empresarios, contratistas y otros profesionales entiendan la utilidad futura de pagar PRO por **Step 3**.
- Implementado en GitHub: FREE ahora se titula «FREE · Build your own tasks in two steps» y su tabla visual incluye **5 ejemplos genéricos**, claramente etiquetados como ilustraciones, no tareas predeterminadas. Debajo hay un bloque «PRO · STEP 3 FOLLOW-UP PREVIEW» con **20 tareas genéricas**, organizadas en cuatro grupos de 5: planificación/aprobaciones, personal/recursos, progreso/calidad y cierre/seguimiento; cada una con una breve acción de seguimiento. La sección PRO enlaza de vuelta a esta muestra.
- **Separación indispensable:** FREE proyectado solo Steps 1 y 2 con tareas en blanco (hasta 8); **PRO proyectado** añade Step 3 y seguimiento. Los 20 elementos son **solo lectura y ejemplos**, no se guardan ni se incorporan al timeline, no hay descuentos, créditos ni pagos reales para Other Projects. Mostrar nota «not available yet» y no prometer fechas de salida.
- Estilos exclusivos en `other-projects.html`, con agrupación responsive en dos columnas/escritorio y una/móvil. No cambiar motores inmobiliarios FREE/PRO ni la privacidad aprobada. Código verificado en GitHub; QA visual Cloudflare pendiente.

## D12. Otras profesiones: 20 tareas visibles en tabla FREE y modelo PRO flexible (Website 15)
- El propietario indicó que **solo aparecían cinco filas de muestra** y faltaba aclarar que **cada cliente escribe tareas propias**, adaptadas a su profesión; el futuro PRO debe permitir seguimiento hasta una fecha concreta **o durante tiempo indefinido**.
- En `other-projects.html` se muestran ahora **20 filas de ejemplos en la tabla superior FREE**, numeradas de 01 a 20, con días y fechas «Client sets». **Son ejemplos visuales, no tareas automáticas ni un aumento del límite FREE.** El FREE planificado sigue con hasta **8 tareas propias** en 2 pasos.
- Un bloque visual con tres columnas aclara: «You create the tasks» / «PRO · UNLIMITED TASKS» / «Finish or keep going». **PRO planificado:** tareas personalizadas sin límite fijo **dentro de cada proyecto** (un crédito por proyecto), seguimiento continuo, finalizar en fecha indicada o mantener proyecto sin fecha de cierre. No confundir «tareas ilimitadas» con «proyectos ilimitados».
- Se conserva más abajo la muestra de **20 acciones de seguimiento Step 3** en cuatro grupos, para enseñar el valor de PRO. No se añade JavaScript ni cambia funcionamiento real: tanto FREE como PRO de Other Projects aún son **preview no operativo**. No cobrar ni garantizar controles no implementados.
- Código actualizado en GitHub. Falta comprobar Cloudflare y funcionalidad futura de proyectos sin fin y tareas ilimitadas cuando se implemente el backend.

## D13. HOME: utilidad encima de Beyond Real Estate y Step 3 recurrente
- **HOME (Website 15):** el espacio vacío sobre la tarjeta `Beyond Real Estate` queda ocupado por la promoción **«Your First PRO Closing Could Be FREE.»** para **Realtor PRO**. Está escrita directamente en `index.html` dentro de `#mct-home-offer-slot`, para no depender del JavaScript que fallaba cuando se retiró `.mct-brand-slogan`. Tiene botones funcionales a `/first-closing-free.html` y `/pro-get-started.html?auth=register&mode=gift#mct-account`. Conserva aprobación Admin, correo verificado y cero tarjeta. Los proyectos de otros profesionales siguen en una tarjeta separada, correctamente identificados como preview.
- **Causa exacta arreglada:** `assets/mct-first-free-20261028.js` terminaba antes de dibujar el banner por buscar solo la antigua tarjeta privacy. Se corrigió la guarda y el enlace de canje. HOME referencia `?v=4`. Al existir el HTML estático, el JS no debe duplicar la tarjeta.
- **Requisito explícito pendiente — Other Projects PRO Step 3:** cada cliente podrá definir tareas personalizadas, de una vez, **recurrentes semanalmente y/o mensualmente**, con fechas/reminders propios, marcada como completada por ocurrencia, historial y siguiente repetición. El usuario podrá definir fin en una fecha o recurrencia **sin fecha de término**. Empresas diferentes tienen necesidades diferentes; las plantillas sugeridas no son obligatorias. **Un crédito por proyecto; tareas sin límite previsto dentro de ese proyecto.** Todavía no está implementado: no publicitarlo como disponible.
- Código GitHub guardado; QA de publicación Cloudflare pendiente.

## E. PRIORIDADES — próximos pasos, en este orden
1. **Verificar despliegue real** y comparar página HOME con FREE, PRO, Pricing, Help, Other Projects y Admin en escritorio y móvil: ancho común **1420px**, márgenes, encabezado, títulos fotográficos, legibilidad y ausencia de desbordes. No confundir commit GitHub con despliegue.
2. **Probar botones y flujos FREE** (Step 1/2, tareas 6+2, cálculo, business/calendar days, resumen email, copiar, PDF cuando corresponda), y CTA dorado HOME.
3. **Auditar PRO** (registro, email verificado, crédito canjeado, D1, creación, fechas futuras, bloqueo vencidos, checklist 40+, guardado, My Closings, cancelación y aislamiento).
4. **Probar First Closing FREE** completo (solicitud → email → verificación → Admin aprueba → código → canje único → vencimiento; marketing y unsubscribe separados).
5. **Completar revisión de privacidad, seguridad, documentación legal y Stripe Sandbox** antes de ofrecer servicio real. Solo después de pruebas documentadas considerar lanzamiento público.

## F. Protocolo de continuidad para todos los siguientes chats
1. Al comenzar: leer **ESTE archivo** + la parte relevante de MASTER/CHANGELOG, y consultar archivos vivos en GitHub; **no pedir copiar las 15 conversaciones**.
2. Antes de modificar: comprobar que el componente existe, su selector/función, y que no rompe algo aprobado. Preferir cambios pequeños y centralizados; evitar CSS superpuesto sin investigar conflictos.
3. Después: escribir cambios en `main` (si la conexión lo permite), verificar el archivo en GitHub y distinguir explícitamente **«guardado en GitHub»** de **«funciona en Cloudflare»**. Ofrecer URL para revisión.
4. Mantener **este resumen corto** actualizado tras cada decisión o tarea importante; guardar detalles técnicos en CHANGELOG y MASTER, no repetirlos en el chat. **Evitar respuestas kilométricas y capturas repetidas**; usar enlaces.
5. Si el chat llega a límite, abrir Website 16, 17, etc., con el mensaje mínimo: «Continuemos My Closing Timeline. Lee NEXT_CHAT_START_HERE.md del repositorio scampilii-prog/my-closing-timeline, verifica el último estado y sigue por la próxima tarea. Conserva todo lo aprobado.»
6. El límite de mensajes/longitud de ChatGPT **no se puede eliminar** desde el proyecto; esta disciplina reduce cuánto hay que transferir y el riesgo de perder contexto.

**Última aprobación en conversación:** `1.420 px` para todas las páginas; botón FREE Summary dorado con texto azul marino, reconocido por el propietario como «Perfecto».
