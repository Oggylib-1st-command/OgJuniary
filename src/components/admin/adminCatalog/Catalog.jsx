import "./Catalog.scss";
import BookCardCatalog from "./../adminBookCardCatalog/BookCardCatalog";
import { useInfoBook } from "./../../../api/api";

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
          // im age={target.image}
          image="https://sun9-64.userapi.com/impg/nAORqc9HaarcI3SfBHMJWl1ofeP17pxs8M7P3g/XkL7QgoAwe0.jpg?size=960x1280&quality=95&sign=724a4ea8c714e922babd49fcfcea59c4&type=album"
        />
      ))}
    </div>
  );
}

export default Catalog;
