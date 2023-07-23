import Header from "../../../components/admin/adminHeader/Header";
import "./AllGenres.scss";
import { useGenres } from "./../../../api/api.jsx";
import { AdminAllGenres } from "../../../components/admin/adminAllGenres/AdminAllGenres";

const AllGenres = () => {
  const { genre } = useGenres();
  return (
    <div>
      <Header />
      <div className="allgenres__wrap">
        {genre.map((target) => (
          <AdminAllGenres
            key={target.id}
            id={target.id}
            genre={target.main}
            names={target.name}
          />
        ))}
      </div>
    </div>
  );
};

export default AllGenres;
