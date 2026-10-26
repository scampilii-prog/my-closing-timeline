# Activación segura — My Closing Timeline PRO (26 oct 2026)

Estado: código de frontend, backend, migración y webhook guardado en GitHub. **NO activar clientes reales hasta completar todos los pasos**. La cuenta conectada de Stripe es **My Closing Timeline sandbox**. No se debe poner una clave real de pagos en la aplicación por ahora.

## Paso 1. Base de datos Cloudflare D1
1. Entrar en https://dash.cloudflare.com/ y abrir Workers & Pages.
2. Crear una base de datos D1 llamada `myclosingtimeline-pro`.
3. Ejecutar en su consola SQL el archivo `migrations/0001_pro_accounts.sql` del repositorio.
4. Abrir Workers & Pages > proyecto Pages **my-closing-timeline** > Settings > Bindings > Add > D1 database.
5. Nombre exacto del enlace: `PRO_DB`; elegir `myclosingtimeline-pro`. Configurar para producción y el entorno de pruebas que uses. Redeploy después.

## Paso 2. Email verificado
Este código exige verificación por correo ANTES de permitir entrar. Contratar/verificar un dominio remitente en un proveedor compatible con Resend y configurar dos secretos en Cloudflare Pages Settings > Variables and Secrets:
- `RESEND_API_KEY` (secret, jamás GitHub)
- `MCT_FROM_EMAIL` (por ejemplo `My Closing Timeline <noreply@myclosingtimeline.com>`, si el dominio está verificado).
Sin esto el registro devuelve error 503; deliberadamente no crea cuentas inseguras.

## Paso 3. Stripe Sandbox
En Cloudflare Pages configurar secret `STRIPE_SECRET_KEY` con la clave **sk_test_** del mismo Sandbox de Stripe (no publicar nunca); no usar clave real.
Crear webhook en el Dashboard Stripe Sandbox apuntando a:
`https://myclosingtimeline.com/api/pro/webhook`
Seleccionar eventos:
- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
Guardar `STRIPE_WEBHOOK_SECRET` (empieza por `whsec_`) como secreto Cloudflare.
Redeploy Pages para aplicar secretos/bindings. La API solo admite claves `sk_test_`: no procesa cobros reales accidentalmente.
Productos sandbox activados: 1/$20, 2/$35, 5/$80. Oferta obsoleta 2/$20 permanece inactiva.

## Paso 4. Comprobar antes de cobrar
- `/api/pro/health` debe responder con `database:true`, `checkoutSandbox:true`, `webhook:true`, `email:true`.
- Desde `/pro-get-started.html`: seleccionar un plan, crear cuenta, confirmar email y entrar.
- Abrir Stripe Sandbox Checkout (tarjeta de prueba de Stripe), confirmar pago de prueba y observar que aparece el saldo correcto en `/my-closings.html`.
- Repetir el webhook y comprobar que los créditos NO se duplican.
- Crear un FREE code en `/admin-gift-codes.html` usando la sesión protegida de Admin Console. Canjear una vez y comprobar que el saldo aumenta solo una vez.
- Registrar una transacción, verificar que se descuenta exactamente un crédito; editar tarea futura; cambiar fecha; cancelar y cerrar proyectos distintos. Verificar que solo aparece la cuenta propia y las operaciones archivadas no se editan.

## Seguridad y límites actuales
- Contraseñas con derivación PBKDF2 SHA-256 + salt; cookie de sesión aleatoria HttpOnly, Secure y SameSite=Lax.
- CSRF: las operaciones de escritura comprueban el origen.
- Stripe: importes, IDs y número de créditos los decide el servidor; el webhook verifica firma y concede créditos idempotentemente.
- Códigos gratuitos aleatorios se almacenan solo como hashes, con límite de usos, vencimiento y restricción opcional de email.
- El panel propietario para crear códigos exige la sesión privada de Admin Console.
- Falta un sistema de limitación avanzada de intentos y recuperación de contraseñas antes de apertura pública; también hay que verificar clasificación fiscal, texto legal y política de privacidad.
- Las pruebas antiguas en navegador no se importan automáticamente a D1.
- El workspace histórico `owner-pro-workspace.html` era una demostración y sigue separado del panel real `my-closings.html`.
- El estado del sitio no debe presentarse como disponible hasta que el entorno Cloudflare y el correo sean verificados.

## Archivos principales
- `functions/api/pro/[[path]].js`: registro, acceso, pagos sandbox, códigos, transacciones, fechas y tareas
- `functions/api/pro/webhook.js`: verificación de pagos
- `migrations/0001_pro_accounts.sql`: tablas D1
- `pro-get-started.html`: interfaz comercial PRO
- `my-closings.html`: panel privado para Realtors
- `admin-gift-codes.html`: generador de códigos bajo login propietario
- `functions/_middleware.js`: autenticación existente del propietario y protección del generador de códigos

No agregar ningún token real, contraseña de clientes o secreto al código GitHub ni en capturas.
