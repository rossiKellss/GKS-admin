import { logOut, setCred } from "@/features/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery=fetchBaseQuery({
  baseUrl: `http://localhost:4000/api/`,
    credentials:"include",
    prepareHeaders:(headers,{getState})=>{
      const token=getState().auth?.token;
      if(token){
        headers("Authorization",`Bearer ${token}`)
      }
     return headers;

    }

})

const baseQueryWithReAuth=async(args,api,extraOptions)=>{
  let result=await baseQuery(args,api,extraOptions);
  if(result?.error?.status==401){
    const refreshResult=baseQuery({
      url:'/auth/refresh-token',
      method:'POST'
    },api,extraOptions)

    if(refreshResult?.data){
      
      api.dispatch(setCred(token))

      
      result=await baseQuery(args,api,extraOptions)
    }
    else{
      api.dispatch(logOut())
    }

    
  }
  return result;

}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Post"],
  endpoints:()=>({})




  
});



