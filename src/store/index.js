import { configureStore } from "@reduxjs/toolkit";
import bookReduser from "./books/BookSlice";
import genreReduser from "./genre/GenreSlice";

export default configureStore({
  reducer: {
    books: bookReduser,
    genres: genreReduser,
  },
});
