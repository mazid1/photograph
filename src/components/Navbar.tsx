import Link from "next/link";
import Search from "./Search";

function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-base-300">
      <nav className="navbar max-w-6xl mx-auto">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl">
            Photograph
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Search />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
