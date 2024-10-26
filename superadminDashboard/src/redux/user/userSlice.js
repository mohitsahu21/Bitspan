import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
  refreshTable: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // state.currentUser = action.payload;
      const { user, token } = action.payload;
      state.currentUser = user;
      state.token = token;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.token = null;
    },
    toggleRefresh: (state) => {
      state.refreshTable = !state.refreshTable;
    },
  },
});

export const { setUser, clearUser, toggleRefresh } = userSlice.actions;
export default userSlice.reducer;
