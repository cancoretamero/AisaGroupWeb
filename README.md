# Landing de agri-tech premium

Proyecto creado con Next.js 15, React, TypeScript y TailwindCSS siguiendo los lineamientos solicitados.

## Requisitos previos

- Node.js 20+
- npm 10+

## Scripts disponibles

```bash
npm install        # Instala las dependencias
npm run dev        # Inicia el servidor de desarrollo en http://localhost:3000
npm run build      # Genera la build de producción
npm run start      # Sirve la build de producción
npm run lint       # Ejecuta ESLint
```

## Despliegue en Netlify

El repositorio incluye un `netlify.toml` que habilita la integración oficial de Next.js en Netlify.

- **Comando de build**: `npm run build`.
- **Directorio a publicar**: `.next`.
- **Plugin**: `@netlify/plugin-nextjs`, responsable de generar las funciones de servidor y resolver el ruteo del app router.

Pasos recomendados:

1. Instala dependencias (`npm install`).
2. Conecta el repositorio en Netlify y confirma que el proyecto use Node 20+.
3. Mantén el comando de build en `npm run build` y el directorio publicado en `.next`.
4. Verifica en los logs del deploy que se ejecute el plugin (se muestra como "Next.js on Netlify").

> Si prefieres prescindir de funciones de servidor, despliega en Vercel o adapta el proyecto a `output: "export"`, pero con el plugin el ruteo dinámico funciona de forma nativa en Netlify.

## Estructura destacada

- `src/app/page.tsx`: compone la landing con metadatos, esquemas y las secciones principales.
- `src/components/sections/*`: componentes modulares (Hero, KpiStrip, PanoramicBanner, SolutionsGrid, CaseCarousel, BlogGrid, LeadForm, etc.).
- `src/data/base-content.ts`: definiciones reutilizables (beneficios, soluciones, KPIs, etiquetas editoriales).
- `src/data/placeholder-pages.json`: dataset paginado que alimenta el scroll infinito `/api/placeholder`.
- `src/app/api/placeholder/route.ts`: mock de carga progresiva para secciones adicionales.
- `src/app/api/lead/route.ts`: endpoint simulado del formulario de captación.
- `public/img` y `public/svg`: placeholders de imágenes y logos listos para sustituir.

## Reemplazar placeholders

Todos los textos se entregan como llaves (`[H1_Principal]`, `[Copy_Breve_X]`, `[Texto_Boton_X]`, etc.) para que puedas sustituirlos rápidamente. Cambia los valores directamente en los componentes o en los archivos de datos según corresponda. Las imágenes se resuelven desde `public/img/placeholder_*.svg` y los logos desde `public/svg/logo_placeholder_*.svg`.

## Scroll infinito y accesibilidad

- El componente `InfiniteScrollController` observa el 85% del viewport y llama al endpoint `/api/placeholder?page=N` para anexar más casos, posts y productos.
- Si la carga automática falla, aparece un botón `[Texto_Boton_18]` para solicitar más contenido manualmente.
- Las animaciones respetan `prefers-reduced-motion`, los componentes tienen estados de focus visibles y todos los elementos relevantes poseen atributos `aria-*` y textos alternativos.

## Sustituciones recomendadas

1. Reemplaza las llaves de texto por el copy final dentro de cada componente o archivo de datos.
2. Cambia las imágenes en `public/img` manteniendo los mismos nombres o ajustando las rutas en el código.
3. Sustituye los SVG de `public/svg` por los logos definitivos.
4. Actualiza los metadatos en `src/app/layout.tsx` y los esquemas JSON-LD según tu proyecto.

## Notas de rendimiento y SEO

- Imágenes responsive con `next/image` y lazy-loading.
- Animaciones suaves con Framer Motion y GSAP ScrollTrigger.
- Metadatos completos (Open Graph, Twitter, sitemap, robots y schema.org).
- Formulario con validación accesible, honeypot y feedback mediante `Toast`.
