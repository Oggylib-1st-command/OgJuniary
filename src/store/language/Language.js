import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosAllLanguage = createAsyncThunk(
  "language/axiosAllLanguage",
  async function (nothing, { rejectWithValue }) {
    try {
      const response = await axios.get("http://127.0.0.1:8000/language/");

      if (response.status !== 200) {
        throw new Error("server Error!");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const languageSlice = createSlice({
  name: "language",
  initialState: {
    allLanguage: {
      status: null,
      error: null,
      language: [],
    },
  },
  reducers: {},

  extraReducers: {
    [axiosAllLanguage.pending]: (state) => {
      state.allLanguage.status = "loading";
      state.allLanguage.error = null;
    },
    [axiosAllLanguage.fulfilled]: (state, { type, payload }) => {
      state.allLanguage.status = "resolved";
      state.allLanguage.language = { ...payload };
    },
    [axiosAllLanguage.rejected]: (state, action) => {
      state.allLanguage.status = "rejected";
      state.allLanguage.error = action.payload;
    },
  },
});

export const {} = languageSlice.actions;

export default languageSlice.reducer;
