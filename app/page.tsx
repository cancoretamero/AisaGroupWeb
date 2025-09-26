import Link from "next/link";
import type { Route } from "next";
import type { UrlObject } from "url";
import homeContent from "../content/home.es.json";
import ProjectSlider from "../components/home/ProjectSlider";
import NewsCarousel from "../components/home/NewsCarousel";

const heroBadges = [
  {
    text: "51 MWp en obra · 110 GWh/año · 80k hogares (Parque FV Calicanto, San Luis).",
    source: "Renewables Now"
  },
  {
    text: "Plan solar 800 MW–1 GW en Argentina (pipeline a 10 años).",
    source: "aisagroup.ca"
  },
  {
    text: "DCP Gualcamayo: 120k oz/año × 17 años (factibilidad/obras previstas).",
    source: "aisagroup.ca"
  },
  {
    text: "Inversión del grupo en AR > USD 1.6bn (multisector).",
    source: "Renewables Now"
  }
];

const toHref = (href: string): Route<string> | UrlObject => {
  if (href.includes("#")) {
    const [pathname, hash] = href.split("#");
    return { pathname: pathname || "/", hash };
  }
  return href as Route<string>;
};

export default function HomePage() {
  const { hero, quienesSomos, queHacemos, impacto, proyectos, noticias } = homeContent;

  return (
    <main>
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="layout-grid home-hero__grid">
          <p className="home-hero__display" aria-hidden="true">
            {hero.display}
          </p>
          <div className="home-hero__badges" aria-label="Indicadores destacados">
            {heroBadges.map((badge) => (
              <article key={badge.text} className="home-hero__badge">
                <p>{badge.text}</p>
                <cite>{badge.source}</cite>
              </article>
            ))}
          </div>
          <div className="home-hero__content">
            <p className="home-hero__eyebrow">Grupo multilatino</p>
            <h1 id="hero-title" className="home-hero__headline">
              {hero.headline}
            </h1>
            <p className="home-hero__subtitle">{hero.subtitle}</p>
            <div className="home-hero__ctas">
              <Link className="btn-primary" href={toHref(hero.ctaPrimary.href)}>
                {hero.ctaPrimary.label}
              </Link>
              <Link className="btn-secondary" href={toHref(hero.ctaSecondary.href)}>
                {hero.ctaSecondary.label}
              </Link>
            </div>
          </div>
        </div>
        <p className="home-hero__microcopy">Grupo familiar con base en Canadá (ES/EN)</p>
      </section>

      <section id="somos" className="section anchor-offset" aria-labelledby="somos-title">
        <div className="layout-grid section__inner">
          <div className="section__heading">
            <h2 id="somos-title">{quienesSomos.title}</h2>
            <p>{quienesSomos.description}</p>
          </div>
        </div>
      </section>

      <section id="divisiones" className="section anchor-offset" aria-labelledby="divisiones-title">
        <div className="layout-grid section__inner">
          <div className="section__heading">
            <h2 id="divisiones-title">{queHacemos.title}</h2>
            <p>Portafolio multisector con operaciones en minería, energía, alimentos y real estate.</p>
          </div>
          <div className="card-grid">
            {queHacemos.cards.map((card) => (
              <Link key={card.title} href={toHref(card.href)} className="card">
                <span className="card__kpi">{card.kpi}</span>
                <h3 className="card__title">{card.title}</h3>
                <p className="card__body">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="impacto" className="section" aria-labelledby="impacto-title">
        <div className="layout-grid section__inner">
          <div className="section__heading">
            <h2 id="impacto-title">{impacto.title}</h2>
            <p>Indicadores clave que guían nuestro desempeño sostenible y compromiso de largo plazo.</p>
          </div>
          <div className="impact-grid">
            {impacto.items.map((item) => (
              <article key={item.label} className="impact-card">
                <p className="impact-card__value">
                  {item.value}
                  <span aria-hidden="true"> {item.suffix}</span>
                </p>
                <p className="impact-card__label">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos" className="section anchor-offset" aria-labelledby="proyectos-title">
        <div className="layout-grid section__inner">
          <div className="section__heading">
            <h2 id="proyectos-title">{proyectos.title}</h2>
            <p>Iniciativas estratégicas en ejecución que combinan innovación, impacto y crecimiento regional.</p>
          </div>
          <ProjectSlider items={proyectos.items} intervalMs={7000} />
        </div>
      </section>

      <section id="noticias" className="section anchor-offset" aria-labelledby="noticias-title">
        <div className="layout-grid section__inner">
          <div className="section__heading">
            <h2 id="noticias-title">{noticias.title}</h2>
            <p>Actualizaciones corporativas, notas y recursos de prensa sobre nuestras divisiones.</p>
          </div>
          <NewsCarousel items={noticias.items} intervalMs={7000} />
        </div>
      </section>

      <footer>
        <div className="layout-grid">
          <p>&copy; {new Date().getFullYear()} AISA Group. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
