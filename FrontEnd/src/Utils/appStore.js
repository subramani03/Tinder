import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice.js";
import feedReducer from "./FeedSlice.js";

const appStore = configureStore({
  reducer: { userReducer,feedReducer},
});

export default appStore;
