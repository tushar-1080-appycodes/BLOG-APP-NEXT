"use client"

import Blogs from "./Blogs";
import BlogPopUp from "./BlogPopUp";
import "./BlogHomePage.scss"

import { toggleShowPopUp } from "@/features/blog/blogSlice";
import { useSelector, useDispatch } from "react-redux";


export default function BlogHomePage() {
    const mail = useSelector((state) => state.app.mail);

    const dispatch = useDispatch()

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
    )
}
