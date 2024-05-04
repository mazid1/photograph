import { getCuratedPhotos } from "@/lib/getCuratedPhotos";

export default async function Home() {
  const photos = await getCuratedPhotos();
  return <div>{JSON.stringify(photos, null, 2)}</div>;
}
