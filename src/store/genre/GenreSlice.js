import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosAllGenre = createAsyncThunk(
  "genres/axiosAllGenre",
  async function (nothing, { rejectWithValue }) {
    try {
      const response = await axios.get("http://localhost:8000/genre/");

      if (response.status !== 200) {
        throw new Error("server Error!");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    allGenres: {
      status: null,
      error: null,
      genre: [],
    },
  },
  reducers: {},

  extraReducers: {
    [axiosAllGenre.pending]: (state) => {
      state.allGenres.status = "loading";
      state.allGenres.error = null;
    },
    [axiosAllGenre.fulfilled]: (state, { type, payload }) => {
      state.allGenres.status = "resolved";
      state.allGenres.genre = { ...payload };
    },
    [axiosAllGenre.rejected]: (state, action) => {
      state.allGenres.status = "rejected";
      state.allGenres.error = action.payload;
    },
  },
});

export const {} = genreSlice.actions;

export default genreSlice.reducer;
