# Plan maestro de reconstrucción — MyClosingTimeline V11

**Estado:** Plan rector aprobado. Documento de autoridad para la reconstrucción V11.  
**Regla:** ninguna página interior puede modificar la estructura común.

> **GUÍA DE VIGENCIA — 23/11/2026:** Este documento conserva el historial V1–V12. Las secciones antiguas son referencias históricas cuando una decisión posterior las sustituye. Para determinar qué implementar, consultar primero las decisiones vigentes de V12 y el registro de conflictos de la sección 37. Ninguna instrucción histórica autoriza cambiar producción. El código y el despliegue deben verificarse por separado.

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


## 24. V12-214 · Contrato local de sesiones y límites de intentos · 22 de noviembre de 2026
Se generó `MCT-V12-214-SESSION-RATE-LIMIT-CONTRACT.zip` (carpeta interior del mismo nombre), derivado de V12-213. Se añadieron `tests/v12_session_rate_limit_contract_test.py` y `CAMBIOS-V12-214.md`, sin modificar páginas ni endpoints. Pasaron 5 pruebas: sesión de referencia con hash SHA-256 de token aleatorio, vencimiento exacto, suspensión, revocación y borrado en cascada; límites de intentos por ámbito/sujeto/ventana; además contratos de activación atómica, verificación de email, seguridad del esquema e integridad de HTML/JS. ZIP verificado (321 archivos, `testzip() = None`). **Advertencia:** es una simulación SQLite aislada, no un sistema real de autenticación; los límites de intentos no resisten concurrencia distribuida. Antes de producción: cookies Secure/HttpOnly/SameSite, protección CSRF, rotación de sesiones, transacciones/atomicidad de límites, privacidad y retención, entrega de correo, pruebas en D1/Workers y autorización expresa. Cloudflare no se modificó.


## 25. V12-215 · Fundamentos de autenticación aislados · 22 de noviembre de 2026
Se generó `MCT-V12-215-AUTH-FOUNDATION.zip`, carpeta interior idéntica, a partir de V12-214. Se añadió `auth-draft/security.mjs` (normalización básica de email, tokens de 32 bytes criptográficamente aleatorios, SHA-256, formato de cookies `__Host-` Secure/HttpOnly/SameSite=Lax y comparación estricta de caducidad), más `tests/v12_auth_foundation_test.mjs` y `CAMBIOS-V12-215.md`. Pasaron el test Node de primitivas, `v12_integrity_test.py`, `v12_registration_safety_test.py`, `v12_atomic_trial_contract_test.py` e integridad del ZIP (324 archivos). **El módulo está aislado y no se importa desde endpoints:** no hay registro público funcional, emisión de email, D1 ni sesiones reales. Pendientes: validación de email robusta, protección CSRF, rate limit distribuido, tokens de un uso y transacciones D1, auditoría y pruebas de servidor antes de conectar el flujo. No se modificó Cloudflare.


## 26. V12-216 · Borrador aislado de flujo de registro · 22 de noviembre de 2026
Se generó `MCT-V12-216-REGISTRATION-FLOW-DRAFT.zip`, carpeta interior homónima, desde V12-215. Se añadieron `auth-draft/registration-flow.mjs`, `tests/v12_registration_flow_draft_test.mjs` y `CAMBIOS-V12-216.md`. `prepareRegistration` valida nombre y correo, genera token aleatorio y hash, y propone caducidad a 30 minutos; `verifyAndActivate` exige un adaptador `consumeAndActivateAtomically` y duración de 90 días. **Solo borrador:** el adaptador transaccional del test es un mock en memoria, no D1; no existe ruta de registro ni envío de correo real. Se aprobaron 5 pruebas Node (incluidas primitivas V12-215), `v12_integrity_test.py` e integridad ZIP (327 archivos). Próximos pasos: diseñar y probar adaptador D1 transaccional, protección CSRF, rate limit distribuido, sesiones y recuperación, sin activar cuentas ni desplegar Cloudflare.


## 27. Respaldo V12-216 en GitHub · 22–23 de noviembre de 2026
El usuario subió mediante la interfaz web de GitHub el archivo `MCT-V12-216-REGISTRATION-FLOW-DRAFT.zip` a la rama independiente `backup/v12-216-preparacion`. La existencia del ZIP se verificó directamente mediante la API de GitHub (blob SHA `f4e86af25d20fbed058ebe92f0f73589021c9816`). **Alcance:** GitHub almacena el ZIP completo como archivo; los 327 archivos internos todavía no se han incorporado individualmente a la rama. La rama `main` y el sitio publicado no se modificaron por esta operación. El usuario no desea recibir más ZIP ni instrucciones para respaldos rutinarios; mantener respaldos y documentación de manera interna, sin imponer trabajo manual.

## 28. Registro y D1: alcance de pruebas y pendientes · 23 de noviembre de 2026
Se incorporó a la rama `backup/v12-216-preparacion` el documento `auth-draft/D1-INTEGRATION-CHECKLIST.md` (commit `9f7280c6882c36d819f2c7faf2f58ff085f22026`), que define las condiciones previas al despliegue: revisar esquema y migraciones, consumo atómico de token con activación y beneficio único de 90 días, protección contra solicitudes repetidas y simultáneas, correo de verificación, límites de intentos, CSRF/origen, cookies seguras, revocación, privacidad, pruebas aisladas en D1 y autorización expresa antes de publicar. **Es un plan, no una implementación conectada a D1.**

También se incorporó `auth-draft/CONCURRENCY-REFERENCE-2026-11-23.md` (commit `769bbd28794ff8315600c9ea80af952b4b74d81d`), que documenta una prueba de referencia SQLite con dos conexiones que intentan consumir el mismo token y un solo beneficio `intro_trial` resultante. **No demuestra comportamiento de Cloudflare D1 ni concurrencia distribuida.** Las pruebas locales previamente reportadas de SQLite y módulos aislados no equivalen a endpoints públicos funcionales, envío real de correos, sesiones operativas ni despliegue. No afirmar que la conexión D1 ya esté terminada o que el registro esté activo.

