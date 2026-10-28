# MY CLOSING TIMELINE — REGISTRO DE CAMBIOS Y VERIFICACIÓN
**Proyecto:** https://myclosingtimeline.com · **Repositorio:** `scampilii-prog/my-closing-timeline` · **Rama:** `main`

> Este registro es cronológico. Cada línea distingue **implementado en GitHub** de **verificado en sitio publicado**. Consultar `PROJECT_CONTINUITY_MASTER.md` para decisiones permanentes y tareas siguientes.


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
