"use client";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function BlogForm({ submitHandler, showPopUp, setShowPopUp }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  return (
    
  );
}
