import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:4000/api/` }),
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      providesTags: ["Post"],
    }),
    addProducts: builder.mutation({
      query: (data) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetProductsQuery,useAddProductsMutation } = productsApi;
