import placeholderPages from "@/data/placeholder-pages.json";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type PlaceholderPage = (typeof placeholderPages)["pages"][number];

type PlaceholderResponse = PlaceholderPage & { hasMore: boolean };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageParam = searchParams.get("page") ?? "1";
  const pageNumber = Number.parseInt(pageParam, 10);

  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    return new Response(
      JSON.stringify({ message: "Invalid page" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  await delay(450);

  const pageData = placeholderPages.pages.find((page) => page.page === pageNumber);

  const hasMore = placeholderPages.pages.some((page) => page.page === pageNumber + 1);

  const payload: PlaceholderResponse = {
    page: pageNumber,
    cases: pageData?.cases ?? [],
    posts: pageData?.posts ?? [],
    products: pageData?.products ?? [],
    hasMore,
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
