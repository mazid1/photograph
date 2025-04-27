import { fetchPhotos } from "@/actions/fetchPhotos";
import Gallery from "@/components/Gallery";

export default async function Home() {
	const pageResponse = await fetchPhotos({});
	return <Gallery initialPage={pageResponse} />;
}
