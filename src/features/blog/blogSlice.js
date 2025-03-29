import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addedBlog: 0,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    increase: (state) => {
      state.addedBlog += 1;
    },
  },
});

export const { increase } = blogSlice.actions;

export default blogSlice.reducer;
