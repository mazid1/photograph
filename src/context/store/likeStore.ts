import type { Photo } from "@/models/Photo";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type LikeState = {
	liked: Record<number, Photo>;
};

export type LikeActions = {
	toggle: (photo: Photo) => void;
	reset: () => void;
	setLiked: (liked: Record<number, Photo>) => void;
};

export type LikeStore = LikeState & LikeActions;

export const initLikeStore = (): LikeState => {
	return { liked: {} };
};

export const defaultInitState: LikeState = { liked: {} };

export const createLikeStore = (initState: LikeState = defaultInitState) => {
	return create<LikeStore>()(
		immer((set) => ({
			...initState,
			toggle: (photo: Photo) =>
				set((state) => {
					if (state.liked[photo.id]) {
						delete state.liked[photo.id];
					} else {
						state.liked[photo.id] = photo;
					}
					return state;
				}),
			reset: () => set((state) => defaultInitState),
			setLiked: (liked: Record<number, Photo>) => set((state) => ({ liked })),
		})),
	);
};
