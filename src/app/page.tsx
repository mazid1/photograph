import Gallery from "@/components/Gallery";
import { capitalize } from "@/lib/capitalize";
import { Metadata } from "next";

type HomeProps = {
  searchParams: {
    query: string;
  };
};

export function generateMetadata({ searchParams }: HomeProps): Metadata {
  const { query } = searchParams;
  let pageTitle = "Photograph";
  if (query) {
    pageTitle = `Search: ${capitalize(query)} | Photograph`;
  }
  return {
    title: { absolute: pageTitle },
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const { query } = searchParams;
  return <Gallery query={query} />;
}
