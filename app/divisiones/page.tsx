import Link from "next/link";
import type { Route } from "next";
import PlaceholderPage from "../../components/PlaceholderPage";

export const metadata = {
  title: "Divisiones"
};

const divisions: Array<{ title: string; href: Route<string> }> = [
  { title: "Minería", href: "/divisiones/mineria" },
  { title: "Energías renovables", href: "/divisiones/energia" },
  { title: "Pesca & mariscos", href: "/divisiones/pesca-mariscos" },
  { title: "Carne", href: "/divisiones/carne" },
  { title: "Productos agrícolas", href: "/divisiones/agro" },
  { title: "Real estate", href: "/divisiones/real-estate" }
];

export default function DivisionesPage() {
  return (
    <PlaceholderPage
      title="Divisiones"
      description="Explora el portfolio multisector del grupo. Cada división contará con fichas detalladas, indicadores y casos de estudio."
    >
      <div className="placeholder-subsections">
        {divisions.map((division) => (
          <section key={division.href} className="placeholder-section">
            <h2>{division.title}</h2>
            <p>Actualizaremos la información de esta división en breve.</p>
            <Link href={division.href} className="link-cta">
              Abrir división
            </Link>
          </section>
        ))}
      </div>
    </PlaceholderPage>
  );
}
