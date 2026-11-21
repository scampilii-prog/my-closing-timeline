# Founding Members — revisión de protección administrativa (2026-11-21)

## Inspección del código existente
- Se revisó `functions/_middleware.js` del repositorio principal.
- La autenticación privada del propietario usa cookie `mct_owner_session_v2` firmada mediante HMAC SHA-256 y secreto `PERSONAL_PRACTICE_PASSWORD`; la sesión tiene una duración máxima de 30 días.
- La expresión `protectedRoute` protege rutas explícitas como `/admin-gift-codes.html` y `/admin-invitations.html`, pero **no incluye** una futura página `/admin-founding-members.html`.
- La protección de páginas HTML no autoriza automáticamente un nuevo endpoint `/api/founding/admin`. Este debe validar en el servidor la firma y caducidad de la sesión del propietario, no confiar en un botón oculto ni en una llamada desde navegador.
- El ZIP V12-146 incluye componentes de Founding Members, pero no el middleware completo del repositorio; no debe desplegarse como reemplazo de producción.

## Condiciones obligatorias para el panel
1. Añadir explícitamente la ruta del panel al middleware existente y proteger **también** cada endpoint administrativo.
2. Empezar con operaciones de **solo lectura**, sin editar, borrar ni extender membresías desde el panel.
3. Respuestas con `Cache-Control: private, no-store`, sin datos de proyectos de terceros, y sin publicar registros de usuarios.
4. Reutilizar las cuentas verificadas y tablas aditivas; no crear una segunda base de usuarios.
5. Antes de activar, probar usuario anónimo (403/401), usuario PRO normal (403), propietario autenticado (200), sesión vencida (401), y accesos cruzados.
6. Nunca incluir el secreto `PERSONAL_PRACTICE_PASSWORD` en ZIP, GitHub o capturas.
7. No desplegar automáticamente: trabajar en rama aislada y hacer revisión antes de integrar a main.

## Estado
Auditoría de código realizada. No se ha añadido ninguna ruta ni endpoint a producción. Falta implementación y prueba de integración.
