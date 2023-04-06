import './notfound.scss'
import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'


function NotFound(){
  
  return(
    <div className='notfound__inner'>
      <Header/>
      <p>404 page not found</p>
    </div>
  )
}

export default NotFound;