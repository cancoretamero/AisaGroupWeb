import { ReactNode } from "react";

type PlaceholderPageProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function PlaceholderPage({ title, description, children }: PlaceholderPageProps) {
  return (
    <section className="placeholder-page" aria-labelledby="placeholder-title">
      <div className="layout-grid">
        <div className="placeholder-page__content">
          <h1 id="placeholder-title">{title}</h1>
          {description && <p>{description}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
