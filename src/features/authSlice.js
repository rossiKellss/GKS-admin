import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  token: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialUser,
  reducers: {
    setCred: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      
    },
    logOut: (state) => {
      state.token = null
    },
  },
});

export const { setCred, logOut } = authSlice.actions;
export default authSlice.reducer;
