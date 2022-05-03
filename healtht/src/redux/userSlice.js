import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
  },
  reducers: {
    LOGIN(state, action) {
      state.data = action.payload;
    },
    LOGOUT(state) {
      state.data = "";
    },
  },
});

export const { LOGIN, LOGOUT } = userSlice.actions;
//exports the redux actions

export const selectUser = (state) => state.user.data;
//exports the states

export default userSlice.reducer;
//exports the reducer
