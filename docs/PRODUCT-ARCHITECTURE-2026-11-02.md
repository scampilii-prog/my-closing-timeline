# My Closing Timeline — arquitectura definitiva (Website 31 → 32)

## Regla comercial invariable
Home es la única presentación conjunta de Real Estate y Project Timeline. Después de elegir uno, el visitante solo ve navegación, práctica FREE, explicación PRO, ofertas, registro, pago y espacio de trabajo de ese producto. No solicitar nuevamente el tipo de producto durante el pago. Los usuarios existentes regresan a su producto guardado. No implementar sesiones persistentes sin revisar autenticación y seguridad.

## Diseño único
Usar Home como referencia: header y footer unificados, hero fotográfico de ancho completo, títulos y contenido alineados al ancho máximo de 1420 px, Manrope, azul marino, dorado y acentos discretos; accesibilidad móvil. Consolidar CSS existente, no sumar parches conflictivos. Mantener EN/ES/IT/PT y no eliminar funciones.

## Inventario inicial (46 HTML incluyendo backups)
Real Estate: real-estate-timeline.html, my-closings.html, closing-workspace-preview.html (verificar preview).
Project: project-timeline.html, other-projects.html (verificar duplicidad).
Comunes: index.html, contact.html, privacy.html, login.html (redireccionamiento actual).
A separar: pricing.html, pro-get-started.html, pro-timeline.html, pro-plan.html, workspace.html.
Privadas/pruebas: admin-gift-codes, admin-invitations, personal-sabatino, customer-preview, customer-review, realtor-private-test, realtor-registration-preview, step3-new-table-preview, backups y otros; auditar referencias antes de retirar de navegación.

## Estado comprobado
- Home ya tiene botones separados para Real Estate y Project Timeline; último commit de Home: 9e15a7c.
- first-closing-free.html indica que la promoción terminó; no anunciar regalo vencido.
- pro-get-started.html anuncia Stripe Sandbox simulado: NO prometer cobro real.
- project-timeline.html dice que cuentas, compras y recordatorios PRO de Other Projects aún no están disponibles; no ofrecer compra hasta implementarlos y probarlos.
- 2026-11-02: se sustituyeron en Project Timeline dos enlaces cruzados a Real Estate y un CTA de registro PRO prematuro por enlaces a FREE y PRO Preview del propio proyecto. Commit 9345846.

## Secuencia de trabajo
1. Auditar cada HTML activo y sus enlaces, redirecciones, dependencias y funciones. Clasificar público, privado, legacy o duplicado.
2. Definir componentes compartidos header/hero/footer y patrón único; migrar por lotes, con verificación de regresiones.
3. Construir explicaciones y precios PRO específicos para Real Estate y Project, sin cruces.
4. Separar registro y retorno al producto sin duplicar cuentas; verificar estado real de Stripe y permisos.
5. Probar FREE, PRO, enlaces, móvil, idiomas, recordatorios y sesiones seguras antes de anunciar disponibilidad.

Nunca afirmar publicación visual ni compras operativas sin comprobarlas.
