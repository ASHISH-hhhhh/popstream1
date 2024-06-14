import { createSlice } from "@reduxjs/toolkit";
const lightSlice = createSlice({
  name: "Light Mode",
  initialState: {
    lightMode: false,
  },
  reducers: {
    setlightMode: (state, action) => {
      state.lightMode = !state.lightMode;
    },
  },
});
export const { setlightMode } = lightSlice.actions;
const lightReducer = lightSlice.reducer;
export default lightReducer;
