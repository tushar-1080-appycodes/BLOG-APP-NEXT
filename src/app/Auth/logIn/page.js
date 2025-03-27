"use client";

import { useForm } from "react-hook-form";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowPass } from "@/features/auth/authSlice";

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const showPass = useSelector((state) => state.auth.showPass);

  return (
    <div>
      <h1>Log In</h1>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              data.email,
              data.password
            );
            console.log("user credentials are valid");
          } catch (error) {
            console.error(error);
          }
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
        <div className="passWrapper">
          <input
            {...register("password", {
              required: true,
              minLength: 8,
            })}
            type={showPass ? "text" : "password"}
            placeholder="Password"
          />
          <button type="button" onClick={() => dispatch(toggleShowPass())}>Show</button>
        </div>

        {/* LogIn Button */}
        <button type="submit" disabled={isSubmitting}>
          {/* Log In */}
          {isSubmitting ? "Logging In" : "Log In"}
        </button>
      </form>
    </div>
  );
}
