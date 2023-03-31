import './favorites.scss'
import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'


function Favorites(){
  
  return(
    <div className='favorites__inner'>
      <Header/>
      <p>This is Favorites</p>
    </div>
  )
}

export default Favorites;