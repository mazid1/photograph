"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn("credentials", { ...data, redirect: false });
    if (response && !response.error) {
      router.push("/");
    } else {
      setError(String(response?.error));
    }
  };

  return (
    <div className="flex gap-4 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl font-bold leading-9 tracking-tight">
          Login to your account
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={loginUser}>
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
              value={data.email}
              onChange={(e) => {
                setError("");
                setData((prev) => ({ ...prev, email: e.target.value }));
              }}
              className="input input-bordered w-full"
            />
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
              value={data.password}
              onChange={(e) => {
                setError("");
                setData((prev) => ({ ...prev, password: e.target.value }));
              }}
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary normal-case w-full">
            Login
          </button>

          {error && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
