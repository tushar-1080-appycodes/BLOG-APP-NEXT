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
import { getCookies } from "@/utils/getCookies";

export default function LogIn() {
  const cookies = getCookies()

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
          sessionStorage.setItem("user_Email", userCredential.user.email)
          cookies.set('user_Email', userCredential.user.email)

          router.push("/blogs");
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
        className="p-1 w-full outline-0 mt-2"
        {...register("email", {
          required: true,
        })}
        type="email"
        placeholder="Email"
      />

      {/* Password */}
      <div className="passWrapper">
        <Input
          className="p-1 w-full outline-0"
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
      <Button className="" type="submit" disabled={isSubmitting}>
        {/* Log In */}
        {isSubmitting ? "Logging In" : "Log In"}
      </Button>
    </form>
  );
}
