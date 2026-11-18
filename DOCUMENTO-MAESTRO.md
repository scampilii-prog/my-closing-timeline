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

## 9. Continuidad de Real Estate PRO · 16 de noviembre de 2026

Base de prueba: [MCT-V11-152-TABLAS-SIN-SELECCION.zip](https://chatgpt.com/library?file_id=libfile_ae728b8f222c8191b2ff9feb8069a437&account_id=personal). Los ajustes siguientes están pendientes de implementación y prueba en ese ZIP.

- **Communication Center:** al elegir **Table 01**, **Table 02** o **Both Tables** en **Table to send**, mover el resaltado amarillo a **Saved contact**. Mostrar «NEXT · Choose a saved contact or enter a recipient email.» La selección de una opción y la disponibilidad de tareas se validan por separado. Mantener bloqueado **Preview Email** hasta contar con tareas confirmadas para ese envío y los datos requeridos del destinatario. Verificar que el contador y la vista previa coincidan con las tareas elegidas para una tabla o ambas.
- **Identidad de las tablas:** encabezado azul claro con título azul marino para **Table 01 · Contract Tasks & Deadlines** y texto «Track deadlines from the signed contract.» Encabezado verde salvia con título verde oscuro para **Table 02 · Follow-Up Tasks** y texto «Track calls, reminders, and follow-ups for this closing.» Mantener ancho, altura y tipografía iguales. Aplicar el color de cada tabla al borde de su **Summary** y conservar los colores de vencimiento en las filas.
- **Prueba de regresión:** al abrir o refrescar la página, ambas tablas empiezan sin tareas seleccionadas. Al marcar la primera tarea, abrir el **Summary** de esa tabla y mostrar solamente las filas seleccionadas. Al desmarcar la última tarea, cerrar su **Summary**. Mantener el flujo **Contract Setup → Tasks & Deadlines → Communication Center** y aplicar los ajustes en el código interno de Real Estate PRO.

## 10. Continuidad V12 — Real Estate & Closing · 18 de noviembre de 2026

**Decisión vigente del propietario:** la nueva **V12 — Real Estate & Closing** será el contenido de referencia para reconstruir el nuevo sitio. La versión actualmente publicada en MyClosingTimeline.com **no es referencia funcional ni visual** para esta reconstrucción y se sustituirá en el futuro, **solo con autorización expresa**. No borrar ni publicar automáticamente.

- Nombre aprobado de la categoría/página: **Real Estate & Closing** (no «Real Estate PRO»). Mantener el nombre coherente en títulos, navegación y entregas.
- Conservar **V11-208** intacta como referencia histórica visual y funcional, sin convertirla en fuente de código para copiar ciegamente. Mantener respaldos e historial; no borrar versiones.
- Objetivo de V12: reproducir las funciones y apariencia aprobadas, con arquitectura limpia, sin CSS/JS contradictorios ni acciones duplicadas. Componentes comunes centralizados; funciones de cada categoría aisladas. Nunca afirmar «sin ningún error» sin pruebas.
- Flujo de Real Estate & Closing: **01 Contract Setup / Manage Your Workspaces → 02 MY TASKS (Table 01 Contract Tasks & Deadlines y Table 02 Follow-Up Tasks) → 03 Communication Center**. Tablas, resúmenes, destinatarios y borradores independientes; opción Both Tables. Selecciones vacías al abrir/refrescar salvo recuperación explícita; elegir un workspace no carga sus datos hasta abrirlo. Fechas y conteo de días correctos; guardar/cargar plantillas sin mezclar datos de proyectos; preservar privacidad.
- La candidata local V12 pasó una serie de pruebas automatizadas comunicadas en chats previos, **pero eso no certifica por sí solo una entrega final**. Antes de publicar, verificar navegación real, diseño adaptable, proyectos, fechas, tablas, resúmenes, emails, almacenamiento, privacidad, enlaces y regresión; documentar evidencia y pendientes. No presentar como terminada si quedan pruebas críticas.
- **Forma de trabajo solicitada:** el propietario no quiere mensajes de «sigue», ZIPs intermedios, jerga técnica ni explicaciones etapa por etapa. Realizar todas las tareas y pruebas posibles de forma autónoma dentro de la sesión; comunicar solo resultados sustanciales y una entrega final sencilla cuando realmente esté lista. No prometer trabajo en segundo plano entre conversaciones.
- **Continuidad entre chats:** este DOCUMENTO-MAESTRO.md es el punto de entrada. Al comenzar un nuevo chat de desarrollo, consultar este archivo en GitHub y el código/ZIP más reciente verificable antes de actuar; no asumir que el último ZIP local está en GitHub. Actualizar esta sección con decisiones nuevas y estado verificado al terminar cada sesión importante, **cuando el usuario haya autorizado esa actualización**. Las conversaciones futuras no se sincronizan automáticamente con GitHub: requieren que el asistente conectado lea y escriba el documento en cada sesión.
- No reemplazar decisiones previas silenciosamente. Si hay contradicción, registrar fecha y decisión vigente; mantener el historial y pedir aclaración solo cuando sea imprescindible.
