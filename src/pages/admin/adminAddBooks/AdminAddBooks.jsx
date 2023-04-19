import Header from "../../../components/admin/adminHeader/Header";
import { Link, useNavigate } from "react-router-dom";
import getImageKey from "./../../../components/getImageKey";
import { MultiSelect } from "primereact/multiselect";
import "./adminAddBooks.scss";
import { useState, useEffect } from "react";

export const AdminAddBook = () => {
  const [selectedGenres, setSelectedGenres] = useState();
  const navigate = useNavigate();
  const handleCancel = () => {
    window.location.reload();
  };
  useEffect(() => {
    console.log(selectedGenres);
  }, [selectedGenres]);
  const genres = [
    { name: "Приключение", id: "1" },
    { name: "История", id: "2" },
    { name: "Бизнес", id: "3" },
    { name: "Менеджмент", id: "4" },
    { name: "Политика", id: "5" },
  ];
  return (
    <div>
      <Header />
      <div className="add__content">
        <div className="search__content">
          <label className="search__pos">
            <img
              className="search__logo"
              src={getImageKey("searchIcon")}
              alt=""
            />
            <input className="search__input" type="text" placeholder="Поиск" />
          </label>
          <button className="search__add-books">
            <Link to="" className="search__add-link">
              Добавить книгу
            </Link>
          </button>
        </div>
        <div className="add__info">
          <div className="add__wrap">
            <div className="add__download">
              <canvas className="add__download-canvas"></canvas>
              <button className="add__download-btn">
                <input type="file" className="input__file" />
                Загрузить фото
              </button>
            </div>
            <div className="add__creation">
              <form className="add__creation-form">
                <input type="text" className="add__creation-title" required />
                <label htmlFor="add__creation-author" className="label__author">
                  Автор:
                  <input
                    type="text"
                    className="add__creation-author"
                    required
                  />
                </label>
                <label htmlFor="add__creation-year" className="label__year">
                  Год издания:
                  <input type="text" className="add__creation-year" required />
                </label>
                <div className="add__creation-rating">
                  Здесь будет рейтинг, а пока нам плевать на ваше мнение
                </div>
                <label className="label__genre">
                  Жанры:
                  <MultiSelect
                    value={selectedGenres}
                    onChange={(e) => setSelectedGenres(e.value)}
                    options={genres}
                    optionLabel="name"
                    filter
                    placeholder="Выберите жанры"
                    maxSelectedLabels={10}
                    removeIcon={true}
                    display="chip"
                    className="w-full md:w-30rem multiselect"
                  />
                </label>
                <label htmlFor="add__creation-description">
                  Описание книги
                  <textarea
                    type="text"
                    className="add__creation-description"
                    required
                  />
                </label>
                <div className="add__creation-btn">
                  <button className="add__save">Сохранить </button>
                  <button className="add__cancel" onClick={handleCancel}>
                    Отменить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
