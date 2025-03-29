"use client";

import { useRouter } from "next/navigation";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";

export default function Blogs() {
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
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          title={blog.title}
          desc={blog.desc}
          imgURL={blog.imgURL}
        />
      ))}
    </div>
  );
}
