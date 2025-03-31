import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  mail: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setMail: (state, action) => {
      state.mail = action.payload;
    },
  },
});

export const { toggleLoggedIn,setMail } = appSlice.actions;

export default appSlice.reducer;
