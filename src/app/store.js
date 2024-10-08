import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./apiSlice";
import authReducer from '../features/authSlice'

export const store=configureStore({
    reducer:{
        [baseApi.reducerPath]:baseApi.reducer,
        auth:authReducer


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    

})