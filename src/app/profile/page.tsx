import getUserProfile from "@/actions/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect("/login");
  }

  const profileResponse = await getUserProfile();

  if (!profileResponse.success) {
    return (
      <section className="text-center">
        <p className="mx-auto mt-40">Could not found profile data.</p>
      </section>
    );
  }

  const { data: user, metadata } = profileResponse;

  return (
    <section className="flex gap-4 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {/* {isLoading && (
        <div className="mx-auto">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )} */}

      <div className="card w-full md:w-2/3 bg-base-100 shadow-xl mx-auto">
        <div className="card-body gap-4">
          <div className="flex flex-row gap-4">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-24">
                <span className="text-3xl">MI</span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold leading-9">{user?.name}</h2>
              <div className="text-base leading-5">{user?.email}</div>
            </div>
          </div>

          <div className="flex flex-col justify-center border dark:border-neutral rounded-lg p-4 gap-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">Password updated at</h3>
              <p className="text-sm">
                {new Date(metadata?.passwordUpdatedAt!).toLocaleString()}
              </p>
            </div>
            <button className="btn btn-sm btn-outline w-max">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
