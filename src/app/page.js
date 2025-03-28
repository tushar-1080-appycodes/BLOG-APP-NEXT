"use client";

import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

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
      <h1>{mail}</h1>
      <div className="blogsContainer">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="blogCard">
            <Image src="/next.svg" width={500} height={500} alt="zzz"></Image>
            <h3>Blog Title</h3>
            <p>Blog Description</p>
          </div>
        ))}
      </div>
    </div>
  );
}
