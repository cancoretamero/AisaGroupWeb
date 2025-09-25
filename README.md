# AisaGroupWeb

Este repositorio contiene el código fuente de la web animada basada en el wireframe que voy a proporcionar a Codex. La idea es que Codex utilice el wireframe como referencia y genere una página web completa con HTML, CSS y JavaScript.

## Estructura y requisitos

- **Wireframe**: Incluiré un archivo de wireframe (`/wireframe.png` o similar) en este repositorio. Codex deberá usarlo para replicar el diseño y respetar la estructura de secciones, textos y elementos de navegación.
- **Animaciones**: La página debe tener animaciones suaves pero optimizadas (por ejemplo, utilizando transiciones CSS o bibliotecas ligeras como GSAP). Evitar animaciones pesadas que puedan afectar el rendimiento.
- **Optimización para Netlify**: La web debe estar optimizada para desplegarse en [Netlify](https://www.netlify.com). Se recomienda generar un sitio estático y colocar el código listo en la raíz o en una carpeta `dist`/`build` dependiendo del framework utilizado. En el archivo `netlify.toml` se configurará la carpeta de publicación.
- **Archivos principales**:
  - `index.html` — Página principal.
  - `styles.css` — Estilos y animaciones.
  - `script.js` — Comportamiento interactivo y animaciones.
  - `netlify.toml` — Configuración de despliegue.
  - `README.md` — Esta descripción y guía para Codex.

## Instrucciones para Codex

1. Leer el wireframe y replicar el layout utilizando HTML semántico.
2. Crear una experiencia de usuario agradable con animaciones CSS o JavaScript ligeras.
3. Asegurarse de que la página sea responsiva (que se adapte a distintos tamaños de pantalla).
4. Colocar los archivos generados en este repositorio según la estructura indicada.
5. Ajustar cualquier configuración necesaria en `netlify.toml` para que Netlify construya y sirva correctamente la web.

## Despliegue

Para facilitar la publicación en Netlify se incluyó un pequeño script de build en Node que copia los archivos estáticos a la carpeta `.next`. Netlify ejecuta el comando `npm run build` y publica directamente el contenido generado en esa carpeta.

### Ejecutar el build localmente

```bash
npm install
npm run build
```

El resultado quedará disponible en la carpeta `.next`, lista para ser servida como sitio estático.

Una vez que el código esté listo y subido a GitHub, Netlify lo construirá y publicará automáticamente cuando se haga push a la rama `main`.
