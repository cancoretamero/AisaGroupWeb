# Aisa Group · Liquid Glass Executive Atlas

Reinterpretación del sitio de [Aisa Group](https://www.aisagroup.ca) en una experiencia monocromática futurista inspirada en iOS 17/26. La interfaz despliega narrativa ejecutiva con efectos liquid glass, navegación flotante y componentes preparados para reemplazar por activos finales.

## Arquitectura

- `index.html`: Estructura semántica organizada en escenas (hero, identidad, divisiones, operaciones, sostenibilidad, presencia, insights y contacto) con placeholders de video, imágenes y contenido real tomado del sitio actual.
- `styles.css`: Sistema visual minimalista en negros con glassmorphism, gradientes líquidos, rejillas responsivas, carruseles infinitos y controles flotantes.
- `script.js`: Lógica para progreso de scroll, activación de navegación, parallax adaptable y duplicado automático de pistas marquee respetando preferencias de movimiento reducido.

## Puesta en marcha

No requiere dependencias adicionales. Puedes abrir `index.html` directamente o levantar un servidor estático:

```bash
python -m http.server 3000
```

## Flujo y componentes clave

- **Header flotante** con CTAs, progreso lateral, índice numérico y dock de acciones rápidas para saltar a hero, insights y contacto.
- **Hero inmersivo** con video, métricas, marquee y copy corporativo de Aisa Group.
- **Tarjetas liquid glass** para identidad, divisiones y operaciones, con animaciones parallax suaves.
- **Secciones ESG y presencia global** con timeline, mapa y listado de hubs reales.
- **Insights & Contacto** con cards listas para noticias y formulario translúcido.

## Buenas prácticas para evitar conflictos de merge

- Sincroniza tu rama con `main` antes de comenzar (`git fetch && git pull --rebase origin main`).
- Realiza commits temáticos y evita formatear archivos completos salvo necesidad funcional.
- Mantén los assets externos como placeholders para no versionar archivos pesados.
- Tras resolver comentarios, vuelve a ejecutar `git status` para asegurar un árbol limpio antes del merge.

> Proyecto conceptual sin backend. Actualiza textos, enlaces y multimedia según el entregable final del cliente.
