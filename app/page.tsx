import HeroDepth from "../components/HeroDepth";

export default function HomePage() {
  return (
    <main>
      <HeroDepth
        imageSrc="/hero/montanas.jpg"
        depthSrc="/hero/montanas-depth.png"
        fadeStart={0.7}
        strength={0.06}
      />
      <section>
        <h1>Explora la cordillera</h1>
        <p>
          Observa la profundidad del valle mientras el paisaje responde a tus
          movimientos. Desplázate lentamente para disfrutar del fundido a negro
          que integra la imagen con el resto del sitio.
        </p>
      </section>
      <section>
        <h2>Experiencia inmersiva</h2>
        <p>
          En dispositivos compatibles, puedes inclinar el teléfono para sentir el
          relieve del terreno. Si prefieres menos animación, el sitio respeta tu
          configuración y mantiene una imagen estática.
        </p>
      </section>
      <section>
        <h2>Un lienzo para historias</h2>
        <p>
          Añade más contenido a continuación y verás cómo el negro absoluto sirve
          como escenario perfecto, permitiendo que las palabras cobren vida sobre
          el paisaje.
        </p>
      </section>
    </main>
  );
}
