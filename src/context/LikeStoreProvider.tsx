"use client";
import { getLikedPhotos } from "@/actions/getLikedPhotos";
import { useSession } from "next-auth/react";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useRef,
} from "react";
import { type StoreApi, useStore } from "zustand";
import { type LikeStore, createLikeStore } from "./store/likeStore";

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
