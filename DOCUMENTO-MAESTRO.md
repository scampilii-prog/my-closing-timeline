# Plan maestro de reconstrucción — MyClosingTimeline V11

**Estado:** Plan rector aprobado. Documento de autoridad para la reconstrucción V11.  
**Regla:** ninguna página interior puede modificar la estructura común.

## 1. Una sola fuente para toda la estructura

`MODELO.html` es la referencia visual. Las instrucciones reales se centralizan en componentes compartidos. Las páginas HTML no heredan automáticamente los cambios de MODELO: comparten los mismos archivos de estructura.

- `MODELO.html`: plantilla visual de header, contenedor, footer y botones exteriores.
- `index.html`, `real-estate.html`, `business-projects.html`, `services-contractors.html`, `personal-home.html`: contenido y funciones propias.
- Todas usan la misma estructura común, sin autorización para alterarla desde sus estilos particulares.

## 2. Responsabilidades

| Elemento | Responsable |
|---|---|
| Logo, encabezado, idiomas, registro y menú | Estructura compartida / MODELO |
| Ancho general, márgenes y adaptación a pantallas | Estructura compartida / MODELO |
| Footer y enlaces legales | Estructura compartida / MODELO |
| Back to top y asistente Lía / Ask Timeline | Estructura compartida / MODELO |
| Fotografías y tarjetas de las cuatro categorías | `index.html` |
| Fechas, tareas, tablas y resúmenes | `real-estate.html` |
| Contactos, mensajes y comunicaciones | Página correspondiente |
| Diseño y funcionamiento interior | Exclusivamente la página correspondiente |

Un cambio en el logo se realiza una sola vez en el componente compartido; un cambio en una columna de Real Estate se realiza solo en Real Estate.

## 3. Estructura definitiva de MODELO

- Header azul marino, logo original a la izquierda; idiomas, Sign In, Register y Menu.
- Encabezado con ancho de V10, fijo, sin temblores ni desplazamientos; conservar enlaces.
- Contenedor común con ancho y márgenes uniformes, adaptable a pantallas.
- Área interior independiente para títulos, fotografías, tablas, formularios y funciones de cada página.
- Footer y lema: **Your Clients. Your Records. Your Privacy.**
- Dos botones exteriores con dimensiones idénticas, márgenes simétricos, fondo azul marino y detalles turquesa: izquierda **Back to top** con flecha; derecha **Lía · Ask Timeline** con el mismo icono original del logo. Ambos con funciones reales.

El esquema es conceptual, no una captura de la página terminada.

## 4. Reglas que no volveremos a romper

1. **No más CSS contradictorios:** cada componente tiene un único responsable y estilos organizados.
2. **No más reparaciones estructurales dentro de páginas individuales:** los cambios comunes se hacen exclusivamente en archivos compartidos.
3. **No más páginas creadas copiando errores anteriores:** construir cada página nueva con la plantilla limpia.
4. **No más botones que aparenten funcionar:** todo enlace y acción debe tener destino y comportamiento comprobables.
5. **No perder el trabajo funcional de V10:** conservar V10 como referencia para recuperar funciones, sin importar sus estilos conflictivos.

## 5. Orden de construcción

1. **Terminar MODELO V11:** header completo, logo original, enlaces, medidas, contenedor, footer, botones exteriores y adaptación. Probar anchos de ventana y desplazamiento vertical.
2. **Reconstruir `index.html`:** portada *Choose Your Timeline* de V10, cuatro categorías, fotografías correctas y enlaces funcionales. No usar capturas de pantalla como fotografías.
3. **Reconstruir Real Estate:** Contract Setup, ambas tablas, resúmenes, guardado y Communication Center. Trasladar funciones comprobadas, sin instrucciones estructurales antiguas.
4. **Crear las demás páginas:** Business & Projects, Services & Contractors, Personal & Home, registro, planes, ayuda y políticas, con la misma base.
5. **Probar antes de publicar:** navegación, registros, persistencia de datos, cálculos, correos, privacidad, pagos y manejo de errores. La versión gratuita debe funcionar correctamente antes de invitar a pagar.

## 6. Organización de archivos

```text
MCT-V11/
├── MODELO.html
├── index.html
├── real-estate.html
├── business-projects.html
├── services-contractors.html
├── personal-home.html
├── shared/
│   ├── layout.css
│   ├── header.js
│   ├── footer.js
│   ├── navigation.js
│   └── assistant.js
├── pages/
│   ├── index.css
│   ├── real-estate.css
│   └── ...
├── assets/
│   ├── logo/
│   ├── icons/
│   └── images/
└── DOCUMENTO-MAESTRO.md
```

Este documento establece responsabilidades y reglas para comparar el proyecto existente antes de trasladar funciones.

## 7. Protección del trabajo anterior y experiencia del visitante

