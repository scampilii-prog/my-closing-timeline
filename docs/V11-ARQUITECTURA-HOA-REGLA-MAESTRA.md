# V11 — Regla maestra de arquitectura compartida (modelo HOA)

**Estado:** norma obligatoria para crear y mantener las páginas de MyClosingTimeline.com V11.

## Principio rector: Association y casas

La arquitectura funcionará como una comunidad HOA:

- **MODELO / Association:** administra exclusivamente las áreas comunes del sitio: encabezado, identidad visual y logo, navegación, selector de idiomas, pie de página, controles flotantes (Back to top y Lía · Ask Timeline), estilos globales, componentes compartidos y reglas generales de accesibilidad y adaptación a pantallas.
- **Página / Casa:** administra exclusivamente su interior: contenido, secciones, formularios, tablas, flujos de trabajo, lógica de negocio y estilos propios de la categoría.
- Ninguna página puede redefinir, duplicar ni sobrescribir la estructura compartida para hacerla diferente del MODELO.
- Ningún cambio interno de una página puede modificar las áreas comunes ni afectar otra página.

## Propagación de cambios

1. Los problemas o mejoras de áreas comunes se corrigen **una sola vez en los archivos compartidos del MODELO** y se reflejan en todas las páginas que los importan.
2. Los problemas o mejoras del interior se corrigen **solo en los archivos propios de esa página**.
3. Las páginas deben **referenciar/importar** los componentes y estilos comunes; no copiar y pegar versiones independientes. MODELO.html es referencia visual y de reglas; los componentes compartidos son la fuente ejecutable única.
4. Evitar selectores CSS globales de páginas que alteren header, footer o botones comunes; usar estilos encapsulados por página y nombres específicos.
5. Si un cambio exige modificar un contrato de componente compartido, primero se modifica y prueba el MODELO, luego se comprueba el efecto en las cuatro categorías.

## Categorías

- Home / index
- Real Estate
- Business & Projects
- Services & Contractors
- Personal & Home

## Control de calidad y versiones

- Mantener una sola fuente vigente de instrucciones y componentes aprobados; archivar notas antiguas fuera de las instrucciones activas, sin borrarlas antes de validar.
- Probar el MODELO y las páginas consumidoras tras cada cambio común.
- Probar los cambios internos en su propia página y confirmar que no afectaron a otras.
- Conservar una versión funcional anterior hasta validar la nueva.
- No afirmar que un cambio se propagará automáticamente si las páginas contienen copias en lugar de importaciones.

**Analogía aprobada:** «Las áreas comunes se arreglan desde la oficina de la Association; cada casa arregla lo suyo internamente, sin afectar las áreas comunes ni otras casas».
