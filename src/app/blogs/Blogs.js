"use client";


import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogCard from "./BlogCard";
import { setBlogs } from "@/features/blog/blogSlice";
import { fetchBlogs, uploadBlogs } from "@/firebase/firestore";

export default function Blogs() {
  const blogCount = useSelector((state) => state.blog.addedBlog);

  // const [blogs, setBlogs] = useState([]);
  const blogs = useSelector(state => state.blog.blogs)
  const dispatch = useDispatch()


  // useEffect(() => {
  //   fetch("/MOCK_DATA.json") // Ensure the JSON file is in the public folder
  //     .then((response) => response.json())
  //     .then((json) => setBlogs(json))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);



  useEffect(() => {
    fetchBlogs().then(blogList => {
      dispatch(setBlogs(blogList))
      console.log("Blogs fetched from Firestore");
    })

  }, [blogCount]);

  // useEffect(() => {
  //   console.log(blogs);
  // }, [blogs]);
  // console.log(blogs);
  return (
    <div className="blogsContainer">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded absolute top-4 right-4"
        onClick={() => uploadBlogs(blogs)}
      >
        Upload Mock Data
      </button>
      {blogs.map((blog, index) => (
        // console.log("Blog ObjID: ",blog.id),

        <BlogCard
          key={index}
          {...blog}
        // blogID={blog.id}
        // title={blog.title}
        // desc={blog.desc}
        // image={blog.image}
        // publisher={blog.publisher}
        />
      ))}
    </div>
  );
}