**No borrar V10 ni archivos históricos.** Conservarlos como respaldo. Reconstruir V11 desde una base limpia. Una vez terminado y comprobado MODELO, ninguna página interior modificará la estructura exterior.

El visitante debe entender qué hacer, hacerlo sin complicaciones y confiar en el resultado. Esa confianza es fundamental para convertir una prueba gratuita en un cliente satisfecho.

## 8. Control de cambios

- Antes de implementar, comparar con este documento y con las funciones históricas comprobadas.
- Mantener separados estructura compartida, estilos de página y lógica de negocio.
- No publicar cambios sin pruebas.
- Registrar decisiones nuevas aquí, evitando instrucciones contradictorias.

## 9. Continuidad de Real Estate PRO · 16 de noviembre de 2026

Base de prueba: [MCT-V11-152-TABLAS-SIN-SELECCION.zip](https://chatgpt.com/library?file_id=libfile_ae728b8f222c8191b2ff9feb8069a437&account_id=personal). Los ajustes siguientes están pendientes de implementación y prueba en ese ZIP.

- **Communication Center:** al elegir **Table 01**, **Table 02** o **Both Tables** en **Table to send**, mover el resaltado amarillo a **Saved contact**. Mostrar «NEXT · Choose a saved contact or enter a recipient email.» La selección de una opción y la disponibilidad de tareas se validan por separado. Mantener bloqueado **Preview Email** hasta contar con tareas confirmadas para ese envío y los datos requeridos del destinatario. Verificar que el contador y la vista previa coincidan con las tareas elegidas para una tabla o ambas.
- **Identidad de las tablas:** encabezado azul claro con título azul marino para **Table 01 · Contract Tasks & Deadlines** y texto «Track deadlines from the signed contract.» Encabezado verde salvia con título verde oscuro para **Table 02 · Follow-Up Tasks** y texto «Track calls, reminders, and follow-ups for this closing.» Mantener ancho, altura y tipografía iguales. Aplicar el color de cada tabla al borde de su **Summary** y conservar los colores de vencimiento en las filas.
- **Prueba de regresión:** al abrir o refrescar la página, ambas tablas empiezan sin tareas seleccionadas. Al marcar la primera tarea, abrir el **Summary** de esa tabla y mostrar solamente las filas seleccionadas. Al desmarcar la última tarea, cerrar su **Summary**. Mantener el flujo **Contract Setup → Tasks & Deadlines → Communication Center** y aplicar los ajustes en el código interno de Real Estate PRO.

## 10. Continuidad V12 — Real Estate & Closing · 18 de noviembre de 2026

**Decisión vigente del propietario:** la nueva **V12 — Real Estate & Closing** será el contenido de referencia para reconstruir el nuevo sitio. La versión actualmente publicada en MyClosingTimeline.com **no es referencia funcional ni visual** para esta reconstrucción y se sustituirá en el futuro, **solo con autorización expresa**. No borrar ni publicar automáticamente.

- Nombre aprobado de la categoría/página: **Real Estate & Closing** (no «Real Estate PRO»). Mantener el nombre coherente en títulos, navegación y entregas.
- Conservar **V11-208** intacta como referencia histórica visual y funcional, sin convertirla en fuente de código para copiar ciegamente. Mantener respaldos e historial; no borrar versiones.
- Objetivo de V12: reproducir las funciones y apariencia aprobadas, con arquitectura limpia, sin CSS/JS contradictorios ni acciones duplicadas. Componentes comunes centralizados; funciones de cada categoría aisladas. Nunca afirmar «sin ningún error» sin pruebas.
- Flujo de Real Estate & Closing: **01 Contract Setup / Manage Your Workspaces → 02 MY TASKS (Table 01 Contract Tasks & Deadlines y Table 02 Follow-Up Tasks) → 03 Communication Center**. Tablas, resúmenes, destinatarios y borradores independientes; opción Both Tables. Selecciones vacías al abrir/refrescar salvo recuperación explícita; elegir un workspace no carga sus datos hasta abrirlo. Fechas y conteo de días correctos; guardar/cargar plantillas sin mezclar datos de proyectos; preservar privacidad.
- La candidata local V12 pasó una serie de pruebas automatizadas comunicadas en chats previos, **pero eso no certifica por sí solo una entrega final**. Antes de publicar, verificar navegación real, diseño adaptable, proyectos, fechas, tablas, resúmenes, emails, almacenamiento, privacidad, enlaces y regresión; documentar evidencia y pendientes. No presentar como terminada si quedan pruebas críticas.
- **Forma de trabajo solicitada:** el propietario no quiere mensajes de «sigue», ZIPs intermedios, jerga técnica ni explicaciones etapa por etapa. Realizar todas las tareas y pruebas posibles de forma autónoma dentro de la sesión; comunicar solo resultados sustanciales y una entrega final sencilla cuando realmente esté lista. No prometer trabajo en segundo plano entre conversaciones.
- **Continuidad entre chats:** este DOCUMENTO-MAESTRO.md es el punto de entrada. Al comenzar un nuevo chat de desarrollo, consultar este archivo en GitHub y el código/ZIP más reciente verificable antes de actuar; no asumir que el último ZIP local está en GitHub. Actualizar esta sección con decisiones nuevas y estado verificado al terminar cada sesión importante, **cuando el usuario haya autorizado esa actualización**. Las conversaciones futuras no se sincronizan automáticamente con GitHub: requieren que el asistente conectado lea y escriba el documento en cada sesión.
- No reemplazar decisiones previas silenciosamente. Si hay contradicción, registrar fecha y decisión vigente; mantener el historial y pedir aclaración solo cuando sea imprescindible.


## 11. Continuidad V12 · Auditoría y Communication Center · 21 de noviembre de 2026

**Última entrega local de prueba:** `MCT-V12-185-ORDEN-REAL-EMAIL.zip`. **Respaldo:** V12-184 y anteriores. La entrega ZIP local no implica que el código esté publicado ni sincronizado con GitHub; **no desplegar en Cloudflare sin autorización expresa**.

### Avances de esta sesión
- **V12-181:** ajuste visual de **Overdue** a terracota para diferenciarlo de **Full Table View**; se revisó la posición de este botón para que no cubra tareas al desplazarse. Comprobación visual final pendiente.
- **V12-182:** corrección de confirmación al reemplazar plantillas; revisión de prueba antigua que exigía workspace para cargar plantillas personales, contradiciendo la regla vigente de **plantillas independientes del workspace**.
- **V12-183:** confirmaciones personalizadas para eliminar contactos y protección frente a errores de guardado; mantener **Cancel** sin eliminar datos.
- **V12-184:** primer intento de ordenar los resaltados del Communication Center. **La captura del usuario confirmó que no funcionó**: se iluminaba Saved contact antes que Table to send.
- **V12-185:** se corrigió la lógica de entrada al paso Communication Center y se evitó avanzar al enfocar/abrir el selector sin cambiar la tabla. **El usuario confirmó «perfecto»** después de esta entrega. La comprobación formal de navegador de todas las variantes aún no está documentada.

### Regla vigente de Communication Center
1. Al entrar por **Send Email** o navegación, resaltar en **amarillo Table to send** primero, incluso si una tabla viene preseleccionada.
2. El operador escoge **Table 01**, **Table 02** o **Both Tables**; al **cambiar efectivamente** la selección, trasladar el amarillo a **Saved contact**. No adelantar la guía solo por foco o apertura del desplegable.
3. Permitir elegir contacto guardado o escribir correo del destinatario; completar **Role / Relationship** y demás campos requeridos; habilitar **Preview Email** solo cuando las validaciones se cumplan.
4. Mantener selecciones, resúmenes, borradores y envío independientes por tabla; Both Tables solo cuando corresponde. No alterar el diseño aprobado ni los colores de los dos resúmenes.

### Reglas de protección y pendientes
- **Closing Timeline Summary:** encabezado ocre/marrón y filas crema/dorado; **Follow-Up Summary:** encabezado ciruela/burdeos y filas rosadas. **No cambiar sus colores ni apariencia aprobados.**
- Conservar los estilos delicados de Table 01 y Table 02 y los indicadores Today/Tomorrow/Overdue.
- Auditoría de código aún **incompleta**: revisar scripts superpuestos y órdenes contradictorias, confirmaciones antiguas de workspaces/contactos/plantillas, persistencia y recuperación, seguridad de borrado, pruebas de ambas bibliotecas y recorrido integral de cinco pasos en navegador.
- No confundir validación de sintaxis e integridad ZIP con pruebas funcionales completas; registrar evidencia y pendientes.
- **Una sola entrega ZIP por grupo coherente de cambios**, probar antes de entregar y hacer coincidir exactamente el nombre del ZIP y el de su carpeta interior; preservar versiones de respaldo.
- Respetar privacidad: no solicitar, guardar ni publicar información personal de terceros o datos identificables de compañías en pruebas, proyectos, reseñas o feedback; usar datos ficticios/anonimizados.
- Próxima sesión: partir del **ZIP V12-185 verificable** y este documento; revisar primero el comportamiento Table to send → Saved contact y luego continuar la auditoría sin rehacer lo aprobado.


## 12. Decisión comercial vigente · 22 de noviembre de 2026 · Prueba gratuita universal de 90 días

**Decisión expresa del propietario (sustituye la regla anterior de 21 días):**
- **Eliminar completamente la prueba gratuita inicial de 21 días.** No anunciarla ni implementarla como oferta vigente.
- **Todos los usuarios nuevos tendrán 3 meses (90 días) de acceso gratuito inicial.** No limitar esta duración solo a Founding Members. Evitar mensajes que presenten dos pruebas iniciales distintas.
- **Registro gratuito sin tarjeta de crédito.** No solicitar ni almacenar datos de tarjetas en My Closing Timeline. Si un usuario decide contratar después, procesar el pago mediante un proveedor externo seguro, sin que el sitio recoja ni almacene directamente los datos completos de la tarjeta.
- **Sin cargos automáticos ni obligación de comprar, continuar o renovar.** Finalizados los 90 días, el usuario decide expresamente si desea un plan de pago. No se cobra por inacción. No activar renovaciones automáticas sin una decisión posterior y autorización expresa; cualquier condición futura debe comunicarse antes de contratar.
- Mensaje comercial recomendado: **“Try It Free for 90 Days. No Credit Card Required. No Obligation to Continue.”** Explicar de manera visible que después existen planes de pago opcionales y que no habrá cobros automáticos por finalizar la prueba.
- **Founding Members:** mantenerlo como posible programa separado de participación temprana y feedback voluntario, pero **no** como única vía para obtener los 90 días. Sus beneficios especiales, extensiones o condiciones anteriores quedan **pendientes de revisión** para evitar contradicciones con la nueva prueba universal; no anunciar condiciones no confirmadas.
- **Implementación pendiente:** revisar todas las páginas, formularios, planes, FAQ, textos, pruebas, reglas de acceso, base de datos y automatizaciones para retirar referencias activas a 21 días y verificar coherencia de los 90 días. No cambiar producción ni activar registros/pagos sin autorización y pruebas.
- **Privacidad:** reseñas y comentarios opcionales, privados por defecto, sin datos de terceros ni compañías; publicar testimonios únicamente con permiso explícito.
- **Próxima prioridad:** definir exactamente qué acceso se mantiene tras los 90 días, qué planes de pago se ofrecerán, cómo se avisará del vencimiento y cómo se mide conversión/feedback. No inferir estas condiciones del esquema comercial anterior.


## 13. Plans & Pricing · decisiones y revisión visual V12-187 a V12-190 · 22 de noviembre de 2026

**Alcance:** página local `plans.html` y navegación informativa `payment.html`. Estas versiones ZIP son vistas previas locales, no evidencia de publicación en Cloudflare ni de pagos activos. Conservar intactos diseño y funciones aprobados de Real Estate & Closing.

### Modelo comercial en evaluación
- Mantener la **prueba inicial universal de 90 días**, nunca 21 días; registro sin tarjeta, sin cobros automáticos y sin obligación de contratar o renovar, condicionado a verificar que la implementación real cumpla estas promesas.
- Presentar **tres maneras sencillas de continuar** tras el período gratuito: **Pay Per Project**, **Two Categories** (elegir cualesquiera dos de cuatro) y **All Access** (las cuatro).
- Para **Pay Per Project**, sustituir el concepto complejo de «créditos» por **acceso a un proyecto concreto durante 30 o 90 días**, a elección del cliente, sin suscripción mensual. Definir después precio, alcance, proyectos simultáneos, continuidad e historial.
- Para **Two Categories** y **All Access**, estudiar períodos prepagados de **1, 3, 6 y 12 meses**. Definir límites de proyectos, condiciones y precios antes de lanzar.
- Las **cuatro categorías son tipos de trabajo, no planes ni períodos**: Real Estate & Closing; Business & Projects; Services & Contractors; Personal & Home. Explicar explícitamente esta distinción en la página, así como qué compra cada opción.
- El usuario propuso evaluar precios normales y promociones introductorias, incluso descuentos importantes; **no anunciar precios de referencia ficticios ni descuentos no verificables**. Todos los precios, límites y promociones siguen pendientes de aprobación.
- Cada opción debe llevar mediante un botón real a `payment.html` mostrando el plan, categorías y duración elegidos. **No activar checkout ni cobrar** antes de aprobar precios, condiciones, seguridad y pruebas.
- Las cuatro fotografías de las categorías gustan al propietario: **conservarlas**. Las otras categorías pueden estar todavía en desarrollo: no prometer funciones no disponibles.

### Diseño y claridad visual
- **V12-187:** primera vista previa local de Plans & Pricing, con fotografías, tres ofertas, categorías, períodos, FAQ y enlaces informativos a Payment.
- **V12-188:** reorganizar para distinguir claramente **categoría / tipo de plan / duración**; permitir elegir un proyecto por 30 o 90 días; resaltar con elegancia los **cuatro mensajes de confianza**: “No credit card to register”, “No automatic charges”, “No obligation to continue”, “Your privacy matters”. Deben ser visualmente destacados, equilibrados y **no parecer botones clicables si no lo son**.
- Mostrar con claridad qué significan las cuatro categorías y por qué aparecen los cuatro períodos; evitar bloques repetidos o una estructura que confunda al visitante.
- **V12-189:** se aumentó la fuente de las respuestas FAQ, pero el propietario comprobó en captura que quedó **demasiado grande y poco elegante**.
- **V12-190 — preferencia visual vigente:** en “Questions Before You Choose?”, **preguntas a 15 px en negrita; respuestas a 14 px**, discretamente más pequeñas, con interlineado cómodo. Mantener una jerarquía limpia; no volver a agrandar las respuestas por encima de las preguntas. Este ajuste se comunicó como ZIP `MCT-V12-190-FAQ-TIPOGRAFIA-EQUILIBRADA.zip`; **la revisión visual final por el propietario sigue pendiente**.
- Los botones flotantes Back to top / Ask Timeline, el encabezado, el pie y el diseño compartido deben permanecer consistentes.

### Trabajo pendiente y control de versiones
- Validar en navegador las selecciones y el paso a Payment, incluidos estados sin seleccionar, móviles y regreso a Plans; verificar coherencia entre contenido comercial y backend.
- Antes de ofrecer cobros, cerrar el modelo comercial y los términos de acceso, expiración, privacidad y no renovación.
- Mantener la regla de **un ZIP por conjunto coherente de correcciones**, con carpeta interior del mismo nombre que el ZIP, sin borrar versiones previas.
- La última versión local comunicada en esta secuencia es **V12-190**, pero no implica que esté publicada ni que haya superado pruebas funcionales integrales.


## 14. Continuidad V12-201 a V12-206 · Registro seguro y orden de lanzamiento · 22 de noviembre de 2026

**Decisión de trabajo del propietario:** registrar los pasos necesarios en GitHub y **terminar, auditar y probar primero la V12 local; reservar la conexión y publicación en Cloudflare para la etapa final**, sin dejar de preparar contratos de API, esquema de datos y pruebas desde ahora. No desplegar ni activar cobros sin autorización expresa.

### Identidad y registro
- Una sola cuenta de usuario para las cuatro categorías: **Real Estate & Closing, Business & Projects, Services & Contractors y Personal & Home**. Las categorías son actividades; **Pay Per Project, Two Categories y All Access** son modalidades de plan, sujetas a aprobación comercial.
- Formulario inicial: **nombre completo y correo electrónico obligatorios; teléfono opcional**, presentado como ayuda para seguridad y recuperación. No exigir teléfono a todos por defecto ni usarlo para publicidad sin consentimiento.
- Verificar posesión del email antes de habilitar la prueba. Normalizar email y establecer unicidad de cuenta en servidor/base de datos. Los enlaces de verificación deben expirar y ser de un solo uso. Inicio de sesión y recuperación seguros; mensajes que no revelen si un email existe.
- Después del registro: **Choose Activities → Start Free Access → Choose a Plan**, con posibilidad de modificar actividades posteriormente. Evitar crear otra cuenta por cada actividad.
- **Oferta vigente: 90 días gratuitos universales, una vez por cuenta, sin tarjeta, sin obligación de compra ni cobro automático**. Fecha de inicio, fin y concesión deben registrarse y validarse en servidor, con operación atómica para impedir doble concesión. Las reglas de acceso tras el vencimiento requieren definición y pruebas.
- No prometer imposibilidad absoluta de múltiples cuentas de una misma persona: dos emails distintos pueden eludir la unicidad por email.

### Prevención proporcional del abuso
- Propuesta: **Cloudflare Turnstile** validado en servidor, límites de solicitudes por IP y por cuenta, protección de creación de cuentas y verificación de email, detección de patrones anómalos, bloqueo prudente de correos desechables y controles de recuperación.
- **IP o huella de dispositivo no equivalen a identidad personal**: no bloquear automáticamente a familias, oficinas o redes compartidas; VPN, IP dinámica y cambios de navegador limitan su eficacia.
- Solicitar verificación adicional por teléfono únicamente ante señales justificadas, con alternativa de revisión para usuarios legítimos. Minimizar registros técnicos, establecer retención limitada y reflejar el tratamiento en Privacy.
- Los controles comerciales deben estar en **Cloudflare Workers + D1 o backend equivalente**, no en JavaScript del navegador ni solo en almacenamiento local. Revisar idempotencia, concurrencia, autorizaciones y auditoría.
- **GitHub**: repositorio, control de versiones, revisión y pruebas; **Cloudflare**: ejecución del backend, Turnstile, datos, seguridad y publicación cuando se autorice. No almacenar secretos en GitHub.

### Promociones
- El propietario planteó **comprar un plan y recibir otro beneficio**. **Propuesta pendiente de aprobación:** crédito de acceso adicional limitado a otra actividad durante 30 días, una vez por cuenta, sin renovación automática. No anunciar, conceder ni combinar automáticamente hasta definir elegibilidad, límites y coste.
- Mantener separado **BUY 5 CLOSINGS · GET 1 FREE** de cualquier nueva promoción. Revisar compatibilidad y evitar doble aplicación accidental.

### Estado comunicado de las versiones locales
- **V12-201:** nombre de página unificado como `studio.html`; actualizar enlaces y evitar presentar Studio como autorización administrativa.
- **V12-202 y V12-203:** correcciones de pruebas de rutas con parámetros de caché y de interacción al crear un workspace; no equivalen a certificación integral.
- **V12-204:** documentación de arquitectura de registro seguro y esquema SQL propuesto, **sin activar registro real**.
- **V12-205:** pruebas locales de unicidad de email, una prueba por cuenta y cuatro categorías; **no demuestran unicidad por persona**.
- **V12-206:** se comunicó eliminación de HTML administrativo público y preparación de ruta privada. **La seguridad de producción y autenticación de propietario aún no están verificadas**.
- Estos ZIP fueron comunicados como entregas locales; **no asumir que sus cambios están en el repositorio GitHub ni en Cloudflare**. Para continuar, abrir el ZIP más reciente verificable y comparar su contenido con el repositorio.

### Secuencia aprobada de finalización
1. **Congelar la base V12 local verificable**; preservar ZIPs e historial; identificar versión y archivos exactos.
2. **Auditoría integral de las páginas:** Home, cuatro categorías, Real Estate & Closing, Founding Members, Plans, Payment, Help & Contact, Privacy y Studio; navegación, enlaces, títulos, footer, adaptación móvil y accesibilidad. Conservar diseño aprobado.
3. **Pruebas funcionales completas de Real Estate:** Contract Setup → dos tablas independientes y resúmenes → Communication Center, fechas, tareas, plantillas, contactos, borradores, selecciones, aislamiento de proyectos, errores y recuperación; usar datos ficticios.
4. **Definir y probar el recorrido de cuenta en entorno local/simulado:** Create Account → Verify Email → Choose Activities → Free Trial → Choose Plan; estados, mensajes, caducidad y errores. Las simulaciones no se presentarán como servicio real.
5. **Cerrar reglas comerciales y legales:** precios, límites, duración, promociones, acceso al terminar 90 días, avisos de vencimiento, privacidad, eliminación de datos, ausencia de renovación automática y términos de compra. No inventar precios ni ofertas.
6. **Preparar backend sin activarlo:** migraciones D1, Workers/API, verificación Turnstile, sesiones y cookies seguras, verificación email, registro único de prueba, autorización por recurso, recuperación, límites y pruebas automatizadas. Mantener secretos fuera del código.
7. **Probar seguridad y regresión en entorno aislado:** registros repetidos, emails distintos, sesiones caducadas, acceso entre cuentas, privilegios de Studio, endpoints administrativos, errores de pago, idempotencia, protección contra abuso y dispositivos móviles.
8. **Solo al final, y con autorización:** configurar recursos Cloudflare, variables/secretos, dominios y correo; desplegar primero a staging; probar integralmente con cuentas ficticias. La integración real puede revelar problemas que deban corregirse antes del lanzamiento.
9. **Pagos:** habilitar checkout externo únicamente tras aprobar planes/precios y verificar webhooks, conciliación, reintentos, cancelaciones y acceso concedido; nunca recopilar tarjetas en nuestro sitio.
10. **Publicación final:** respaldo, checklist de aceptación, autorización expresa del propietario, despliegue controlado, monitoreo y plan de reversión.

### Normas de entrega y comunicación
- No enviar ZIP por cada ajuste pequeño: agrupar correcciones relacionadas, comprobarlas y entregar una versión coherente. **ZIP y carpeta interior con idéntico nombre**.
- Al pedir revisión visual, indicar **el nombre exacto del HTML que abrir y qué comprobar**.
- No afirmar que algo está implementado, probado en navegador, desplegado o protegido en producción sin evidencia específica. Distinguir **propuesta / código local / prueba local / staging / producción**.
- No borrar historial ni cambiar el sitio publicado sin autorización; no guardar datos personales de terceros en pruebas o reseñas.


## 15. Verificación local parcial de V12-207 · 22 de noviembre de 2026

Se inspeccionó directamente la carpeta local `MCT-V12-207-HOME-90-DIAS-UNIVERSALES` y se ejecutaron pruebas existentes, sin publicar ni modificar producción. **Resultado confirmado:** pasaron `v12_55_smoke_test.py`, `v12_admin_private_route_test.py`, `v12_browser_interaction_test.py`, `v12_browser_layout_test.py`, `v12_dom_contract_test.py`, `v12_draft_isolation_test.py`, `v12_email_guide_consistency_test.py`, `v12_guided_alignment_test.py`, `v12_home_trial_clarity_test.py`, `v12_integrity_test.py`, `v12_template_safety_test.py`, `v12_workflow_contract_test.py`, `v12_workspace_isolation_test.py` y `registro_d1_schema_test.py`. Son pruebas locales de código, DOM y navegador automatizado; no equivalen a aceptación del usuario ni a seguridad en producción.

**Pendiente importante:** `v12_independent_email_e2e_test.py` no terminó dentro del límite de ejecución del lote y **no debe contarse como aprobada**; aislar el bloqueo y repetirla. También faltan las pruebas integrales del registro real y la conexión Cloudflare. No crear un ZIP nuevo únicamente por actualizar el estado de pruebas: continuar agrupando cambios funcionales.


### Actualización de prueba independiente · 22 de noviembre de 2026
Se volvió a ejecutar directamente en la carpeta local V12-207 `python tests/v12_independent_email_e2e_test.py` con Chromium/Playwright. **Resultado: PASS**, con salida `PASS independent Table 01, Table 02, Both; separate drafts; confirmation; workspace isolation`. El test comprobó grupos independientes de Table 01 y Table 02, Both condicionado a confirmación, destinatarios y borradores separados, aislamiento de CASE B y recuperación del borrador de CASE A. El bloqueo por tiempo del lote anterior **no se reprodujo en esta ejecución aislada**. No demuestra envío real de email externo, despliegue ni seguridad de producción. Se mantiene Cloudflare para la integración final autorizada.


## 16. Comprobaciones locales V12-208 · 22 de noviembre de 2026
Se inspeccionó el ZIP y la carpeta local `MCT-V12-208-ACCOUNT-NAVIGATION-PREVIEW`. El cambio documentado en `CAMBIOS-V12-208.md` dirige Sign In y Register a `account-preview.html`, una página informativa sin formulario ni almacenamiento de credenciales; no se ha activado el registro real.

**Pruebas ejecutadas directamente y aprobadas:** `v12_account_navigation_test.py` (sin enlaces de registro al sistema antiguo), `v12_home_trial_clarity_test.py` (90 días universales frente a Founding Members opcional), `v12_integrity_test.py` (IDs, dependencias y sintaxis JS), `v12_independent_email_e2e_test.py` (Table 01, Table 02, Both, borradores separados, confirmación y aislamiento), `v12_browser_interaction_test.py` (workspace, fechas, selección, confirmación, borrador y reapertura) y `v12_browser_layout_test.py` (Chromium 1440 px y 390 px, sin errores de página reportados).

**Límites:** pruebas automatizadas locales, no validación de envío externo real, autenticación real, Cloudflare ni aceptación visual del propietario. No se modificó el sitio publicado. Continuar auditoría de páginas y flujos antes de entregar un ZIP nuevo; agrupar cambios funcionales.


## 17. V12-209 · Claridad de privacidad local · 22 de noviembre de 2026
Partiendo de la carpeta local verificable V12-208 se creó `MCT-V12-209-PRIVACY-CLARITY.zip`, con carpeta interior del mismo nombre. Se amplió **`privacy.html`** para indicar expresamente que es una vista previa, que el registro y pagos no están activados, que algunas funciones pueden conservar datos en el almacenamiento local del navegador incluso tras refrescar/cerrar, que solo deben usarse datos ficticios y que la política final (retención, derechos, proveedores y controles) sigue pendiente. No se modificó producción.

**Pruebas locales aprobadas:** `v12_privacy_preview_test.py`, `v12_integrity_test.py`, `v12_account_navigation_test.py`, `v12_home_trial_clarity_test.py` y verificación de integridad del ZIP. **No equivale a aprobación legal ni a pruebas de Cloudflare**. Revisar visualmente `privacy.html` antes de publicar; completar la política real según los servicios finalmente utilizados.


## 18. V12-210 · Regreso de Payment a Plans · 22 de noviembre de 2026
Se creó localmente `MCT-V12-210-PLAN-RETURN.zip` a partir de V12-209, con carpeta interior homónima. `payment.html` conserva los parámetros de una opción **válida** en el enlace Back to Plans & Pricing; `pages/pricing-v188.js` restaura categoría y duración al volver, comprobando los valores admitidos. Se añadió `CAMBIOS-V12-210.md`. Pasaron las pruebas locales `v12_integrity_test.py`, `v12_home_trial_clarity_test.py`, `v12_privacy_preview_test.py` y la integridad del ZIP. **Pendiente:** prueba de ida y vuelta en navegador automatizado y aceptación visual. No se ha activado checkout, registro ni despliegue.


## 19. V12-210 · Verificación de acceso administrativo · 22 de noviembre de 2026
Inspección directa de `studio.html`, `functions/admin-founding-members.js` y `functions/api/founding/admin-summary.js` en la carpeta local V12-210. El enlace `/admin-founding-members` en Studio es una ruta protegida del servidor, **no** un archivo HTML estático; por ello no funciona al abrir el ZIP local y no debe reemplazarse por una página pública. Se ejecutaron `node --test tests/founding_admin_page.test.mjs tests/founding_admin_summary.test.mjs` (2/2 aprobadas) y `python tests/v12_admin_private_route_test.py` (aprobada). Las pruebas incluyen bandera desactivada, sesión ausente/vencida, rechazo de cookie PRO, firma válida de propietario, agregados y cabecera `no-store`. **Límite:** pruebas de funciones locales; no constituyen auditoría de seguridad completa ni validación de autenticación/despliegue en Cloudflare. Mantener el panel desactivado hasta autorización y revisión de producción.


## 20. Auditoría de preparación del registro V12-210 · 22 de noviembre de 2026
Inspección de `ESQUEMA-REGISTRO-PROPUESTO.sql`, `SEGURIDAD-REGISTRO-V12-204.md`, `account-preview.html` y rutas `functions/api/` en el ZIP local V12-210. Se ejecutaron y aprobaron `registro_d1_schema_test.py`, `v12_account_navigation_test.py`, `v12_home_trial_clarity_test.py` y `v12_integrity_test.py`. **Hallazgo:** el esquema SQL impone unicidad de email normalizado y un solo `intro_trial` por `account_id`, pero esto no constituye un registro seguro completo ni impide por sí solo múltiples correos de una persona. La ruta de registro/verificación de email y el sistema de sesiones de usuario aún no están implementados en las Functions del proyecto; `account-preview.html` informa correctamente que están desactivados. El esquema debe revisarse para los casos de cierre/recreación de cuenta y activación atómica, sin almacenar identificadores invasivos. **Próxima etapa:** diseñar pruebas de concurrencia, token de un solo uso, caducidad, autorización y restauración, antes de cualquier despliegue. No activar producción, cobros ni cuentas desde la vista previa.


## 21. V12-211 · Pruebas adicionales de integridad de registro · 22 de noviembre de 2026
Se generó localmente `MCT-V12-211-REGISTRATION-SAFETY-TESTS.zip` con carpeta interior homónima a partir de V12-210. Solo se añadieron `tests/v12_registration_safety_test.py` y `CAMBIOS-V12-211.md`; no se modificó el esquema SQL ni se habilitó el registro. **Pruebas aprobadas:** nueva prueba de cuenta cerrada, borrado restringido por clave foránea, unicidad de prueba por cuenta, categorías y referencias válidas, y escrituras sucesivas de dos conexiones; además `registro_d1_schema_test.py`, `v12_integrity_test.py`, `v12_home_trial_clarity_test.py` e integridad del ZIP. **Límites:** no es una prueba de concurrencia simultánea, sesiones, tokens ni Cloudflare. El esquema actual impide borrar físicamente cuentas con entitlements, lo que requiere decisión de privacidad y retención antes del lanzamiento. No usar el correo como prueba de identidad de una persona distinta.


## 22. V12-212 · Contrato de tokens de correo · 22 de noviembre de 2026
Se creó `MCT-V12-212-EMAIL-TOKEN-TESTS.zip` con carpeta interior del mismo nombre, derivado de V12-211. Se añadieron `tests/v12_email_token_contract_test.py` y `CAMBIOS-V12-212.md`, sin cambios en las páginas ni en las API. Se aprobaron pruebas SQLite de hash SHA-256 de token aleatorio, token incorrecto, consumo único, vencimiento (incluido el instante exacto), cuenta cerrada y borrado en cascada; también pasaron `registro_d1_schema_test.py`, `v12_registration_safety_test.py`, `v12_integrity_test.py` y la integridad ZIP (317 archivos). **Alcance limitado:** la lógica de consumo es una implementación de referencia aislada dentro del test; NO existe todavía endpoint de verificación real, entrega de emails, sesión segura, activación atómica de prueba gratuita ni despliegue. Próximos controles: atomicidad real de activación, protección contra carreras, límites de intentos y caducidad de sesiones.


## 23. V12-213 · Contrato transaccional de activación · 22 de noviembre de 2026
Se creó `MCT-V12-213-ATOMIC-TRIAL-CONTRACT.zip` desde V12-212, con carpeta interior del mismo nombre. Se añadieron `tests/v12_atomic_trial_contract_test.py` y `CAMBIOS-V12-213.md`, sin modificar páginas ni Functions. La prueba de referencia SQLite usa `BEGIN IMMEDIATE`, consume un token no vencido, marca la cuenta activa y crea un entitlement de `intro_trial` por 90 días dentro de **una misma transacción**; comprueba que un error intermedio revierte todo, que se permite reintentar después del rollback, y que replay y caducidad no crean beneficios. Pasaron esta prueba, `v12_email_token_contract_test.py`, `v12_registration_safety_test.py`, `v12_integrity_test.py` y la integridad del ZIP (319 archivos). **No es endpoint real ni prueba de concurrencia simultánea o de D1 desplegado**. Pendientes: validación en D1, gestión de sesiones, límites de intentos, entrega real de email, privacidad y autorización antes del lanzamiento.
