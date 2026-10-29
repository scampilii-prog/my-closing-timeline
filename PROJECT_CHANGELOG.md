# MY CLOSING TIMELINE — REGISTRO DE CAMBIOS Y VERIFICACIÓN

## Website 17 — 2026-10-29 — HOME para Real Estate y Other Projects
- **Implementación:** revisión y mejora del único módulo `mct-hero-other-projects` en `index.html`; mensaje para empresarios, contratistas, consultores y proyectos personales con hasta 8 tareas propias FREE, plazos y estados. Botón «Try Other Projects FREE» enlaza `/other-projects.html`, con aviso explícito de PRO como demo. Lema original de cierres, explicaciones y CTA inmobiliarios intactos. Ajustado título y descripción de HOME para ambas audiencias.
- **Presentación:** bloque azul marino/turquesa con tipografía de 13.5–23px y CTA claro; CSS responsive dentro de su estilo existente (sustituido, no duplicado).
- **Verificación:** lectura posterior del archivo en `main` correcta; un solo bloque Other Projects y seis cuadros HOME conservados; existen en repo las rutas `other-projects.html`, `free-timeline.html`, `first-closing-free.html`, `privacy.html` y `pro-get-started.html`. Inspección de reglas CSS de las seis tarjetas: filas, colores y bordes presentes sin cambios adicionales. Consola/Admin y API revisadas en código: acciones reset/archive y restricción de email normalizado aparecen en fuente.
- **Commit de código:** `db193ea1639099d933dc22d774292fea157f3097`.
- **No verificado:** render real escritorio/móvil; despliegue Cloudflare (dominio inaccesible para herramientas); finalización en D1 del archivado; recorrido Resend, cuenta, regalo, código, canje, aislamiento de productos y Stripe Sandbox. No anunciar estos servicios como comprobados.
- **Próximo paso:** QA visual de HOME publicada y ensayo propietario Admin → First FREE → PRO con revisión de DB; luego integrar tabla maestra en My Closings.


**Proyecto:** https://myclosingtimeline.com · **Repositorio:** `scampilii-prog/my-closing-timeline` · **Rama:** `main`

> Este registro es cronológico. Cada línea distingue **implementado en GitHub** de **verificado en sitio publicado**. Consultar `PROJECT_CONTINUITY_MASTER.md` para decisiones permanentes y tareas siguientes.


## Website 16 — 2026-10-28 — Registro FREE directo, sin activación adicional ni grandes botones duplicados
- Resuelto feedback: el visitante nuevo no necesita ver un botón grande `Already Registered?`, una segunda pantalla de "activar" ni información sobre paquetes de pago.
- Email con código gratuito ahora abre directamente `/pro-get-started.html?auth=register&mode=gift#gift=<código>`. En modo FREE ese formulario presenta UNA tarjeta compacta, un solo botón principal `Create My FREE Account`, enlace pequeño `Sign In` como excepción para correos registrados, y aviso de código guardado. Los paquetes 2/5 están disponibles en la sección comercial normal, no en el primer acceso gratis.
- Enlaces antiguos a `pro-activate.html#gift=` redirigen al formulario. El enlace de verificación de cuenta devuelve al mismo formulario y el código se aplica automáticamente al iniciar sesión, con respuesta del servidor `promo/redeem`; **solo cuando el canje tiene éxito** envía al usuario a `my-closings.html?welcome=free`.
- En My Closings se muestra `Your first FREE PRO credit is ready` y `Start My FREE Closing`; el crédito se consume al registrar un nuevo closing, no al volver a abrir la cuenta. Se ocultan ventas mientras se da la bienvenida gratuita.
- **Limitación sin resolver:** My Closings es el módulo real D1 para closings + checklist + PDF, pero la tabla maestra de Step 1 / 2 / 3 de owner-pro-workspace aún no está integrada allí. No afirmar que lo está.
- QA estática: 15/15 comprobaciones + 5 parsers JavaScript. Aún falta verificación de publicación Cloudflare, correos, registro y canje end-to-end.
- Commits: `278cd2e92c8302e134550821858e12b8abf38e89`, `d31cde013a0209a61bced987eb241b55c4cf7796`, `bbd2accd111ee0eac275e9c16dc98ae5b38e16c0`, `e046b9aa4e55f0391c7f4eaa6a262fdc058a8cd4`, `e8768f14d381b2a9a062a5ad7ba81f84eba59421`.

## Website 16 — 2026-10-28 — FREE PRO activation clarified; email logo no longer broken
- Usuario real recibió correo con código privado y `Redeem My FREE Closing`. El email mostraba enorme imagen rota; la página destino exhibía pasos confusos y pagos Stripe TEST simultáneamente.
- `pro-activate.html`: dos pasos claros; primero cuenta/verificación, segundo activar código $0.00. **Dos botones en una sola línea**, el primero en dorado destacado y el segundo en blanco borde azul; ocultar pagos Sandbox cuando existe código privado presente. `assets/mct-pro-activation-20261028.js` persiste código temporalmente a través de `pro-get-started.html`; `assets/mct-pro-activation-20261028.css` controla estados `hidden` y responsive.
- El correo original apuntaba a una imagen remota inexistente. Se reemplazó `<img>` por calendario/check y marca tipográfica construidos con tabla HTML compatible con clientes de correo, en AMBOS emails (confirmación y regalo). Ahora da instrucciones para Create FREE Account / Sign In y explica que no se necesita tarjeta.
- QA estática / parseo de JS: OK. GitHub guardado. Cloudflare render y nuevos mensajes REALES no verificados. Los mensajes enviados antes de la actualización conservarán el aspecto anterior.
- Commits: HTML `82255a3b7e265d5d1533d9c7d47b7b3c78aa7966`, CSS `525779131d579fb1bf5c487f42644aadf4f98db9`, `9403772953101c543bfc778f9d7a1e5370105c1e`; JS `061dde862306c6edc43ad77f824d4b68433a53f6`; emails `918844c9c9f77d3bcd99baf24a009f0f135154a1`, `b4bfcd2a10e2954c03fd82e287bb593f98cef0b8`, `7b8420e3fe2719f4a7fa6dacc3042ac2a40e5266`.

