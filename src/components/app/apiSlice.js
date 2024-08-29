import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:4000/api/` }),
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: "products", method: "GET" }),
      providesTags: ["Post"],
    }),
    getProductsById:builder.query({
      query:(id)=>({
        url:`products/${id}`
      }),
      providesTags:["Post"]

    }),
    addProducts: builder.mutation({
      query: (data) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    deleteProducts:builder.mutation({
        query:(id)=>({
            url:`products/${id}`,
            method:"DELETE"

        }),
        invalidatesTags:["Post"]
    }),
    updateProducts:builder.mutation({
      query:({id,updateCred})=>({
        

        
        url:`products/${id}`,
        method:"PUT",
        body:updateCred


      })
    })
  }),
});

export const { useGetProductsQuery, useAddProductsMutation,useDeleteProductsMutation,useUpdateProductsMutation,useGetProductsByIdQuery } = productsApi;
