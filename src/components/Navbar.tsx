import Link from "next/link";
import Search from "./Search";

function Navbar() {
  return (
    <nav className="sticky top-0 bg-base-300">
      <div className="navbar max-w-6xl mx-auto">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl">
            Photograph
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Search />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
