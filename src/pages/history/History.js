import './history.scss'
import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'


function History(){
  
  return(
    <div className='history__inner'>
      <Header/>
      <p>This is history</p>
    </div>
  )
}

export default History;