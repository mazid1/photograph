"use client";
import { useModal } from "@/context/ModalContext";
import ChangePasswordForm from "./ChangePasswordForm";
import { UserMetadata, UserProfile } from "@/models/User";
import dayjs from "dayjs";
import { Avatar } from "./Avatar";

type ProfileCardProps = {
  user: UserProfile;
  metadata: UserMetadata;
};

function ProfileCard({ user, metadata }: ProfileCardProps) {
  const { showModal, closeModal, setModalContent } = useModal();

  const handleChangePassword = () => {
    setModalContent(<ChangePasswordForm onSuccess={closeModal} />);
    showModal();
  };

  return (
    <div className="card w-full md:w-2/3 bg-base-100 shadow-xl mx-auto border dark:border-neutral">
      <div className="card-body gap-4">
        <div className="flex flex-row gap-4">
          <Avatar user={user} />

          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold leading-9">{user?.name}</h2>
            <div className="text-base leading-5">{user?.email}</div>
          </div>
        </div>

        <div className="flex flex-col justify-center border dark:border-neutral rounded-lg p-4 gap-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">Password updated at</h3>
            <p className="text-sm">
              {dayjs(metadata?.passwordUpdatedAt).format(
                "MMM D, YYYY h:mm:ss A"
              )}
            </p>
          </div>
          <button
            className="btn btn-sm btn-outline w-max"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
