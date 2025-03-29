import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { increase } from "@/features/blog/blogSlice";

import "./BlogPopUp.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function BlogPopUp({ mail, showPopUp, setShowPopUp }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  if (!showPopUp) return null;
  return (
    <div className="blogPopUp">
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            console.log(data);

            await addDoc(collection(db, "blogs"), {
              title: data.title,
              desc: data.desc,
              imgURL: data.image,
              publisher: mail,
            });
            dispatch(increase());
            alert("Blog uploaded successfully");
          } catch (error) {
            console.log(error.code);
            alert("Error uploading blog");
          }
        })}
      >
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
              setShowPopUp(!showPopUp);
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
