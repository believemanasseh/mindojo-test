import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./features/api/apiSlice";
import defaultReducer from "./features/reducers/defaultSlice";

export const store = configureStore({
  reducer: {
    default: defaultReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
