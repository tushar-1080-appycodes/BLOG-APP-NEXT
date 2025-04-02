import { createSlice } from "@reduxjs/toolkit";
import { toggleShowPass } from "../auth/authSlice";

const initialState = {
  addedBlog: 0,
  showPopUp: false,
  blogs: []
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    increase: (state) => {
      state.addedBlog += 1;
    },
    toggleShowPopUp: (state) => {
      state.showPopUp = !state.showPopUp;
    },
    setBlogs: (state, action) => {
      // return { ...state, blogs: action.payload }
      state.blogs = action.payload
    },
    updateBlogs: (state, action) => {
      const updatedBlog = state.blogs.map((blog) => {
        blog.id === action.payload.id ? { ...blog, ...action.payload.data } : blog
      })
      return { ...state, blogs: updatedBlog }
    }
  },
});

export const { increase, toggleShowPopUp, setBlogs, updateBlogs } = blogSlice.actions;

export default blogSlice.reducer;
