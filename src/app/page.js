"use client";

import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMail } from "@/features/app/appSlice";
import Blogs from "./blog/Blogs";
import BlogPopUp from "./blog/BlogPopUp";
import {toggleShowPopUp} from "@/features/blog/blogSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const mail = useSelector((state) => state.app.mail);
  const showPopUp = useSelector((state) => state.blog.showPopUp);

  // const [mail, setMail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setMail(user.email);
        dispatch(setMail(user.email));
      }
    });
  }, []);

  useEffect(() => {
    !isLoggedIn ? router.replace("/logIn") : null;
  }, [isLoggedIn]);

  return (
    <div className="blogsWrapper">
      <h1>Blogs</h1>
      <span>
        <h1>{mail}</h1>
        <button
          onClick={() => {
            dispatch(toggleShowPopUp());
          }}
          type="button"
        >
          Add Blog
        </button>
      </span>
      <BlogPopUp />
      <Blogs />
    </div>
  );
}
