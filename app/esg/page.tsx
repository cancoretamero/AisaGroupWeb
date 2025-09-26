import PlaceholderPage from "../../components/PlaceholderPage";

export const metadata = {
  title: "Sostenibilidad"
};

const topics = [
  { id: "politica", title: "Política ESG" },
  { id: "metas", title: "Metas & Reportes" },
  { id: "seguridad", title: "Seguridad & Salud" },
  { id: "comunidades", title: "Comunidades" },
  { id: "gobernanza", title: "Gobernanza" }
];

export default function ESGPage() {
  return (
    <PlaceholderPage
      title="Sostenibilidad"
      description="Próximamente publicaremos nuestra política ESG, métricas de desempeño y programas con comunidades."
    >
      <div className="placeholder-subsections">
        {topics.map((topic) => (
          <section key={topic.id} id={topic.id} className="anchor-offset placeholder-section">
            <h2>{topic.title}</h2>
            <p>Contenido en desarrollo para este eje estratégico.</p>
          </section>
        ))}
      </div>
    </PlaceholderPage>
  );
}
