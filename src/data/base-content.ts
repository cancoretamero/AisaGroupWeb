export type Benefit = {
  id: string;
  title: string;
  description: string;
};

export type Solution = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type Metric = {
  id: string;
  label: string;
  display: string;
  target: number;
  suffix?: string;
  prefix?: string;
};

export type EditorialTag = {
  id: string;
  label: string;
};

export const benefits: Benefit[] = [
  {
    id: "benefit-1",
    title: "[Copy_Breve_1]",
    description: "[Copy_Breve_2]",
  },
  {
    id: "benefit-2",
    title: "[Copy_Breve_3]",
    description: "[Copy_Breve_4]",
  },
  {
    id: "benefit-3",
    title: "[Copy_Breve_5]",
    description: "[Copy_Breve_6]",
  },
  {
    id: "benefit-4",
    title: "[Copy_Breve_7]",
    description: "[Copy_Breve_8]",
  },
];

export const solutions: Solution[] = [
  {
    id: "solution-1",
    title: "[H3_Solucion_1]",
    description: "[Copy_Breve_9]",
    image: "img/placeholder_29.svg",
  },
  {
    id: "solution-2",
    title: "[H3_Solucion_2]",
    description: "[Copy_Breve_10]",
    image: "img/placeholder_30.svg",
  },
  {
    id: "solution-3",
    title: "[H3_Solucion_3]",
    description: "[Copy_Breve_11]",
    image: "img/placeholder_31.svg",
  },
  {
    id: "solution-4",
    title: "[H3_Solucion_4]",
    description: "[Copy_Breve_12]",
    image: "img/placeholder_32.svg",
  },
];

export const metrics: Metric[] = [
  { id: "metric-1", label: "Años de experiencia", display: "[KPI_1]", target: 50, suffix: "+" },
  { id: "metric-2", label: "Campos en progreso", display: "[KPI_2]", target: 200, suffix: "+" },
  { id: "metric-3", label: "Agricultores", display: "[KPI_3]", target: 120000, suffix: "+" },
  { id: "metric-4", label: "Valor producido", display: "[KPI_4]", target: 15, prefix: "$", suffix: "B" },
];

export const editorialTags: EditorialTag[] = [
  { id: "tag-1", label: "Organic farm" },
  { id: "tag-2", label: "Automation farm" },
  { id: "tag-3", label: "Bio-medical farm" },
];