**Decisión operativa:** preservar diseño, navegación, cuatro categorías y el flujo aprobado; no tocar `main`, Cloudflare ni producción sin pruebas suficientes y autorización del propietario. Priorizar integración D1 en entorno aislado, pruebas de concurrencia, recuperación y seguridad, sin recopilar datos identificables de clientes o empresas en pruebas. Evitar multiplicar versiones y enviar archivos de respaldo al usuario salvo solicitud expresa.


## 29. Protocolo permanente de continuidad entre chats · 23 de noviembre de 2026
El propietario solicita que el asistente mantenga este documento maestro actualizado **antes de que una conversación llegue a su límite**, para continuar en otro chat sin perder decisiones, versiones, tareas pendientes ni el estado real de las pruebas. No es posible conocer con exactitud cuándo ChatGPT exigirá iniciar un nuevo chat, por lo que el registro debe ser **continuo**, no una tarea dejada para el final.

Al concluir cada bloque sustantivo de trabajo, documentar: (1) decisiones aprobadas y elementos que no deben cambiar; (2) archivos, rutas, rama y commits realmente modificados; (3) pruebas ejecutadas y resultados comprobados, distinguiéndolos de planes o simulaciones; (4) asuntos pendientes, riesgos y siguiente paso concreto; (5) estado del sitio publicado y de cualquier despliegue; (6) referencias a versiones de recuperación verificadas. No afirmar que una operación se completó si no hay evidencia. Al comenzar otro chat, consultar este documento y contrastarlo con el estado real del repositorio.

Preferencia expresa: **no enviar al propietario enlaces al documento, ZIP, respaldos ni reportes técnicos rutinarios**, salvo que los solicite. Informar de avances con mensajes breves y claros en español. Los respaldos deben quedar accesibles de manera independiente; la confianza en el asistente no sustituye la conservación verificable del trabajo. No desplegar en producción sin autorización expresa.


## 30. Registro proactivo sin pedir autorización repetida · 23 de noviembre de 2026
Instrucción expresa del propietario: **cuando una decisión, requisito, corrección aprobada, regla permanente, resultado verificado, riesgo relevante o cambio de alcance merezca conservarse, el asistente debe registrarlo directamente en este DOCUMENTO-MAESTRO.md antes de limitarse a informarlo**, sin esperar que el propietario diga «recuérdalo», «guárdalo» o «regístralo» en cada ocasión. El asistente debe ejercer criterio para decidir qué información es importante y evitar perderla entre chats.

Registrar hechos comprobados con rutas, ramas, commits, pruebas y estado real; distinguir decisiones aprobadas, propuestas, pendientes y resultados no verificados. Evitar notas triviales o repetitivas. Tras registrar, comunicar únicamente una confirmación breve si resulta útil, **sin enviar enlaces, ZIP ni documentos** salvo solicitud expresa. Esta autorización de documentación no autoriza desplegar, modificar producción ni realizar cambios comerciales irreversibles.


## 31. Revisión de atomicidad D1 antes de implementar · 23 de noviembre de 2026
Se revisó el esquema propuesto `ESQUEMA-REGISTRO-PROPUESTO.sql` y el borrador aislado `auth-draft/registration-flow.mjs` de V12-216. El esquema tiene un índice único parcial para una prueba `intro_trial` por cuenta; la función de verificación requiere un adaptador `consumeAndActivateAtomically` que todavía no está implementado. Se creó en la rama `backup/v12-216-preparacion` el documento `auth-draft/D1-ATOMICITY-DECISION.md` (commit `169820c43c749553b7fbb0ff97bfbc11f7b3e5ce`). **Hallazgo técnico:** una operación SQL que afecta cero filas puede considerarse exitosa; por ello, agrupar consultas en D1 `batch()` no demuestra por sí solo que se cumplan las precondiciones de negocio. Se requiere una implementación compatible con D1 y pruebas en D1 aislado para consumo de token, activación, entitlement único, solicitudes concurrentes, fallos intermedios, reintentos y cuentas cerradas. Revisar también la política de eliminación/retención, pues `entitlements.account_id` no tiene `ON DELETE CASCADE`. **Estado:** revisión y documentación realizadas; no se implementó ni probó un adaptador D1 real; sin despliegue ni cambios en el sitio publicado.


## 32. Bloqueo de seguridad detectado en borrador de adaptador D1 · 23 de noviembre de 2026
Se inspeccionó un borrador local de `auth-draft/d1-adapter.mjs` que **no forma parte del ZIP base V12-216 confirmado**. Su propuesta utiliza `db.batch()` para insertar `intro_trial`, activar cuenta y consumir token, y comprueba `meta.changes` solo **después** de ejecutar el lote. **Problema crítico:** una instrucción condicional puede afectar cero filas sin producir un error SQL; si otra instrucción ya cambió datos, lanzar una excepción después del `batch()` no revierte necesariamente esos cambios. La existencia de un índice único no resuelve esa atomicidad de negocio. **Decisión:** no conectar ni desplegar ese borrador; exigir mecanismo atómico compatible con D1 y prueba de fallo intermedio que demuestre ausencia de cambios parciales, además de concurrencia y reintentos en D1 aislado. Hallazgo documentado en `auth-draft/D1-ADAPTER-SAFETY-BLOCKER.md` en la rama `backup/v12-216-preparacion` (commit `70fbfefd1d98c7621f0468043ad9e2f106c588c9`). No se modificó Cloudflare ni producción. Esta es una revisión estática, no una prueba de D1 desplegado.


## 33. Prueba de regresión de fallo parcial D1 (simulación) · 23 de noviembre de 2026
Se ejecutó localmente `node --test tests/v12_d1_partial_commit_regression.test.mjs` contra el borrador `auth-draft/d1-adapter.mjs` usando un doble de D1 que devuelve cambios `[1,0,0]` para inserción de beneficio, activación de cuenta y consumo de token. **Resultado: 1 prueba aprobada.** La prueba confirma que el adaptador detecta y rechaza la respuesta, pero **la inserción inicial permanece en el estado simulado**: lanzar una excepción tras `db.batch()` no deshace los cambios. Es evidencia de un bloqueo de seguridad, no de una corrección. Se incorporó además un test de regresión conceptual `auth-draft/tests/d1-partial-commit-regression.test.mjs` en la rama `backup/v12-216-preparacion` (commit `7b26df2347b9def2a5f7e6abc98d5fceba9711b5`). **Pendiente:** diseñar una operación realmente atómica compatible con D1, probarla en D1 aislado y verificar que ninguna modificación parcial persiste ante fallos y concurrencia. No se ha modificado producción.


