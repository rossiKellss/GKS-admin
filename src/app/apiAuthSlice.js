import { baseApi } from "./apiSlice";

export const apiAuthSlice=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        loginAdmin:builder.mutation({
            query:(userdata)=>({
                url:"/auth/signup",
                method:"POST",
                body:userdata

            })
        })


    })
})

export const {useLoginAdminMutation}= apiAuthSlice;