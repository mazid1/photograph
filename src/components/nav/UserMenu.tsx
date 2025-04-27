import { getInitials } from "@/lib/getInitials";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { MouseEvent } from "react";
import LogoutButton from "./LogoutButton";

type UserMenuProps = {
	name: string;
	email: string;
	image?: string;
};

type AvatarProps = {
	name: string;
	image?: string;
	tabIndex?: number;
	outerClassName?: string;
	innerClassName?: string;
	width?: number;
};

function Avatar({
	name,
	image,
	tabIndex,
	outerClassName,
	innerClassName,
	width = 48,
}: AvatarProps) {
	const initials = getInitials(name);

	return (
		<div
			className={cn("avatar placeholder flex", outerClassName)}
			tabIndex={tabIndex}
		>
			<div
				className={cn(
					"bg-neutral text-neutral-content rounded-full w-12",
					innerClassName,
				)}
			>
				{image ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={`/.netlify/images?url=${image}&fit=cover&position=center&w=${width}`}
						alt="avatar"
					/>
				) : (
					<span>{initials}</span>
				)}
			</div>
		</div>
	);
}

function UserMenu(props: UserMenuProps) {
	const { name, email, image } = props;

	const closeMenu = (event: MouseEvent<HTMLElement>) => {
		event.currentTarget?.blur();
	};

	return (
		<div className="dropdown dropdown-end">
			<Avatar
				name={name}
				image={image}
				tabIndex={0}
				outerClassName="hover:cursor-pointer"
			/>
			<ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box">
				<li>
					<Link
						href={"/profile"}
						className="flex flex-row gap-2"
						onClick={closeMenu}
					>
						<Avatar name={name} image={image} width={32} innerClassName="w-8" />
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
