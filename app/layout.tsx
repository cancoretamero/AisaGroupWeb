import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Montañas en profundidad",
  description: "Hero interactivo con efecto 3D y transición a negro"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" as="image" href="/hero/montanas.jpg" />
      </head>
      <body>
        <div className="global-background" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
