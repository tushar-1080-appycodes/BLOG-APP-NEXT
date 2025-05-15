"use client"

import Blogs from "./Blogs";
import BlogPopUp from "./BlogPopUp";
import "./BlogHomePage.scss"
import { useEffect } from "react";
import { toggleShowPopUp } from "@/features/blog/blogSlice";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { uploadBlogs } from "@/firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { setMail } from "@/features/app/appSlice";


export default function BlogHomePage() {
    const dispatch = useDispatch()

    useEffect(() => {
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         dispatch(setMail(user.email));
        //     }

        //     return () => unsubscribe();
        // });

        dispatch(setMail(sessionStorage.getItem("user_Email")))
    }, []);

    const mail = useSelector((state) => state.app.mail);

    return (
        <div className="blogsWrapper">
            <h1>Blogs</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 absolute top-0 right-0"
                onClick={() => uploadBlogs(blogs)}
            >
                Upload Mock Data
            </button>
            <span>
                <h1>{mail}</h1>
                <Button
                    onClick={() => {
                        dispatch(toggleShowPopUp());
                    }}
                    type="button"
                >
                    Add Blog
                </Button>
            </span>
            <BlogPopUp />
            <Blogs />
        </div>
    )
}
