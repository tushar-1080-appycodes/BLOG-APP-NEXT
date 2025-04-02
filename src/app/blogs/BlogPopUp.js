import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { increase, toggleShowPopUp } from "@/features/blog/blogSlice";
import "./BlogPopUp.scss";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function BlogPopUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      image: "/next.svg",
      title: "",
      desc: "",
    },
  });

  const mail = useSelector((state) => state.app.mail);
  const showPopUp = useSelector((state) => state.blog.showPopUp);
  const dispatch = useDispatch();

  async function submitHandler(data) {
    try {
      console.log(data);

      const response = await addDoc(collection(db, "blogs"), {
        title: data.title,
        desc: data.desc,
        image: data.image,
        publisher: mail,
      });
      console.log("Response", response);

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
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          {...register("title", {
            required: true,
            pattern: /^[a-zA-Z]{2,50}$/,
          })}
          type="text"
          placeholder="Title"
        />
        <label htmlFor="image">Image</label>
        <Input
          id="Image"
          {...register("image", {
            required: true,
          })}
          type="text"
          placeholder="Image URL"
        />
        <label htmlFor="desc">Description</label>
        <Textarea
          id="desc"
          {...register("desc", {
            required: true,
          })}
          placeholder="Description"
        />
        <div className="btnWrapper">
          <Button
            type="button"
            onClick={() => {
              dispatch(toggleShowPopUp());
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding Blog" : "Add Blog"}
          </Button>
        </div>
      </form>
    </div>
  );
}
