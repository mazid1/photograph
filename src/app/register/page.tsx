"use client";
import register from "@/actions/register";
import { isObject } from "@/lib/isObject";
import { cn } from "@/lib/utils";
import { ResponseType } from "@/models/ResponseType";
import { User } from "@/models/User";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";
import { useSession } from "next-auth/react";

const initialState: ResponseType<User, never> = {
  success: false,
  data: undefined,
  error: undefined,
  errorType: undefined,
  message: undefined,
};

function RegisterPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const [{ success, error }, formAction] = useFormState(register, initialState);

  if (session?.user) {
    return router.push("/");
  }

  if (success) {
    ref.current?.reset();
    return router.push("/login");
  }

  return (
    <div className="flex gap-4 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl font-bold leading-9 tracking-tight">
          Register your account
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={formAction} ref={ref} className="space-y-6">
          <div className="form-control w-full">
            <label htmlFor="name" className="label">
              <span className="label-text">Full name</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              required
              className={cn("input input-bordered w-full", {
                "input-error": isObject(error) && error.name,
              })}
            />
            {isObject(error) && error.name && (
              <div className="label">
                <span className="label-text-alt">{error.name[0]}</span>
              </div>
            )}
          </div>

          <div className="form-control w-full">
            <label htmlFor="email" className="label">
              <span className="label-text">Email address</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={cn("input input-bordered w-full", {
                "input-error": isObject(error) && error.email,
              })}
            />
            {isObject(error) && error.email && (
              <div className="label">
                <span className="label-text-alt">{error.email[0]}</span>
              </div>
            )}
          </div>

          <div className="form-control w-full">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={cn("input input-bordered w-full", {
                "input-error": isObject(error) && error.password,
              })}
            />
            {isObject(error) && error.password && (
              <div className="label">
                <span className="label-text-alt">{error.password[0]}</span>
              </div>
            )}
          </div>

          <SubmitButton
            type="submit"
            className="btn btn-primary normal-case w-full"
          >
            Register
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
