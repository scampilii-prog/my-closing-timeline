# My Closing Timeline — Principios rectores de producto, confianza y calidad
**Fecha:** 2026-11-15  
**Estado:** visión y criterios de aceptación solicitados por el fundador; no constituye certificación de funciones implementadas.

## Objetivo
Construir una plataforma elegante, limpia, comprensible, útil y confiable, apta para una audiencia amplia, que ayude a cada usuario registrado a gestionar sus operaciones y proyectos con seguridad. El período de prueba gratuito debe demostrar valor real y generar confianza suficiente para que el usuario considere contratar un plan. Los ingresos deben proceder de una experiencia útil, transparente y sostenible, no de promesas ni cobros confusos.

## Regla de cada pantalla, control y cambio
**Cada página, botón, enlace, formulario, cálculo y ajuste debe tener un propósito concreto, una acción real y un resultado comprensible para el usuario.** No se aceptan botones decorativos que aparenten funcionar, enlaces a destinos incorrectos, estados engañosos, textos ambiguos, pérdida de datos ni acciones inesperadas. El diseño debe ser intuitivo para personas sin conocimientos técnicos, accesible en móvil y escritorio, con instrucciones y mensajes de error claros.

## Alcance y categorías
La visión comercial contempla **cuatro categorías**, según la definición final del fundador. **Sus nombres y límites deben confirmarse en el documento maestro antes de implementarlas o anunciarlas.** Los documentos actuales consultados describen explícitamente Real Estate Timeline y My Project Timeline; no inventar ni publicar dos categorías adicionales sin especificación aprobada. Mantener una arquitectura compartida, reutilizable y adaptable a distintos tipos de proyecto.

## Confianza, prueba gratuita y monetización
- Respetar el documento vigente `docs/ACCOUNT-AND-PER-OPERATION-PLANS-2026-11-10.md`: cuenta verificada, una prueba de 21 días con acceso completo para la primera operación elegible, permisos por operación y condiciones comerciales claramente mostradas.
- Nunca afirmar que pagos, autenticación, recordatorios, envíos de correo o almacenamiento permanente funcionan si no están implementados y comprobados.
- Informar antes de pagar qué incluye el plan, duración, renovación o no renovación, vencimiento, acceso posterior, política de cancelación y tratamiento de datos.
- Evitar pérdida de datos, cargos duplicados y restricciones sorpresivas; probar cada transición FREE → plan de pago → vencimiento → extensión.

## Opiniones, sugerencias y quejas
Incorporar una opción visible para usuarios registrados, por ejemplo **Reviews & Feedback**, con tres vías distinguibles: reseña, sugerencia y reporte de problema/queja. Mostrar confirmación y estado de recepción; permitir describir el problema sin exigir datos sensibles; controlar spam y abuso; proteger privacidad; establecer un proceso de revisión y respuesta. No presentar una queja privada como reseña pública sin autorización. Definir y publicar una política transparente de moderación, retención y eliminación. Las reseñas públicas no deben fabricarse ni alterarse para inducir a error.

## Disciplina de construcción y pruebas
1. **Consultar primero la arquitectura y los requisitos aprobados en GitHub** y verificar cuál es la versión maestra real antes de tocar archivos.
2. **Auditar el código original** y localizar reglas CSS/JS duplicadas o contradictorias antes de añadir otra regla. Preferir consolidar o sustituir la causa raíz en vez de acumular parches.
3. Conservar funciones aprobadas y realizar cambios pequeños y trazables, con respaldo y registro del archivo, control y motivo.
4. Probar visualmente y funcionalmente en ventanas anchas y estrechas, móvil, desplazamiento, zoom, navegación por teclado, recarga y persistencia.
5. Verificar por cada control: estado inicial, acción, resultado, errores, restauración y relación con otros módulos; comprobar que el resultado es el esperado por el visitante.
6. Distinguir siempre **preparado**, **revisado técnicamente**, **probado en navegador**, **aprobado por el fundador** y **publicado**. Nunca declarar éxito sin prueba.
7. No multiplicar ZIP de prueba ni retirar una versión estable hasta que la nueva haya superado las pruebas de aceptación.

## Incidencia activa: controles flotantes de Real Estate PRO · Admin Test
Las versiones locales 57–70 intentaron corregir `Back to top` y `Ask Timeline`; el fundador **no aprobó** la posición. No considerar resuelto el problema. La siguiente intervención debe partir de la base visual aprobada, identificar todas las reglas y scripts originales que gobiernan ambos controles, eliminar contradicciones y verificar que su tamaño y posición se mantienen coherentes al cambiar el ancho de la ventana, sin tapar contenido. Mantener los tres botones principales rojos (incluido `Open Setup`) y preservar las demás funciones. No añadir otra capa CSS/JS sin auditar la causa raíz.

## Fuentes que gobiernan este documento
- `docs/PRODUCT-ARCHITECTURE-2026-11-02.md`
- `docs/ACCOUNT-AND-PER-OPERATION-PLANS-2026-11-10.md`
- Documentación de continuidad y pruebas vigente en `docs/`.
Si hay contradicciones comerciales, de arquitectura o privacidad, detener la implementación y resolverlas explícitamente; este documento no reemplaza automáticamente las especificaciones detalladas anteriores.

**Principio de aceptación:** un visitante debe entender qué puede hacer, hacerlo sin confusión, recibir el resultado correcto y conservar su confianza en la plataforma.
