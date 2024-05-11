import { MouseEvent } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getInitials } from "@/lib/getInitials";

type UserMenuProps = {
  name: string;
  email: string;
};

function UserMenu(props: UserMenuProps) {
  const { name, email } = props;
  const initials = getInitials(name);

  const closeMenu = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget?.blur();
  };

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
          <Link
            href={"/profile"}
            className="flex flex-row gap-2"
            onClick={closeMenu}
          >
            <div className="avatar placeholder flex">
              <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
                <span>{initials}</span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-md leading-4">{name}</div>
              <div className="text-xs leading-4">{email}</div>
            </div>
          </Link>
        </li>
        <div className="divider my-1" />
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
