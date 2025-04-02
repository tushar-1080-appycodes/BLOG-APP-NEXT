import { toggleShowPopUp } from "@/features/blog/blogSlice";
import "./BlogPopUp.scss";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateBlog } from "@/firebase/firestore";
import { updateBlogs } from "@/features/blog/blogSlice";

export default function BlogEditPopUp(defaultValues) {
  const { id, title, desc, image, publisher } = defaultValues;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      image: image,
      title: title,
      desc: desc,
    },
  });

  const showPopUp = useSelector((state) => state.blog.showPopUp);
  const dispatch = useDispatch();

  if (!showPopUp) {
    return null;
  }

  function submitHandler(data) {
    updateBlog(id, data).then(() => {
      dispatch(updateBlogs(id, data))
      alert("✅ Blog updated successfully!");
      window.location.reload();
    }).error(error => alert("❌ Error updating blog:", error))
  }

  return (
    <div className="blogPopUp">
      <form onSubmit={handleSubmit(submitHandler)}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          {...register("title", {
            required: true,
            pattern: /^[a-zA-Z]{2,50}$/,
          })}
          type="text"
          placeholder="Title"
        />

        <label htmlFor="image">Image</label>
        <input
          id="image"
          {...register("image", {
            required: true,
          })}
          type="text"
          placeholder="Image URL"
        />

        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          {...register("desc", {
            required: true,
          })}
          placeholder="Description"
        />

        <div className="btnWrapper">
          <button
            type="button"
            onClick={() => {
              dispatch(toggleShowPopUp());
            }}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating Blog" : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
