import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import {useNavigate,} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './login.scss'


import userIcon from './../../assets/icons/user-icon.svg'
import passwordIcon from './../../assets/icons/password-icon.svg'



function Login(){
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const navigate = useNavigate();

  const login = useGoogleLogin({
       onSuccess: (codeResponse) => setUser(codeResponse),
       onError: (error) => console.log('Login Failed:', error)
   });
   useEffect(() => {
            if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
            }
        },[user]);
    useEffect(()=>{
      if(profile.length !== 0)
      {
        console.log(typeof profile);
        Cookies.set("profile", JSON.stringify(profile), {
        expires: 7,});
        navigate('/catalog')
      }
    },[profile])

    const handleForm=()=>{
      if((email === 'login') && (password === 'password')){
        navigate('/admin')
      }else{
        console.log('Error form');
      }
    }

  return(
  <div className="container">
    <div className="form__inner">
      <form className="form__signin" action="">
        <h2 className="form__title">Welcome Back!</h2>
        <label className="form__label">
          Username
          <img className="form__icon" src={userIcon} alt=""/>
          <input className="form__input" type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Username"/>
        </label>
        <label className="form__label">
          Password
          <img className="form__icon" src={passwordIcon} alt=""/>
          <input className="form__input" type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
        </label>
        <button className="form__singin-btn" onClick={handleForm}>Sign in</button>
        <p className="form__subtext">Or continue with</p>
      </form>
        <button className="form__google-btn" onClick={()=>login()}>Sign In</button>
    </div>
  </div>
  );
}

export default Login;

