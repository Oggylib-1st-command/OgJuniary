import "./Users.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./../../useAuth";
import { AdminUsersCard } from "../adminUsersCard/AdminUsersCard";
import Cookies from "js-cookie";
import { AdminUsersDelete } from "../adminUsersDelete/AdminUsersDelete";
import { AdminUsersAdd } from "../adminUsersAdd/AdminUsersAdd";

function Users() {
  // const [user, setUser] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentpage, setCurrentpage] = useState(1);
  // const [bookperpage] = useState(10);

  // useEffect(() => {
  //   const getUser = async () => {
  //     setLoading(false);
  //     // const res = await axios.get("http://localhost:8000/users/");
  //     // setUser(res.data);
  //     setLoading(true);
  //   };
  //   getUser();
  // }, []);
  const [userDelete, setUserDelete] = useState(false);
  const [userAdd, setUserAdd] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    setUserDelete(!userDelete);
    console.log("delet");
  };
  const handleAdd = (e) => {
    e.stopPropagation();
    setUserAdd(!userAdd);
    console.log("add");
  };
  const navigate = useNavigate();
  const { signout } = useAuth();
  const logout = () => {
    Cookies.remove("admin");
    signout(() => navigate("/login", { replace: true }));
  };
  return (
    <div
      className={
        userDelete || userAdd ? "admin__users disactive" : "admin__users"
      }
    >
      <div className="admin__users-top">
        <select className="admin__users-sort">
          <option value="">Тетруха топ</option>
          <option value="">Но</option>
          <option value="">Лапшин лучше</option>
        </select>
        <div className="admin__info">
          <button className="search__add-books" onClick={(e) => handleAdd(e)}>
            Добавить пользователя
          </button>
          <p className="menu__logout admin__logout" onClick={logout}>
            Выйти из аккаунта
          </p>
        </div>
      </div>
      <div className="admin__users-content">
        {userDelete && <AdminUsersDelete handleDelete={handleDelete} />}
        {userAdd && <AdminUsersAdd handleAdd={handleAdd} />}
        <AdminUsersCard handleDelete={handleDelete} />
        <AdminUsersCard handleDelete={handleDelete} />
        <AdminUsersCard handleDelete={handleDelete} />
        <AdminUsersCard handleDelete={handleDelete} />
        <AdminUsersCard handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Users;
