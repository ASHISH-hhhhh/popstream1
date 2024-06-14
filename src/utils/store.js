import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import saveReducer from "./savedSlice";
// import chatReducer from "./chatSlice";
import lightReducer from "./lightSlice";
import toggleReducer from "./toggleSice";
import suggestionReducer from "./suggestionSlice";
const store = configureStore({
  reducer: {
    apps: appReducer,
    saved: saveReducer,
    // chat: chatReducer,
    light: lightReducer,
    toggle: toggleReducer,
    suggest: suggestionReducer,
  },
});
export default store;
