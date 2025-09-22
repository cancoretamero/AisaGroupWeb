const descriptiveAlts: Record<string, string> = {
  "img/hero_placeholder.svg": "Aerial panorama of regenerative crops shaped into soft terraces",
  "img/placeholder_og.svg": "Stylised overhead of farmland representing the Rurivo platform",
  "img/placeholder_1.svg": "Schematic of irrigation channels and soil data overlays",
  "img/placeholder_2.svg": "Agronomists reviewing sensor dashboards in the field",
  "img/placeholder_3.svg": "Drone capturing multispectral imagery above crops",
  "img/placeholder_4.svg": "Technician calibrating greenhouse automation panels",
  "img/placeholder_5.svg": "Editorial collage of cultivated land and analytics charts",
  "img/placeholder_6.svg": "Close-up of seedlings illuminated by greenhouse lighting",
  "img/placeholder_7.svg": "Farm manager using a tablet while surveying crops",
  "img/placeholder_8.svg": "Topographic illustration of nutrient zones",
  "img/placeholder_9.svg": "Illustrated crop canopy with climate annotations",
  "img/placeholder_10.svg": "Automation robots tending vertical farming rows",
  "img/placeholder_11.svg": "Irrigation equipment optimising water flow",
  "img/placeholder_12.svg": "Solar-powered agritech installation on open fields",
  "img/placeholder_13.svg": "Team collaborating inside a smart farm operations room",
  "img/placeholder_14.svg": "Magazine style layout about sustainable agriculture",
  "img/placeholder_15.svg": "Scientist analysing soil samples in a laboratory",
  "img/placeholder_16.svg": "Farm logistics vehicles transporting harvest",
  "img/placeholder_17.svg": "Autonomous tractor navigating crop rows",
  "img/placeholder_18.svg": "Satellite imagery of continental crop coverage",
  "img/placeholder_19.svg": "Compost and bio-input preparation on-site",
  "img/placeholder_20.svg": "Agritech team celebrating production milestones",
  "img/placeholder_21.svg": "Vertical farm with controlled-environment lighting",
  "img/placeholder_22.svg": "Sensor-laden irrigation pivots in operation",
  "img/placeholder_23.svg": "High-level view of rotational cropping patterns",
  "img/placeholder_24.svg": "Collage of agri-tech investors and partners",
  "img/placeholder_25.svg": "Greenhouse interior with data overlays",
  "img/placeholder_26.svg": "Biotech engineer inspecting seedlings",
  "img/placeholder_27.svg": "Supply chain monitoring dashboard for produce",
  "img/placeholder_28.svg": "Organic produce displayed for market readiness",
  "img/placeholder_29.svg": "Precision farming console with climate insights",
  "img/placeholder_30.svg": "Crop surveillance towers across expansive fields",
  "img/placeholder_31.svg": "Automated farming robots tending rows",
  "img/placeholder_32.svg": "Supply intelligence visual showing distribution routes",
  "img/placeholder_33.svg": "Panoramic photo of lush green hills at sunrise",
};

export function getAltFromPath(path: string) {
  const cleaned = path.replace(/^\/+/, "");
  const alt = descriptiveAlts[cleaned];
  if (alt) {
    return alt;
  }

  if (cleaned.includes("logo_placeholder_main")) {
    return "Logotipo principal de Rurivo";
  }

  if (cleaned.includes("logo_placeholder")) {
    const match = cleaned.match(/logo_placeholder_(\d+)/);
    return match ? `Isotipo del socio ${match[1]} del ecosistema Rurivo` : "Isotipo de socio de Rurivo";
  }

  if (cleaned.includes("placeholder")) {
    const match = cleaned.match(/placeholder_(\d+)/);
    return match
      ? `Ilustración conceptual de agricultura inteligente ${match[1]}`
      : "Ilustración conceptual de agricultura inteligente";
  }

  if (cleaned.includes("hero")) {
    return "Aerial view of sustainable farmland";
  }

  return "Ilustración relacionada con la plataforma agritech Rurivo";
}
