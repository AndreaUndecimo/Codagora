import React, {useState} from 'react';
import './Login.css';

export default function Login ({getUserToken}) {

  const [userDetails, setUserDetails] = useState({email: "", password: ""});

  const submitHandle = e => {
    e.preventDefault();
    getUserToken(userDetails)
  }
  
  return (
    <form onSubmit={submitHandle}>
        <div className="login-box">
          <div className="title-box">
            <h1>Login</h1>
          </div>

          <div className="input_fields">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email_field"
              name="email"
              autoComplete="off"
              onChange={e => setUserDetails({...userDetails, email: e.target.value})}
              />

            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password_field"
              name="password"
              onChange={e => setUserDetails({...userDetails, password: e.target.value})}
              />

          </div>

          <input type="submit" value="LOGIN" id="login-btn"/>
      </div>
    </form>
  )
}
