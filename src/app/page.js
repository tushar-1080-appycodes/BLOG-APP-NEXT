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
  // const showPopUp = useSelector((state) => state.blog.showPopUp);

  // const [mail, setMail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setMail(user.email);
        dispatch(setMail(user.email));
      }
      // else {
      //   router.replace("/logIn");
      // }

      if (!isLoggedIn) {
        router.push("/logIn");
      }else{
        router.push("/blogs")
      }

      return () => unsubscribe();
    });
  }, []);

  return (
    <p>Loading</p>
  );
}
