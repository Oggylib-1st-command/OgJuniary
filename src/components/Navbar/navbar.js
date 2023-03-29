import './navbar.scss'
import User from './../../assets/icons/user-avatar.png'
import React,{useState,useEffect} from 'react'


function Navbar(){
  const[active,setActive] = useState(true);

  const handleClick = ()=>{
    setActive(current => !current)
  }

  return(
    <div className='wrapper'>
      <button className={active ? 'menu__btn' : 'menu__btn menu__btn--active'} onClick={handleClick}>
        <span></span>
      </button>
      <nav className='menu'>
        <ul className={active ? 'menu__list' : 'menu__list menu__list--active'}>
          <li className='menu__list-item'>
            <img className="menu__list-img" src={User} alt="icons avatar"/>
            <div className="menu__list-info">
              <p className="menu__fullname">Василий Васька</p>
              <p className="menu__email">vaskasrc@mail.ru</p>
            </div>
          </li>
          <hr/>
          <li className='menu__list-item'>
            <img className="menu__list-img" src={User} alt=""/>
            <a className="menu__list-link" href="https://google.com">Избранное</a>
          </li>
          <hr/>
          <li className='menu__list-item'>
            <img className="menu__list-img" src={User} alt=""/>
            <a className="menu__list-link" href="https://google.com">Каталог</a>
          </li>
          <hr/>
          <li className='menu__list-item'>
            <img className="menu__list-img" src={User} alt=""/>
            <a className="menu__list-link" href="https://google.com">История</a>
          </li>
          <hr/>
          <li className='menu__list-item'>
            <img className="menu__list-img" src={User} alt=""/>
            <a className="menu__list-link" href="https://google.com">Взятые книги</a>
          </li>
          <hr/>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;