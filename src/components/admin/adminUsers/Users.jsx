import "./Users.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../useAuth";
import { AdminUsersCard } from "../adminUsersCard/AdminUsersCard";
import Cookies from "js-cookie";

function Users() {
  const navigate = useNavigate();
  const { signout } = useAuth();
  const logout = () => {
    Cookies.remove("admin");
    signout(() => navigate("/login", { replace: true }));
  };
  return (
    <div className="admin__users">
      <div className="admin__users-top">
        <select className="admin__users-sort">
          <option value="">Тетруха топ</option>
          <option value="">Но</option>
          <option value="">Лапшин лучше</option>
        </select>
        <div className="admin__info">
          <button className="search__add-books">
            <Link
              to={navigate("/admin/users/add")}
              className="search__add-link"
            >
              Добавить пользователя
            </Link>
          </button>
          <p className="menu__logout admin__logout" onClick={logout}>
            Выйти из аккаунта
          </p>
        </div>
      </div>
      <div className="admin__users-content">
        <AdminUsersCard />
        <AdminUsersCard />
        <AdminUsersCard />
        <AdminUsersCard />
        <AdminUsersCard />
      </div>
    </div>
  );
}

export default Users;
