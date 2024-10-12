import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/v1" }),
  endpoints: (builder) => ({
    fetchGrids: builder.query({
      query: (tab) => ({
        method: "GET",
        url: `/grids/${tab}`,
      }),
    }),
    fetchResult: builder.query({
      query: (tab) => ({
        method: "GET",
        url: `/results/${tab}`,
      }),
    }),
  }),
});

export const { useFetchGridsQuery, useFetchResultQuery } = apiSlice;
