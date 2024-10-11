import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/v1/" }),
  endpoints: (builder) => ({
    getGrids: builder.query({
      query: (tabIndex) => ({
        url: `grids/${tabIndex}`,
        method: "GET",
      }),
    }),
    getResult: builder.query({
      query: (tabIndex) => ({
        url: `results/${tabIndex}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetGridsQuery, useGetResultQuery } = apiSlice;
