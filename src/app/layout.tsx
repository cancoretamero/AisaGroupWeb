import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shutterspeed-studio.com"),
  title: "Shutterspeed Studio",
  description:
    "Photography portfolio that captures the poetry of fleeting moments through landscapes, portraits and wildlife.",
  openGraph: {
    title: "Shutterspeed Studio",
    description:
      "Photography portfolio that captures the poetry of fleeting moments through landscapes, portraits and wildlife.",
    url: "https://shutterspeed-studio.com",
    siteName: "Shutterspeed Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Mountain landscape during golden hour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shutterspeed Studio",
    description:
      "Photography portfolio that captures the poetry of fleeting moments through landscapes, portraits and wildlife.",
    images: [
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  alternates: {
    canonical: "https://shutterspeed-studio.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
