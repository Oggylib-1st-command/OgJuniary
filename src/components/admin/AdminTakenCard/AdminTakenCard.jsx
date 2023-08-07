import { useDispatch, useSelector } from "react-redux";
import { axiosBookById } from "../../../store/books/Slice";
import { useInfoBookId } from "../../../api/api";
import { useEffect } from "react";

import "./TakenCard.scss";

export const AdminTakenCard = ({ id, index }) => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.book);

  useEffect(() => {
    dispatch(axiosBookById(id));
  });

  return !book ? (
    <h4>loading...</h4>
  ) : (
    <h3 className="taken-book__list-item">{`${index + 1})${book.title}`}</h3>
  );
};
