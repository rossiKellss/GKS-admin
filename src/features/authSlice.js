import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  token: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialUser,
  reducers: {
    setCred: (state, action) => {
     
      const { accessToken } = action.payload;
      state.token = accessToken;
      
    },
    logOut: (state) => {
      state.token = null
    },
  },
});

export const { setCred, logOut } = authSlice.actions;
export default authSlice.reducer;
