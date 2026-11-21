# Auditoría inicial de reutilización — Founding Members (21 noviembre 2026)

**Alcance:** inspección de código y documentación existente, sin despliegue ni cambios de producción. Base visual local aprobada V12-141.

## Hallazgos verificados
1. `functions/api/pro/[[path]].js` ya contiene API de cuentas PRO, sesión `mct_pro_session`, lógica de créditos y planes de pago. **No es todavía una API Founding Members.**
2. `migrations/0001_pro_accounts.sql` define `users` con `email UNIQUE`, `full_name NOT NULL`, `verified` y contraseñas derivadas; también `sessions`, `email_verifications`, `purchases`, `closings`. Hay una base reutilizable para identidad, pero el campo obligatorio de nombre completo debe revisarse frente a la regla de minimización de datos de cuenta.
3. `PRO_SETUP.md` exige Cloudflare D1 `PRO_DB`, Resend y Stripe Sandbox, y advierte que no debe activarse el sistema con clientes reales hasta terminar configuración y pruebas. No se ha verificado la configuración efectiva del entorno Cloudflare.
4. `PRIVACY_FIRST_REQUIREMENTS.md` prohíbe almacenar identificadores de terceros en timelines y reconoce controles de privacidad pendientes.
5. V12-141 contiene página informativa `founding-members.html`, **sin** registro, activación de 90 días, extensiones ni panel de participantes funcional.

## Decisión técnica recomendada
- **Reutilizar identidad y sesión** del backend PRO si las pruebas de seguridad lo permiten, en lugar de mantener dos sistemas de cuentas independientes.
- Añadir una tabla de membresía Founding Members con inicio, vencimiento, extensiones y auditoría; no usar créditos de Stripe como contador de días gratuitos.
- Separar reglas de acceso de prueba de la compra de cierres y de los proyectos personales.
- Antes de programar endpoints, auditar las rutas de registro y autorización existentes, la migración completa y la política de minimización del campo `full_name`.
- Implementar cambios mediante nuevas migraciones aditivas; no alterar datos existentes ni publicar automáticamente.
- Conservar Home de cuatro categorías y Real Estate Guided de cinco pasos, sin regresiones.

## Bloqueos para lanzamiento real
- Confirmar D1, verificación de email y sesiones en entorno de pruebas; revisar recuperación de cuenta y rate limiting.
- Probar unicidad de usuario, dos proyectos máximo (uno profesional, uno personal), 90 + 30 + 30 días, idempotencia y vencimiento del lado del servidor.
- Probar aislamiento entre cuentas, acceso administrativo, privacidad y tratamiento de feedback libre.
- Revisar textos legales, retención de datos y política de no cobro automático.

**Resultado:** se ha identificado código concreto que puede reutilizarse; no se ha demostrado que esté configurado ni funcionando en producción.
