# Founding Members — Plan técnico de implementación (V12-141)

**Estado:** especificación, NO sistema activo. **Base visual aprobada:** V12-141. No alterar Home de cuatro categorías ni Real Estate Guided de cinco pasos.

## 1. Experiencia del usuario
1. Visita `founding-members.html` desde el menú.
2. Pulsa **Join Founding Members** (solo habilitar cuando exista registro real). Verifica email y crea una cuenta única. Sin tarjeta.
3. El servidor registra `trial_started_at`, `trial_ends_at = +90 días`, `extension_count=0`; ofrece un proyecto profesional y uno personal con datos de prueba anonimizados.
4. Panel personal muestra días restantes, proyectos permitidos, estado y botón de comentarios privados.
5. Dos extensiones de 30 días, cada una **solo** tras completar una ronda de pruebas privada definida y validada por el sistema; nunca por reseña pública.
6. Al vencer, se restringen funciones de edición y datos sensibles conforme a las reglas de acceso aprobadas, se conserva historial permitido y se ofrece continuidad voluntaria; sin cobro automático.

## 2. Reglas de negocio y seguridad
- Un usuario por correo verificado; normalizar email, unicidad en base de datos, bloqueo de duplicados, recuperación de cuenta y protección contra abuso.
- Autorización **en servidor** para cuentas, proyectos, límites, fechas, extensiones y administración. No usar localStorage ni controles HTML como autoridad.
- Fecha de fin y duración calculadas en UTC en backend; auditoría de concesiones, revocaciones y cambios.
- Una extensión por ronda validada, máximo dos; operaciones idempotentes para impedir duplicación por doble clic o concurrencia.
- Ninguna tarjeta de crédito para prueba, ningún cargo automático.
- No recopilar datos de terceros ni datos identificables de compañías; formularios deben advertir y restringir campos de texto libre; pruebas con datos ficticios/anonimizados.
- Feedback privado y reseñas públicas opcionales separados. No condicionar extensiones ni acceso a una reseña pública o valoración positiva.
- Definir retención, eliminación, acceso administrativo mínimo, anti-spam, rate limits y política de privacidad antes del lanzamiento.

## 3. Modelo mínimo de datos (propuesta)
- `accounts(id, email_normalized UNIQUE, email_verified_at, created_at, status)`
- `founding_members(account_id UNIQUE, trial_started_at, trial_ends_at, extension_count CHECK 0..2, status)`
- `trial_rounds(account_id, round_no CHECK 1..2, completed_at, validated_at, UNIQUE(account_id,round_no))`
- `projects(id, account_id, project_type professional|personal, status)` con límites por cuenta durante prueba.
- `private_feedback(id, account_id, category, message_redacted, created_at, review_status)`
- `audit_events(id, actor_id, account_id, event_type, occurred_at)`
- Administrador: solo contadores y datos de cuenta imprescindibles; evitar incluir información de clientes o empresas.

## 4. Administración sencilla
Panel privado: miembros registrados, emails verificados, días restantes, rondas completadas, extensiones, incidencias y comentarios moderados. Filtros, búsqueda, permisos de administrador, registro de acciones y opción de suspender accesos. Sin datos de proyectos de terceros en paneles de reseñas.

## 5. Criterios de aceptación antes de activar
- Registro, confirmación de correo, sesión y recuperación de acceso probados.
- Un email no puede iniciar una segunda prueba; dos registros concurrentes no duplican la cuenta.
- 90 días exactos, extensión 1 +30 y extensión 2 +30; tercera rechazada; solicitudes repetidas no duplican días.
- Dos proyectos permitidos (uno de cada tipo), tercero bloqueado en servidor.
- Vencimiento y restricciones efectivos sin depender de navegador; ninguna información sensible expuesta.
- Comentarios privados funcionan, se moderan, y no exigen reseñas públicas.
- Admin accesible solo a autorizados; pruebas de acceso entre usuarios, CSRF, inyección, XSS y rate limits.
- Pruebas en navegador móvil/escritorio; ningún enlace muerto ni pantalla que simule una cuenta real.
- Revisión de políticas y precios vigentes antes de publicar.

## 6. Siguiente etapa
Auditar los servicios realmente conectados (Cloudflare Pages/Workers, base de datos, email y autenticación), y reutilizar lo seguro y existente. **No implementar promesas de cuenta en HTML estático.** Trabajar sobre una rama o paquete de pruebas, sin afectar producción, y reunir cambios relacionados en una sola entrega ZIP con carpeta interna del mismo nombre.

**Nota:** este documento es un plan técnico; no certifica que el backend, los pagos, la verificación o el panel estén implementados.
