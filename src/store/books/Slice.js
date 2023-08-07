import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosBookById = createAsyncThunk(
  "books/axiosBookById",
  async function (id, { rejectWithValue }) {
    try {
      const response = await axios.get(`http://localhost:8000/books/${id}/`); // проверить почему отваливаются CORS, если убрать слеш

      if (response.status !== 200) {
        throw new Error("server Error!");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const axiosAllCatalogeBook = createAsyncThunk(
  "books/axiosAllCatalogeBook",
  async function (nothing, { rejectWithValue }) {
    try {
      const response = await axios.get("http://localhost:8000/books/"); // проверить почему отваливаются CORS, если убрать слеш

      if (response.status !== 200) {
        throw new Error("server Error!");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const axiosSearchCatalogeBook = createAsyncThunk(
  "books/axiosSearchCatalogeBook",
  async function (field, { rejectWithValue }) {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/search/?q=${field}`); // проверить почему отваливаются CORS, если убрать слеш

      if (response.status !== 200) {
        throw new Error("server Error!");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    currentBook: {
      status: null,
      error: null,
      book: {
        id: 0,
        genres: [],
        comment: [],
        image: "",
        title: "",
        author: "",
        year: "",
        languages: "",
        description: "",
      }
    },

    allCatalogeBook: {
      status: null,
      error: null,
      allBooks: [],
    },
    searchCatalogeBook: {
      status: null,
      error: null,
      allSearchBooks: [],
    },

  },
  reducers: {
    removeBook(state, action) {
      state.currentBook.book = {
        id: 0,
        genres: [],
        comment: [],
        image: "",
        title: "",
        author: "",
        year: "",
        languages: "",
        description: "",
      };
    },
    removeSearchBooks(state, action) {
      state.searchCatalogeBook = {
        status: null,
        error: null,
        allSearchBooks: []
      };
    },
  },
  extraReducers: {
    [axiosBookById.pending]: (state) => {
      state.currentBook.status = "loading";
      state.currentBook.error = null;
    },
    [axiosBookById.fulfilled]: (state, { type, payload }) => {
      state.currentBook.status = "resolved";
      state.currentBook.book = { ...payload };
    },
    [axiosBookById.rejected]: (state, action) => {
      state.currentBook.status = "rejected";
      state.currentBook.error = action.payload;
    },

    [axiosAllCatalogeBook.pending]: (state) => {
      state.allCatalogeBook.status = "loading";
      state.allCatalogeBook.error = null;
    },
    [axiosAllCatalogeBook.fulfilled]: (state, { type, payload }) => {
      state.allCatalogeBook.status = "resolved";
      state.allCatalogeBook.allBooks = payload;
    },
    [axiosAllCatalogeBook.rejected]: (state, action) => {
      state.allCatalogeBook.status = "rejected";
      state.allCatalogeBook.error = action.payload;
    },

    [axiosSearchCatalogeBook.pending]: (state) => {
      state.searchCatalogeBook.status = "loading";
      state.searchCatalogeBook.error = null;
    },
    [axiosSearchCatalogeBook.fulfilled]: (state, { type, payload }) => {
      state.searchCatalogeBook.status = "resolved";
      if(payload.length === 0) state.searchCatalogeBook.allSearchBooks = ["NotFound"]
      else state.searchCatalogeBook.allSearchBooks = [...payload];
    },
    [axiosSearchCatalogeBook.rejected]: (state, action) => {
      state.searchCatalogeBook.status = "rejected";
      state.searchCatalogeBook.error = action.payload;
    },
  },
});

export const { addBook, removeBook, removeSearchBooks } = bookSlice.actions;

export default bookSlice.reducer;