## Website 16 — 2026-10-28 — Resolver «Pending Verification» después del reset de prueba
- Usuario pregunta para qué sirve `Pending Verification` después de Reset FREE Test. Este estado indicaba que la fila estaba reiniciada pero todavía no se había enviado una nueva solicitud de email. Mejorado Admin: `Ready for New Test` tras reset; `Awaiting Email Confirmation` después de emitir enlace de confirmación.
- Reparado problema backend: excepción de owner reset para el mismo email usada antes de revisar límites IP y elegibilidad de primer cierre. Usuario puede repetir pruebas con el mismo email, pero debe solicitar y confirmar de nuevo para simular un visitante. No se relaja un código por email para visitantes comunes.
- Arreglado manejo de error Resend: conserva solicitudes preexistentes. Verificación estática: SQL de unicidad de correo, bloqueo de emisión atómico, check token, validación owner y crédito un uso intactos. Tests reales en Cloudflare pendientes.
- Commits `7e905731784257c053987e659fb3602774734ee4`, `c298bc8fc3c3113c7228721eb9269c3add80e741`.

## Website 16 — 2026-10-28 — Sustituir estrella pequeña por destello grande y ancho
- **Referencia del propietario:** cuatro imágenes de distintos sellos y estallidos con muchas puntas; pide estrella **MÁS GRANDE y ANCHA**, inmediatamente debajo de START HERE, y bajar el letrero, que quedó demasiado alto. Mantener libre la foto, columna central y título «Your First PRO Closing Could Be FREE.».
- **Implementación única `index.html`:** reemplazar la estrella de 5 puntas por destello **de 16 puntas**, generado con CSS `clip-path:polygon(...)` para no utilizar marcas de agua ni imágenes de terceros. Ancho 192px × alto 72px (170×66px en móvil), doble tono verde hoja/verde lima marfil con filete verde oscuro, ligero ángulo. Aviso verde `START HERE` se baja de `top:-6px` a `top:12px`; la columna reserva 127px arriba para la insignia, sin tapar el H2.
- **No alterar:** texto promocional, opciones FREE/PRO, Beyond Real Estate, Today & Tomorrow, Privacy First, rutas y lógica de closings. Un solo destello decorativo `aria-hidden`.
- **Commit GitHub:** `a0869bf3ed7f424ba6a199af8dfad8292fa34703`.
- **QA:** código, geometría prevista y rutas comprobados estáticamente. **No está comprobada visualmente la publicación Cloudflare ni el render real responsive**.
- **Página:** `https://myclosingtimeline.com/?mct_refresh=wide-burst-20261028#home-essentials`.

## Website 16 — 2026-10-28 — Corrección de ubicación y nuevo tono de estrella
- **Feedback propietario:** medallón anterior incorrecto. La estrella debe ir justo bajo el aviso verde START HERE y sobresalir apenas del borde SUPERIOR del primer recuadro, sin tocar hero/foto, tarjeta central ni título «Your First PRO Closing Could Be FREE.»
- **Implementación HOME (`index.html`):** trasladado el bloque START HERE + estrella desde el kicker interno a un elemento posicionado respecto a `.mct-home-essentials-aside` (primera columna únicamente). Contenedor con `position:relative`, insignia centrada `top:-6px`, espacio reservado al inicio para dejar el título totalmente visible. Sin medallón circular; estrella grande independiente debajo del letrero.
- **Color solicitado después:** sustituyó amarillo dorado por **cobre rosado suave** `#e7a990` con contorno marfil `#fce0d1` y sombra discreta. El verde del aviso permanece.
- **Commits:** `b384503ab54637a55f41af78d1018b7c34378316`, `f8e0dc038aeb6ab620996b5b1ff93648c558043f`.
- **QA estática:** un único START HERE, una estrella y se conserva el H2 y enlaces del producto. Verificación visual Cloudflare/Chrome/móvil aún pendiente.
- **Revisión:** `https://myclosingtimeline.com/?mct_refresh=start-here-copper-20261028#home-essentials`.

## Website 16 — 2026-10-28 — STAR debajo de START HERE
- **Petición:** dar mayor protagonismo al aviso verde START HERE de la primera tarjeta HOME con una estrella directamente debajo.
- **Archivo cambiado:** `index.html` solamente. Se organizó `NEW TO MY CLOSING TIMELINE?` junto al bloque vertical START HERE + estrella dorada decorativa (`aria-hidden`). La etiqueta verde es más grande, con degradado y relieve discreto; la estrella dorada dentro de medallón claro queda justo bajo la etiqueta. Responsive hasta 420px.
- **Sin cambios:** ubicación del primer recuadro, promociones First Closing FREE, enlaces de opciones Realtor FREE/PRO, Beyond Real Estate, Today & Tomorrow, Privacy First y funcionamiento transaccional.
- **Commit:** `063d0aab349b1522a3af991bd0abbb72b6bc6398`.
- **QA:** CSS específico HOME y un solo bloque de estrella/etiqueta comprobados en `main`; destinos CTA intactos. **Cloudflare y prueba visual real aún no verificados.**

