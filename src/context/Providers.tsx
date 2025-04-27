"use client";
import { LikeStoreProvider } from "@/context/LikeStoreProvider";
import { UserProfileProvider } from "@/context/UserProfileProvider";
import type { PropsWithChildren } from "react";
import { ModalContextProvider } from "./ModalContext";
import NextAuthProvider from "./NextAuthProvider";

export function Providers({ children }: PropsWithChildren) {
	return (
		<NextAuthProvider>
			<UserProfileProvider>
				<LikeStoreProvider>
					<ModalContextProvider>{children}</ModalContextProvider>
				</LikeStoreProvider>
			</UserProfileProvider>
		</NextAuthProvider>
	);
}
