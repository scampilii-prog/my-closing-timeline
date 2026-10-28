# MY CLOSING TIMELINE — RESUMEN OPERATIVO PARA EL PRÓXIMO CHAT
**Website 15 · actualización: 28 de octubre de 2026 · leer este archivo PRIMERO.**

> **Propósito:** conservar lo importante de Websites 1–15 sin copiar conversaciones extensas. Fuente de verdad: código actual de la rama `main` + este resumen. Para decisiones técnicas, consultar [PROJECT_CONTINUITY_MASTER.md](PROJECT_CONTINUITY_MASTER.md), [PROJECT_CHANGELOG.md](PROJECT_CHANGELOG.md), [PRIVACY_FIRST_REQUIREMENTS.md](PRIVACY_FIRST_REQUIREMENTS.md), [FIRST_FREE_LAUNCH_CHECKLIST.md](FIRST_FREE_LAUNCH_CHECKLIST.md) y [PRO_SETUP.md](PRO_SETUP.md). Este resumen no reemplaza una prueba del sitio publicado.

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
