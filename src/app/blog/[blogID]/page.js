"use client";

import "./BlogPage.scss";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import BlogEditPopUp from "../BlogEditPopUp";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useEffect, useState } from "react";
import EditDelBtn from "./EditDelBtn";

export default function BlogPage() {
  const { blogID } = useParams();
  // console.log("Blog ID: ", blogID);


  // const [ setData] = useState(null);


  const mail = useSelector((state) => state.app.mail);
  const blogs = useSelector(state => state.blog.blogs);
  const { title, desc, image, publisher } = blogs.find(blog => blog.id === blogID);
  // alert(mail);

  // async function fetchBlog() {
  //   const docRef = doc(db, "blogs", blogID);
  //   const blogDoc = await getDoc(docRef);
  //   setData(blogDoc.));
  // }

  // useEffect(() => {
  //   fetchBlog();
  // }, []);

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="blogPage">

      <BlogEditPopUp
        {...blogs}
      />
      {mail === publisher && (
        <EditDelBtn />
      )}
      <Image
        // src={image ? image : "/next.svg"}
        src="/next.svg"
        width={100}
        height={100}
        alt="zzz"
      ></Image>
      <span className="titlePublisherWrapper">
        <h3>{title}</h3>
        {publisher && <span>{publisher}</span>}
      </span>
      <p>{desc}</p>
      <div className="prevNextWrapper">
        <button onClick={() => window.history.back()}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Prev
          </span>
        </button>
        <button>
          <span>
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
