"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import "./AuthForm.scss";
import { useRef, useState } from "react";

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const headingRef = useRef(null);

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogIn, setIsLogIn] = useState(true);
  const [signUpCount, setSignUpCount] = useState(0);
  const [logInCount, setLogInCount] = useState(0);

  return (
    <div
      className="auth"
      onSubmit={handleSubmit(async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
      })}
    >
      <h1 ref={headingRef}>Login</h1>
      <form action="">
        {/* First Name */}
        <motion.input
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isSignUp ? 1 : 0 }}
          {...register("fName", {
            required: true,
            pattern: /^[a-zA-Z]{2,50}$/,
          })}
          type="text"
          placeholder="FirstName"
        />
        {isSignUp && errors.fName && (
          <span className="text-red-600 font-black">
            Enter a valid firstname !
          </span>
        )}

        {/* Last Name */}
        <motion.input
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isSignUp ? 1 : 0 }}
          {...register("lName", {
            required: true,
            pattern: /^[a-zA-Z]{2,50}$/,
          })}
          type="text"
          placeholder="LastName"
        />
        {isSignUp && errors.lName && (
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
        {isSignUp && errors.email && (
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
        {isSignUp && errors.password && (
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
        <motion.input
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isSignUp ? 1 : 0 }}
          {...register("cPassword", {
            required: true,
            validate: (value) => value === password || "Passwords do not match",
          })}
          type="password"
          placeholder="Confirm Password"
        />
        {isSignUp && errors.cPassword && (
          <p className="text-red-500">{errors.cPassword.message}</p>
        )}

        <div>
          {/* LogIn Button */}
          <button
            onClick={(e) => {
              if (!isLogIn) {
                e.preventDefault();
                setIsLogIn(true);
                setIsSignUp(false);
              }
            }}
            type="submit"
          >
            {isSubmitting ? "Logging In" : "LogIn"}
          </button>

          {/* SignUp Button */}
          <button
            onClick={(e) => {
              if (!isSignUp) {
                e.preventDefault();
                setIsSignUp(true);
                setIsLogIn(false);
              }
            }}
            type="submit"
          >
            {isSubmitting ? "Signing Up" : "SignUp"}
          </button>
        </div>
      </form>
    </div>
  );
}
