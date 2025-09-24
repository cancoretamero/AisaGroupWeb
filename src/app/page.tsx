import Image from "next/image";

const highlightCards = [
  {
    eyebrow: "Highlight",
    title: "When moments captured transform into beautiful reality",
    description:
      "We translate every shutter click into narratives that feel timeless and deeply intimate.",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=80",
    accent: "#3b5048",
  },
  {
    eyebrow: "Landscape",
    title: "The calm poetry inside every untouched horizon",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    accent: "#2f3f44",
  },
];

const portfolioCards = [
  {
    category: "Wildlife",
    title: "Stories of patience in the heart of the wilderness",
    image:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "Portraits",
    title: "Faces that reveal the elegance of vulnerability",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "Editorial",
    title: "Compositions designed to elevate brand narratives",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
];

const journalEntries = [
  {
    title: "Explore the artistry and precision within our portfolio of timeless photography",
    description:
      "Each project balances light, composition, and emotional truth to craft memories that remain unforgettable.",
    cta: "Discover stories",
  },
  {
    title: "How we prepare for photography expeditions in remote destinations",
    description:
      "Meticulous planning and respect for the landscape allow us to capture genuine beauty without leaving a trace.",
    cta: "Read the guide",
  },
];

const milestones = [
  { year: "2017", text: "First solo exhibition with 40 curated frames" },
  { year: "2019", text: "Awarded Emerging Artist Prize for storytelling" },
  { year: "2021", text: "Opened our studio for bespoke portrait sessions" },
  { year: "2023", text: "Recognised globally for dedication to innovation and excellence" },
];

export default function HomePage() {
  return (
    <main id="main" className="page">
      <div className="shell">
        <header className="site-header">
          <div className="brand-mark" aria-hidden>
            <span>N</span>
          </div>
          <nav aria-label="Primary" className="nav-links">
            <a href="#portfolio">Portfolio</a>
            <a href="#services">Services</a>
            <a href="#journal">Journal</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="cta-secondary" type="button">
            Book a session
          </button>
        </header>

        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow">Photography studio</p>
            <h1 id="hero-heading">
              Capturing beautiful moments inside lens and shutterspeed
            </h1>
            <p className="lead">
              Photography is driven by a deep need to freeze captivating life
              in their precious moments and the rest is a touch of magic.
            </p>
            <div className="hero-actions">
              <button className="cta-primary" type="button">
                Start your story
              </button>
              <button className="cta-tertiary" type="button">
                View portfolio
              </button>
            </div>
            <dl className="metrics" aria-label="Studio highlights">
              <div>
                <dt>18k+</dt>
                <dd>Moments preserved</dd>
              </div>
              <div>
                <dt>12</dt>
                <dd>Years of mastery</dd>
              </div>
              <div>
                <dt>64</dt>
                <dd>International features</dd>
              </div>
            </dl>
          </div>
          <div className="hero-visual">
            <figure>
              <Image
                src="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=900&q=80"
                alt="Photographer standing in a dramatic mountain landscape"
                width={900}
                height={1125}
                sizes="(max-width: 1100px) 100vw, 50vw"
                className="hero-image"
              />
              <figcaption>
                A portrait series framed by the gentle glow of golden hour.
              </figcaption>
            </figure>
            <div className="hero-note">
              Photography is a craft of intuition, patience, and empathy—our
              studio nurtures all three.
            </div>
          </div>
        </section>
      </div>

      <section className="section" id="services">
        <div className="shell">
          <div className="section-grid">
            {highlightCards.map((card) => (
              <article
                key={card.title}
                className="highlight-card"
                style={{ backgroundColor: card.accent }}
              >
                <div className="highlight-content">
                  <p className="eyebrow">{card.eyebrow}</p>
                  <h2>{card.title}</h2>
                  {card.description ? <p>{card.description}</p> : null}
                  {card.description ? (
                    <button className="card-link" type="button">
                      Learn more
                    </button>
                  ) : null}
                </div>
                <div className="highlight-media">
                  <Image
                    src={card.image}
                    alt=""
                    width={540}
                    height={640}
                    sizes="(max-width: 1100px) 100vw, 50vw"
                    className="media-image"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="portfolio">
        <div className="shell">
          <header className="section-heading">
            <p className="eyebrow">Portfolio</p>
            <h2>Explore the artistry and precision within our photography</h2>
            <p>
              From the stillness of remote peaks to the energy of modern cities,
              we interpret light to celebrate the heart of every story.
            </p>
          </header>
          <div className="portfolio-grid">
            {portfolioCards.map((card) => (
              <article key={card.title} className="portfolio-card">
                <div className="portfolio-media">
                  <Image
                    src={card.image}
                    alt=""
                    width={480}
                    height={640}
                    sizes="(max-width: 1100px) 100vw, 33vw"
                    className="media-image"
                  />
                </div>
                <div className="portfolio-content">
                  <p className="eyebrow">{card.category}</p>
                  <h3>{card.title}</h3>
                  <button className="card-link" type="button">
                    View collection
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="journal">
        <div className="shell journal">
          {journalEntries.map((entry) => (
            <article key={entry.title} className="journal-card">
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
              <button className="card-link" type="button">
                {entry.cta}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="milestones-heading">
        <div className="shell">
          <header className="section-heading">
            <p className="eyebrow">Award</p>
            <h2 id="milestones-heading">
              A studio that reflects unwavering dedication, innovation and
              excellence
            </h2>
            <p>
              Every accolade reminds us to keep listening to the subtle
              choreography between subject and environment.
            </p>
          </header>
          <div className="timeline">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <p>{milestone.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="contact">
        <div className="shell cta-card">
          <div>
            <p className="eyebrow">Let&apos;s craft</p>
            <h2>Discover your vision with us</h2>
          </div>
          <button className="cta-primary" type="button">
            Schedule a consultation
          </button>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-shell">
          <div className="brand-mark" aria-hidden>
            <span>N</span>
          </div>
          <div className="footer-links">
            <a href="#portfolio">Portfolio</a>
            <a href="#services">Services</a>
            <a href="#journal">Journal</a>
            <a href="#contact">Contact</a>
          </div>
          <p className="footer-note">© {new Date().getFullYear()} Shutterspeed Studio</p>
        </div>
      </footer>
    </main>
  );
}
