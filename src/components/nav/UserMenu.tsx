import { signOut } from "next-auth/react";
import React from "react";

type UserMenuProps = {
  name: string;
  email: string;
};

function UserMenu(props: UserMenuProps) {
  const { name, email } = props;
  const initials = name.split(" ").reduce((s, curr) => s + curr[0], "");

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        className="avatar placeholder flex hover:cursor-pointer"
      >
        <div className="bg-neutral text-neutral-content rounded-full w-12">
          <span>{initials}</span>
        </div>
      </div>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box">
        <li>
          <div className="flex flex-row gap-2">
            <div className="avatar placeholder flex">
              <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
                <span>{initials}</span>
              </div>
            </div>
            <button className="flex flex-col items-start">
              <div className="text-md leading-4">{name}</div>
              <div className="text-xs leading-4">{email}</div>
            </button>
          </div>
        </li>
        <div className="divider my-1" />
        <li>
          <button onClick={() => signOut()}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
