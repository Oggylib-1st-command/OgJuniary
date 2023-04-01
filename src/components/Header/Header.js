import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import './header.scss'

import searchIcon from './../../assets/icons/search-icon.svg'
import Navbar from '../Navbar/navbar';

function Header(){
  
  const[active,setActive] = useState(true);
  const[text,setText] = useState("");

  function handleClick(e){
    console.log(text);
    setText('')
    return setActive(!active)
  }
  return(
    <div className='header__inner'>
      <Link className="header__logo-link" to="/">
        <img className="header__logo" src={searchIcon} alt="logo icons" />
      </Link>
      <p className="header__logo-text">Oggylib</p>
      <div className="header__form">
        <input className={active ? "header__form-input": "header__form-input header__form-input--active"} 
        onChange={(e)=>{setText(e.target.value)}} type="text" placeholder='поиск'/>
        <img className="header__form-icon" onClick={handleClick} src={searchIcon} alt="search icon" />
      </div>
      <Navbar/>
    </div>
  )
}

export default Header;