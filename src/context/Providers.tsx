"use client";
import { PropsWithChildren } from "react";
import { ModalContextProvider } from "./ModalContext";
import NextAuthProvider from "./NextAuthProvider";
import { LikeStoreProvider } from "@/store/likeStoreProvider";
import { UserProfileProvider } from "@/store/UserProfileProvider";

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
