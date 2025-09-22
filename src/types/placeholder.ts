import type { CaseStudy } from "@/components/sections/CaseCarousel";
import type { BlogPost } from "@/components/sections/BlogGrid";
import type { ExtendedSolution } from "@/components/sections/SolutionsGrid";

export type PlaceholderPage = {
  page: number;
  cases: CaseStudy[];
  posts: BlogPost[];
  products: ExtendedSolution[];
  hasMore?: boolean;
};