## 34. Registro inmediato de lo importante, sin aplazamientos · 23 de noviembre de 2026
**Instrucción prioritaria y expresa del propietario:** en cuanto surja una decisión, requisito, hallazgo técnico, error, corrección, prueba, cambio de alcance o tarea pendiente que afecte la continuidad del proyecto, **escribirlo inmediatamente en este documento de GitHub, en el mismo bloque de trabajo y antes de comunicar el avance al propietario**. No acumular notas «para después», no esperar al cierre del chat, no pedir al propietario que lo recuerde y no convertirlo en una tarea manual suya. El asistente decide qué es relevante y evita duplicaciones o detalles triviales. Cada anotación importante debe distinguir claramente lo **realmente implementado y verificado** de lo **propuesto, simulado o pendiente**, con referencia a rama, archivo y pruebas cuando existan. Si GitHub no permite guardar, decirlo explícitamente en lugar de afirmar que quedó registrado. Mantener la preferencia de no enviar ZIP, enlaces ni respaldos salvo solicitud expresa. Esta regla complementa y refuerza las secciones 29 y 30, y **rige desde ahora para cada avance**.


## 35. Prototipo de activación atómica mediante trigger SQLite · 23 de noviembre de 2026
Se creó en la rama `backup/v12-216-preparacion` un prototipo experimental `auth-draft/atomic-trial-trigger-PROTOTYPE.sql` (commit `923670022fee6e7c2ba6bef59539e82ec5d33ed6`) y una prueba reproducible `auth-draft/tests/test_atomic_trigger.py` (commit `3d1efb3a359698928014f9415e016fed6b74c4f0`). En lugar del `batch()` inseguro del borrador anterior, un único `UPDATE` del token dispara un trigger que valida elegibilidad, activa cuenta e inserta el beneficio dentro de la misma sentencia SQLite; `RAISE(ABORT)` revierte la sentencia si falla una precondición. La prueba local ejecutada sobre SQLite con dos conexiones simultáneas obtuvo **una actualización efectiva y otra sin cambios**, **un solo entitlement**, y rechazó un segundo token sin consumirlo; se corrigió además un error de formato de fecha en el prototipo usando el modificador `'unixepoch'`. **Limitación crítica:** no se ha probado compatibilidad ni comportamiento en Cloudflare D1, y este prototipo no está conectado a endpoints, sesiones ni correo. Falta probar caducidad, cuenta suspendida/cerrada, rollback forzado y condiciones de carrera sobre D1 aislado. No aplicar esta migración a producción ni activar registro sin revisión y autorización.


## 36. Defensa adicional de caducidad dentro del trigger · 23 de noviembre de 2026
Se revisó el prototipo `auth-draft/atomic-trial-trigger-PROTOTYPE.sql` y se detectó que la caducidad del token se validaba solo en la cláusula `WHERE` del llamador. **Riesgo:** otro llamador que omitiera esa condición podría consumir un token vencido. Se agregó una comprobación defensiva dentro del propio trigger (`NEW.expires_at <= NEW.consumed_at` provoca `RAISE(ABORT)`) en la rama `backup/v12-216-preparacion`, commit `67935dd9bfd35c99650b1af033ce42e20c56f887`. Se amplió `auth-draft/tests/test_atomic_trigger.py` para intentar consumir un token vencido omitiendo deliberadamente el filtro de caducidad, y exigir que cuenta, token y beneficios queden sin cambios (commit `82a01a30fdc6e6aaef4242517e79ae175e3b8c4e`). **Estado exacto:** código y prueba guardados en GitHub; esta nueva prueba aún no se ha ejecutado en este entorno y tampoco se ha probado en Cloudflare D1. Sigue prohibido conectar o desplegar el prototipo hasta validar el esquema real, los casos de error y concurrencia en un entorno D1 aislado.


## 37. Auditoría de instrucciones históricas V1–V12 y reglas de precedencia · 23 de noviembre de 2026
**Petición del propietario:** revisar las carpetas y versiones V1–V12, el trabajo histórico de GitHub y Cloudflare, identificar órdenes contradictorias, conservar lo funcional y organizar las reglas vigentes sin pedirle que haga limpieza manual. Este documento es el registro de decisiones; **no equivale por sí solo a una auditoría completa del código, de todas las carpetas locales o del despliegue Cloudflare**. En esta revisión se inspeccionó el documento maestro actual en GitHub y sus secciones iniciales y V12; **no se ha accedido a todas las carpetas V1–V12 ni a la configuración real de Cloudflare**, por lo que no se afirma que el código esté libre de conflictos.

### Orden de autoridad para resolver contradicciones
1. Instrucción explícita más reciente del propietario, siempre que no comprometa privacidad, seguridad o un requisito legal.
2. Decisiones **vigentes y aprobadas** de V12 y las reglas permanentes de arquitectura, privacidad y flujo; una propuesta o prueba no sustituye una decisión aprobada.
3. Código funcional **verificado** en la versión base más reciente, con evidencia de pruebas; no asumir que lo publicado, el ZIP y `main` son idénticos.
4. V11/V10 y V1–V9 como **historial de referencia y recuperación**, no como órdenes para reintroducir componentes o comportamientos descartados.
5. En caso de ambigüedad material, preservar el comportamiento actual y registrar el conflicto antes de cambiarlo; pedir aclaración solo cuando la decisión afecte alcance o dinero.

