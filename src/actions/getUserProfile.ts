import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ErrorType, type ResponseType } from "@/models/ResponseType";
import {
	type User,
	type UserMetadata,
	UserMetadataSchema,
	type UserProfile,
	UserProfileSchema,
} from "@/models/User";
import { getStore } from "@netlify/blobs";
import { getServerSession } from "next-auth";
import { StoreType } from "./type";

export default async function getUserProfile(): Promise<
	ResponseType<UserProfile, UserMetadata>
> {
	const session = await getServerSession(authOptions);
	if (!session || !session.user) {
		return {
			success: false,
			message: "Unauthorized",
			errorType: ErrorType.UNAUTHORIZED,
		};
	}

	const currentUser = session.user as User;

	const userStore = getStore(StoreType.USER);
	const userWithMetadata = (await userStore.getWithMetadata(currentUser.email, {
		type: "json",
	})) as { data: User; metadata: UserMetadata };

	const userProfile = UserProfileSchema.safeParse(userWithMetadata.data);
	const userMetadata = UserMetadataSchema.safeParse(userWithMetadata.metadata);

	return {
		success: true,
		data: userProfile.data,
		metadata: userMetadata.data,
	};
}
