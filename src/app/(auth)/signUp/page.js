"use client";

import { useForm } from "react-hook-form";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowPass } from "@/features/auth/authSlice";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import ShowPassButton from "@/components/AuthForm/ShowPassButton";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const dispatch = useDispatch();
  const showPass = useSelector((state) => state.auth.showPass);

  const router = useRouter();

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              data.email,
              data.password
            );

            const user = userCredential.user;

            try {
              await setDoc(doc(db, "users", user.uid), {
                firstname: data.fName,
                lastname: data.lName,
                email: data.email,
              });
              alert(
                "User created successfully with uid: " + userCredential.user.uid
              );
              router.push("/logIn");
            } catch (error) {
              console.log(error.code);
              await deleteUser(user);
              alert("FireStore Error: User creation failed !");
            }
          } catch (error) {
            console.error(error.code);
            if (error.code === "auth/email-already-in-use") {
              alert("Email already in use. Try Logging In?");
            }
          }
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
        <div className="passWrapper">
          <input
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            })}
            type={showPass ? "text" : "password"}
            placeholder="Password"
          />
          <ShowPassButton />
        </div>
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
        <div className="passWrapper">
          <input
            {...register("cPassword", {
              required: true,
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type={showPass ? "text" : "password"}
            placeholder="Confirm Password"
          />
          <ShowPassButton />
        </div>
        {errors.cPassword && (
          <p className="text-red-500 font-black">{errors.cPassword.message}</p>
        )}

        {/* SignUp Button */}
        <button type="submit" disabled={isSubmitting}>
          {/* Sign Up */}
          {isSubmitting ? "Signing Up" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
