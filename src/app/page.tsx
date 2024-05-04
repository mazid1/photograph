import Gallery from "@/components/Gallery";
import { capitalize } from "@/lib/capitalize";
import { Metadata } from "next";

type HomeProps = {
  searchParams: {
    query: string;
    page: number;
  };
};

export function generateMetadata({ searchParams }: HomeProps): Metadata {
  const { query, page = 1 } = searchParams;
  let pageTitle = "Photograph";
  if (query) {
    pageTitle = `${capitalize(query)} - Page ${page} | Photograph`;
  }
  return {
    title: { absolute: pageTitle },
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const { query, page } = searchParams;
  return <Gallery query={query} page={page} />;
}
