import "./catalog.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import Paggination from "../Paggination";
import { Filter } from "../../components/Filtration/Filtration";
import { Link } from "react-router-dom";

const genreMain = [
  {
    id: "1",
    viewTitle: "aaaaa",
  },
  {
    id: "2",
    viewTitle: "bbbbbb",
  },
  {
    id: "3",
    viewTitle: "cccccc",
  },
  {
    id: "4",
    viewTitle: "ddddddd",
  },
  {
    id: "5",
    viewTitle: "eeeeeee",
  },
  {
    id: "6",
    viewTitle: "fffffff",
  },
];
function Catalog() {
  const [book, setBook] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [bookperpage] = useState(10);

  useEffect(() => {
    const getBook = async () => {
      //setLoading(true);
      const res = await axios.get("http://localhost:8000");
      setBook(res.data);
      //setLoading(false);
    };

    getBook();
  }, []);

  const lastBookIndex = currentpage * bookperpage; //последний индекс страницы
  const firstbookIndex = lastBookIndex - bookperpage; //первый индекс страницы
  const currentBook = book.slice(firstbookIndex, lastBookIndex); //текущий индекс страницы

  const paginate = (pageNumber) => setCurrentpage(pageNumber);
  // const nextPage = () => setCurrentpage((prev) => prev + 1);
  // const prevPage = () => setCurrentpage((prev) => prev - 1);

  // if (!loading) {
  //   return (
  //     <div className="catalog__inner">
  //       <div className="catalog__content">
  //         <h2>Loading...</h2>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="catalog__inner">
      <div className="catalog__content">
        <div className="catalog__search">
          <button className="catalog__filtration" type="submit">
            <p className="filter__text">Каталог</p>
            <div className="filter__info">
              <h3 className="filter__genre">Жанры</h3>
              <Link to="#" className="filter__link">
                <svg
                  width="26px"
                  height="26px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="Menu / Close_LG">
                      {" "}
                      <path
                        id="Vector"
                        d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </Link>
              <ul className="filter__list">
                {genreMain.map((target) => (
                  <Filter key={target.id} title={target.viewTitle} />
                ))}
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

        {/* <button
          className="btn btn-primaryprev"
          onClick={prevPage}
          disabled={currentpage === 1 || book.length === 0}
        >
          Prev Page
        </button>
        <button
          className="btn btn-primarynext"
          onClick={nextPage}
          disabled={
            currentpage === Math.ceil(book.length / bookperpage) ||
            book.length === 0
          }
        >
          Next Page
        </button> */}
      </div>
    </div>
  );
}

export default Catalog;
