import { configureStore } from "@reduxjs/toolkit";
import bookReduser from "./books/BookSlice";
import genreReduser from "./genre/GenreSlice";
<<<<<<< HEAD
import userReduser from "./users/UserSlice";
=======
>>>>>>> 8ed44223258e951f755fc351affac364dc13f511

export default configureStore({
  reducer: {
    books: bookReduser,
    genres: genreReduser,
<<<<<<< HEAD
    users: userReduser,
=======
>>>>>>> 8ed44223258e951f755fc351affac364dc13f511
  },
});
