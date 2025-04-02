"use client";

import { useForm } from "react-hook-form";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowPass } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toggleLoggedIn } from "@/features/app/appSlice";
import ShowPassButton from "@/components/AuthForm/ShowPassButton";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const showPass = useSelector((state) => state.auth.showPass);
  const router = useRouter();

  return (
    <form
      className="flex flex-col justify-between items-center w-full gap-1"
      onSubmit={handleSubmit(async (data) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password
          );
          console.log("user credentials are valid");
          dispatch(toggleLoggedIn())
          router.replace("/");
        } catch (error) {
          console.log(error.code);

          if (error.code === "auth/invalid-credential") {
            alert("Email or Password is incorrect");
          }
        }
      })}
    >
      {/* Email */}
      <Input
        className="text-3xl p-1 w-full outline-0 mt-2"
        {...register("email", {
          required: true,
        })}
        type="email"
        placeholder="Email"
      />

      {/* Password */}
      <div className="w-full flex gap-1 items-center mt-1 justify-center">
        <Input
          className="text-3xl p-1 w-full outline-0"
          {...register("password", {
            required: true,
            minLength: 8,
          })}
          type={showPass ? "text" : "password"}
          placeholder="Password"
        />
        <ShowPassButton />
      </div>

      {/* LogIn Button */}
      <Button className="w-fit p-2 mt-1.5 font-bold rounded border-none focus:text-white" type="submit" disabled={isSubmitting}>
        {/* Log In */}
        {isSubmitting ? "Logging In" : "Log In"}
      </Button>
    </form>
  );
}