### Conflictos históricos identificados en el propio documento
- **Nombre de categoría:** «Real Estate PRO» en secciones V11 frente a **«Real Estate & Closing»**, nombre vigente desde sección 10. Mantener el antiguo solo en referencias históricas.
- **Oferta gratuita:** esquemas anteriores de 21 días, 60 días o cierres gratuitos frente a **90 días universales** aprobados en sección 12. No mezclar ofertas antiguas en páginas, backend ni comunicaciones. La implementación real continúa pendiente.
- **Planes/precios:** tarifas históricas frente a `Pay Per Project`, `Two Categories`, `All Access` **en evaluación**. No publicar ni cobrar precios o promociones no aprobados.
- **Versión de partida:** secciones 9 y 11 señalan V11-152 o V12-185 como última referencia **en su fecha**, mientras que la sección 26 documenta V12-216 como respaldo local más reciente y la 27 confirma su ZIP en la rama `backup/v12-216-preparacion`. No volver automáticamente a versiones anteriores.
- **Actualización de GitHub:** la sección 10 decía actualizar el documento «cuando el usuario haya autorizado esa actualización»; las secciones 29, 30 y 34 establecen **autorización permanente de registro inmediato**. Rige esta última, sin autorizar despliegues.
- **ZIPs:** la regla antigua de entregar un ZIP por bloque coherente sigue siendo útil **solo cuando el propietario solicite una entrega**. La preferencia actual es no enviar respaldos, enlaces ni ZIP rutinarios.
- **Arquitectura compartida:** `MODELO.html` y rutas V11 son una especificación de referencia, no prueba de que cada archivo o ruta exista idénticamente en V12 o en `main`. Inspeccionar antes de modificar.
- **Registro D1:** pruebas SQLite y prototipos documentados en secciones 26–36 no equivalen a integración D1 ni autorización de producción. El bloqueo de atomicidad de las secciones 32–33 continúa hasta prueba real.

### Protocolo de limpieza sin pérdida de información
- **No borrar ni sobrescribir V1–V12 ni archivos históricos por mera antigüedad**; etiquetar como históricos y conservar copias recuperables.
- Auditar por fases: inventario del árbol de GitHub y ramas; comparar estructura compartida y páginas con V12; revisar duplicación de CSS/JS, navegación, tareas, selección, persistencia y contratos de API; finalmente contrastar con Cloudflare **solo cuando haya acceso verificable**.
- Mantener un único conjunto de reglas **vigentes** para diseño compartido, categorías, privacidad, flujo 01–02–03, registro, planes y despliegue; conservar las reglas reemplazadas como historial fechado.
- Para cada conflicto de código: identificar archivo y regla antigua/nueva, comprobar efectos y pruebas de regresión antes de eliminar. No «limpiar» a ciegas código funcional.
- **No modificar Cloudflare ni `main` sin autorización expresa para el cambio concreto.** El respaldo V12-216 en la rama de trabajo contiene un ZIP, no los 327 archivos sueltos en esa rama.
- Registrar inmediatamente hallazgos y resultados en este documento y comunicar al propietario solo lo sustancial, sin enviar respaldos.


## 38. Inventario verificable de V12-216 y primeras señales de deuda técnica · 23 de noviembre de 2026
**Fuente examinada:** archivo local `MCT-V12-216-REGISTRATION-FLOW-DRAFT.zip`, no el despliegue Cloudflare. Se abrió el ZIP y se inspeccionó su índice y el texto de sus páginas HTML sin alterar los archivos. **Resultado verificable:** 327 entradas; 13 páginas HTML: `index.html`, `real-estate.html`, `real-estate-guided.html`, `business-projects.html`, `services-contractors.html`, `personal-home.html`, `plans.html`, `payment.html`, `founding-members.html`, `account-preview.html`, `studio.html`, `help-contact.html`, `privacy.html`. Incluye `auth-draft/registration-flow.mjs` y `auth-draft/security.mjs` como borradores aislados.

**Hallazgos preliminares, sin calificarlos de errores funcionales aún:**
- Existen dos páginas de Real Estate (`real-estate.html` y `real-estate-guided.html`); verificar cuál es la ruta vigente y si la otra es una variante deliberada antes de consolidar.
- `account-preview.html` y `payment.html` contienen scripts inline; `studio.html` contiene estilos inline. Esto **no prueba un conflicto**, pero merece comprobar separación de responsabilidades y duplicaciones.
- El barrido literal de los 13 HTML no encontró referencias a «21 days», «21 días» ni «21-day»; sí halló referencias a 90 días en varias páginas. **Este barrido no cubre JavaScript externo, CSS, textos dinámicos ni el sitio publicado**, y no demuestra que la oferta esté correctamente implementada.
- En el entorno de trabajo se identificaron 28 archivos ZIP y múltiples versiones V12; su presencia local **no demuestra** que todas las versiones V1–V11 estén completas, disponibles o desplegadas.
- El ZIP es un respaldo local y en la rama de preparación, **no prueba identidad con el árbol de `main` ni con Cloudflare**.

**Siguiente auditoría prioritaria:** mapear los enlaces entre las 13 páginas, identificar los JS/CSS realmente cargados, comprobar si las variantes Real Estate comparten lógica y localizar reglas de acceso/plazos en código ejecutable. No borrar ni modificar versiones históricas; no desplegar.


## 39. Auditoría estática de referencias y carga de recursos en V12-216 · 23 de noviembre de 2026
Se examinó **directamente** el respaldo local `MCT-V12-216-REGISTRATION-FLOW-DRAFT.zip` con un script de solo lectura. Se analizaron los atributos literales `href` y `src` de sus 13 páginas HTML y se comprobó la existencia de los recursos relativos correspondientes dentro del mismo ZIP. **Resultado: cero rutas relativas faltantes detectadas** en ese alcance. No se evaluaron rutas construidas dinámicamente, enlaces externos, eventos JS, funcionamiento en navegador ni despliegue.

**Hallazgo relevante:** la portada `index.html` enlaza explícitamente a **`real-estate-guided.html`**. Por ello esa página es el **destino local de navegación confirmado**, mientras `real-estate.html` existe como variante adicional cuyo uso en otras rutas debe investigarse antes de eliminar o fusionar.

**Carga y complejidad verificadas:**
- `real-estate.html`: **24 hojas CSS y 15 scripts externos**.
- `real-estate-guided.html`: **37 hojas CSS y 34 scripts externos**.
- Ambas comparten scripts de base como `pages/real-estate.js`, `pages/start-clean-v12-98.js`, `pages/table-summary-unified-v12-111.js` y `pages/table-library-v12-135.js`; la variante guided agrega numerosos ajustes por versión, entre ellos `pages/table-controls-v12-152.js` y `pages/template-clear-v12-175.js`.