## Website 16 — 2026-10-28 — HOME: acciones debajo de Today & Tomorrow y Privacy First elevado
- **Solicitud:** después de mover START HERE a la izquierda, aprovechar los espacios libres debajo de Today & Tomorrow y del título `Keep personal details private.` subiendo este último.
- **Archivo actualizado:** `index.html` exclusivamente. Today & Tomorrow conserva el ejemplo y añade panel interno turquesa `YOUR NEXT STEP` con explicación y único CTA `Create My FREE Timeline` → `/free-timeline.html`. Se retiró el enlace CTA duplicado del pie de ejemplo (la advertencia contractual permanece).
- **Privacy First:** se ajustó alineación del contenido hacia la parte superior; debajo del título aparece guía legible de dos secciones: `Use in your timeline` (referencia, fechas y tareas generales) y `Keep on your own device` (nombres, direcciones, precios y documentos). Se conserva la explicación de PDF local, el enlace a la política, el mensaje de revisión de salvaguardas y el slogan.
- **Diseño/seguridad:** colores y navegación anteriores intactos; nuevo panel turquesa y guía vino/verde discretos; CTA responsive. No hay nuevos formularios de datos, seguimiento, almacenamiento, cobros ni cambios de lógica Realtor PRO/FREE.
- **Commits GitHub:** `21b9acc77b65d3fbdfeed0ce9bbb299351802825` y `85edd6d60a286d608cd22c8923302ba0bd695b42`.
- **Verificación:** lectura del HTML después del commit; confirma un solo enlace CTA nuevo, dos filas de guía, un solo bloque de código nuevo y conservación de destinos First Closing FREE, Other Projects y Privacy Policy. **Cloudflare, vista real en Chrome/móvil y comportamiento de CSS pendientes**.
- **Página para revisar propietario:** `https://myclosingtimeline.com/?mct_refresh=home-companion-cards-20261028#home-essentials`.

## Website 16 — 2026-10-28 — START HERE pasa a primera posición de HOME
- **Decisión:** el propietario aprobó el nuevo cuadro START HERE y pidió ponerlo «de primero» con un fondo llamativo. Interpretación implementada: primera tarjeta **a la izquierda en la fila de tres tarjetas debajo de la fotografía**, sin moverla por encima de la foto HOME aprobada.
- **HTML:** `index.html` cambia el orden del DOM a: `mct-home-essentials-aside` (START HERE + Beyond Real Estate), `mct-home-essentials-preview` (Today & Tomorrow), `mct-home-essentials-privacy` (Privacy First). Orden de lectura/teclado coincide con el visual.
- **Diseño:** columna izquierda destacada en degradado navy/turquesa con marco dorado y sombra suave; tarjeta interior crema-dorada y opciones FREE turquesa / PRO dorado. Se ensancha la columna central para no comprimir la tabla Today & Tomorrow. En pantallas reducidas se apilan ordenadas START HERE → Today & Tomorrow → Privacy First.
- **Conservado:** foto HOME a todo el ancho, branding, accesos FREE, primer código PRO por invitación, canje, Beyond Real Estate, Privacy First y resto de secciones.
- **GitHub:** commits `22c97288f0e3fec22d932b89d65c783636053956` y `dc5788ffbc041bb75a2ab286ce9a19e81a01bd96`.
- **QA estático:** verificado orden de los tres elementos en el DOM, una sola tarjeta de invitación y un solo enlace Beyond Real Estate, CSS de degradado y rutas principales conservadas. **Publicación Cloudflare / visual Chrome, Safari y móvil no verificada**.
- **Para revisar:** `https://myclosingtimeline.com/?mct_refresh=start-first-20261028#home-essentials` con sesión propietaria.

## Website 16 — 2026-10-28 — HOME: START HERE para visitantes nuevos
- **Solicitud / captura:** en la columna central de HOME, en la tarjeta crema de `Your First PRO Closing Could Be FREE.`, indicar claramente dónde comienza el visitante; conservar la oferta y la tarjeta separada Beyond Real Estate.
- **Cambio único de interfaz en `index.html`:** etiqueta verde **START HERE** junto a `NEW TO MY CLOSING TIMELINE?`, título promocional original, dos rutas en tarjetas compactas: **OPTION 1 · Start FREE Timeline** (sin cuenta, `/free-timeline.html`) y **OPTION 2 · Request My FREE Code** (correo verificado y aprobación, `/first-closing-free.html`), más enlace para canjear invitación en `/pro-get-started.html?auth=register&mode=gift#mct-account`. Un visitante elige UNA de las dos opciones; no son pasos obligatorios en secuencia.
- **Diseño:** azul/turquesa suave para FREE y dorado para PRO; tipografía legible, `START HERE` verde, enlaces en la misma pestaña y dos columnas que se apilan en móvil; el espacio de Other Projects y la guía Privacy First permanecen intactos.
- **Commit GitHub:** `1117b112b1871289493ae245b9699118d6cde0b5`.
- **QA estático:** los tres archivos destino existen en `main`, la tarjeta `mct-first-free-offer` aparece una vez y el HTML tiene dos enlaces iniciales. No se verificó Cloudflare ni se probó visualmente la nueva tarjeta en navegador.
- **Enlace de propietario para revisar:** `https://myclosingtimeline.com/?mct_refresh=start-here-20261028#home-essentials` (Home completa visible solo con sesión privada autorizada; usuarios anónimos pueden recibir Coming Soon).

