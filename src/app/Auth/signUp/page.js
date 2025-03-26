"use client";

import { useForm } from "react-hook-form";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSubmit(async (data) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log(data);
        })}
      >
        {/* First Name */}
        <input
          {...register("fName", {
            required: true,
            pattern: /^[a-zA-Z]{2,50}$/,
          })}
          type="text"
          placeholder="FirstName"
        />
        {errors.fName && (
          <span className="text-red-600 font-black">
            Enter a valid firstname !
          </span>
        )}

        {/* Last Name */}
        <input
          {...register("lName", {
            required: true,
            pattern: /^[a-zA-Z]{2,50}$/,
          })}
          type="text"
          placeholder="LastName"
        />
        {errors.lName && (
          <span className="text-red-600 font-black">
            Enter a valid lastname !
          </span>
        )}

        {/* Email */}
        <input
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
          type="email"
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-600 font-black">
            Enter a valid mail id !
          </span>
        )}

        {/* Password */}
        <input
          {...register("password", {
            required: true,
            minLength: 8,
            pattern:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <div className="text-xs">
            <p>Password must have</p>
            <ul className="list-disc list-inside">
              <li>At least 8 characters long</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one digit (0-9)</li>
              <li>At least one special character (@, $, !, %, , ?, &)</li>
            </ul>
          </div>
        )}

        {/* Confirm Password */}
        <input
          {...register("cPassword", {
            required: true,
            validate: (value) => value === password || "Passwords do not match",
          })}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.cPassword && (
          <p className="text-red-500 font-black">{errors.cPassword.message}</p>
        )}

        {/* SignUp Button */}
        <button
          onClick={(e) => {
            router.push("/Auth/signUp");
          }}
        >
          {/* Sign Up */}
          {isSubmitting ? "Signing Up" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
