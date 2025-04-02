"use client";


import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogCard from "./BlogCard";
import { setBlogs } from "@/features/blog/blogSlice";
import { fetchBlogs } from "@/firebase/firestore";

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

  return (
    <div className="blogsContainer">
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
