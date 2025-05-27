"use client"

import Blogs from "./Blogs";
import BlogPopUp from "./BlogPopUp";
import { useEffect, Suspense } from "react";
import { toggleShowPopUp } from "@/features/blog/blogSlice";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { uploadBlogs } from "@/firebase/firestore";
import { setMail } from "@/features/app/appSlice";
import { getCookies } from "../cookieActions";

const email = (async function getMail(key) {
    return await getCookies(key)
})()
console.log(email);


export default function BlogHomePage() {
    const dispatch = useDispatch()

    return (
        <div className="blogsWrapper">
            <h1>Blogs</h1>
            <BlogPopUp />
            <button
                className="bg-blue-500 text-white px-4 py-2 absolute top-0 right-0"
                onClick={() => uploadBlogs(blogs)}
            >
                Upload Mock Data
            </button>
            <Suspense fallback={<div>Loading...</div>}>
                <span>
                    <h1>{email}</h1>
                    <Button
                        onClick={() => {
                            dispatch(toggleShowPopUp());
                        }}
                        type="button"
                    >
                        Add Blog
                    </Button>
                </span>
                <Blogs />
            </Suspense>
        </div>
    )
}
