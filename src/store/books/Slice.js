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

export const axiosPopularBook = createAsyncThunk(
  "books/axiosPopularBook",
  async function (nothing, { rejectWithValue }) {
    try {
      const response = await axios.get(`http://localhost:8000/slider/rating/`); // проверить почему отваливаются CORS, если убрать слеш

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
      const response = await axios.get(
        `http://127.0.0.1:8000/search/?q=${field}`
      ); // проверить почему отваливаются CORS, если убрать слеш

      if (response.status !== 200) {
        throw new Error("server Error!");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const axiosTimeBook = createAsyncThunk(
  "books/axiosTimeBook",
  async function (field, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `http://localhost:8000/slider/time/`
      ); // проверить почему отваливаются CORS, если убрать слеш

      if (response.status !== 200) {
        throw new Error("server Error!");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const axiosSortAdminCatalogeBook = createAsyncThunk(
  "books/axiosSortAdminCatalogeBook",
  async function (typeSort, { rejectWithValue }) {
    switch (typeSort) {
      case "По алфавиту: От Я до А":
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/sorted/book/?sort=desc"
          );

          if (response.status !== 200) {
            throw new Error("server Error!");
          }

          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      case "По алфавиту: От А до Я":
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/sorted/book/?sort="
          );

          if (response.status !== 200) {
            throw new Error("server Error!");
          }

          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      default:
        break;
    }
  }
);

export const axiosSortCatalogeBook = createAsyncThunk(
  "books/axiosSortCatalogeBook",
  async function (typeSort, { rejectWithValue }) {
    switch (typeSort) {
      case "1":
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/sorted/time/?sort="
          );

          if (response.status !== 200) {
            throw new Error("server Error!");
          }

          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      case "2":
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/sorted/rating/?sort="
          );

          if (response.status !== 200) {
            throw new Error("server Error!");
          }

          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      case "3":
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/sorted/book/?sort=desc"
          );

          if (response.status !== 200) {
            throw new Error("server Error!");
          }

          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      case "4":
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/sorted/book/?sort="
          );

          if (response.status !== 200) {
            throw new Error("server Error!");
          }

          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      default:
        break;
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
      },
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

    sortAdminCatalogeBook: {
      status: null,
      error: null,
      sortAdminBook: [],
    },

    sortCatalogeBook: {
      status: null,
      error: null,
      sortBook: [],
    },

    popularBook: { 
      status: null,
      error: null,
      popBook: [],
    },

    timeBook: { 
      status: null,
      error: null,
      timBook: [],
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
        allSearchBooks: [],
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
      if (payload.length === 0)
        state.searchCatalogeBook.allSearchBooks = ["NotFound"];
      else state.searchCatalogeBook.allSearchBooks = [...payload];
    },
    [axiosSearchCatalogeBook.rejected]: (state, action) => {
      state.searchCatalogeBook.status = "rejected";
      state.searchCatalogeBook.error = action.payload;
    },

    [axiosSortAdminCatalogeBook.pending]: (state) => {
      state.sortAdminCatalogeBook.status = "loading";
      state.sortAdminCatalogeBook.error = null;
    },
    [axiosSortAdminCatalogeBook.fulfilled]: (state, { type, payload }) => {
      state.sortAdminCatalogeBook.status = "resolved";
      state.sortAdminCatalogeBook.sortAdminBook = [...payload];
    },
    [axiosSortAdminCatalogeBook.rejected]: (state, action) => {
      state.sortAdminCatalogeBook.status = "rejected";
      state.sortAdminCatalogeBook.error = action.payload;
    },

    [axiosSortCatalogeBook.pending]: (state) => {
      state.sortCatalogeBook.status = "loading";
      state.sortCatalogeBook.error = null;
    },
    [axiosSortCatalogeBook.fulfilled]: (state, { type, payload }) => {
      state.sortCatalogeBook.status = "resolved";
      state.sortCatalogeBook.sortBook = [...payload];
    },
    [axiosSortCatalogeBook.rejected]: (state, action) => {
      state.sortCatalogeBook.status = "rejected";
      state.sortCatalogeBook.error = action.payload;
    },

    [axiosPopularBook.pending]: (state) => {
      state.popularBook.status = "loading";
      state.popularBook.error = null;
    },
    [axiosPopularBook.fulfilled]: (state, { type, payload }) => {
      state.popularBook.status = "resolved";
      state.popularBook.popBook = [...payload];
    },
    [axiosPopularBook.rejected]: (state, action) => {
      state.popularBook.status = "rejected";
      state.popularBook.error = action.payload;
    },

    [axiosTimeBook.pending]: (state) => {
      state.timeBook.status = "loading";
      state.timeBook.error = null;
    },
    [axiosTimeBook.fulfilled]: (state, { type, payload }) => {
      state.timeBook.status = "resolved";
      state.timeBook.timBook = [...payload];
    },
    [axiosTimeBook.rejected]: (state, action) => {
      state.timeBook.status = "rejected";
      state.timeBook.error = action.payload;
    },
  },
});

export const { addBook, removeBook, removeSearchBooks } = bookSlice.actions;

export default bookSlice.reducer;
