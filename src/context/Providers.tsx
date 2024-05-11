"use client";
import { PropsWithChildren } from "react";
import { ModalContextProvider } from "./ModalContext";
import NextAuthProvider from "./NextAuthProvider";
import { LikeStoreProvider } from "@/store/likeStoreProvider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <NextAuthProvider>
      <LikeStoreProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </LikeStoreProvider>
    </NextAuthProvider>
  );
}
