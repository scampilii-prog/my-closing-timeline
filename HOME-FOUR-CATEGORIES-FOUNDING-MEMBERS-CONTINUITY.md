# My Closing Timeline — Continuidad Home y Founding Members (21 noviembre 2026)

## Estado y fuentes verificadas
- Repositorio: `scampilii-prog/my-closing-timeline`.
- Autoridad estructural vigente de V11: `V11_ARQUITECTURA_MAESTRA.md`; consultar también `DOCUMENTO-MAESTRO.md` como historial y especificación.
- Archivo de referencia recibido del propietario: `MCT-CHOOSE-YOUR-TIMELINE-PREVIEW(1).zip`, contiene `mct-category-preview/choose-your-timeline.html` (fechado 12 noviembre 2026). Es **un prototipo visual autónomo**, no la Home final ni un registro funcional. El directorio `assets/` está vacío; las cuatro fotos se cargan desde URLs externas de Unsplash.
- Último paquete local de integración citado: `MCT-V12-136-FOUNDING-MEMBERS-INTEGRADO.zip`, basado en V12-135. Este archivo no se ha publicado automáticamente en GitHub ni Cloudflare; no afirmar que esté desplegado.
- No se ha localizado en GitHub la versión exacta `MCT-HOME-ORIGINAL-4-FOTOS` ni `MODELO.html` en la rama principal. **No afirmar que el prototipo recibido es la versión definitiva V11.**

## Home aprobada como dirección de trabajo
Conservar la presentación clara de **Choose Your Timeline** con cuatro categorías y una fotografía por categoría:
1. Real Estate — cierres, fechas, depósitos, inspecciones, seguimiento y comunicaciones.
2. Business & Projects — proyectos, responsables, hitos y calendarios.
3. Services & Contractors — trabajos, visitas, equipos y fechas.
4. Personal & Home — mantenimiento, tareas, recordatorios y planes personales.

La maqueta recibida utiliza tarjetas en cuadrícula de dos columnas, botones `Choose ...`, un indicador de pasos `Create Your Account → Choose Your Timeline → Start Organizing`, y un aviso explícito de que la selección es simulada. **Los botones actuales solo muestran un mensaje local**: al integrar, deberán dirigir a destinos reales y autorizados; no prometer cuentas, planes ni almacenamiento sin backend comprobado.

## Estructura y diseño
- Un único header, contenedor, footer y controles laterales, definidos en `shared/`, para todas las páginas. No copiar el header/footer autónomo del prototipo sobre la arquitectura V11/V12.
- Conservar identidad elegante, fuente Manrope, azul marino, acentos dorados/turquesa, logo alineado y responsive estable.
- No duplicar CSS/JS estructural ni romper las funciones aprobadas de V12.
- Integrar Founding Members en la Home sin desplazar las cuatro categorías.

## Programa Founding Members — propuesta pendiente de implementación
- Invitación: **90 días gratuitos** para nuevos miembros, con hasta **dos extensiones opcionales de 30 días** cada una por participación voluntaria en pruebas privadas; máximo 150 días según elegibilidad y reglas finales.
- Una cuenta por usuario; durante la prueba, un proyecto profesional y uno personal; sin tarjeta ni cobro automático.
- Comentarios privados y reseñas públicas opcionales, separados. Nunca condicionar una reseña pública positiva a recompensas.
- No afirmar que registro, extensiones, controles de elegibilidad, pagos o formularios están operativos hasta implementarlos y probarlos.

## Privacidad obligatoria
No solicitar, almacenar ni publicar datos personales de terceros ni información que identifique empresas en proyectos, pruebas, comentarios o reseñas. Usar datos ficticios o anonimizados, mínima información de cuenta, permisos adecuados y evitar exponer información sensible.

## Próximo trabajo, sin tocar producción aún
1. Usar el prototipo adjunto como **referencia visual de cuatro categorías**, y la arquitectura maestra como autoridad de estructura.
2. Comparar `index.html` y los componentes compartidos de V12-136 con las especificaciones de V11; preservar lo aprobado.
3. Integrar una Home única con enlaces reales y promoción discreta Founding Members.
4. Revisar conflictos de HTML/CSS/JS y probar navegación, responsive, privacidad y flujos antes de entregar un único ZIP; nombre del ZIP idéntico a la carpeta interior.
5. No publicar ni activar cobros sin aprobación y pruebas.

**Alcance de este commit:** solo documentación de continuidad; no cambia el sitio publicado ni implementa funcionalidades.
