import Gallery from "@/components/Gallery";
import { fetchPhotos } from "@/lib/fetchPhotos";

export default async function Home() {
  const pageResponse = await fetchPhotos({});
  return <Gallery initialPage={pageResponse} />;
}
