"use client";
import changePassword from "@/actions/changePassword";
import { isObject } from "@/lib/isObject";
import { cn } from "@/lib/utils";
import { ResponseType } from "@/models/ResponseType";
import { ChangePasswordDto, UserMetadata } from "@/models/User";
import { useRef } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";

const initialState: ResponseType<ChangePasswordDto, UserMetadata> = {
  success: false,
  data: undefined,
  metadata: undefined,
  error: undefined,
  errorType: undefined,
  message: undefined,
};

type ChangePasswordFormProps = {
  onSuccess: () => void;
};

function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
  const ref = useRef<HTMLFormElement>(null);
  const [{ success, error }, formAction] = useFormState(
    changePassword,
    initialState
  );

  if (success) {
    ref.current?.reset();
    onSuccess();
  }

  return (
    <form
      action={formAction}
      ref={ref}
      className="max-w-5xl min-w-64 space-y-6"
    >
      <h3 className="text-xl font-bold leading-9 mb-2">Change Password</h3>
      <div className="form-control w-full">
        <label htmlFor="currentPassword" className="label">
          <span className="label-text">Current Password</span>
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className={cn("input input-bordered w-full", {
            "input-error": isObject(error) && error.currentPassword,
          })}
        />
        {isObject(error) && error.currentPassword && (
          <div className="label">
            <span className="label-text-alt">{error.currentPassword[0]}</span>
          </div>
        )}
      </div>

      <div className="form-control w-full">
        <label htmlFor="newPassword" className="label">
          <span className="label-text">New Password</span>
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          className={cn("input input-bordered w-full", {
            "input-error": isObject(error) && error.newPassword,
          })}
        />
        {isObject(error) && error.newPassword && (
          <div className="label">
            <span className="label-text-alt">{error.newPassword[0]}</span>
          </div>
        )}
      </div>

      <div className="form-control w-full">
        <label htmlFor="confirmPassword" className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="off"
          required
          className={cn("input input-bordered w-full", {
            "input-error": isObject(error) && error.confirmPassword,
          })}
        />
        {isObject(error) && error.confirmPassword && (
          <div className="label">
            <span className="label-text-alt">{error.confirmPassword[0]}</span>
          </div>
        )}
      </div>

      <SubmitButton
        type="submit"
        className="btn btn-primary normal-case w-full"
      >
        Save
      </SubmitButton>
    </form>
  );
}

export default ChangePasswordForm;