## Website 16 — 2026-10-28 — Other Projects FREE browser planner + PRO Step 3 recurrence upgrade
- **Repositorios/archivos:** `other-projects.html`, `assets/mpt-project-task-demo-20261028.js`, `assets/mpt-task-demo-20261028.css`. Estos cambios NO alteran código de Realtor FREE/PRO, First Closing FREE, Stripe, D1, seguridad Admin ni pagos.
- **FREE:** se habilita en la demostración existente Step 1 (referencia privada, fecha de inicio, fin opcional) y Step 2 (hasta ocho tareas creadas por el visitante). Permite editar nombres y fechas, marcar completadas, copiar resumen y descargar archivo local de calendario .ics. Solo estado en memoria de esa página: al recargar desaparece. No pide registro ni almacena proyectos en D1.
- **PRO, SOLO DEMOSTRACIÓN EN NAVEGADOR:** tareas sin límite fijo lógico, frecuencia una vez/diaria/semanal/mensual, responsable por función (sin nombre personal), nota genérica, fin opcional POR TAREA, próximo vencimiento, estado y registro de ocurrencias completadas, visible debajo de la tarea. Se conserva guardado local en el mismo navegador mediante localStorage, sin acceso remoto/cuenta. Al completar una ocurrencia periódica, programa la siguiente sin borrar las anteriores. Mensajes de privacidad actualizados.
- **Planificación ≠ créditos:** los botones 1/3/12 meses y período sin fin indican duración de trabajo, NO descuentos, mensualidades ni créditos consumidos. Se retiraron los precios inmobiliarios LAUNCH90 de esos botones. Un crédito por proyecto PRO sigue siendo idea comercial NO activa ni aprobada para Other Projects; el precio final no se anuncia como definitivo.
- **Diseño:** estilos adaptables para Step 1, campos más completos de PRO y sección de historial; estilos originales de ancho y menú conservados. Página diferencia FREE local ya usable de PRO real pendiente.
- **Comprobación estática:** sintaxis JavaScript validada tras corrección de paréntesis, 34 IDs referenciados por el script encontrados en HTML sin duplicados; pruebas puras de fechas con resultados correctos para tarea diaria en año nuevo, semanal, mensual de enero/febrero/marzo, una sola vez y fecha inválida. Cambios y SHA de archivos confirmados en GitHub.
- **Pendiente sin certificar:** ejecución real en Chrome/Safari/móvil, exportación .ics en aplicaciones externas, actualización de Cloudflare Pages, configuraciones D1/Resend/Stripe, permisos/aislamiento de cuentas. La URL pública no fue accesible desde el verificador HTTP disponible. No se ha creado aún un backend de Other Projects, ni proyectos persistidos por usuario, ni pagos o recordatorios automáticos.
- **Siguiente etapa:** probar FREE y PRO en navegadores, revisar privacidad de textos libres y diseñar/implementar API de proyectos separada con autenticación, migración D1 y controles de acceso antes de llamar al PRO operativa. Conservar las 20 tareas ilustrativas y requisitos de recurrencia.

## Website 15 — 2026-10-28 — restaurado First Closing FREE sobre Beyond Real Estate + recurrencias PRO
- **Captura HOME:** espacio vacío en segunda columna sobre `Beyond Real Estate`. La promoción de primer cierre gratis dejó de generarse porque el script `mct-first-free-20261028.js` exigía la antigua tarjeta `.mct-brand-slogan`, eliminada por el rediseño de privacidad.
- **Reparación:** HTML permanente en `index.html #mct-home-offer-slot` con tarjeta REALTOR PRO, explicación de crédito gratuito sujeto a verificación/aprobación, botón `/first-closing-free.html` y enlace de canje `/pro-get-started.html?auth=register&mode=gift#mct-account`. CSS accesible centrado y responsive. El script ahora acepta un HOME slot y se corrigió el enlace antiguo roto; versión de script HOME v4. No se tocaron pagos, registro, D1 ni permisos.
- **Nueva decisión del usuario sobre Other Projects PRO Step 3:** tareas creadas específicamente por cada cliente, **una vez, semanales o mensuales**, repetición hasta fecha elegida o indefinida, seguimiento de cada instancia, y sin límite de número de tareas por proyecto. No implica proyectos/créditos ilimitados. **Solo requisito para implementación futura**, no disponible hoy.
- **QA:** presencia de HTML y rutas GitHub confirmada; validación visual y publicación Cloudflare pendientes.

## Website 15 — 2026-10-28 — 20 tareas visibles, personalización y PRO sin fecha de fin
- **Captura del propietario:** la tabla FREE de Other Projects tenía cinco ejemplos, aunque había 20 abajo. Se solicitó visualizar al menos 20 en esa tabla y explicar que cada profesional define sus propias tareas adaptadas a la actividad, con seguimiento sin fecha final o hasta un día elegido.
- **Hecho en `other-projects.html`:** tabla FREE de muestra con 20 nombres genéricos numerados, columna días/fecha bajo control del cliente; nota expresa de tareas no automáticas y límite planificado de hasta 8 para FREE. Tres tarjetas explicativas destacadas: creación propia, **PRO con tareas ilimitadas por proyecto** y proyectos con fecha de fin o duración continua.
- **PRO:** descripción y cierre de Step 3 mejorados: tareas personalizadas sin límite fijo por proyecto, seguimiento y edición continua, sin término o con fecha concreta; **un crédito por proyecto**. Se mantienen los 20 ejemplos de seguimientos por grupos abajo de la tabla.
- **QA:** comprobación del código y texto contra las decisiones del proyecto. **Estas funciones son planes, no se han implementado aún** en Other Projects ni verificado Cloudflare en vivo.

