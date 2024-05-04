import { redirect } from "next/navigation";

async function Search() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const query = formData.get("query") as string;
    if (!query) return;
    redirect(`?query=${query}`);
  };

  return (
    <form action={handleSubmit} className="form-control">
      <input
        name="query"
        type="text"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto"
      />
    </form>
  );
}

export default Search;
