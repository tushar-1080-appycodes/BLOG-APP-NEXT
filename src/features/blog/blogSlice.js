import { createSlice } from "@reduxjs/toolkit";
import { toggleShowPass } from "../auth/authSlice";

const initialState = {
  addedBlog: 0,
  showPopUp: false,
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
  },
});

export const { increase,toggleShowPopUp } = blogSlice.actions;

export default blogSlice.reducer;
