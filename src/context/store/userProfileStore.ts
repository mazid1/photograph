import type { UserProfile } from "@/models/User";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type UserProfileState = {
	user: UserProfile | null;
};

type UserProfileActions = {
	setUserProfile: (user: UserProfile) => void;
	setUserProfileImage: (image: string) => void;
	resetUserProfile: () => void;
};

export type UserProfileStore = UserProfileState & UserProfileActions;

export const initUserProfileStore = (): UserProfileState => {
	return { user: null };
};

export const defaultInitState: UserProfileState = { user: null };

export const createUserProfileStore = (
	initState: UserProfileState = defaultInitState,
) => {
	return create<UserProfileStore>()(
		immer((set) => ({
			...initState,
			setUserProfile: (user: UserProfile) => set((state) => ({ user })),
			setUserProfileImage: (image: string) =>
				set((state) => {
					if (state.user) {
						state.user.image = image;
					}
					return state;
				}),
			resetUserProfile: () => set((state) => defaultInitState),
		})),
	);
};
