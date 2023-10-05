import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosAllCatalogeUser = createAsyncThunk(
  "genres/axiosAllCatalogeUser",
  async function (nothing, { rejectWithValue }) {
    try {
      const response = await axios.get("http://127.0.0.1:8000/users/");

      if (response.status !== 200) {
        throw new Error("server Error!");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const axiosSearchCatalogeUser = createAsyncThunk(
  "genres/axiosSearchCatalogeUser",
  async function (field, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/search/users/?q=${field}`
      );

      if (response.status !== 200) {
        throw new Error("server Error!");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const axiosSortCatalogeUser = createAsyncThunk(
  "genres/axiosSortCatalogeUser",
  async function (sortType, { rejectWithValue }) {
    switch (sortType) {
      case "По алфавиту(убывание)":
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/sorted/user/?sort=desc"
          );

          if (response.status !== 200) {
            throw new Error("server Error!");
          }

          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      case "По алфавиту(возрастание)":
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/sorted/user/?sort="
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

const userSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: {
      status: null,
      error: null,
      user: [],
    },

    searchUsers: {
      status: null,
      error: null,
      searchUser: [],
    },

    sortUsers: {
      status: null,
      error: null,
      sortUser: [],
    },
  },
  reducers: {
    removeSearchUsers(state, action) {
      state.searchUsers = {
        status: null,
        error: null,
        searchUser: [],
      };
    },

    removeSortUsers(state, action) {
      state.sortUsers = {
        status: null,
        error: null,
        sortUser: [],
      };
    },
  },

  extraReducers: {
    [axiosAllCatalogeUser.pending]: (state) => {
      state.allUsers.status = "loading";
      state.allUsers.error = null;
    },
    [axiosAllCatalogeUser.fulfilled]: (state, { type, payload }) => {
      state.allUsers.status = "resolved";
      state.allUsers.user = payload;
    },
    [axiosAllCatalogeUser.rejected]: (state, action) => {
      state.allUsers.status = "rejected";
      state.allUsers.error = action.payload;
    },

    [axiosSearchCatalogeUser.pending]: (state) => {
      state.searchUsers.status = "loading";
      state.searchUsers.error = null;
    },
    [axiosSearchCatalogeUser.fulfilled]: (state, { type, payload }) => {
      state.searchUsers.status = "resolved";
      console.log(payload);
      if (payload.length === 0) {
        state.searchUsers.searchUser = ["NotFound"];
      } else {
        state.searchUsers.searchUser = payload;
      }
    },
    [axiosSearchCatalogeUser.rejected]: (state, action) => {
      state.searchUsers.status = "rejected";
      state.searchUsers.error = action.payload;
    },

    [axiosSortCatalogeUser.pending]: (state) => {
      state.sortUsers.status = "loading";
      state.sortUsers.error = null;
    },
    [axiosSortCatalogeUser.fulfilled]: (state, { type, payload }) => {
      state.sortUsers.status = "resolved";
      state.sortUsers.sortUser = payload;
    },
    [axiosSortCatalogeUser.rejected]: (state, action) => {
      state.sortUsers.status = "rejected";
      state.sortUsers.error = action.payload;
    },
  },
});

export const { removeSearchUsers, removeSortUsers } = userSlice.actions;

export default userSlice.reducer;
