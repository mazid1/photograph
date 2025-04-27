"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import type { Photo } from "@/models/Photo";
import type { User, UserMetadata } from "@/models/User";
import { getStore } from "@netlify/blobs";
import { getServerSession } from "next-auth";
import { StoreType } from "./type";

export async function toggleLike(photo: Photo) {
	const session = await getServerSession(authOptions);
	if (!session) {
		throw new Error("Unauthorized");
	}

	const currentUser = session.user as User;

	const userStore = getStore(StoreType.USER);
	const userWithMetadata = await userStore.getWithMetadata(currentUser.email, {
		type: "json",
	});
	const userInDB = userWithMetadata?.data as User;
	const userMetadata = userWithMetadata?.metadata as UserMetadata;

	let isAdded = false;

	if (userInDB.liked[photo.id]) {
		delete userInDB.liked[photo.id];
		isAdded = false;
	} else {
		userInDB.liked[photo.id] = photo;
		isAdded = true;
	}
	await userStore.setJSON(currentUser.email, userInDB, {
		metadata: userMetadata,
	});

	return {
		success: true,
		data: userInDB,
		message: isAdded ? "Added to favorites" : "Removed from favorites",
	};
}