## Website 15 — 2026-10-28 — 20 ejemplos de tareas genéricas en Other Projects
- **Solicitud:** en la sección FREE de Other Projects, sustituir las filas sin contenido por ejemplos reales y ofrecer al menos 20 tareas comunes de seguimiento para mostrar para qué serviría pagar PRO Step 3.
- **GitHub:** `other-projects.html` ahora incluye 5 filas ilustrativas en la tabla FREE y una muestra visual **PRO · STEP 3 FOLLOW-UP PREVIEW** con 20 tareas (4 grupos x 5): planificación, recursos, seguimiento/ calidad y finalización. Cada tarea incluye una breve acción de control. La sección PRO enlaza a esos ejemplos.
- **Importante:** no se han añadido tareas predeterminadas al FREE real ni activado PRO general. Todos estos elementos son preview no interactivo, sin credenciales, pagos ni almacenamiento. Se conservan navegación, privacy-first y contratos inmobiliarios sin cambios.
- **QA:** verificaciones de contenido HTML, 20 tareas, 4 categorías y enlaces internos en GitHub; publicación de Cloudflare/visual móvil todavía sin confirmar.

## Website 15 — 2026-10-28 — selector visual definitivo en FREE/PRO
- El usuario compartió captura donde había demasiados textos redundantes y pidió que el cliente elija claramente si entra como Realtor o como otro profesional. Se eliminaron del código las explicaciones y banner duplicados.
- Ambas páginas presentan un solo selector «Choose your timeline.» con dos tarjetas amplias, azul marino para Realtors y verde turquesa para otros profesionales; títulos grandes con acentos de color, breves explicaciones, estado y botones alineados abajo. Se reorganizó el contenido sin añadir pasos o elementos de pago.
- El enlace Realtor de FREE salta a `#mct-free-transaction`, el de PRO a `#mct-start-choice`; la segunda tarjeta lleva a `/other-projects.html`. Los modelos de proyectos generales siguen expresamente `PREVIEW ONLY`.
- Estilo centralizado: `assets/mct-project-path-20261028.css?v=6`. Confirmado en GitHub; Cloudflare y revisión visual en móvil pendientes.

## Website 15 — 2026-10-28 — títulos inclusivos y claros en FREE/PRO
- **Usuario:** aclarar en los dos títulos que el sitio sirve tanto a Realtors (contract closing timelines) como a otros profesionales que necesitan programar tareas en sus propios negocios, sin confundir ambas opciones.
- **Realizado en GitHub:** nuevos títulos de los selectores en `free-timeline.html` y `pro-get-started.html`, explicación debajo separando Realtors de negocios/contratistas/profesionales y estado **Other Projects preview**; publicidad con el título «Realtors: manage closings. Other professionals: plan your own tasks.»
- **Estilos:** hoja `mct-project-path-20261028.css` ampliada con resumen de audiencias de contraste correcto; HTML referencia `?v=3` para renovar caché.
- **Verificación:** código guardado y enlaces de ambas páginas a `/other-projects.html` confirmados en GitHub; desplegado Cloudflare y browser no verificados.

## Website 15 — 2026-10-28 — rutas y anuncio Other Projects en FREE y PRO
- **Petición:** revisar enlaces FREE/PRO y destacar que no hace falta ser Realtor para interesarse por modelos de proyectos propios, negocios, servicios o construcción.
- **Archivos:** `free-timeline.html` y `pro-get-started.html` incorporan, debajo del selector de producto, un aviso destacado «NOT A REALTOR? THIS IS FOR YOU» con botón «Explore Other Projects». Los enlaces anteriores del selector se normalizan a `/other-projects.html`. En ambos se actualiza la hoja `mct-project-path-20261028.css` a `?v=2`.
- **Estilo:** `assets/mct-project-path-20261028.css` suma panel accesible, contraste, móvil y aviso veraz «FREE & PRO previews · Tools coming soon».
- **Control de calidad estático:** se verificaron 45 enlaces HTML en FREE y 27 en PRO, con **0 enlaces internos a archivos inexistentes ni anclas propias faltantes**. El archivo de destino y las secciones de vista previa están presentes en GitHub. No se puede garantizar la ejecución de todos los flujos dinámicos mediante esta prueba.
- **Publicación Cloudflare:** el entorno de revisión no pudo acceder al dominio, por tanto **no verificado**.
- **Siguiente paso:** comparar la publicación en navegador real, confirmar CTA y menú de cada página, revisar móvil y mantener separado el desarrollo futuro de Other Projects de FREE/PRO inmobiliarios.

