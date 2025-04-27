"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ErrorType, type ResponseType } from "@/models/ResponseType";
import type { User } from "@/models/User";
import { getStore } from "@netlify/blobs";
import { getServerSession } from "next-auth";
import { StoreType } from "./type";

export async function getLikedPhotos(): Promise<
	ResponseType<User["liked"], never>
> {
	const session = await getServerSession(authOptions);
	if (!session) {
		return {
			success: false,
			message: "Unauthorized",
			errorType: ErrorType.UNAUTHORIZED,
		};
	}

	const currentUser = session.user as User;

	const userStore = getStore(StoreType.USER);
	const userInDB: User = await userStore.get(currentUser.email, {
		type: "json",
	});

	return {
		success: true,
		data: userInDB.liked,
	};
}
