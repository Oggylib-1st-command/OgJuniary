import './navbar.scss'
import { Link } from "react-router-dom";
import React,{useState,useEffect} from 'react'


import User from './../../assets/icons/user-avatar.png'
import search from './../../assets/icons/search-icon.svg'


function Navbar(){
  const[active,setActive] = useState(true);
  const[info,setInfo] = useState([]);

  const handleClick = ()=>{
    setActive(current => !current)
  }
  const local = localStorage.getItem('profile')
  console.log(local);
  const zaebali = JSON.parse(local)
  //console.log(zaebali.id);
  return(
    <div className='wrapper'>
      <button className={active ? 'menu__btn' : 'menu__btn menu__btn--active'} onClick={handleClick}>
        <span></span>
      </button>
      <nav className='menu'>
        <ul className={active ? 'menu__list' : 'menu__list menu__list--active'}>
          <li className='menu__list-item'>

            {/* <img className="menu__list-img" src={zaebali.pictures} alt="icons avatar"/>
            <div className="menu__list-info">
              <p className="menu__fullname">{zaebali.name}</p>
              <p className="menu__email">{zaebali.email}</p>
            </div> */}
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