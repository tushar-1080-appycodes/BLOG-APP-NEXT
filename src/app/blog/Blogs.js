"use client";

import { getDocs, collection, writeBatch, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import {  useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import BlogCard from "./BlogCard";
import { setBlogs } from "@/features/blog/blogSlice";


export default function Blogs() {

  const blogCount = useSelector((state) => state.blog.addedBlog);

  // const [blogs, setBlogs] = useState([]);
  const blogs=useSelector(state=>state.blog.blogs)
  const dispatch=useDispatch()

  // useEffect(() => {
  //   fetch("/MOCK_DATA.json") // Ensure the JSON file is in the public folder
  //     .then((response) => response.json())
  //     .then((json) => setBlogs(json))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  const fetchBlogs = async () => {
    const blogsCollection = collection(db, "blogs");
    const blogsSnapshot = await getDocs(blogsCollection);
    const blogsList = blogsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // setBlogs(blogsList);
    dispatch(setBlogs(blogsList))
  };

  useEffect(() => {
    fetchBlogs();
    console.log("Blogs fetched from Firestore");
    console.log(blogs);
    
  }, [blogCount]);

  // useEffect(() => {
  //   console.log(blogs);
  // }, [blogs]);

  return (
    <div className="blogsContainer">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded absolute top-4 right-4"
        onClick={async () => {
          try {
            const batch = writeBatch(db); // Create a batch

            blogs.forEach((blog) => {
              batch.set(doc(collection(db, "blogs")), blog);
            });

            await batch.commit(); // Execute the batch write
            console.log("✅ Bulk upload successful!");
          } catch (error) {
            console.error("❌ Error uploading blogs:", error);
          }
        }}
      >
        Upload Mock Data
      </button>
      {blogs.map((blog, index) => (
        // console.log("Blog ObjID: ",blog.id),
        
        <BlogCard
          key={index}
          // {...blog}
          blogID={blog.id}
          // title={blog.title}
          // desc={blog.desc}
          // image={blog.image}
          // publisher={blog.publisher}
        />
      ))}
    </div>
  );
}
