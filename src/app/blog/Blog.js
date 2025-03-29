"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { increase } from "@/features/blog/blogSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Blogs() {
  const blog = {
    image: "/next.svg",
    title: "Blog Title",
    desc: "Blog Description",
  };

  const router = useRouter();
  const blogCount = useSelector((state) => state.blog.addedBlog);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const blogsCollection = collection(db, "blogs");
    const blogsSnapshot = await getDocs(blogsCollection);
    const blogsList = blogsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBlogs(blogsList);
  };

  useEffect(() => {
    fetchBlogs();
  }, [blogCount]);

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  return (
    <div className="blogsContainer">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="blogCard">
          <Image src="/next.svg" width={500} height={500} alt="zzz"></Image>
          <h3>Blog Title</h3>
          <p>Blog Description</p>
          <button
            onClick={() =>
              router.push(
                `/blog/${index}?image=${blog.image}&title=${blog.title}&desc=${blog.desc}`
              )
            }
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
