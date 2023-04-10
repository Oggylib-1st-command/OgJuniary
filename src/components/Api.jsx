import Cookies from 'js-cookie'
import { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'



export const CheckCokies = () =>{
    const [ profile ] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        Cookies.get('profile');
   },[profile])
   if(profile.length === 0)
   {
    navigate('/login')
   }
}