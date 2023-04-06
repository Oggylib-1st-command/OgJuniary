import './catalog.scss'
import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card'

const arr=[
  {
    author:'Лев Николаевич Толстой',
    title:'Война и мир',
    genre:'Вода, ужасы, комедия',
  },
  {
    author:'Иван Васильевич',
    title:'Что-то с чем-то',
    genre:'Я хэ',
  },
  {
    author:'Тетруашвили Елена Викторовна',
    title:'Вы все говно',
    genre:'Повседневность',
  },
  {
    author:'kkkkkkk',
    title:'kkkkkkk',
    genre:'kkkkkkk',
  }
]
function Catalog(){
  return(
    <div className='catalog__inner'>
      <Header/>
      <div className='catalog__content'>
        <div className="catalog__search">
          <div className="catalog__filtration">
            Ждесь будет много гемороя
            </div>
          <select className="catalog__sort">
            <option>По новизне</option>
            <option>По популярности</option>
            <option>По алфавиту</option>
          </select>
        </div>
        {
          arr.map((obj)=>
            <Card author={obj.author} title={obj.title} genre={obj.genre}/>
          )
        }
      </div>
    </div> 
  )
}

export default Catalog;