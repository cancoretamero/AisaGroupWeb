# Landing de agri-tech premium

Proyecto creado con Next.js 15, React, TypeScript y TailwindCSS siguiendo los lineamientos solicitados.

La landing reproduce el wireframe editorial/premium con la marca ficticia **Rurivo**, incorporando hero inmersivo, métricas, soluciones modulares, carrusel de casos y blog con scroll infinito.

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

## Scroll infinito y accesibilidad

- El componente `InfiniteScrollController` observa el 85% del viewport y llama al endpoint `/api/placeholder?page=N` para anexar más casos, posts y productos.
- Si la carga automática falla, aparece un botón de reintento y un mensaje final cuando ya no quedan lotes disponibles.
- Las animaciones respetan `prefers-reduced-motion`, los componentes tienen estados de focus visibles y todos los elementos relevantes poseen atributos `aria-*` y textos alternativos.

## Personalización rápida

1. Sustituye las imágenes SVG de `public/img` y `public/svg` por tus recursos definitivos manteniendo los nombres o actualizando las rutas.
2. Ajusta textos y cifras en `src/data/base-content.ts` y `src/data/placeholder-pages.json` para reflejar tus casos reales.
3. Actualiza metadatos y enlaces externos en `src/app/layout.tsx`, `src/app/page.tsx` y en los componentes de navegación/footer.
4. Conecta el formulario de `src/app/api/lead/route.ts` con tu backend o proveedor preferido.

## Notas de rendimiento y SEO

- Imágenes responsive con `next/image` y lazy-loading.
- Animaciones suaves con Framer Motion y GSAP ScrollTrigger.
- Metadatos completos (Open Graph, Twitter, sitemap, robots y schema.org).
- Formulario con validación accesible, honeypot y feedback mediante `Toast`.
