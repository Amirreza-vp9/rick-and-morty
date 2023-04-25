import { createSlice } from "@reduxjs/toolkit";

export const currentThemeSlice = createSlice({
  name: "currentTheme",
  initialState: {
    thisTheme: "light",
  },

  reducers: {
    setCurrentTheme: (state, action) => {
      state.thisTheme = action.payload;
    },
  },
});

export const { setCurrentTheme } = currentThemeSlice.actions;
export default currentThemeSlice.reducer;
