import "./GenreCardMainPage.scss";
import { useDispatch } from "react-redux";
import {
  axiosFilterCatalogeBook,
  removeSearchBooks,
  removeSortBooks,
} from "../../store/books/BookSlice";
import { useNavigate } from "react-router-dom";
function GenreCardMainPage({ genre, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGenre = () => {
    console.log(id);
    dispatch(axiosFilterCatalogeBook(id));
    dispatch(removeSearchBooks());
    dispatch(removeSortBooks());
    navigate("/catalog");
  };
  return (
    <div>
      <div className="genre-card" onClick={handleGenre}>
        {genre}
      </div>
    </div>
  );
}

export default GenreCardMainPage;
