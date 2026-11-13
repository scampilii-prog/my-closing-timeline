# MY CLOSING TIMELINE — CLEAN BUILD #8

Actualizado: 2026-11-13. Documento de decisiones y pendientes; no representa implementación comprobada.

## Decisiones aprobadas
- Nombre oficial del asistente: **Ask Timeline**, consistente en todas las páginas.
- Sustituir el FAQ estático actual por un asistente conversacional real cuando la infraestructura lo permita; conservar preguntas rápidas como accesos directos.
- Asistente: instrucciones contextualizadas por página, orientación sobre FREE, PRO, registro, precios, planes y privacidad. Debe distinguir funciones activas de futuras, no inventar precios, capacidades, plazos ni prometer resultados; derivar a Help & Contact cuando no pueda verificar.
- Mensajes útiles para inscripción y selección de planes sin presión ni afirmaciones falsas. El asistente debe aclarar que la versión actual de preguntas predefinidas **no es chat en vivo**.
- Idiomas iniciales: EN, ES, IT, PT; traducciones de interfaz y contenido, sin presumir que toda funcionalidad multilingüe esté lista.
- Header maestro compartido: logotipo/icono alineados al borde izquierdo del contenido, menú de tres rayas con páginas y subpáginas, selector de idioma, Sign In y Register; alineación consistente con tablas y Home. Evaluar búsqueda solo si aporta utilidad comprobada.
- Back to Top discreto y accesible, visible al desplazarse, sin tapar controles.
- Mantener Home con sus cuatro fotos y conservar contenido y funcionalidad aprobados de Real Estate PRO; reutilizar el modelo maestro nuevo, sin CSS/JS contradictorios.
- Flujo de trabajo: 01 Create Your Workspace → 02 Manage Your Tasks → 03 Prepare & Share.
- Registro gratuito único por persona, 21 días de uso completo según esquema comercial aprobado; explicar claramente precios y continuidad conforme a la configuración vigente y verificada, sin presentar como implementadas funciones aún pendientes.

## Orden de ejecución
1. Verificar archivos actuales del modelo maestro, Home y Real Estate PRO en la rama CLEAN BUILD, sin tocar producción.
2. Probar las tablas Contract Tasks & Deadlines y Follow-Up Tasks: edición de días/fechas, selección, Apply, Save/Load/Restore, plantillas y aislamiento por proyecto.
3. Probar Email Studio, Closing Timeline Summary, Follow-Up Summary, Today & Tomorrow y el copiado/formato de tablas.
4. Unificar header, navegación, selector de idioma y Back to Top en Home/PRO sin perder funciones.
5. Implementar y verificar cuentas, privacidad de datos, proyectos separados, acceso FREE/PRO y pagos; no publicar promesas sin backend funcional.
6. Integrar Ask Timeline con base de respuestas verificadas, contenido por página, preguntas rápidas, controles de seguridad, idiomas y derivación a contacto; probar preguntas reales.
7. Validar experiencia móvil y escritorio y desplegar solo después de pruebas.

## Restricciones
- No tocar producción sin autorización y verificación.
- No sobrescribir respaldos ni reutilizar CSS antiguo conflictivo.
- Mantener plantillas independientes de datos personales de proyectos.
- Cada función debe probarse realmente antes de anunciarla como terminada.
