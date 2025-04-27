"use client";

import { useUserProfile } from "@/context/UserProfileProvider";
import Link from "next/link";
import UserMenu from "./UserMenu";

function AuthLinks() {
	const user = useUserProfile((store) => store.user);

	if (user) {
		return (
			<UserMenu
				name={user.name!}
				email={user.email!}
				image={user.image || undefined}
			/>
		);
	}

	return (
		<ul className="menu menu-horizontal flex-nowrap gap-2 p-0">
			<li>
				<Link href="/login" className="btn btn-primary btn-outline normal-case">
					Login
				</Link>
			</li>
			<li>
				<Link href="/register" className="btn btn-primary normal-case">
					Register
				</Link>
			</li>
		</ul>
	);
}

export default AuthLinks;
