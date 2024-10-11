import { createSlice } from "@reduxjs/toolkit";

const defaultSlice = createSlice({
  name: "default",
  initialState: {
    currentIndex: 0,
    prevIndex: null,
  },
  reducers: {
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setPrevIndex: (state, action) => {
      state.prevIndex = action.payload;
    },
  },
});

export const { setCurrentIndex, setPrevIndex } = defaultSlice.actions;
export default defaultSlice.reducer;