## Website 15 — 2026-10-28 — PRO registration: tarjeta Privacy First explicada
- **Petición:** simplificar y explicar dentro del mismo recuadro vino/rojo de `/pro-get-started.html` el objetivo real de privacidad.
- **Código:** `pro-get-started.html`: tarjeta `.mct-pro-privacy-guide` con escudo, etiqueta verde compacta, explicación legible de datos permitidos en timeline (referencia/fechas), detalles privados solo en PDF local, aviso de salvaguardas bajo revisión, enlace a privacidad y slogan secundario. Se retiró el antiguo contenido `.mct-brand-slogan` solo de esa tarjeta. Sin cambios al funcionamiento FREE, PRO, First Closing FREE, precios ni pagos.
- **QA:** commit GitHub confirmado; Cloudflare y móvil pendientes de comprobación.

## Website 15 — 2026-10-28 — HOME / Other Projects: explicación práctica de PRIVACY FIRST
- **Solicitud:** el propietario dijo que no entendía el contenido del cuadro rojo; pidió reestructurar y explicar su utilidad, no solo mostrar el slogan.
- **HOME:** `index.html` sustituye el badge maroon abstracto por guía con encabezado compacto, subtítulo claro, indicación de referencia de cierre sin nombres ni direcciones, PDF personal únicamente local, aviso honesto de protecciones en revisión y enlace a la política. El slogan se conserva en letra secundaria. No se afectan tablas, créditos ni cálculos.
- **Other Projects:** `other-projects.html` actualiza la tarjeta a la derecha con la explicación «Simple tasks. Less private information.», instrucciones sobre notas sin datos privados y el estado preview/privacidad en revisión.
- **HOME hero:** nueva corrección técnica `mct-home-hero-full-bleed-v2-20261028` cambia también el ancho del elemento `main` a 100% (no solo su hijo), manteniendo las secciones inferiores en 1420px.
- **QA:** código GitHub modificado; publicación Cloudflare y captura/medidas reales por verificar.

## Website 15 — 2026-10-28 — Other Projects: encabezado a todo ancho y panel Privacy First
- **Solicitud:** situar el mensaje Privacy First de la captura a la **derecha del cabezal de Other Projects**, con diseño diferente y elegante, y **extender el cabezal de borde a borde**.
- **Implementación GitHub:** `other-projects.html`, encabezado `.mpt-hero-wide` 100vw, contenedor interno 1420px, composición de dos columnas (título y tarjeta con escudo), adaptación vertical para móvil. Mantener slogan oficial, nota de mejoras pendientes y enlace a la política de privacidad.
- **Conservado:** navegación, ancho de contenido inferior 1420px, estatus preview/COMING NEXT, FREE/PRO y sin flujos de pago en Other Projects.
- **QA:** escritura GitHub verificada; publicación Cloudflare y aspecto visual no certificados independientemente.

## Website 15 — 2026-10-28 — fotografía principal HOME al ancho total
- **Corrección explícita del propietario:** “Nooooo, esta menos ancha. Vuelvela a poner a todo el ancho.”
- La foto del encabezado de **HOME** se fuerza al **100% del ancho del viewport** (100vw), de borde a borde, en el estilo final de `index.html` (`mct-home-photo-full-viewport-20261028`). El ancho del resto de las páginas y paneles sigue limitado al máximo acordado de **1420px**. La reducción anterior de altura no debe interpretarse como orden de reducir el ancho.
- **Other Projects:** enlace del header en blanco en páginas inactivas y dorado solo al estar activo o en hover, mediante `assets/header-canonical-20261027.css?v=11` en 21 páginas.
- **Pendiente:** verificar visualmente el despliegue y la adaptación móvil, en particular el encabezado a pantalla completa sin desbordes ni cambios en la tabla.

## Website 15 — 2026-10-28 — Other Projects aparece en el encabezado de todas las páginas
- **Petición:** el visitante que no sea Realtor debe reconocer inmediatamente un enlace directo a `other-projects.html` desde el header.
- **Implementación GitHub:** insertar enlace `Other Projects` entre `PRO Timeline` y `Plans & Pricing` en 21 páginas que usan navegación canónica; `aria-current="page"` en la página de Other Projects. Solo cambia el menú visible, sin tocar los flujos FREE/PRO.
- **CSS compartido:** enlace dorado sutil en `assets/header-canonical-20261027.css?v=10`, con hover/foco, sin cambiar el ancho de contenido de 1420px. **Idiomas:** ES «Otros Proyectos», IT «Altri Progetti» y PT «Outros Projetos» mediante `assets/navigation-extras.js?v=20261028-other-projects`.
- **Funcionalidad anunciada:** Other Projects es acceso a preview/COMING NEXT, no presentar FREE/PRO de proyectos generales como operativos hasta verificarlos.
- **Verificación:** cambios guardados en GitHub; Cloudflare Pages, apariencia en navegadores grandes/pequeños y funcionalidad pública no verificados independientemente.

## Website 15 — 2026-10-28 — onboarding nuevo cliente: solicitud gratis, registro, TEST checkout y PDF
- **Motivo:** primera visita no entendía términos como “PRO credits”, “gift” ni las etapas de registro, pago, canje y PDF.
- **GitHub:** en `pro-get-started.html` se aclaró que un crédito inicia un PRO closing, se añadió el CTA `Request First Closing FREE`, se revisaron textos estáticos y dinámicos de ambas opciones y se incluyó guía de PDF; botones existentes llevan al formulario de registro o sección de paquete. La URL con `auth=register&mode=gift` coloca al visitante en el registro con modalidad de código.
- **GitHub:** `first-closing-free.html` ahora describe solicitud → confirmación email → aprobación Admin → código único de 30 días → cuenta con mismo email → canje → cierre PRO → PDF. Consentimiento marketing se conserva separado y desmarcado.
- **GitHub:** `my-closings.html` explica cómo usar un crédito, crear un cierre y guardar PDF privado sin incluir datos inmobiliarios sensibles en el sitio.
- **Sin cambiar:** backend de registro, Stripe, D1, Resend, PDFs locales, privacidad o consentimiento. **Solo Stripe Sandbox**. No se ha verificado publicación Cloudflare ni transacciones reales.
- **Próximo paso:** prueba guiada del visitante en `/first-closing-free.html`, luego `/pro-get-started.html?auth=register&mode=gift#mct-account`, y finalmente `/my-closings.html`. Documentar errores exactos antes de ajustar funcionamiento.

