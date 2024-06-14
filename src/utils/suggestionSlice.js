import { createSlice } from "@reduxjs/toolkit";
const suggestionSlice = createSlice({
  name: "suggestion",
  initialState: {
    searchSuggestion: [],
  },
  reducers: {
    setsearchSuggestion: (state, action) => {
      state.searchSuggestion = action.payload;
    },
  },
});
export const { setsearchSuggestion } = suggestionSlice.actions;
const suggestionReducer = suggestionSlice.reducer;
export default suggestionReducer;
