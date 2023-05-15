import "./BlockGenres.scss";

export default function BlockGenres({ id, genre }) {
  return (
    <div className="block__inner">
      <span>{genre}</span>
    </div>
  );
}
