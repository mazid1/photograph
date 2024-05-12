import { UserProfile } from "@/models/User";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StoreApi, useStore } from "zustand";
import {
  UserProfileStore,
  createUserProfileStore,
} from "./store/userProfileStore";
import { useSession } from "next-auth/react";

// Create a context for the user profile
const UserProfileContext = createContext<StoreApi<UserProfileStore> | null>(
  null
);

// Create a provider component for the user profile
export const UserProfileProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreApi<UserProfileStore>>();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      if (storeRef.current) {
        storeRef.current.setState({ user: session.user as UserProfile });
      } else {
        storeRef.current = createUserProfileStore({
          user: session.user as UserProfile,
        });
      }
    }
  }, [session]);

  // Define any additional functions or state related to the user profile
  if (!storeRef.current) {
    storeRef.current = createUserProfileStore();
  }

  return (
    <UserProfileContext.Provider value={storeRef.current}>
      {children}
    </UserProfileContext.Provider>
  );
};

// Custom hook to access the user profile context
export const useUserProfile = <T,>(
  selector: (store: UserProfileStore) => T
): T => {
  const userProfileContext = useContext(UserProfileContext);

  if (!userProfileContext) {
    throw new Error("useUserProfile must be use within UserProfileProvider");
  }

  return useStore(userProfileContext, selector);
};
