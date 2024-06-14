import { createSlice } from "@reduxjs/toolkit";
const savedSlice = createSlice({
  name: "Saved Videos",
  initialState: {
    savedVideos: [],
  },
  reducers: {
    setsavedVideos: (state, action) => {
      state.savedVideos = action.payload;
    },
  },
});
export const { setsavedVideos } = savedSlice.actions;
const saveReducer = savedSlice.reducer;
export default saveReducer;
