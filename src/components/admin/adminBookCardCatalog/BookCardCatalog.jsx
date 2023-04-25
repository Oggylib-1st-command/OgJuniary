import "./BookCardCatalog.scss";

function BookCardCatalog() {
  return (
    <div className="book-card__inner">
      <div className="book-card__image-block">
        <img src="" alt="" className="book-card__image" />
      </div>
      <p className="book-card__title">45 татуировок менеджера.</p>
      <p className="book-card__author">Максим Батырев</p>
      <p className="book-card__holder"></p>
    </div>
  );
}

export default BookCardCatalog;
