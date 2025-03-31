import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { increase, toggleShowPopUp } from "@/features/blog/blogSlice";
import "./BlogPopUp.scss";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

export default function BlogEditPopUp(defaultValues) {
  const { blogID, title, desc, image, publisher } = defaultValues;
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { title, desc, image } });

  const mail = useSelector((state) => state.app.mail);
  const showPopUp = useSelector((state) => state.blog.showPopUp);
  const dispatch = useDispatch();

  async function submitHandler(data) {
    try {
      const blogRef = doc(db, "blogs", blogId); // Reference to blog document
      await updateDoc(blogRef, data); // Update document

      console.log("✅ Blog updated successfully!");
    } catch (error) {
      console.error("❌ Error updating blog:", error);
    }
  }

  if (!showPopUp) {
    return null;
  }
  return (
    <div className="blogPopUp">
      <form onSubmit={(data) => handleSubmit(submitHandler(data))}>
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
            {isSubmitting ? "Adding Blog" : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
