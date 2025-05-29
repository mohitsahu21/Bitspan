import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  token: null,
  refreshTable: false,
  walletBalance: null,
  loading: false,
  error: null,
};

export const fetchWalletBalance = createAsyncThunk(
  "user/fetchWalletBalance",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.user.token;

      const response = await axios.get(
        // `https://2kadam.co.in/api/auth/wallet/getWalletBalance/${userId}`,
        `https://2kadam.co.in/api/auth/wallet/getWalletBalance/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "Success") {
        return response.data.balance;
      } else {
        return rejectWithValue(
          response.data.message || "Failed to fetch balance"
        );
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      state.walletBalance = null;
    },
    toggleRefresh: (state) => {
      state.refreshTable = !state.refreshTable;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.walletBalance = action.payload;
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser, toggleRefresh } = userSlice.actions;
export default userSlice.reducer;
