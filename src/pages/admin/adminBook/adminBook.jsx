import "./adminBook.scss";
import Header from "../../../components/admin/adminHeader/Header";
import Search from "../../../components/admin/adminSearch/Search";
import getImageKey from "../../../components/getImageKey";
import { Navigate, useParams } from "react-router-dom";
import { useInfoBookId } from "../../api";

function AdminBook() {
  const { id } = useParams();
  //const { book } = useInfoBookId(id);
  return (
    <div>
      <Header />
      <Search />
      <div className="book__content">
        <div className="book__info">
          <div className="book__wrap">
            <canvas className="book__canvas">
              <img className="book__canvas-img" src="" alt="book image" />
            </canvas>
            <div className="book__but">
              <img
                className="book__but__trash"
                src={getImageKey("IconTrash")}
                alt=""
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
              />
            </div>
            <div className="book__text">
              <div className="book__text-title">Название </div>
              <div className="book__text-author">Автор: </div>
              <div className="book__text-year">Год издания:</div>
              <div className="book__text-rating">
                Здесь будет рейтинг, а пока нам плевать на ваше мнение
              </div>
              <div className="book__text-genre">Жанры: </div>
              <div className="book__text-description">Описание книги:</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBook;