**Interpretación limitada:** esta acumulación de archivos y versiones es una señal de riesgo de reglas CSS/JS superpuestas, **no una demostración de conflictos ni permiso para borrar archivos**. La auditoría siguiente debe comparar selectores, funciones, listeners y efectos de cada capa; establecer una lista de recursos realmente necesarios; después probar en navegador las dos variantes y el recorrido completo 01–02–03. Priorizar la página `real-estate-guided.html` por ser el destino de la portada. No tocar `main` ni Cloudflare y no dar por concluida la revisión de V1–V12.


## 40. Conflictos CSS confirmados por inspección estática · 23 de noviembre de 2026
Se inspeccionó directamente el ZIP local V12-216, específicamente las **37 hojas CSS y 34 scripts externos** que carga `real-estate-guided.html`. Esta revisión es **estática**; no equivale a prueba de navegador. Se identificaron **1.115 selectores CSS distintos** mediante extracción aproximada de bloques (el analizador no interpreta completamente reglas anidadas ni especificidad). Hay múltiples selectores repetidos entre archivos; la coincidencia por sí sola no es un error, pero se encontraron declaraciones **materialmente contradictorias** para los mismos elementos.

**Caso confirmado para corregir con cuidado:** `#follow-section .re-summary-heading` recibe `background:#fff0c9!important` en `pages/table-summary-focus-v12-108.css`, `background:#fff0be!important` en `pages/interface-clean-v12-109.css`, `background:transparent!important` en `pages/table-summary-unified-v12-111.css` y `background:#153d52!important` en `pages/table-summary-clear-v12-112.css`. También se contradicen `border-left`, `border`, `padding` y `border-radius`. El resultado efectivo depende del orden de carga, especificidad y contexto. **No eliminar hojas ni elegir un color automáticamente:** el diseño aprobado de cada Summary debe contrastarse con el resultado en navegador. `#contract-section .re-summary-heading` también tiene múltiples capas de reglas y requiere inspección.

**Indicadores JS para revisar, sin afirmar duplicación de acciones:** el barrido textual de los 34 scripts encontró 83 llamadas `addEventListener('click',...)` distribuidas entre 22 archivos, 45 de `change` entre 12 archivos y 13 de `DOMContentLoaded` en 13 archivos. Estos números **no indican por sí mismos eventos duplicados**: pueden corresponder a elementos distintos. Auditar listeners por selector y función antes de refactorizar.

**Prioridad:** documentar cascada CSS real y apariencia aprobada de Contract Summary / Follow-Up Summary; identificar qué reglas de cada versión se reemplazan y cuáles son necesarias; elaborar un cambio mínimo en rama de preparación con pruebas visuales y funcionales. No tocar `main` ni Cloudflare, no borrar respaldos y no declarar arreglado un conflicto hasta comprobarlo.


## 41. Orden de cascada CSS confirmado en V12-216 · 23 de noviembre de 2026
Se reabrió y examinó directamente el ZIP local V12-216 y el HTML `real-estate-guided.html`. Se confirmó el **orden exacto de carga** de cinco hojas CSS que afectan ambos encabezados Summary: posición 8 `summary-header-v12-119.css` (azul marino), 17 `table-summary-focus-v12-108.css` (crema), 18 `interface-clean-v12-109.css` (amarillo), 20 `table-summary-unified-v12-111.css` (transparente) y 21 `table-summary-clear-v12-112.css` (azul marino). Las cinco aplican `background: ... !important` con el mismo selector de ID/clase para ambas tablas; entre ellas, **v12-112 es la última y prevalece en la cascada estática**. El diseño aprobado distingue Contract Summary ocre/dorado y Follow-Up Summary ciruela/burdeos (sección 11), por lo que debe verificarse el resultado real antes de corregir. Se creó el informe `audits/V12-216-summary-css-cascade.md` en la rama `backup/v12-216-preparacion`, commit `7fe64ce1b3e886dd44770a2adf6809c4c76d59b8`. **No se ha hecho prueba de navegador ni modificación del sitio**, y el resultado visual final no puede darse por confirmado sin estilos computados y revisión del DOM. Próxima acción: inspeccionar selectores y reglas posteriores, comparar con diseño aprobado y probar una corrección mínima aislada.


## 42. Corrección CSS candidata, aislada y sin despliegue · 23 de noviembre de 2026
Se inspeccionaron nuevamente los CSS originales de V12-216, incluidos `table-summary-focus-v12-108.css`, `interface-clean-v12-109.css`, `table-summary-unified-v12-111.css`, `table-summary-clear-v12-112.css` y `summary-header-v12-119.css`. Se confirmó que las reglas compartidas sobrescriben la distinción visual aprobada entre ambos Summary. Como primer paso **se creó un archivo CSS candidato** en `audits/candidates/v12-216-summary-colors-CANDIDATE.css` de la rama `backup/v12-216-preparacion` (commit `aa35387db1be04991dc879cd87dd87d8e1c5f1b9`). Establece encabezado ocre/dorado y filas crema para Contract Summary, y encabezado ciruela/burdeos y filas rosadas para Follow-Up Summary, usando selectores separados. **No está enlazado a ninguna página, no modifica el ZIP base, no ha pasado prueba visual o funcional y no se considera corrección terminada.** Antes de integrar: comprobar orden de cascada completo, colores aprobados frente a capturas, visibilidad y contraste, diseño móvil, apertura/cierre automático de resúmenes y envío independiente de Table 01 / Table 02 / Both Tables. Si falla, revisar el candidato sin alterar el respaldo. No publicar ni modificar Cloudflare.


## 43. Corrección de auditoría: capa V12-164 ya separa los Summary · 23 de noviembre de 2026
Al reabrir el **ZIP original** `MCT-V12-216-REGISTRATION-FLOW-DRAFT.zip` y comprobar las hojas CSS **posteriores** a v12-112, se encontró `pages/summary-only-v12-164.css`, cargada por `real-estate-guided.html`. Su comentario declara expresamente que se aplica **solo a los resúmenes para enviar**, sin afectar los editores. Define reglas **más específicas** para `#contract-section #contract-summary.re-summary table.re-summary-table` y `#follow-section #follow-summary.re-summary table.re-summary-table`, con colores distintos para ambos encabezados y filas. También existe `pages/follow-editor-v12-165.css`, que separa expresamente los estilos de la **tabla editable 02** y preserva los resúmenes.

