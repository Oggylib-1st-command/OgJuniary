import './catalog.scss'
import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'

function Catalog(){
  
  return(
    <div className='catalog__inner'>
      <Header/>
      <p>This is Catalog</p>
    </div>
  )
}

export default Catalog;