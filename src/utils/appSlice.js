import { createSlice } from "@reduxjs/toolkit";
const appSlice = createSlice({
  name: "App",
  initialState: { video: [], category: "Programming" },

  reducers: {
    // toggleSidebar: (state) => {
    //   state.open = !state.open;
    // },
    setHomeVideo: (state, action) => {
      state.video = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const { setHomeVideo, setCategory } = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