**Corrección importante de las secciones 40–42:** aunque hay capas antiguas contradictorias para `.re-summary-heading`, **no se debe inferir que las tablas finales de Summary hayan perdido sus colores** sin inspeccionar las reglas posteriores. La propuesta genérica `audits/candidates/v12-216-summary-colors-CANDIDATE.css` es **redundante y potencialmente conflictiva** con v12-164. Se marcó explícitamente **SUPERSEDED — DO NOT INTEGRATE** en la rama de preparación (commit `4f74b2f440169472859aec265dc8e8af1fc93a4a`). Se conserva como historial, no se añade al HTML ni se publica.

**Estado verificado:** existe una separación intencional de estilos para resúmenes y editor; aún falta inspeccionar DOM generado, estilos computados y comportamiento en navegador para saber si la cascada funciona como se espera. **Próximo paso seguro:** auditar la distinción entre el encabezado `.re-summary-heading` y las cabeceras de la tabla `thead th`, comprobar qué selectores se aplican realmente y solo corregir fallos reproducidos. No tocar `main`, ZIP base ni Cloudflare.


## 44. Verificación estructural del DOM dinámico de los resúmenes · 23 de noviembre de 2026
**Inspección directa y reproducible del ZIP local V12-216 (solo lectura):** en `real-estate-guided.html` existen dos contenedores inicialmente vacíos y ocultos: `<div class="re-summary" hidden id="contract-summary"></div>` y `<div class="re-summary" hidden id="follow-summary"></div>`. La función de resumen de `pages/real-estate.js` crea dinámicamente un elemento `div.re-summary-heading` con título **Closing Timeline Summary** o **Follow-Up Summary**, y una tabla `table.re-summary-table` con cabecera `thead` y celdas `th`. Por tanto, los selectores de `pages/summary-only-v12-164.css` para `#contract-section #contract-summary.re-summary table.re-summary-table thead tr > th` y su equivalente Follow-Up **sí coinciden estructuralmente con las tablas generadas** cuando aparecen en sus secciones. Los encabezados `.re-summary-heading` son **elementos distintos** de las cabeceras `thead th`; v12-164 corrige colores de **cabeceras de columnas y filas**, pero **no sustituye por sí solo** el `background` de `.re-summary-heading` impuesto por v12-112.

**Conclusión corregida:** no añadir el candidato CSS genérico de la sección 42; conservar la distinción de las tablas ya implementada en v12-164. Queda **pendiente** verificar si el encabezado de título `.re-summary-heading` debe diferenciarse visualmente según la aprobación y si hay reglas posteriores que ya lo hacen. Se revisó código fuente, **no** se ejecutó el DOM en navegador ni se probó el comportamiento de selección o envío. No hubo cambios al ZIP, rama `main` ni Cloudflare.


## 45. Solución limitada al título de cada Summary · 23 de noviembre de 2026
**Comprobación realizada directamente sobre el ZIP V12-216:** `real-estate-guided.html` carga 37 CSS. Entre las capas posteriores a `table-summary-clear-v12-112.css` (posición 21), `table-results-icons-v12-113.css` (posición 22) ajusta espacio y orden de botones, mientras `summary-only-v12-164.css` (posición 34) diferencia colores de **celdas** de las tablas, pero **no** redefine el fondo de `.re-summary-heading`. El barrido del contenido de todas las hojas cargadas identificó estas reglas del título: v12-119, v12-108, v12-109, v12-111, v12-112 y ajustes de layout v12-113. Así, la regla de fondo azul marino compartida de v12-112 permanece como última declaración `background` coincidente en el CSS externo examinado para ambos títulos. La verificación se limita a CSS estático, no a estilos computados en navegador.

**Corrección mínima preparada, NO integrada:** se creó `audits/candidates/v12-216-summary-title-bars-ONLY.css` en `backup/v12-216-preparacion` (commit `018eed8f6e4054ba1a4386d0e6c4211e39fc44fa`). A diferencia del candidato descartado en la sección 43, esta hoja usa selectores específicos de `#contract-summary` y `#follow-summary` y **solo** propone diferenciar los fondos de las barras de título ocre y ciruela, sin modificar tablas, celdas, editores, selección o comunicación. **No enlazarla aún**: verificar primero si el encabezado dinámico es hijo directo del contenedor en el DOM generado y comprobar en navegador el resultado real, contraste y regresión de apertura/cierre y envío. El ZIP base, `main` y Cloudflare permanecen sin cambios.


## 46. Referencia externa: CINC Systems, análisis público inicial · 23 de noviembre de 2026
El propietario mostró una captura de `https://cincsystems.com/` y pidió examinar cada página para identificar tecnologías, maneras de informar al visitante, protección y avances útiles para My Closing Timeline. **Investigación inicial de contenido público**, no auditoría de código privado ni prueba de seguridad de CINC.

**Páginas públicas examinadas:** portada `https://cincsystems.com/`; `/community-intelligence`; `/management-accounting`; `/boards-residents`; `/solutions/community`; `/solutions/`; enlace de Trust & Security que redirige a `https://trust.cincsystems.com/` (sin contenido legible recuperado). La portada presenta demos ilustradas, mensajes breves orientados a resultados, testimonios y métricas; un menú de recursos incluye calculadora ROI, guías, casos, webinars y blog. La plataforma describe asistente Cephai con respuestas contextualizadas, borradores sujetos a revisión humana, tareas/solicitudes conectadas, permisos por roles y trazabilidad. Sus afirmaciones públicas de cifrado AES-256, SOC 2 Type 2 y Veracode **son afirmaciones de CINC, no verificaciones independientes**. El HTML público de portada contiene referencias a Google Tag Manager, reCAPTCHA en newsletter y píxeles de terceros; esto **no identifica de forma concluyente su framework, hosting o backend**.

**Ideas aplicables sin copiar diseño ni recopilar datos privados de terceros:** 1) demostraciones visuales breves de los flujos 01–02–03 y cuatro categorías, con ejemplos ficticios; 2) sección clara de «qué hace / qué facilita / qué controla el usuario»; 3) Ask Timeline contextual que explica el siguiente paso sin inventar ni ejecutar acciones sin confirmación; 4) centro de confianza con privacidad, retención, permisos, recuperación y estado real de las medidas implementadas; 5) recursos y ayuda por categoría; 6) revisión humana antes de comunicaciones y cambios sensibles. No presentar certificaciones, integraciones ni seguridad no obtenidas.

