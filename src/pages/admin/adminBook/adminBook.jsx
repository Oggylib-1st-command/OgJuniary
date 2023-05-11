import "./adminBook.scss";
import { useState, useEffect } from "react";
import Header from "../../../components/admin/adminHeader/Header";
import Search from "../../../components/admin/adminSearch/Search";
import getImageKey from "../../../components/getImageKey";
import { useParams } from "react-router-dom";
import QrPop from "../../../components/admin/QrPopUp/QrPopUp";
import DeletePop from "../../../components/admin/DeletePopUpBook/DeletePopUpBook";
import { useInfoBookId } from "../../api";
import CommentCard from "../../../components/admin/commentcard/commentcard";
import { Rating } from "@mui/material";

function AdminBook() {
  const { id } = useParams();
  const { book } = useInfoBookId(id);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const toggleQrPopup = () => {
    setIsQrOpen(!isQrOpen);
  };

  const toggleDeletePopup = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  return (
    <div>
      <Header />
      <Search />
      <QrPop isActive={isQrOpen} handleClose={toggleQrPopup} />
      <DeletePop isActive={isDeleteOpen} handleClose={toggleDeletePopup} />
      <div className="book__content">
        <div className="book__info">
          <div className="book__wrap">
            <div className="book__canvas">
              <img className="book__canvas-img" src="" alt="book" />
            </div>
            <div className="book__but">
              <img
                className="book__but__trash"
                src={getImageKey("IconTrash")}
                alt=""
                onClick={toggleDeletePopup}
              />
              <img
                className="book__but__edit"
                src={getImageKey("IconEdit")}
                alt=""
              />
              <img
                className="book__but__QR"
                src={getImageKey("IconQR")}
                alt=""
                onClick={toggleQrPopup}
              />
            </div>
            <div className="book__text">
              <div className="book__text-title">
                45 татуировок менеджера. Правила российского руководителя{" "}
                {book.title}{" "}
              </div>
              <div className="book__text-author">Автор: {book.author}</div>
              <div className="book__text-year">Год издания: {book.year}</div>
              <div className="book__text-rating">
                Здесь будет рейтинг, а пока нам плевать на ваше мнение
              </div>
              <div className="book__text-language">Язык: {book.language}</div>
              <div className="book__text-genre">
                Жанры: {/* {book.genres.map((el) => el.name + ",")} */}
              </div>
              <div className="book__text-description">
                Описание книги: {book.description}
              </div>
            </div>
          </div>
          <div className="book__comment">
            <p className="book__comment__text"> Отзывы </p>
            <CommentCard></CommentCard>
            <CommentCard></CommentCard>
            <CommentCard></CommentCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBook;
