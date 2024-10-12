import { createSlice } from "@reduxjs/toolkit";

const defaultSlice = createSlice({
  name: "default",
  initialState: { currentIndex: 0, prevIndex: 0, showGrid: true },
  reducers: {
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setPrevIndex: (state, action) => {
      state.prevIndex = action.payload;
    },
    setShowGrid: (state, action) => {
      state.showGrid = action.payload;
    },
  },
});

export const { setCurrentIndex, setPrevIndex, setShowGrid } =
  defaultSlice.actions;
export default defaultSlice.reducer;
