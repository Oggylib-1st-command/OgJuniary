import "./admin.scss";

import { useState } from 'react'
import Logo from './../../assets/icons/Logo.png'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/useAuth';
import Cookies from 'js-cookie';
import SearchLogo from './../../assets/icons/search-icon.svg'
import SortLogo from './../../assets/icons/icon-sort.svg'
import CatalogLogo from './../../assets/icons/icon-catalog.svg'



function Admin(){
  const [book, AdmBooks] = useState(true);
  const [users, AdmUsers] = useState(false);
  const navigate = useNavigate();
  const { signout } = useAuth();
  const logout = () => {
    Cookies.remove('admin')
    signout(()=>navigate('/login',{replace:true}));
    };


  if (book){
    return(
      <div className='admin__inner'>
        <div className="container__inner">

          <Link className="header__logo-link" to="/admin">
            <img className="header__logo" src={Logo} alt="logo icons" />
          </Link>

          <p className="header__logo-text">Oggylib</p>
          <a className="header__admin-books">Книги</a>
          <a className="header__admin-users" onClick={() => {AdmBooks(false); AdmUsers(true);}}>Пользователи</a>
          <button className='menu__logout' onClick={logout}>Log Out</button> 
        </div>
        <div className='search__inner'>
          <div>

            <div className='sort__inner'>
              <div className="sort__catalog">
                <img src={CatalogLogo}/>
                <p>Каталог</p>
              </div>
              <div className='sort__sort-block'>
                <select className="sort__sorter">
                  <option hidden>Сортировка</option>
                  <option>По популярности</option>
                  <option>По новизне</option>
                  <option>От А до Я</option>
                  <option>От Я до А</option>
                </select>
                <img className='sort__sort-logo' src={SortLogo}/>
              </div>
            </div>
          </div>
          <label className="search__pos">
            <img className='search__logo' src={SearchLogo}/>
            <input className='search__input' type="text" placeholder='Поиск'/>
          </label>
          <button className='search__add-books'>Добавить книгу</button>
        </div>

        <div className='list__inner'>
          <div className='list__books'>
            <div className='list__book-block'>

            </div>
          </div>
        </div>
      </div>
    )
  }

  if (users){
    return(
      <div className='admin__inner'>
        <div className="container__inner">
          <Link className="header__logo-link" to="/admin">
            <img className="header__logo" src={Logo} alt="logo icons" />
          </Link>
          <p className="header__logo-text">Oggylib</p>
          <a className="header__admin-books" onClick={() => {AdmUsers(false); AdmBooks(true);}}>Книги</a>
          <a className="header__admin-users" >Пользователи</a>
          <button className='menu__logout' onClick={logout}>Log Out</button>
        </div>
        <p>ADMIN USERS</p>
      </div>
    )
  }
}
  

export default Admin;
