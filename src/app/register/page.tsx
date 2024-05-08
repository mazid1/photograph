"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function RegisterPage() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/.netlify/functions/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const userInfo = await response.json();

      if (userInfo?.error) {
        throw new Error(userInfo.error);
      }

      router.push("/login");
    } catch (error: any) {
      // todo: implement proper error handling
      console.log(error?.message);
    }
  };

  return (
    <div className="flex gap-4 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl font-bold leading-9 tracking-tight">
          Register your account
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={registerUser}>
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
              value={data.name}
              onChange={(e) =>
                setData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="input input-bordered w-full"
            />
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
              value={data.email}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
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
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary normal-case w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
