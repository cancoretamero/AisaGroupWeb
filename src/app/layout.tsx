import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rurivo.com"),
  title: "Rurivo | Bring Fresh Growth to Agriculture",
  description:
    "Rurivo unifies precision sensing, climate intelligence, and automated field workflows to help ambitious growers scale sustainable performance.",
  openGraph: {
    title: "Rurivo | Bring Fresh Growth to Agriculture",
    description:
      "Explore Rurivo's agritech platform that blends sensor intelligence, regenerative practices, and human expertise for premium agricultural operations.",
    url: "https://www.rurivo.com",
    siteName: "Rurivo",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/img/placeholder_og.svg",
        width: 1200,
        height: 630,
        alt: "Aerial photograph of verdant agricultural fields under soft morning light",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rurivo | Bring Fresh Growth to Agriculture",
    description:
      "Discover how Rurivo orchestrates data, automation, and sustainability insights for modern growers.",
    images: ["/img/placeholder_og.svg"],
  },
  alternates: {
    canonical: "https://www.rurivo.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-bg text-ink antialiased">
        <a className="skip-link" href="#main">
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
