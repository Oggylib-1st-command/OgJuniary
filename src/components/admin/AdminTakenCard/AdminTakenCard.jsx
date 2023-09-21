import "./TakenCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { axiosBookById } from "../../../store/books/BookSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export const AdminTakenCard = ({ id, index }) => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.currentBook.book);
  useEffect(() => {
    dispatch(axiosBookById(id));
  }, []);
  return !book ? (
    <h4>loading...</h4>
  ) : (
    <div className="book-taken__inner">
      <div className="book-taken__image-block">
        <Link to={`/admin/catalog/${id}`}>
          <img
            src={book.image}
            alt="image book"
            className="book-taken__image book-taken__image--expired"
          />
        </Link>
      </div>
      <div className="book-taken__title-block">
        <p className="book-taken__title book-taken__title--expired">
          {book.title}
        </p>
      </div>
    </div>
  );
};
