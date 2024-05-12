"use client";
import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
} from "react";
import { type StoreApi, useStore } from "zustand";
import { LikeStore, createLikeStore } from "./store/likeStore";
import { getLikedPhotos } from "@/actions/getLikedPhotos";
import { useSession } from "next-auth/react";

export const LikeStoreContext = createContext<StoreApi<LikeStore> | null>(null);

export interface LikeStoreProviderProps {
  children: ReactNode;
}

export const LikeStoreProvider = ({ children }: LikeStoreProviderProps) => {
  const storeRef = useRef<StoreApi<LikeStore>>();
  const { status } = useSession();

  useEffect(() => {
    const fetchLikedPhotos = async () => {
      const response = await getLikedPhotos();
      if (response.success) {
        if (storeRef.current) {
          storeRef.current.setState({ liked: response.data! });
        } else {
          storeRef.current = createLikeStore({ liked: response.data! });
        }
      } else {
        if (storeRef.current) {
          storeRef.current.setState({ liked: {} });
        } else {
          storeRef.current = createLikeStore();
        }
      }
    };
    fetchLikedPhotos();
  }, [status]);

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
