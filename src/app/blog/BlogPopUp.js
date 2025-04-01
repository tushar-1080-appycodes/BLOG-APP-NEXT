import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { increase, toggleShowPopUp } from "@/features/blog/blogSlice";
import "./BlogPopUp.scss";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

export default function BlogPopUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const mail = useSelector((state) => state.app.mail);
  const showPopUp = useSelector((state) => state.blog.showPopUp);
  const dispatch = useDispatch();

  async function submitHandler(data) {
    try {
      console.log(data);

      const response = await addDoc(collection(db, "blogs"), {
        title: data.title,
        desc: data.desc,
        imgURL: data.image,
        publisher: mail,
      });
      console.log("Response",response);

      dispatch(increase());

      alert("Blog uploaded successfully");
    } catch (error) {
      console.log(error.code);
      alert("Error uploading blog");
    }
  }

  if (!showPopUp) {
    return null;
  }
  return (
    <div className="blogPopUp">
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          {...register("title", {
            required: true,
            pattern: /^[a-zA-Z]{2,50}$/,
          })}
          type="text"
          placeholder="Title"
        />
        <input
          {...register("image", {
            required: true,
          })}
          type="text"
          placeholder="Image URL"
        />
        <textarea
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
