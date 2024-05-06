"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function Search() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      router.push(`/search/${query}`);
    }
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-control">
      <input
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto"
      />
    </form>
  );
}

export default Search;
