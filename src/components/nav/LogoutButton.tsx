"use client";
import { useLikeStore } from "@/context/LikeStoreProvider";
import { useUserProfile } from "@/context/UserProfileProvider";
import { signOut } from "next-auth/react";

function LogoutButton() {
	const reset = useLikeStore((store) => store.reset);
	const resetUserProfile = useUserProfile((store) => store.resetUserProfile);
	const handleLogout = async () => {
		await signOut({
			callbackUrl: "/",
		});
		reset();
		resetUserProfile();
	};
	return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
