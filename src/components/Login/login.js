import './login.scss'
import userIcon from './../../assets/icons/user-icon.svg'
import password from './../../assets/icons/password-icon.svg'
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function Login(props){
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

  console.log(props);
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
        },[user]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

  return(
  <div className="container">
    <div className="form__inner">
      <form className="form__signin" action="">
        <h2 className="form__title">Welcome Back!</h2>
        <label className="form__label">
          Username
          <img className="form__icon" src={userIcon} alt=""/>
          <input className="form__input" type="text" placeholder="Username"/>
        </label>
        <label className="form__label">
          Password
          <img className="form__icon" src={password} alt=""/>
          <input className="form__input" type="password" placeholder="Password"/>
        </label>
        <button className="form__singin-btn">Sign in</button>
        <p className="form__subtext">Or continue with</p>
        <div className='btn__container'>{profile ? <button onClick={()=>login}>Sign in</button> : <h1>Hi ept</h1> }</div>
      </form>
    </div>
  </div>
  );
}

export default Login;