**Pendiente:** continuar auditoría página por página, incluyendo formularios, navegación, accesibilidad, recursos técnicos expuestos y políticas; separar observaciones de recomendaciones y priorizar por coste/beneficio. No modificar Cloudflare, producción ni V12 basándose solo en esta referencia.


## 47. Benchmark CINC por páginas y prioridades para MCT · 23/11/2026
**Solicitud expresa:** profundizar en la referencia `cincsystems.com`, examinar páginas y seleccionar mejoras prácticas para My Closing Timeline. Investigación de contenido público; no implica acceso a sistemas internos, auditoría de ciberseguridad ni conocimiento verificable del stack completo.

**Páginas contrastadas (fuentes públicas):**
- `/`: propuesta de valor centrada en una plataforma, accesos claros a públicos distintos y CTA de demostración. MCT: portada con cuatro categorías y una demostración corta con datos ficticios.
- `/community-intelligence`: caso narrado de incidencia, recepción, consolidación, revisión humana, seguimiento y resolución; asistente Cephai contextual, roles, trazabilidad. MCT: explicar visualmente el flujo 01 Setup → 02 Tasks → 03 Communication Center y mostrar por qué cada paso importa; no permitir que Ask Timeline actúe sin confirmación.
- `/management-accounting`: pestañas por función, bloques «qué facilita», contexto histórico, aprobación y configuración de roles. MCT: ayuda específica junto a cada control, estado actual/siguiente paso, separación de privilegios Admin/usuario.
- `/boards-residents`: experiencias diferentes según rol, solicitudes y decisiones con estado, historial y visibilidad autorizada; ejemplos interactivos de marca. MCT: vistas de ejemplo sin datos reales, historial privado y acceso limitado por usuario.
- `/solutions/community`: comunicación, solicitudes, paneles, FAQ y explicación de casos prácticos. MCT: FAQ breve y contextual por categoría, ejemplos de notificaciones y estados.
- `/about-us`: relato de misión y afirmaciones de seguridad y certificaciones de CINC. MCT: explicar prácticas realmente implementadas, evitar afirmaciones no verificadas sobre cifrado, SOC 2, auditorías o certificaciones.
- Noticia del 10/09/2026 sobre Community Intelligence: CINC describe la unificación de datos, identidad, permisos y contexto como base de la IA. **Lección:** arquitectura limpia antes de añadir funciones inteligentes; evitar más capas JS/CSS improvisadas.

**Tecnología observable frente a no demostrada:** las páginas públicas muestran una experiencia web con pestañas, demostraciones, formularios y componentes visuales; no permiten identificar con certeza base de datos, lenguaje de backend, hosting ni eficacia real de controles de seguridad. Las afirmaciones de CINC sobre SOC 2 Type II, Veracode y seguridad son suyas; no deben trasladarse a MCT como si fueran nuestras.

**Plan priorizado, pendiente de implementación:**
P0 — conservar trabajo V12 y cerrar autenticación/roles, expiración y atomicidad de prueba gratuita; auditar CSS/JS y flujos reales; no desplegar sin pruebas.
P1 — guía visual de 3 pasos con estados claros, demostración ficticia sin registro, ayuda contextual en botones y validación antes de enviar correo.
P2 — centro de confianza transparente: datos mínimos, protección, retención, borrado, límites y medidas comprobadas; preguntas frecuentes por categoría.
P3 — Ask Timeline contextual y recursos avanzados solo tras permisos, pruebas y análisis de coste; no almacenar información de terceros.
**No implementar** por imitación pagos comunitarios, banca, aplicaciones móviles, contabilidad o automatizaciones sensibles ajenas al alcance actual.

**URLs de referencia verificadas:** https://cincsystems.com/ ; https://cincsystems.com/community-intelligence ; https://cincsystems.com/management-accounting ; https://cincsystems.com/boards-residents ; https://cincsystems.com/solutions/community ; https://cincsystems.com/about-us ; https://cincsystems.com/news/cinc-systems-introduces-community-intelligence-raising-the-standard-for-ai-in-community-management .

**Estado:** investigación y priorización registradas, **sin cambios al código V12, rama principal ni Cloudflare**. Faltan pruebas de formularios, accesibilidad, privacidad y comportamiento real en navegador; no afirmar revisión exhaustiva de todas las páginas del dominio.


## 48. Feedback & Improvements: circuito cliente → Admin → corrección · 23/11/2026
**Solicitud del propietario:** un mecanismo muy sencillo para recibir reseñas, sugerencias y reportes de problemas de usuarios, supervisarlos y compartirlos con ChatGPT de forma que el asistente identifique el contexto y pueda proponer y comprobar una corrección sin que el propietario deba explicar de nuevo el caso. Debe distinguirse una **reseña** (experiencia), una **sugerencia** (mejora) y un **reporte de error** (problema reproducible). Se trata de una **propuesta aprobable**, aún no implementada.

**Diseño recomendado:** enlace discreto `Feedback & Improvements` en Help & Contact y, para usuarios registrados, en el área de trabajo; formulario corto con tipo, categoría/página, descripción y opción de adjuntar captura **solo tras advertir que no contenga datos personales, clientes, compañías ni documentos**. No solicitar nombres, correos de terceros ni información identificable de proyectos; cuenta propia solo cuando sea imprescindible para dar seguimiento. Validar en servidor, limitar abuso/spam, mantener privado por defecto y aplicar retención/borrado.

**Admin Studio privado:** bandeja con identificador estable `MCT-FB-000001`, fecha, tipo, área, estado `New → Reviewing → Planned → Testing → Resolved` o `Closed`, prioridad y notas de verificación. No confundir «Resolved» con una modificación publicada; distinguir `Fixed in test` y `Released` cuando sea necesario. Permitir agrupar duplicados, filtrar por categoría y exportar **un informe sin datos personales** mediante botón `Copy for ChatGPT` (texto estructurado con ID, página, versión si se conoce, descripción, pasos para reproducir, resultado esperado, resultado observado, estado y evidencias anonimizadas). La exportación no debe incluir tokens, contraseñas, emails, IDs de clientes, datos de terceros ni información privada. El propietario lo pega en el chat; el asistente analiza la versión verificable, corrige en rama de preparación, prueba, documenta y comunica; no prometer corrección automática ni publicar sin autorización.

