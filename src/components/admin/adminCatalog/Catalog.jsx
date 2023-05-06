import "./Catalog.scss";
import BookCardCatalog from "./../adminBookCardCatalog/BookCardCatalog";
import { useInfoBook } from "../../../pages/api";

function Catalog() {
  const { book } = useInfoBook();

  return (
    <div className="admin-catalog__inner">
      {book.map((target) => (
        <BookCardCatalog
          key={target.id}
          id={target.id}
          title={target.title}
          author={target.author}
          image={target.image}
        />
      ))}
    </div>
  );
}

export default Catalog;
