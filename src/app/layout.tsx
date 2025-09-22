import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.placeholder-agritech.com"),
  title: "[Meta_Title]",
  description: "[Meta_Description]",
  openGraph: {
    title: "[Meta_Title]",
    description: "[Meta_Description]",
    url: "https://www.placeholder-agritech.com",
    siteName: "[Meta_Title]",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/img/placeholder_og.svg",
        width: 1200,
        height: 630,
        alt: "[Alt_Imagen_1]",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[Meta_Title]",
    description: "[Meta_Description]",
    images: ["/img/placeholder_og.svg"],
  },
  alternates: {
    canonical: "https://www.placeholder-agritech.com",
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
