import "./TakenCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { axiosBookById } from "../../../store/books/BookSlice";
import { useEffect } from "react";
export const AdminTakenCard = ({ id, index }) => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.currentBook.book);
  useEffect(() => {
    dispatch(axiosBookById(id));
  }, []);
  return !book ? (
    <h4>loading...</h4>
  ) : (
    <h3 className="taken-book__list-item">{`${index + 1})${book.title}`}</h3>
  );
};
