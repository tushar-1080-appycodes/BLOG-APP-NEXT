import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPass: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleShowPass: (state) => {
      state.showPass = !state.showPass;
    },
  },
});

export const { toggleShowPass } = authSlice.actions;

export default authSlice.reducer;
