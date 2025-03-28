"use client";

import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Blogs from "./blog/page";

export default function Home() {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  const [mail, setMail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setMail(user.email);
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
        <button type="button">Add Blog</button>
      </span>
      <Blogs />
    </div>
  );
}
