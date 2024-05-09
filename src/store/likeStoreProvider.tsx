"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";
import { LikeStore, createLikeStore } from "./likeStore";

export const LikeStoreContext = createContext<StoreApi<LikeStore> | null>(null);

export interface LikeStoreProviderProps {
  children: ReactNode;
}

export const LikeStoreProvider = ({ children }: LikeStoreProviderProps) => {
  const storeRef = useRef<StoreApi<LikeStore>>();
  if (!storeRef.current) {
    storeRef.current = createLikeStore();
  }

  return (
    <LikeStoreContext.Provider value={storeRef.current}>
      {children}
    </LikeStoreContext.Provider>
  );
};

export const useLikeStore = <T,>(selector: (store: LikeStore) => T): T => {
  const likeStoreContext = useContext(LikeStoreContext);

  if (!likeStoreContext) {
    throw new Error("useLikeStore must be use within LikeStoreProvider");
  }

  return useStore(likeStoreContext, selector);
};
