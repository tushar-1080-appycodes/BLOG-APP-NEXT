"use client"

import Blogs from "./Blogs";
import BlogPopUp from "./BlogPopUp";
import "./BlogHomePage.scss"
import { useEffect } from "react";
import { toggleShowPopUp } from "@/features/blog/blogSlice";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { uploadBlogs } from "@/firebase/firestore";
import { setMail } from "@/features/app/appSlice";
import { getCookies } from "../cookieActions";


export default function BlogHomePage() {
    const dispatch = useDispatch()

    async function getMail(key) {
        const email = await getCookies(key)
        // console.table(email);
        dispatch(setMail(email))
    }


    useEffect(() => {
        getMail('user_Email')
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
