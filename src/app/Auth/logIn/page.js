"use client";

import { useForm } from "react-hook-form";

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div>
      <h1>Log In</h1>
      <form
        onSubmit={handleSubmit(async (data) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log(data);
        })}
      >
        {/* Email */}
        <input
          {...register("email", {
            required: true,
          })}
          type="email"
          placeholder="Email"
        />

        {/* Password */}
        <input
          {...register("password", {
            required: true,
            minLength: 8,
          })}
          type="password"
          placeholder="Password"
        />

        {/* LogIn Button */}
        <button
          onClick={(e) => {
            router.push("/Auth/logIn");
          }}
        >
          {/* Log In */}
          {isSubmitting ? "Logging In" : "Log In"}
        </button>
      </form>
    </div>
  );
}
