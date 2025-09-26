import PlaceholderPage from "../../components/PlaceholderPage";
import homeContent from "../../content/home.en.json";

export const metadata = {
  title: "AISA Group"
};

export default function HomeEnPage() {
  return (
    <PlaceholderPage
      title={homeContent.hero.headline}
      description="The English experience is under construction. Please switch back to Spanish while we finalise this content."
    />
  );
}
