import Link from "next/link";
import Search from "./Search";
import AuthLinks from "./AuthLinks";

function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-base-300">
      <nav className="navbar max-w-6xl mx-auto">
        <div className="navbar-start">
          <Link href={"/"} className="btn btn-ghost text-xl">
            Photograph
          </Link>
        </div>
        <div className="navbar-end gap-2">
          <Search />
          <AuthLinks />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
