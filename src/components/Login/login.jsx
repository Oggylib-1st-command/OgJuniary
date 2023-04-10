import React, { useState, useEffect} from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import './login.scss'


import userIcon from './../../assets/icons/user-icon.svg'
import passwordIcon from './../../assets/icons/password-icon.svg'
import googleIcon from './../../assets/icons/icon-google.svg'
import Logo from './../../assets/icons/Logo.png'
import { useAuth } from '../useAuth';


function Login(){
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const {signin} = useAuth();
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    const getInfo = async() =>{
      try{
        if(user.length !== 0) {
        const request = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }});
        setProfile(request.data);
        }
      }
      catch(err){
        console.error(err);
      }
    }
    getInfo();
  },[user]);

  useEffect(()=>{
    if(profile.length !== 0)
    {
      Cookies.set("profile", JSON.stringify(profile), {
      expires: 7,});
      signin(user,()=>navigate('/catalog',{replace:true}));
    }
  },[profile])

  const handleForm=(elem)=>{
    elem.preventDefault();
    if((email === 'login') && (password === 'password')){
      navigate('/admin',{replace:true})
    }else{
      alert('Ошибка логина или пароля');
    }
  }

  return(
  <div className="container">
    <div className="container__inner">
      <Link className="header__logo-link" to="/">
        <img className="header__logo" src={Logo} alt="logo icons" />
      </Link>
      <p className="header__logo-text">Oggylib</p>
    </div>
    <div className="form__inner">
      <form className="form__signin" action="">
        <h2 className="form__title">АВТОРИЗАЦИЯ</h2>
        <label className="form__label">
          <img className="form__icon" src={userIcon} alt=""/>
          <input className="form__input" type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Введите email"/>
        </label>
        <label className="form__label">
          <img className="form__icon" src={passwordIcon} alt=""/>
          <input className="form__input" type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Введите пароль"/>
        </label>
        <button className="form__singin-btn" onClick={(e)=>handleForm(e)}>Войти</button>
        <p className="form__subtext">или</p>
      </form>
        <button className="form__google-btn" onClick={()=>login()}>
          <img className="google-icon" src={googleIcon} alt="google icon"/>
          Sign In With Google
          </button>
    </div>
  </div>
  );
}

export default Login;

