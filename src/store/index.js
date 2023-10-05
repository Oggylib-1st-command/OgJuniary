import { configureStore } from "@reduxjs/toolkit";
import bookReduser from "./books/BookSlice";
import genreReduser from "./genre/GenreSlice";
import userReduser from "./users/UserSlice";

export default configureStore({
  reducer: {
    books: bookReduser,
    genres: genreReduser,
    users: userReduser,
  },
});