## Website 15 — 2026-10-28 — botón FREE Summary dorado (corrección reforzada)
- **Reporte del propietario:** el enlace en HOME seguía viéndose con letras casi invisibles después de la primera corrección.
- **Cambio aplicado:** `index.html`: botón `Create & Share Your FREE Summary` en **dorado con texto azul marino**, estilo explícito directamente en el enlace y sus dos elementos de texto, versión interna `data-mct-cta-version="gold-20261028-v2"`; regla final de contraste y color de selección, manteniendo `href="free-timeline.html"`.
- **Verificado:** HTML y estilos confirmados guardados en `main` de GitHub.
- **Sin verificar:** despliegue Cloudflare o aspecto real del dominio. Al revisar, abrir `https://myclosingtimeline.com/?mct_refresh=20261028gold2#free-benefits` y recargar sin caché en Chrome. Si sigue azul, significa que la versión nueva no está llegando al navegador; no afirmar que se resolvió en producción.

## Website 15 — 2026-10-28 — legibilidad del botón FREE Summary en HOME
- **Captura del propietario:** el enlace `Create & Share Your FREE Summary` de la tarjeta HOME se mostraba con texto azul poco legible sobre fondo azul oscuro.
- **Causa comprobada en el código:** la regla genérica `#share-summary.mct-home-share a` aplicaba `color:#146482!important` al botón, con especificidad superior a su definición individual blanca.
- **Corrección GitHub:** `index.html`, con el estilo de enlaces informativos limitado a `:not(.mct-free-share-action)` y una regla específica para la acción principal: texto marfil/blanco, borde dorado, flecha dorada, foco accesible y efecto hover de alto contraste.
- **Se conserva:** enlace `free-timeline.html`, botones vecinos, ancho acordado 1420px y todas las funciones.
- **Pendiente de verificar:** despliegue Cloudflare y captura actualizada de HOME en un navegador real.

## Website 15 — 2026-10-28 — decisión definitiva: ancho uniforme de 1420px
- **Petición textual del propietario:** “pon todas las paginas del mismo ancho de 1.420 pixeles”. Sustituye el intento de 1280px y el anterior de 1140px.
- **Cambios GitHub:** `assets/mct-hero-left-edge-20261028.css` actualizado a lienzo de contenido centrado con máximo **1420px**; regla final alineada para HOME y páginas interiores. Se actualiza versión de caché de `v=5` a **`v=6`** en 22 páginas HTML. La página auxiliar de PDF local sin clase de layout recibió el mismo ancho sin afectar el inicio de sesión.
- **Se conserva:** fotos de fondo, títulos alineados con paneles, Manrope, logo, encabezados, pies, FREE, PRO, Admin, Privacy First, First Closing FREE, Stripe Sandbox, D1, Resend y seguridad. No se modificó JS, Functions, migraciones ni transacciones.
- **QA GitHub:** cambios guardados y referencias a hoja v6 verificadas. **QA Cloudflare:** sin certificar; acceso HTTP público no disponible desde esta sesión. Falta revisión en navegador escritorio/móvil y comparación visual HOME frente a PRO.
- **Siguiente tarea:** comprobar publicación de v6 y ausencia de conflictos visuales, sin introducir una nueva anchura salvo decisión explícita del propietario.

## Website 15 — 2026-10-28 — 1280px inicial (SUPERADO POR 1420px)
- **Decisión del propietario:** HOME se veía demasiado estrecho. TODAS las páginas comparten ahora un **ancho máximo común de 1280px** para su contenido principal (sin abrir los fondos fotográficos o las tablas hasta los bordes).
- **Implementado en GitHub:** la hoja `assets/mct-hero-left-edge-20261028.css` cambia su referencia de 1140px a 1280px; nuevas reglas finales prevalecen sobre restricciones antiguas y mantienen márgenes responsivos de 12px en móvil.
- **Caché actualizado:** 22 páginas HTML, incluidas HOME, FREE, PRO, Pricing, Help, Other Projects, Admin Console, invitaciones y páginas auxiliares, usan `/assets/mct-hero-left-edge-20261028.css?v=5`.
- **No se tocó:** lógica de deadlines, calendarios, tareas, PDFs, login, pagos Stripe, D1, Resend ni privacidad.
- **Verificación:** commits GitHub escritos. **Sin certificación de la publicación Cloudflare ni prueba visual en un navegador real**, debido a que el dominio no es accesible desde el entorno de comprobación.
- **Siguiente paso:** abrir cada URL en escritorio y móvil; comprobar anchura, alineación de título fotográfico, tarjetas y ausencia de desplazamiento horizontal. Registrar cualquier corrección específica.

## Website 15 — 2026-10-28 — recuperación, inventario y documentación
**Objetivo:** continuar exactamente desde Website 14; sin alterar diseños ni flujos ya aprobados.

