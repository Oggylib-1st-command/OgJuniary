import "./TakenCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { axiosBookById } from "../../../store/books/BookSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
//import { useInfoBookId } from "../../../api/api";
import cn from "classnames";
import { useState } from "react";
export const AdminTakenCard = ({ id, index }) => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.currentBook.book);
  useEffect(() => {
    dispatch(axiosBookById(id));
  }, []);
  //const { book } = useInfoBookId(id);
  const [active] = useState(book.control === 2);
  console.log(book.control === 2, active);
  return !book ? (
    <h4>loading...</h4>
  ) : (
    <div className="book-taken__inner">
      <div className="book-taken__image-block">
        <Link to={`/admin/catalog/${id}`}>
          <img
            src={book.image}
            alt="book"
            className={cn({
              book_taken__image_expired: book.control === 2,
              book_taken__image: !(book.control === 2),
            })}
          />
        </Link>
      </div>
      <div className="book-taken__title-block">
        <p
          className={cn({
            book_taken__title_expired: book.control === 2,
            book_taken__title: !(book.control === 2),
          })}
        >
          {book.title}
        </p>
      </div>
    </div>
  );
};
