# Aisa Group · Executive Liquid Glass Experience

Reinterpretación del sitio de [Aisa Group](https://www.aisagroup.ca) como una experiencia monocromática futurista inspirada en iOS
26. La interfaz propone narrativa ejecutiva continua con scroll infinito, módulos translúcidos y menú flotante digno de un hub de
innovación corporativa.

## Arquitectura

- `index.html`: Estructura semántica reorganizada en frames (hero, manifiesto, portafolio, operaciones, ESG, presencia, insights y
  contacto) con placeholders de video, imágenes y copy oficial de Aisa Group listo para personalización.
- `styles.css`: Sistema visual liquid glass negro con gradientes dinámicos, componentes glassmorphism, carriles infinitos y diseño
  responsive pensado para presentaciones ejecutivas.
- `script.js`: Lógica de progreso, navegación activa, parallax adaptable, duplicación automática de loops (marquee y columnas
  verticales) y soporte para `prefers-reduced-motion`.

## Puesta en marcha

No requiere dependencias. Puedes abrir `index.html` directamente o levantar un servidor estático:

```bash
python -m http.server 3000
```

## Puntos destacados de la interfaz

- **Command Center translúcido**: Header sticky con brand, navegación ejecutiva y chips de acción inmediata.
- **Wayfinder + Floating Menu**: Barra lateral de progreso, menú flotante y botón de retorno para control total del scroll.
- **Frames Liquid Glass**: Tarjetas, cápsulas y formularios con glassmorphism, indicadores y tipografía Space Grotesk.
- **Loop infinito**: Carriles de portafolio e insights con duplicación automática para sensación de scroll continuo.
- **Contenido real**: Copys y métricas extraídos del sitio oficial de Aisa Group para mantener coherencia de marca.

## Estrategia anti-conflictos

Para evitar conflictos de merge como los reportados anteriormente, sigue estas pautas antes de subir cambios:

1. **Actualiza tu rama base**: `git fetch origin && git pull --rebase origin main` para partir desde la última versión.
2. **Commits atómicos**: Agrupa cambios por funcionalidad (contenido, estilos, scripts). Evita reformateos masivos.
3. **Respeta la arquitectura**: Añade nuevas secciones duplicando módulos existentes sin reordenar bloques innecesariamente.
4. **Valida el árbol limpio**: Ejecuta `git status` y revisa el diff antes de hacer push; así detectas conflictos locales.
5. **Documenta placeholders**: Mantén los enlaces a imágenes/videos como URLs externas para no versionar assets pesados.

> Proyecto conceptual sin backend. Reemplaza textos, métricas y multimedia cuando dispongas de los assets finales aprobados.
