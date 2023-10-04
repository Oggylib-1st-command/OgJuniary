import "./Users.scss";
import { useState, useEffect } from "react";
import { AdminUsersCard } from "../adminUsersCard/AdminUsersCard";
import { AdminUsersDelete } from "../adminUsersDelete/AdminUsersDelete";
import { AdminUsersAdd } from "../adminUsersAdd/AdminUsersAdd";
import { TakenBook } from "../adminTakenBook/TakenBook";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useInfoBook } from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  axiosAllCatalogeUser,
  axiosSortCatalogeUser,
  removeSortUsers,
} from "../../../store/users/UserSlice";
import EmptyList from "../../EmptyList/EmptyList";

const names = ["По алфавиту(убывание)", "По алфавиту(возрастание)"];

function Users() {
  const dispatch = useDispatch();
  const allUser = useSelector((state) => state.users.allUsers.user);
  const searchUser = useSelector((state) => state.users.searchUsers.searchUser);
  const sortUser = useSelector((state) => state.users.sortUsers.sortUser);
  const [finalSetUsers, setFinalSetUsers] = useState([]);
  const [userDelete, setUserDelete] = useState(false);
  const [userAdd, setUserAdd] = useState(false);
  const [userId, setUserId] = useState();
  const [name, setName] = useState("");
  const [userTaken, setUserTaken] = useState(false);
  const [sort, setSort] = useState([]);
  const { book } = useInfoBook();
  const [control, setControl] = useState(false);

  useEffect(() => {
    dispatch(axiosAllCatalogeUser());
  }, [userAdd, userDelete]);

  useEffect(() => {
    if (book.length > 0) {
      setControl(book.filter((data) => data.control === 2));
    }
  }, [book]);

  useEffect(() => {
    if (searchUser.length !== 0) {
      setFinalSetUsers(searchUser);
    } else if (sortUser.length !== 0) {
      setFinalSetUsers(sortUser);
    } else {
      setFinalSetUsers(allUser);
    }
  }, [searchUser, allUser, sortUser]);

  const handleDelete = (id) => {
    setUserId(id);
    setUserDelete(!userDelete);
  };

  const handleTaken = (id) => {
    setUserId(id);
    setUserTaken(!userTaken);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    setUserAdd(!userAdd);
  };

  const getSort = (value) => {
    dispatch(removeSortUsers());
    dispatch(axiosSortCatalogeUser(value));
  };

  const handleChange = (event) => {
    setName(event.target.value);
    getSort(event.target.value);
  };

  console.log(searchUser);
  return (
    <div
      className={
        userDelete || userAdd ? "admin__users disactive" : "admin__users"
      }
    >
      <div className="admin__users-top">
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={name}
              onChange={handleChange}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name} id="menu-item-select">
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <div className="admin__info">
          <button className="admin__add-users" onClick={(e) => handleAdd(e)}>
            Добавить пользователя
          </button>
        </div>
      </div>
      <div className="admin__users-content">
        {userDelete && (
          <AdminUsersDelete handleDelete={handleDelete} id={userId} />
        )}
        {userAdd && <AdminUsersAdd handleAdd={handleAdd} />}
        {userTaken && <TakenBook handleTaken={handleTaken} id={userId} />}
        {finalSetUsers.length === 0 || finalSetUsers[0] === "NotFound" ? (
          <EmptyList
            title={undefined}
            img={"EmptyCatalog"}
            text={"В базе нет людей"}
          />
        ) : (
          finalSetUsers.map((e) => (
            <AdminUsersCard
              key={e.id}
              id={e.id}
              handleDelete={handleDelete}
              userName={e.name}
              surname={e.surname}
              mail={e.email}
              handleTaken={handleTaken}
              control={control}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Users;
