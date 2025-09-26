import PlaceholderPage from "../../components/PlaceholderPage";

export const metadata = {
  title: "Somos AISA"
};

const sections = [
  { id: "historia", title: "Historia" },
  { id: "propiedad", title: "Propiedad familiar" },
  { id: "valores", title: "Valores & excelencia" },
  { id: "equipo", title: "Equipo directivo" },
  { id: "estructura", title: "Estructura corporativa" },
  { id: "etica", title: "Ética & cumplimiento" }
];

export default function SomosPage() {
  return (
    <PlaceholderPage
      title="Somos AISA"
      description="Contenido detallado sobre nuestra historia, principios de gobierno y liderazgo corporativo estará disponible próximamente."
    >
      <div className="placeholder-subsections">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="anchor-offset placeholder-section">
            <h2>{section.title}</h2>
            <p>Estamos preparando material completo para esta sección.</p>
          </section>
        ))}
      </div>
    </PlaceholderPage>
  );
}
