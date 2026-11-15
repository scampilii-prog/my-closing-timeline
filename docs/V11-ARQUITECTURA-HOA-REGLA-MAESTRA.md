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

## Autoridad exclusiva de cada archivo y prohibición de órdenes cruzadas

**Regla vinculante:** toda corrección, modificación, ampliación o eliminación debe realizarse únicamente en el archivo o componente que sea propietario de esa responsabilidad. Que un problema se observe desde una página no autoriza a corregirlo dentro de esa página si pertenece al MODELO.

1. **Cambios de áreas comunes (HOA):** se editan exclusivamente en los componentes compartidos administrados por MODELO, nunca en `index.html`, ni en CSS/JS específicos de una categoría. Incluye agregar, quitar o cambiar header, footer, logo, idiomas, navegación, Lía, Back to top, tamaños/posiciones comunes y reglas visuales globales.
2. **Cambios de una casa (página):** se editan exclusivamente en sus archivos propios; nunca se añaden instrucciones para esa página a MODELO ni a otras páginas.
3. **Prohibido duplicar órdenes:** no crear parches CSS, JavaScript, copias de componentes ni documentos de instrucciones paralelos que contradigan la fuente única. Se corrige o sustituye la instrucción vigente en su ubicación legítima.
4. **Diagnóstico previo:** antes de tocar código, identificar si el problema pertenece a HOA o a una página. Si el fallo se descubre en INDEX pero afecta al header común, se vuelve al componente compartido del MODELO para resolverlo.
5. **Propagación controlada:** los cambios HOA se validan primero en MODELO y después en todas las páginas que importan ese componente. Los cambios internos se prueban en su página y se verifica que no afecten las demás.
6. **Sin excepciones por conveniencia:** no introducir una modificación común dentro de una página para resolverla más rápido. Tampoco alterar el MODELO para solucionar una necesidad exclusivamente interior.
7. **Historial separado:** conservar el registro de versiones previas fuera de las instrucciones activas; mantener un único documento maestro vigente, sin órdenes contradictorias.

**Regla breve de aprobación:** «Cada modificación se realiza en la página o componente correcto, una sola vez. La casa no puede modificar la HOA; la HOA no modifica el interior de las casas».

## Nombres comerciales aprobados y rutas estables (15 noviembre 2026)

Los cuatro públicos comerciales de V11 se presentarán con estos nombres exactos:

| Categoría visible | Archivo propio |
| --- | --- |
| Real Estate & Closings | `real-estate.html` |
| Business & Projects | `business-projects.html` |
| Services & Contractors | `services-contractors.html` |
| Personal & Home | `personal-home.html` |

La portada general es `index.html` y conserva el diseño visual de cuatro fotografías aprobado en V11-33.

**PRO** es la denominación de un nivel de acceso, herramientas o plan comercial; no forma parte obligatoria del nombre de una categoría. No reducir ni fusionar las cuatro categorías sin aprobación.

**Propiedad de los cambios:** los textos de tarjetas, fotografías y contenido exclusivo de INDEX se modifican en sus archivos propios. Los nombres que aparecen en el menú, header o footer compartidos se actualizan exclusivamente en el componente HOA correspondiente. Los archivos de cada categoría administran sus propias herramientas internas.

**Implementación pendiente:** esta decisión documental no significa que los nombres, rutas o traducciones ya estén aplicados o comprobados en el código. Antes de anunciarlo como funcional, verificar navegación, enlaces y consistencia de nombres en la interfaz.
