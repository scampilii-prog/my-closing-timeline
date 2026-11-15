# Revisión de MODELO V11 — fase 1

Estado: **PROTOTIPO, NO APROBADO PARA PRODUCCIÓN**.

## Archivos creados
- `MCT-V11/MODELO.html`
- `MCT-V11/shared/layout.css`
- `MCT-V11/shared/shell.js`

## Verificaciones pendientes y defectos conocidos
- [ ] Abrir el HTML en navegador y comprobar la representación real; el código guardado en GitHub no demuestra funcionamiento.
- [ ] Comparar logo y geometría del header con la referencia visual V10; el logo se enlaza a `assets/myclosingtimeline-header-logo.png` del repositorio, pero todavía no se ha aprobado su escala.
- [ ] Confirmar que el encabezado no tiembla al hacer scroll o resize.
- [ ] Comprobar que el contenedor tiene márgenes simétricos y que las columnas interiores no cambian el ancho exterior.
- [ ] Implementar los enlaces propios de las cuatro categorías V11 cuando sus páginas existan; los enlaces del prototipo apuntan provisionalmente a páginas existentes de V10.
- [ ] Incorporar selector de idiomas con funcionalidad real (EN/ES/IT/PT si se aprueba para V11).
- [ ] Recuperar el icono gráfico original del asistente; el símbolo ✦ del prototipo es temporal y NO cumple la referencia aprobada.
- [ ] Validar botones exteriores en escritorio, tableta y móvil, sin solapamientos ni cambios inesperados.
- [ ] Validar accesibilidad por teclado, foco visible y menú móvil.
- [ ] Probar ayuda: el panel actual es informativo y no está conectado a un asistente; nunca presentarlo como chatbot operativo.
- [ ] Revisar rutas relativas y enlaces legales antes de desplegar en subruta o dominio.
- [ ] Realizar comparación visual y funcional con V10 antes de aprobar la fase 1.

## Regla de avance
No reconstruir `index.html` ni importar tablas antiguas hasta que MODELO haya sido inspeccionado visualmente y aprobado. No alterar `main` ni Cloudflare durante esta fase.

## Autoridad documental
Prevalece `V11_ARQUITECTURA_MAESTRA.md` en la raíz. `DOCUMENTO-MAESTRO.md` es una síntesis complementaria. En caso de discrepancia se aplica la arquitectura maestra vigente.
