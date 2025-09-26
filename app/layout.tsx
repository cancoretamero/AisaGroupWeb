import type { Metadata } from "next";
import Header from "../components/Header";
import HeroDepth from "../components/HeroDepth";
import { poppins } from "../styles/fonts";
import "../styles/globals.css";

const siteName = "AISA Group";
const siteUrl = "https://aisagroup.ca";

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  sameAs: [
    'https://www.linkedin.com/company/aisa-group/'
  ],
  description:
    'Grupo empresarial familiar con operaciones en minería, energías renovables, alimentos y real estate.'
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
  inLanguage: 'es'
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: `${siteUrl}/`
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Divisiones',
      item: `${siteUrl}/divisiones/`
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Proyectos',
      item: `${siteUrl}/proyectos/`
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Valor sostenible multisectorial`,
    template: `%s | ${siteName}`
  },
  description:
    'Grupo familiar diversificado que desarrolla minería responsable, energía solar, producción de alimentos y proyectos inmobiliarios con impacto sostenible.',
  alternates: {
    canonical: '/',
    languages: {
      es: '/',
      en: '/en'
    }
  },
  openGraph: {
    title: `${siteName} | Valor sostenible multisectorial`,
    description:
      'Grupo familiar diversificado que desarrolla minería responsable, energía solar, producción de alimentos y proyectos inmobiliarios con impacto sostenible.',
    url: siteUrl,
    siteName,
    locale: 'es_ES',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Valor sostenible multisectorial`,
    description:
      'Grupo familiar diversificado que desarrolla minería responsable, energía solar, producción de alimentos y proyectos inmobiliarios con impacto sostenible.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" as="image" href="/hero/montanas.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd, breadcrumbJsonLd])
          }}
        />
      </head>
      <body className={`${poppins.className} ${poppins.variable}`}>
        <div className="global-background" aria-hidden="true">
          <HeroDepth
            imageSrc="/hero/montanas.jpg"
            depthSrc="/hero/montanas-depth.png"
            strength={0.06}
            fadeStart={0.72}
          />
          <div className="background-fade" />
        </div>
        <Header />
        <main className="page-wrapper">{children}</main>
      </body>
    </html>
  );
}
