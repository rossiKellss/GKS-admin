import { baseApi } from "./apiSlice";

export const productApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: "products", method: "GET" }),
      providesTags: ["Post"],
    }),
    
    getProductsById: builder.query({
      query: (id) => ({
        url: `products/${id}`,
      }),
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
    
    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    updateProducts: builder.mutation({
      query: ({ id, formData }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Post"],
    }),

    searchProducts: builder.query({
      query: (data) => ({
        url: `products/search/${data}`,
      }),
      invalidatesTags: ["Post"],
    }),

    filterProducts: builder.query({
      query: (data) => ({
        url: `products?filter=${data}`,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductsMutation,
  useDeleteProductsMutation,
  useUpdateProductsMutation,
  useLazyGetProductsByIdQuery,
  useLazySearchProductsQuery,
  useLazyFilterProductsQuery,
} = productApiSlice;
