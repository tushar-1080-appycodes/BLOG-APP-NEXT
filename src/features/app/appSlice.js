import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { toggleLoggedIn } = appSlice.actions;

export default appSlice.reducer;
