import "./catalog.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import Paggination from "../Paggination";
import { Check } from "../../components/Check/Check";

const genre = [
  "aaaaa",
  "bbbbb",
  "ccccc",
  "ddddd",
  "eeeee",
  "mmmmm",
  "ggggg",
  "kkkkk",
];

function Catalog() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [bookperpage] = useState(10);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const getBook = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:8000");
      setBook(res.data);
      setLoading(false);
    };

    getBook();
  }, []);

  const lastBookIndex = currentpage * bookperpage;
  const firstbookIndex = lastBookIndex - bookperpage;
  const currentBook = book.slice(firstbookIndex, lastBookIndex);

  const paginate = (pageNumber) => setCurrentpage(pageNumber);
  const nextPage = () => setCurrentpage((prev) => prev + 1);
  const prevPage = () => setCurrentpage((prev) => prev - 1);

  if (loading) {
    return (
      <div className="catalog__inner">
        <div className="catalog__content">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="catalog__inner">
      <div className="catalog__content">
        <div className="catalog__search">
          <button className="catalog__filtration" type="submit">
            <p className="filter__text">Каталог</p>
            <div className="filter__info">
              <h4 className="filter__title">ОКНО ПОСМОТРИМ ЧЕГО ПОТОМ</h4>
              <ul className="filter__list">
                <li className="filter__list-item">
                  <h3 className="filter__list-title">ЖАНР</h3>
                  <div className="filter__checkbox">
                    {showMore
                      ? genre.map((target) => <Check genre={target} />)
                      : genre
                          .slice(0, 4)
                          .map((target) => <Check genre={target} />)}
                  </div>
                  <p
                    className="show__btn"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Скрыть" : "Показать ещё"}
                  </p>
                </li>
              </ul>
            </div>
          </button>
          <select className="catalog__sort">
            <option>По новизне</option>
            <option>По популярности</option>
            <option>По алфавиту</option>
          </select>
        </div>
        {currentBook.map((obj) => (
          <Card
            key={obj.id}
            titleLink={obj.title.split(" ").join("")}
            author={obj.author}
            title={obj.title}
            genre={obj.genre}
          />
        ))}
        <Paggination
          bookPerPage={bookperpage}
          totalBook={book.length}
          paginate={paginate}
        />

        <button
          className="btn btn-primaryprev"
          onClick={prevPage}
          disabled={currentpage === 1 || book.length === 0}
        >
          Prev Page
        </button>
        <button
          className="btn btn-primarynext"
          onClick={nextPage}
          disabled={currentpage === Math.ceil(book.length / bookperpage) || book.length === 0}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Catalog;
