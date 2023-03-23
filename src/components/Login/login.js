import './login.scss'
import user from './../../icons/user-icon.svg'
import password from './../../icons/password-icon.svg'
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

function Login(){
//   const login = useGoogleLogin({
//   onSuccess: tokenResponse => console.log(tokenResponse),
// });
let data = new Object();
const btn__click =(e)=>{
  console.log(data.email);
  e.preventDefault();
}
const onSuccess=(res)=>{
  console.log(res);
  data = jwt_decode(res.credential);
  console.log(data)
}

  return(
    <div className="container">
    <div className="form__inner">
      <form className="form__signin" action="">
        <h2 className="form__title">Welcome Back!</h2>
        <h3></h3>
        <p className="form__text">welcome back we missed you</p>
        <label className="form__label">
          Username
          <img className="form__icon" src={user} alt=""/>
          <input className="form__input" type="text" placeholder="Username"/>
        </label>
        <label className="form__label">
          Password
          <img className="form__icon" src={password} alt=""/>
          <input className="form__input" type="password" placeholder="Password"/>
        </label>
        <a className="form__forgot" href="#">Forgot Password?</a>
        <button className="form__singin-btn" type="submit" onClick={btn__click}>Sign in</button>
        <p className="form__subtext">Or continue with</p>
        {/* <button className="form__google-btn" onClick={login}>
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.5272 8.47414H18.7463V8.43391H10.0209V12.3119H15.5C14.7006 14.5693 12.5527 16.1898 10.0209 16.1898C6.80849 16.1898 4.20395 13.5853 4.20395 10.3729C4.20395 7.16048 6.80849 4.55594 10.0209 4.55594C11.5037 4.55594 12.8528 5.11534 13.88 6.02908L16.6222 3.28688C14.8907 1.67316 12.5745 0.677979 10.0209 0.677979C4.66689 0.677979 0.325989 5.01888 0.325989 10.3729C0.325989 15.7269 4.66689 20.0678 10.0209 20.0678C15.3749 20.0678 19.7158 15.7269 19.7158 10.3729C19.7158 9.72285 19.6489 9.08832 19.5272 8.47414Z"
              fill="#FFC107" />
            <path
              d="M10.0209 20.0678C12.5251 20.0678 14.8005 19.1094 16.5209 17.551L13.5203 15.0119C12.5142 15.777 11.2849 16.1908 10.0209 16.1898C7.49926 16.1898 5.35814 14.5819 4.55153 12.338L1.39001 14.7739C2.99452 17.9136 6.25298 20.0678 10.0209 20.0678Z"
              fill="#4CAF50" />
            <path
              d="M19.5272 8.47419H18.7463V8.43396H10.0209V12.3119H15.5C15.1176 13.3863 14.4288 14.3252 13.5188 15.0124L13.5203 15.0115L16.5208 17.5506C16.3085 17.7435 19.7158 15.2204 19.7158 10.3729C19.7158 9.7229 19.6489 9.08837 19.5272 8.47419Z"
              fill="#1976D2" />
            <path
              d="M1.44373 5.86039L4.62899 8.19638C5.49087 6.06253 7.57818 4.55594 10.0208 4.55594C11.5037 4.55594 12.8527 5.11534 13.8799 6.02908L16.6221 3.28688C14.8906 1.67316 12.5745 0.677979 10.0208 0.677979C6.297 0.677979 3.06762 2.78032 1.44373 5.86039Z"
              fill="#FF3D00" />
          </svg>
        </button> */}
        <div className='btn__container'>
          <GoogleLogin
        onSuccess={onSuccess}      
      onError={() => {
         console.log('Login Failed');
        }}
        />
        </div>
      </form>
    </div>
  </div>
  );
}

export default Login;

