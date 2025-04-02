"use client"

import Blogs from "./Blogs";
import BlogPopUp from "./BlogPopUp";
import "./BlogHomePage.scss"

import { toggleShowPopUp } from "@/features/blog/blogSlice";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { uploadBlogs } from "@/firebase/firestore";

export default function BlogHomePage() {
    const mail = useSelector((state) => state.app.mail);

    const dispatch = useDispatch()

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
