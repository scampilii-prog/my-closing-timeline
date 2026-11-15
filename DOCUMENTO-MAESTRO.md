# Plan maestro de reconstrucción — MyClosingTimeline V11

**Estado:** Plan rector aprobado. Documento de autoridad para la reconstrucción V11.  
**Regla:** ninguna página interior puede modificar la estructura común.

## 1. Una sola fuente para toda la estructura

`MODELO.html` es la referencia visual. Las instrucciones reales se centralizan en componentes compartidos. Las páginas HTML no heredan automáticamente los cambios de MODELO: comparten los mismos archivos de estructura.

- `MODELO.html`: plantilla visual de header, contenedor, footer y botones exteriores.
- `index.html`, `real-estate.html`, `business-projects.html`, `services-contractors.html`, `personal-home.html`: contenido y funciones propias.
- Todas usan la misma estructura común, sin autorización para alterarla desde sus estilos particulares.

## 2. Responsabilidades

| Elemento | Responsable |
|---|---|
| Logo, encabezado, idiomas, registro y menú | Estructura compartida / MODELO |
| Ancho general, márgenes y adaptación a pantallas | Estructura compartida / MODELO |
| Footer y enlaces legales | Estructura compartida / MODELO |
| Back to top y asistente Lía / Ask Timeline | Estructura compartida / MODELO |
| Fotografías y tarjetas de las cuatro categorías | `index.html` |
| Fechas, tareas, tablas y resúmenes | `real-estate.html` |
| Contactos, mensajes y comunicaciones | Página correspondiente |
| Diseño y funcionamiento interior | Exclusivamente la página correspondiente |

Un cambio en el logo se realiza una sola vez en el componente compartido; un cambio en una columna de Real Estate se realiza solo en Real Estate.

## 3. Estructura definitiva de MODELO

- Header azul marino, logo original a la izquierda; idiomas, Sign In, Register y Menu.
- Encabezado con ancho de V10, fijo, sin temblores ni desplazamientos; conservar enlaces.
- Contenedor común con ancho y márgenes uniformes, adaptable a pantallas.
- Área interior independiente para títulos, fotografías, tablas, formularios y funciones de cada página.
- Footer y lema: **Your Clients. Your Records. Your Privacy.**
- Dos botones exteriores con dimensiones idénticas, márgenes simétricos, fondo azul marino y detalles turquesa: izquierda **Back to top** con flecha; derecha **Lía · Ask Timeline** con el mismo icono original del logo. Ambos con funciones reales.

El esquema es conceptual, no una captura de la página terminada.

## 4. Reglas que no volveremos a romper

1. **No más CSS contradictorios:** cada componente tiene un único responsable y estilos organizados.
2. **No más reparaciones estructurales dentro de páginas individuales:** los cambios comunes se hacen exclusivamente en archivos compartidos.
3. **No más páginas creadas copiando errores anteriores:** construir cada página nueva con la plantilla limpia.
4. **No más botones que aparenten funcionar:** todo enlace y acción debe tener destino y comportamiento comprobables.
5. **No perder el trabajo funcional de V10:** conservar V10 como referencia para recuperar funciones, sin importar sus estilos conflictivos.

## 5. Orden de construcción

1. **Terminar MODELO V11:** header completo, logo original, enlaces, medidas, contenedor, footer, botones exteriores y adaptación. Probar anchos de ventana y desplazamiento vertical.
2. **Reconstruir `index.html`:** portada *Choose Your Timeline* de V10, cuatro categorías, fotografías correctas y enlaces funcionales. No usar capturas de pantalla como fotografías.
3. **Reconstruir Real Estate:** Contract Setup, ambas tablas, resúmenes, guardado y Communication Center. Trasladar funciones comprobadas, sin instrucciones estructurales antiguas.
4. **Crear las demás páginas:** Business & Projects, Services & Contractors, Personal & Home, registro, planes, ayuda y políticas, con la misma base.
5. **Probar antes de publicar:** navegación, registros, persistencia de datos, cálculos, correos, privacidad, pagos y manejo de errores. La versión gratuita debe funcionar correctamente antes de invitar a pagar.

## 6. Organización de archivos

```text
MCT-V11/
├── MODELO.html
├── index.html
├── real-estate.html
├── business-projects.html
├── services-contractors.html
├── personal-home.html
├── shared/
│   ├── layout.css
│   ├── header.js
│   ├── footer.js
│   ├── navigation.js
│   └── assistant.js
├── pages/
│   ├── index.css
│   ├── real-estate.css
│   └── ...
├── assets/
│   ├── logo/
│   ├── icons/
│   └── images/
└── DOCUMENTO-MAESTRO.md
```

Este documento establece responsabilidades y reglas para comparar el proyecto existente antes de trasladar funciones.

## 7. Protección del trabajo anterior y experiencia del visitante

**No borrar V10 ni archivos históricos.** Conservarlos como respaldo. Reconstruir V11 desde una base limpia. Una vez terminado y comprobado MODELO, ninguna página interior modificará la estructura exterior.

El visitante debe entender qué hacer, hacerlo sin complicaciones y confiar en el resultado. Esa confianza es fundamental para convertir una prueba gratuita en un cliente satisfecho.

## 8. Control de cambios

- Antes de implementar, comparar con este documento y con las funciones históricas comprobadas.
- Mantener separados estructura compartida, estilos de página y lógica de negocio.
- No publicar cambios sin pruebas.
- Registrar decisiones nuevas aquí, evitando instrucciones contradictorias.
