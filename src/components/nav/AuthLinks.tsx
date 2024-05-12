"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import UserMenu from "./UserMenu";

function AuthLinks() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <UserMenu
        name={session.user.name!}
        email={session.user.email!}
        image={session.user.image || undefined}
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
