"use client";

import { useForm } from "react-hook-form";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowPass } from "@/features/auth/authSlice";
import { doc, setDoc } from "firebase/firestore";

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
            console.log("User created with uid: ", userCredential.user.uid);

            await setDoc(doc(db, "users", userCredential.user.uid), {
              firstname: data.fName,
              lastname: data.lName,
              email: data.email,
            });
            console.log(
              "User created in DB with uid: ",
              userCredential.user.uid
            );
          } catch (error) {
            console.error(error);
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
          <button type="button" onClick={() => dispatch(toggleShowPass())}>
            Show
          </button>
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
          <button type="button" onClick={() => dispatch(toggleShowPass())}>
            Show
          </button>
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
