> **Auditoría PRO · versión 11 del ZIP.** Se repararon los enlaces de Terms of Use y Privacy Policy y se incorporaron borradores que describen la vista local, el almacenamiento, la copia, el correo y los recursos externos. Se sustituyó la promoción repetida de PRO por un aviso de vista local. Crear un proyecto lo deja seleccionado para abrirlo sin cambiar prematuramente el contexto de las tablas. El avance de las secciones usa almacenamiento por proyecto. Se verificaron en simulación los estados de dos proyectos locales y los enlaces del ZIP. La prueba completa en Chrome y la autorización de dos proyectos de una cuenta real siguen pendientes. Para el lanzamiento, resolver pagos, renovación, cancelación, reembolsos, acceso al vencer, retención, eliminación y canal de contacto antes de finalizar los textos públicos.

# My Closing Timeline — continuidad del 12 de noviembre de 2026

## Punto de partida

Usar como referencia visual y funcional el ZIP local **MCT-MODELO-INTEGRADO.zip, versión 10**, [archivo de referencia](https://chatgpt.com/library?file_id=libfile_bc0044566ba881919212d8874025d9d8&account_id=personal). Entrar por `index.html` → **Choose Real Estate** → `real-estate-pro.html`. `master-workspace-template.html` es la referencia integrada. Este ZIP es un prototipo local. Esta actualización de GitHub registra decisiones y continuidad. La integración de código en el repositorio y el despliegue deben verificarse aparte.

- HOME aprobado con cuatro fotos y tarjetas, logotipo alineado con el margen del contenido y lema de privacidad. PRO usa el mismo marco y una entrada compacta.
- **My Closing**, **My Tasks** y **Communication** tienen distintivos numerados. My Closing conserva el cabezal azul con número dorado. Las secciones comienzan plegadas. **Open Table** coloca la cabecera de la sección bajo el encabezado fijo.
- **Close Section** identifica cada sección por color. My Closing bronce, Contract Tasks azul profundo, Follow-Up verde petróleo y Communication índigo.
- La Tabla 01 **Contract Tasks & Deadlines** es la referencia visual de la Tabla 02 **Follow-Up Tasks**. Cada una conserva su contenido, fechas, selección, Done/Reopen y notas. Mantener las 11 columnas, incluidos Notes y Delete. **Apply** va debajo de Days. Hay seis tareas iniciales por tabla y plantillas ampliadas.
- Tabla 02 muestra **Add Task**, **Delete Selected**, **Choose Template**, **Save My Table** y **Load Saved Table**. Delete Selected se activa al seleccionar y confirma la cantidad. La plantilla original se recupera desde Choose Template. Guardar/cargar afecta a la tabla correspondiente.
- El flujo acordado es **Contract Tasks → Follow-Up Tasks → Communication Center → Review Workspace**. El botón inferior de avance marca **Completed**, pliega el paso y abre el siguiente. Close Section permite pausar sin cambiar el estado. En revisión se pueden abrir todas las secciones juntas. Mantener los resúmenes formateados, Today & Tomorrow y Email Studio.
- QA realizado: integridad del ZIP y simulación de las tres transiciones de la versión 10. En versiones anteriores también se simularon fechas, selección, Done/Reopen, guardado y carga, vista previa de correo y persistencia local. Falta repetir el conjunto general sobre la versión 10 y confirmar el flujo en Chrome, copia formateada y cliente de correo reales, persistencia por cuenta y publicación.

## Una cuenta, varios proyectos y cuatro categorías

Completar primero **Real Estate PRO** y usar su flujo y componentes como base compartida. En **My Workspaces**, abrir proyectos existentes o crear uno con **New Project Label**, categoría y **Select a Role**. El rol pertenece al proyecto, no a toda la cuenta. Puede sugerir una plantilla inicial. Cambiarlo después debe conservar las tareas existentes. El identificador interno del proyecto debe ser independiente del nombre visible. Una cuenta puede combinar varias categorías y varios proyectos activos, incluso de la misma categoría.

| Categoría | Roles de ejemplo | Tabla principal en My Tasks |
|---|---|---|
| Real Estate | Listing Agent, Transaction Coordinator, Title Agent | Contract Tasks & Deadlines |
| Business & Projects | Owner, Project Manager, Team Member | Milestones & Deliverables |
| Services & Contractors | Contractor, Subcontractor, Service Coordinator | Job Tasks & Deadlines |
| Personal & Home | Homeowner, Tenant, Household Member | Home & Personal Tasks |

Las cuatro comparten seguimiento, revisión, comunicación y recordatorios. Cambian los roles, las plantillas y el contenido de My Tasks. Aislar por cuenta y proyecto las tareas, fechas, notas, contactos, borradores, recordatorios, estados y acceso. Una acción sobre un proyecto debe afectar únicamente a ese proyecto.

## Acceso, promoción y vencimiento

- Mostrar una sola promoción en **Choose Your Timeline**, debajo de las cuatro tarjetas. Retirar las promociones duplicadas de los workspaces cuando se aplique el modelo. En cada proyecto mostrar estado, fecha de vencimiento y **Renew Project** cuando proceda.
- **21 días de prueba completa, una sola vez por cuenta**, para el primer proyecto elegible en cualquiera de las categorías. Crear otro proyecto o cambiar de categoría no reinicia la prueba.
- **60 días por $20 por proyecto**. Duraciones adicionales solicitadas **90 días, 180 días y 1 año**, con precios pendientes. No publicar precios provisionales ni tomar las campañas y tarifas de documentos históricos como vigentes. La compatibilidad con promociones y paquetes anteriores debe resolverse antes de actualizar la oferta.
- El vencimiento comercial pertenece a cada proyecto y es independiente de sus plazos contractuales o de trabajo. Renovar un proyecto afecta a ese proyecto. Mantener el historial de acuerdo con los permisos y la política de privacidad.
- Avisar antes del vencimiento. Cadencia propuesta para validación: **7, 3 y 1 día antes**. Distinguir estos avisos de los recordatorios de tareas.

## Recordatorios y privacidad

Mostrar vencidas, próximas y del día en **Today & Tomorrow**. Diseñar avisos de tareas según la fecha y configuración elegida. Correo opcional al titular de la cuenta, con un mensaje genérico y enlace al workspace autenticado. Ejemplo: “You have 2 tasks due tomorrow. Open your workspace to review them.” Evitar nombres de clientes, direcciones, asuntos sensibles y notas privadas en los avisos por defecto. Separar recordatorios, preferencias, zona horaria y vencimiento por proyecto. Las notificaciones reales, la autorización por proyecto y la facturación requieren implementación y pruebas antes del lanzamiento.

## Siguiente tarea para un chat nuevo

1. Terminar Real Estate PRO y comprobar el recorrido completo en Chrome desde Choose Your Timeline hasta Review Workspace.
2. Probar dos proyectos de una misma cuenta. Crear, cambiar de proyecto, editar, recargar y simular vencimiento o renovación. Verificar que tareas, fechas, contactos, estado, recordatorios y acceso queden aislados.
3. Reutilizar el flujo en **Business & Projects** como segunda categoría y validar roles y plantillas. Extender después a **Services & Contractors** y **Personal & Home**.
4. Definir los importes pendientes y probar prueba única, activación, vencimiento, renovación y avisos con datos ficticios antes de publicar o cobrar.

Al iniciar otro chat: «Lee primero NEXT_CHAT_START_HERE.md y el handoff del 12 de noviembre. Continúa con la primera tarea pendiente y verifica el estado real del repositorio y de la vista previa».
