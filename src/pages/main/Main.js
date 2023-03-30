import {Link} from 'react-router-dom'
import './main.scss'

import Header from '../../components/Header/Header'
import React,{useState,useEffect} from 'react'


function Main(){
  
  return(
    <div className='main__header'>
      <Header/>
      <Link to='/login'>Login</Link>      
      <p>This is main</p>
    </div>
    
  )
}

export default Main;