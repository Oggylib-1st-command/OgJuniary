import './catalog.scss'
import { useState,useEffect } from 'react'
import axios from 'axios';
import Card from '../../components/Card/Card'


function Catalog(){
  const [info,setInfo] = useState([]);
  useEffect(()=>{
    const getCardInfo = async()=>{
      const request = await axios.get('http://localhost:8000/');
      try{
        setInfo(request.data);
      }catch(error){
        console.error(error);
      }
    }
    getCardInfo();
  },[])
  return(
    <div className='catalog__inner'>
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
          info.map((obj)=>
            <Card key={obj.id} titleLink={obj.title.split(' ').join('')} author={obj.author} title={obj.title} genre={obj.genre}/>
          )
        }
      </div>
    </div> 
  )
}

export default Catalog;