- Se revisó el repositorio original, rama principal, lista de commits, carpetas `assets/`, `functions/`, `migrations/` y documentación previa.
- Último HEAD de Website 14 **antes de los cambios de documentación**: `1aa7770631882417777768ed484ac75932b01591` (2026-10-28 20:09:09 UTC).
- Se encontraron implementaciones en código de privacidad, FREE/PRO, Stripe Sandbox, D1, Resend, invitaciones, marketing separado y Admin. **No se ejecutaron flujos reales ni se certificaron los servicios**.
- Se detectó `assets/mct-hero-left-edge-20261028.css?v=4`, hoja de estilo compartida con contenido centrado de 1140px y alineación de títulos fotográficos. La verificación visual de producción es el **punto exacto pendiente de Website 14**.
- El middleware de Home implementa Coming Soon para usuarios anónimos y HOME completa para la sesión del propietario. Esta es una constatación del código, no del comportamiento desplegado.
- La consulta externa de `https://myclosingtimeline.com`, páginas interiores y `/api/pro/health` fue inaccesible desde el entorno de revisión. No se obtuvo evidencia de commit desplegado ni de configuración de Cloudflare/D1/Resend/Stripe.
- **Cambio realizado en esta conversación:** crear `PROJECT_CONTINUITY_MASTER.md` y este changelog; enlazarlos desde README para siguientes conversaciones. **Ningún HTML, CSS, JS, API ni dato de clientes se modificó.**
- **Resultado:** continuidad documental establecida en GitHub; estado de producción **SIN CERTIFICAR**.
- **Próxima acción:** abrir páginas de referencia en navegador autorizado y comparar anchura/títulos de HOME, FREE, PRO, Pricing, Help & Contact, Beyond Real Estate y Admin; inspeccionar versión desplegada `v=4` de CSS.

## Website 14 — 2026-10-28 — última tanda de diseño
- Decisión final del usuario: los primeros tres enlaces del header deben mostrar páginas tan anchas como la referencia **PRO Timeline**, no a todo el ancho; títulos dentro de la foto alineados con el contenido inferior en **todas** las páginas, incluida Admin Console donde proceda.
- Ajustes iterativos de ancho, alineación y layouts. Última revisión documentada: `assets/mct-hero-left-edge-20261028.css?v=4` compartido.
- Ejemplos de commits encontrados:
  - `d988b412e6ff9dc904fd12ad19e6e76ae8f06c59` — FREE Timeline: estilo PRO 1140 px v4.
  - `e2656a6e31bf0116174a9b4f77f9a29fd21e857e` — PRO get started: estilo compartido v4.
  - `fc2566249f10dbe62b483c0e717d90317cd37e0c` — Other Projects: estilo compartido v4.
  - `60d4177ac995d4cbd26fc25c0b2522662f10d997` — Admin Console: estilo compartido v4.
  - `04d2029e8ef95a8d1ac16a8a36f992021e8b3733` — First Closing FREE: estilo compartido v4.
  - `1aa7770631882417777768ed484ac75932b01591` — último commit de Website 14, closing-workspace-preview.
- Diferenciación **Other Projects** para no Realtors con invitación visible «NOT A REALTOR? START HERE» y secciones organizadas; se conserva **PRIVACY FIRST** separado de First Closing FREE sin tapar tablas ni recargar diseño.
- **Estado:** commits guardados. **Falta** comprobar que Cloudflare sirve esa versión y que el diseño se ve correctamente en equipos de escritorio y móvil.

## Website 13 — 2026-10-28 — First Closing FREE
- Campaña de primer Closing PRO sin costo por invitación, correo verificado, aprobación de administrador y código individual restringido al correo, 30 días y uso único.
- Se añaden página `first-closing-free.html`, gestión `admin-invitations.html`, API `functions/api/first-free/[[path]].js` y migración `0005_first_free_invitations.sql`.
- Consentimiento publicitario opcional desmarcado por defecto; separado de mensajes esenciales de oferta. Ver `FIRST_FREE_LAUNCH_CHECKLIST.md`.
- **Estado:** fuente presente. **Falta:** aplicación migraciones y prueba de correo real, permisos, canje, protección ante repetición y unsubscribe.

## Websites 1–12 — decisiones y desarrollos que permanecen
- HOME, FREE, PRO, Admin Console; cronogramas contractuales y checklist de seguimiento; tareas y controles de fechas; menús de formularios de contrato personalizables; espacios de prueba; coherencia del header/footer y logo.
- Filosofía «Your Clients. Your Records. Your Privacy.»; reemplazar captura de datos inmobiliarios identificables por referencia privada y PDF rellenable local. Ver `PRIVACY_FIRST_REQUIREMENTS.md`.
- Cuentas PRO, créditos, invitaciones privadas, D1, envío Resend, planes y pagos Stripe **solo Sandbox**. Ver `PRO_SETUP.md`.
- **Estado:** solo los archivos existentes en `main` y las pruebas documentadas autorizan afirmar qué está implementado. No inferir una prueba de producción de la historia de conversación.

## Plantilla para próximas entradas
### Website N — AAAA-MM-DD — resumen
- **Decisión aprobada:**
- **Modificaciones (rutas):**
- **Commits:**
- **Verificación en GitHub:**
- **Verificación en Cloudflare/servicios:** realizado / no realizado, evidencia y resultados
- **Regresiones o problemas:**
- **Siguiente tarea exacta:**
