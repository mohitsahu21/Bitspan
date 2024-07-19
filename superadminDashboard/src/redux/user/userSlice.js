import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  refreshTable: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    toggleRefresh: (state) => {
      state.refreshTable = !state.refreshTable;
    },
  },
});

export const { setUser, clearUser, toggleRefresh } = userSlice.actions;
export default userSlice.reducer;
