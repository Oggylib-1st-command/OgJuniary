import { GoogleOAuthProvider } from '@react-oauth/google';

import './auth.scss'

import Login from '../../components/Login/login'

function Auth(){
  return(
    <div className='auth__inner'>
      <GoogleOAuthProvider clientId="103408156486-oi1sggasovhdi35bc4av65rrlt2rteus.apps.googleusercontent.com">
        <Login/>
      </GoogleOAuthProvider>
    </div>
  )
}

export default Auth;