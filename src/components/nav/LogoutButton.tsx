"use client";
import { useLikeStore } from "@/store/likeStoreProvider";
import { signOut } from "next-auth/react";

function LogoutButton() {
  const reset = useLikeStore((store) => store.reset);
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
    reset();
  };
  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
