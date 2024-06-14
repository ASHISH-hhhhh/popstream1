import { createSlice } from "@reduxjs/toolkit";
const toggleSlice = createSlice({
  name: "Toggle Slice",
  initialState: {
    show: true,
  },
  reducers: {
    setshowSide: (state, action) => {
      state.show = !state.show;
    },
  },
});
export const { setshowSide } = toggleSlice.actions;
const toggleReducer = toggleSlice.reducer;
export default toggleReducer;
