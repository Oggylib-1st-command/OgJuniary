import './navbar.scss'
import { Link } from "react-router-dom";
import React,{useState,useEffect} from 'react'
import Cookies from 'js-cookie';
import { googleLogout } from '@react-oauth/google';


import User from './../../assets/icons/user-avatar.png'
import search from './../../assets/icons/search-icon.svg'


function Navbar(){
  const[active,setActive] = useState(true);
  const[autf,setAutf] = useState(false);
  const[info,setInfo] = useState([]);

  const handleClick = ()=>{
    setActive(current => !current)
  }
  const logout = () => {
        googleLogout();
        Cookies.remove('profile')
        setAutf(false);
        setInfo(null)
    };
  useEffect(()=>{
    const local = Cookies.get("profile")
    console.log(local);
    if(!autf && local)
    {
      setInfo(JSON.parse(local));
      setAutf(true);
    }
  },[autf])
  return(
    <div className='wrapper'>
      <button className={active ? 'menu__btn' : 'menu__btn menu__btn--active'} onClick={handleClick}>
        <span></span>
      </button>
      <nav className='menu'>
        <ul className={active ? 'menu__list' : 'menu__list menu__list--active'}>
          <li className='menu__list-item'>
            {
              autf ?
              (<div>
                <img className="menu__list-img" src={info.picture} alt="icons avatar"/>
                <div className="menu__list-info">
                  <p className="menu__fullname">{info.name}</p>
                  <p className="menu__email">{info.email}</p>
                </div>
                <button className='menu__logout' onClick={logout}>Log Out</button>
              </div>) :
              (
                <div>
                <img className="menu__list-img" src={search} alt="icons avatar"/>
                <div className="menu__list-info">
                  <p className="menu__fullname">Без названия</p>
                  <p className="menu__email">Без названия</p>
                </div>
              </div>
              )
            }
          </li>
          <hr/>
          <li className='menu__list-item'>
            <img className="menu__list-img" src={User} alt=""/>
            <Link className='menu__list-link' exact to="/">Главная</Link>
          </li>
          <hr/>
          <li className='menu__list-item'>
            <img className="menu__list-img" src={User} alt=""/>
            <Link className='menu__list-link' exact to="/catalog">Каталог</Link>
          </li>
          <hr/>
          <li className='menu__list-item'>
            <img className="menu__list-img" src={User} alt=""/>
            <Link className='menu__list-link' exact to="/history">История</Link>
          </li>
          <hr/>
          <li className='menu__list-item'>
            <img className="menu__list-img" src={User} alt=""/>
            <Link className='menu__list-link' exact to="/favorites">Взятые книги</Link>
          </li>
          <hr/>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;