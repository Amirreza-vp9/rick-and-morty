import { configureStore } from "@reduxjs/toolkit";
import currentThemeReducer from "./themeSlicer";

export default configureStore({
  reducer: {
    currentTheme: currentThemeReducer,
  },
});
