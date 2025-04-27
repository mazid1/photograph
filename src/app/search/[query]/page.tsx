import { fetchPhotos } from "@/actions/fetchPhotos";
import Gallery from "@/components/Gallery";

type SearchProps = {
	params: {
		query: string;
	};
};

async function Search({ params: { query } }: SearchProps) {
	const pageResponse = await fetchPhotos({ query });
	return <Gallery initialPage={pageResponse} />;
}

export default Search;
