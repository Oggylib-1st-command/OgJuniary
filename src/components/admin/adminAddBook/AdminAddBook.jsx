import getImageKey from "./../../../components/getImageKey";
import { MultiSelect } from "primereact/multiselect";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./adminAddBook.scss";
import { useSelector } from "react-redux";
import { getCurrentBook } from "../../../store/books/selectors";
import Select from "react-select";
import { type } from "@testing-library/user-event/dist/type";

export const AdminAddBook = () => {
  const book = useSelector((state) => state.books.book);
  const genresForSelect = [];
  const languagesForSelect = [];
  const defaultGenre = [];
  const defaultLanguage = { value: "", label: "" };
  const [options, setOptions] = useState(book);
  const [genres, setGenre] = useState([]);
  const [languagles, setLanguagles] = useState([]);
  const [selectImg, setSelectImg] = useState(null);

  genres.map((el, index) => {
    const obj = { value: "", label: "" };
    obj.value = el.name;
    obj.label = el.name;
    genresForSelect.push(obj);
  });

  languagles.map((el, index) => {
    const obj = { value: "", label: "" };
    obj.value = el.name;
    obj.label = el.name;
    languagesForSelect.push(obj);
  });

  book.genres.map((el, index) => {
    const obj = { value: "", label: "" };
    obj.value = el.name;
    obj.label = el.name;
    defaultGenre.push(obj);
  });

  defaultLanguage.value = book.languagle;
  defaultLanguage.label = book.languagle;

  useEffect(() => {
    const getGenre = async () => {
      const genna = await axios.get("http://localhost:8000/genre/");
      setGenre(genna.data);
    };
    const getLanguagle = async () => {
      const lang = await axios.get("http://localhost:8000/language/");
      setLanguagles(lang.data);
    };
    getGenre();
    getLanguagle();
  }, []);

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  const loadImg = (e) => {
    const selectImg = e.target.files[0];
    setSelectImg(selectImg);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (selectImg) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setOptions((prevState) => ({
            ...options,
            image: result,
          }));
        }
      };
      fileReader.readAsDataURL(selectImg);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [selectImg]);

  const handleSaveForm = (e) => {
    e.preventDefault();
    const update = options.genres.map((el) => "" + el.name);
    console.log(update);
    Object.assign(options.genres, update);
    const postBook = async () => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/books/",
        options
      );
      console.log(response);
      navigate(-1);
    };
    postBook();
  };

  return (
    <div className="add__wrap">
      <div className="add__download">
        {options.image ? (
          <img className="add__download-img" src={options.image} />
        ) : (
          <div className="add__download-canvas">
            <img
              className="download__bg"
              src={getImageKey("Download")}
              alt=""
            />
            <input
              type="file"
              onChange={(e) => loadImg(e)}
              accept=".png, .jpg, jpeg*"
              className="input__file"
            />
          </div>
        )}
        <button className="add__download-btn">
          <input
            type="file"
            onChange={(e) => loadImg(e)}
            accept=".png, .jpg, jpeg*"
            className="input__file"
          />
          Загрузить фото
        </button>
      </div>
      <div className="add__creation">
        <form className="add__creation-form">
          <input
            className="add__creation-title"
            type="text"
            value={options.title}
            onChange={(e) =>
              setOptions(() => ({ ...options, title: e.target.value }))
            }
            required
          />
          <label className="label__author" htmlFor="add__creation-author">
            Автор:
            <input
              type="text"
              className="add__creation-author"
              value={options.author}
              onChange={(e) =>
                setOptions(() => ({ ...options, author: e.target.value }))
              }
              required
            />
          </label>
          <label htmlFor="add__creation-year" className="label__year">
            Год издания:
            <input
              className="add__creation-year"
              type="text"
              value={options.year}
              onChange={(e) =>
                setOptions(() => ({ ...options, year: e.target.value }))
              }
              required
            />
          </label>
          <label className="label__languagle">
            Язык:
            <Select
              defaultValue={
                languagesForSelect[languagesForSelect.indexOf(book.languagle)]
              }
              optionLabel="name"
              placeholder="Выберите язык"
              name="colors"
              options={languagesForSelect}
              className="w-180 md:w-31rem multiselect"
              classNamePrefix="language"
              onChange={(e) => setOptions({ ...options, languagle: e.value })}
            />
          </label>
          <label className="label__genre">
            Жанры:
            <Select
              closeMenuOnSelect={false}
              defaultValue={null}
              isMulti
              optionLabel="name"
              placeholder="Выберите жанры"
              name="colors"
              options={genresForSelect}
              className="w-full md:w-31rem multiselect"
              classNamePrefix="genres"
              onChange={(e) => setOptions({ ...options, genres: e.value })}
            />
          </label>
          <label htmlFor="add__creation-description">
            Описание книги
            <textarea
              type="text"
              className="add__creation-description"
              value={options.description}
              onChange={(e) =>
                setOptions(() => ({
                  ...options,
                  description: e.target.value,
                }))
              }
              required
            />
          </label>
          <div className="add__creation-btn">
            <button className="add__save" onClick={(e) => handleSaveForm(e)}>
              Сохранить
            </button>
            <button className="add__cancel" onClick={handleCancel}>
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
