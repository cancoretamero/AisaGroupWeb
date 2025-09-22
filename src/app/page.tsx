import Script from "next/script";
import placeholderPages from "@/data/placeholder-pages.json";
import { LandingPage } from "@/components/sections/LandingPage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { PlaceholderPage } from "@/types/placeholder";

export default function HomePage() {
  const initialPage = (placeholderPages.pages.find((page) => page.page === 1) ?? {
    page: 1,
    cases: [],
    posts: [],
    products: [],
  }) as PlaceholderPage;
  const hasMore = placeholderPages.pages.some((page) => page.page === 2);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "[Copy_Breve_94]",
    url: "https://www.placeholder-agritech.com",
    logo: "https://www.placeholder-agritech.com/svg/logo_placeholder_main.svg",
    sameAs: [
      "https://www.placeholder-social-1.com",
      "https://www.placeholder-social-2.com",
    ],
  };

  const productSchema = initialPage.products.slice(0, 3).map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: `https://www.placeholder-agritech.com/${product.image}`,
    brand: {
      "@type": "Brand",
      name: "[Copy_Breve_94]",
    },
  }));

  const blogSchema = initialPage.posts.map((post) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: `https://www.placeholder-agritech.com/${post.image}`,
    datePublished: "2024-01-01",
    author: {
      "@type": "Organization",
      name: "[Copy_Breve_94]",
    },
    publisher: {
      "@type": "Organization",
      name: "[Copy_Breve_94]",
      logo: {
        "@type": "ImageObject",
        url: "https://www.placeholder-agritech.com/svg/logo_placeholder_main.svg",
      },
    },
    description: post.excerpt,
  }));

  return (
    <>
      <Header />
      <main id="main" className="bg-bg">
        <LandingPage initialPage={{ ...initialPage, hasMore }} />
      </main>
      <Footer />
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-products"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    </>
  );
}
