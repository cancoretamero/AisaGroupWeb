# Aisa Group · Liquid Glass Executive Landing

Concepto que reimagina [Aisa Group](https://www.aisagroup.ca) con una estética negra minimalista inspirada en iOS, glassmorphism y
scroll narrativo continuo. Se utilizan textos reales extraídos del sitio oficial, reforzados con placeholders multimedia para
sustituir por assets definitivos.

## Arquitectura

- `index.html`: Landing estructurada en escenas (hero, quiénes somos, divisiones, valores, sostenibilidad, sedes, historia, news
  e contacto) con menús flotantes, progress rail y CTAs ejecutivos.
- `styles.css`: Sistema visual "liquid glass" monocromático con gradientes dinámicos, tarjetas translúcidas, rejillas responsivas
y animaciones de marquee/parallax controladas por `prefers-reduced-motion`.
- `script.js`: Lógica para smooth scroll, progreso del documento, activación de navegación, intersecciones animadas, parallax y
duplicación automática de marquees evitando efectos si el usuario prefiere menos movimiento.

## Puesta en marcha

No hay dependencias externas ni build steps. Abre `index.html` en el navegador o sirve la carpeta con tu herramienta favorita:

```bash
python -m http.server 3000
```

## Puntos destacados de la UI

- **Command Center flotante**: Header sticky con branding, links ejecutivos y chips de acción inmediata.
- **Progress lift + dock**: Barra de progreso lateral, menú flotante inferior y botón "volver arriba" para control absoluto del
  scroll largo.
- **Hero inmersivo**: Video/imagen principal, stack fotográfico y métricas clave tomadas del copy institucional.
- **Divisiones & sedes**: Cards con placeholders fotográficos listos para reemplazar por material propietario de cada unidad.
- **ESG & valores**: Bloques dedicados al manifiesto, compromisos y programas sociales basados en la narrativa oficial.
- **Noticias e insights**: Tarjetas con CTAs para conectar con newsroom, reportes ESG y comunicados.

## Personalización y buenas prácticas

1. Sustituye imágenes y videos desde un CDN o CMS propio manteniendo la proporción indicada en cada placeholder.
2. Ajusta el copy directamente en HTML; la tipografía y jerarquías ya están alineadas al tono corporativo.
3. Si agregas secciones, duplica la estructura `scene` para conservar espaciados, animaciones y seguimiento en la progress bar.
4. Antes de publicar, sincroniza tu rama con `main` (`git pull --rebase`) y revisa `git status` para evitar conflictos de merge.
5. Documenta cualquier nueva sección o asset externo en este README para mantener la referencia del equipo.

> Proyecto conceptual sin backend. Reemplaza textos, métricas y multimedia cuando dispongas de los assets finales aprobados.
