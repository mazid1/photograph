import getUserProfile from "@/actions/getUserProfile";
import ProfileCard from "@/components/profile/ProfileCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

async function ProfilePage() {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		return redirect("/login");
	}

	const profileResponse = await getUserProfile();

	if (!profileResponse.data || !profileResponse.metadata) {
		return (
			<section className="text-center">
				<p className="mx-auto mt-40">Could not found profile data.</p>
			</section>
		);
	}

	const { data: user, metadata } = profileResponse;

	return (
		<section className="flex gap-4 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<ProfileCard user={user} metadata={metadata} />
		</section>
	);
}

export default ProfilePage;