**Prioridades:** P0 seguridad/privacidad o pérdida de datos, P1 función principal bloqueada, P2 fallo visual/funcional menor, P3 sugerencia. Separar reseñas públicas de reportes privados; publicar testimonios solo con consentimiento explícito. La recepción de un reporte **no equivale a un «update» del software**: el flujo correcto es reporte → evaluación → corrección → pruebas → nueva versión → publicación autorizada → cierre. El usuario no debe instalar ni actualizar nada manualmente cuando la aplicación sea web.

**Orden de implementación:** primero diseño y campos mínimos, luego bandeja Admin, almacenamiento seguro y controles de acceso, después botón de copia y circuito de pruebas. Mantener los tres pasos principales de Real Estate sin agregar pantallas obligatorias. No activar ni anunciar como funcional antes de pruebas. No modificar producción sin autorización.


## 49. Primer prototipo funcional aislado de Feedback & Improvements · 23/11/2026
A petición del propietario se **implementó** en la rama `backup/v12-216-preparacion` el archivo independiente `feedback-draft/feedback-prototype.html` (commit `64f4a6e7e2d1d09a84c317a0e37b2cbb81711e10`) y el contrato técnico `feedback-draft/IMPLEMENTATION-CONTRACT.md` (commit `f1129837947e58a354dfbd9a11aefd96fd439155`). El prototipo ofrece tres tipos de mensaje (problema, sugerencia, experiencia), categoría, paso, descripción y resultado esperado opcional. Su botón `Copy report` genera un texto estructurado para compartir. Incluye etiquetas de accesibilidad, aviso de privacidad y un filtro básico para patrones de email, teléfono o credenciales. **Advertencia:** el filtro es limitado y no garantiza anonimización.

**Alcance exacto:** es una página HTML aislada, sin integración en `studio.html`, sin endpoint, almacenamiento, envío, tickets ni notificaciones. **No se ha probado todavía en navegador real**. El texto `LOCAL PROTOTYPE · NOT CONNECTED` evita presentarlo como servicio activo. No se han cambiado `main`, el ZIP V12-216 ni Cloudflare. Próximo paso: validar interacción en navegador, revisar protección de datos y diseñar el backend seguro y la bandeja Admin antes de activar recepción real de reportes. El propietario no tiene que manipular archivos ni hacer cambios manuales.


## 50. Feedback: revisión de privacidad y recuperación cuando falla copiar · 23/11/2026
Se reabrió el código real de `feedback-draft/feedback-prototype.html` en la rama `backup/v12-216-preparacion`. Se detectaron dos deficiencias de experiencia/precisión: el texto afirmaba `privacy-safe report` pese a que el filtro local no garantiza anonimización, y si la API del portapapeles fallaba, se indicaba copiar manualmente **sin mostrar el informe generado**. Se corrigieron ambas en el commit `9ec76d231c1bf16327dc3989259584457e203b16`: ahora se invita a revisar el informe antes de compartirlo; ante portapapeles no disponible, aparece un campo de solo lectura con el informe completo, seleccionable y enfocado para copiarlo manualmente. El informe sigue sin enviarse ni almacenarse y el filtro básico de datos sensibles **no sustituye controles de servidor ni revisión humana**. **Estado:** cambios de código guardados; aún no hay prueba de navegador, backend, bandeja Admin ni conexión a la web. Mantener el prototipo aislado hasta pruebas de accesibilidad, comportamiento, privacidad y autorización de despliegue.


## 51. Demostración aislada del panel privado de revisión de feedback · 23/11/2026
Se creó `feedback-draft/admin-feedback-review-DEMO.html` en `backup/v12-216-preparacion` (commit `ac40e8588b3f20752b93b0f750049c66e88fc2a6`). Es una **demostración local aislada**, no el Admin Studio real. Permite pegar un reporte anonimizado, seleccionar prioridad `P0/P1/P2/P3`, estado `New/Reviewing/Planned/Testing/Resolved/Closed`, añadir notas y pulsar `Prepare for ChatGPT`; presenta una vista previa que indica expresamente que no hay ticket verificado y que el informe del cliente no ha sido comprobado. El botón `Copy for ChatGPT` copia el texto y ofrece selección manual cuando falla el portapapeles. `Clear all` vacía los campos. Al editar cualquier campo se invalida la vista previa anterior para no compartir datos desactualizados.

**Límites esenciales:** no recibe formularios reales, no almacena reportes, no genera IDs, no está conectado a `studio.html` ni a un backend, no notifica al propietario y **no ha sido probado aún en navegador**. El filtro básico de datos sensibles puede omitir información privada y no sustituye controles de servidor ni revisión humana. La próxima fase debe comprobar funcionalidad y accesibilidad, definir autenticación Admin y permisos, retención y borrado, protección contra abuso, y pruebas de integración. No incorporar a producción ni prometer funcionamiento activo antes de ello. El ZIP V12-216, `main` y Cloudflare permanecen intactos.


## 52. Informes reproducibles y plan de validación de Feedback · 23/11/2026
Se mejoró el prototipo de formulario del cliente en `backup/v12-216-preparacion`: `feedback-draft/feedback-prototype.html` ahora incluye `How can we reproduce the problem? (optional)`, con límite de 800 caracteres, y añade `Steps to reproduce` al informe exportado; el filtro básico de patrones sensibles también comprueba ese campo (commit `6aae04ca8fae076d405b93328731ca820451a06d`). Esta información permite al propietario y a ChatGPT distinguir una opinión general de un error con pasos para reproducirlo. El cliente no tiene que proporcionar datos personales.

Se creó `feedback-draft/VALIDATION-CHECKLIST.md` (commit `b7a9a95f0386315762cbc724b30a897710e75e9e`): pruebas pendientes de formulario, estados y copia de Admin, fallback de portapapeles, teclado/accesibilidad, privacidad, backend, permisos, regresiones 01/02/03 y autorización de publicación. **Ninguna casilla se declara aprobada**; hasta ahora solo se verificó por inspección de contenido GitHub que ambos prototipos existen, contienen fallback de copia y están marcados como desconectados. No afirmar pruebas de navegador o despliegue. Código publicado y V12 sin cambios.
