import { baseApi } from "./apiSlice";

export const apiAuthSlice=baseApi.injectEndpoints({
    endpoints:(builder)=>({

        loginAdmin:builder.mutation({
            query:(userdata)=>({
                url:"/admin/signin",
                method:'POST',
                body:userdata

            })
        }),

        checkAuth:builder.query({
            query:()=>("/admin/auth/me")

        })
        


    })
})

export const {useLoginAdminMutation,useLazyCheckAuthQuery}= apiAuthSlice;