import { API_URL } from "@/configs/paths";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutThunk = createAsyncThunk("auth/logout", async (_, { rejectWithValue, getState }) => {
  try {
    // Lấy accessToken từ state
    const state = getState();
    const accessToken = state.auth.accessToken;

    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
