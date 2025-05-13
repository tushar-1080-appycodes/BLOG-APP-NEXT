"use client";

import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMail } from "@/features/app/appSlice";


export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  if (!isLoggedIn) {
    router.push("/logIn");
  } else {
    router.push("/blogs")
  }

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       dispatch(setMail(user.email));
  //     }
  //     return () => unsubscribe();
  //   });
  // }, []);

  return (
    <p>Loading</p>
  );
}
