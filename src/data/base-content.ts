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
  summary: string;
};

export type EditorialTag = {
  id: string;
  label: string;
};

export const benefits: Benefit[] = [
  {
    id: "benefit-1",
    title: "Unified intelligence",
    description:
      "Stream satellite imagery, drone captures, and soil sensor data into a single command centre for rapid agronomic decisions.",
  },
  {
    id: "benefit-2",
    title: "Adaptive automations",
    description:
      "Trigger irrigation, feeding, and crop-protection sequences with precision scheduling tuned to each microclimate.",
  },
  {
    id: "benefit-3",
    title: "Regenerative compliance",
    description:
      "Document carbon, biodiversity, and stewardship indicators with audit-ready evidence for every stakeholder.",
  },
  {
    id: "benefit-4",
    title: "Guided collaboration",
    description:
      "Coordinate agronomists, field teams, and partners with contextual insights and real-time playbooks.",
  },
];

export const solutions: Solution[] = [
  {
    id: "solution-1",
    title: "Farming Precision OS",
    description:
      "Live agronomic twins harmonise soil telemetry, crop models, and automation triggers to orchestrate every season.",
    image: "img/placeholder_29.svg",
  },
  {
    id: "solution-2",
    title: "Crop Surveillance Cloud",
    description:
      "Drones and sensor towers deliver proactive crop health scoring with predictive alerts before issues escalate.",
    image: "img/placeholder_30.svg",
  },
  {
    id: "solution-3",
    title: "Autonomous Field Crew",
    description:
      "Robotics, guided vehicles, and machine vision coordinate field work with centimetre precision and safety.",
    image: "img/placeholder_31.svg",
  },
  {
    id: "solution-4",
    title: "Supply Intelligence Hub",
    description:
      "Forecast demand, trace inputs, and manage fulfilment networks while maintaining total transparency.",
    image: "img/placeholder_32.svg",
  },
];

export const metrics: Metric[] = [
  {
    id: "metric-1",
    label: "Years of excellence",
    display: "50+",
    target: 50,
    suffix: "+",
    summary: "Decades of agronomic, climate, and data science expertise driving measurable outcomes.",
  },
  {
    id: "metric-2",
    label: "Fields in progress",
    display: "200+",
    target: 200,
    suffix: "+",
    summary: "Active estates orchestrated simultaneously with precision workflows across continents.",
  },
  {
    id: "metric-3",
    label: "Growers empowered",
    display: "120,000+",
    target: 120000,
    suffix: "+",
    summary: "Producers receiving live guidance through the Rurivo collaborative intelligence network.",
  },
  {
    id: "metric-4",
    label: "Value generated",
    display: "$15B",
    target: 15,
    prefix: "$",
    suffix: "B",
    summary: "Documented value in yield optimisation, input savings, and carbon programmes to date.",
  },
];

export const editorialTags: EditorialTag[] = [
  { id: "tag-1", label: "Organic farm" },
  { id: "tag-2", label: "Automation farm" },
  { id: "tag-3", label: "Bio-medical farm" },
];
