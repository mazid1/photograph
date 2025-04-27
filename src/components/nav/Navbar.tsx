"use client";
import { useUserProfile } from "@/context/UserProfileProvider";
import Link from "next/link";
import AuthLinks from "./AuthLinks";
import Search from "./Search";

function Navbar() {
	const user = useUserProfile((store) => store.user);

	return (
		<header className="sticky top-0 z-10 bg-base-300">
			<nav className="navbar max-w-6xl mx-auto">
				<div className="navbar-start gap-2">
					<Link href={"/"} className="btn btn-ghost text-2xl">
						Photograph
					</Link>
					{user && (
						<Link href={"/liked"} className="link link-hover">
							Liked
						</Link>
					)}
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
