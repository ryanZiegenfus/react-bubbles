import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

export default function Login (props) {
  const [stateCreds, setStateCreds] = useState({
      credentials: {
          username: '',
          password: ''
      }
  });

  const handleChange = (event) => {
      setStateCreds({...stateCreds, credentials: {...stateCreds.credentials, [event.target.name]: event.target.value}});
      console.log(stateCreds)
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      axiosWithAuth()
          .post('/login', stateCreds.credentials)
          .then(res => {
              localStorage.setItem('token', res.data.payload);
              props.history.push('/bubbles')
          })
          .catch(err => console.log(err));
  }

  return(
      <form onSubmit={event => handleSubmit(event)} className="loginForm">
          <input type="text" placeholder="Username" name="username" value={stateCreds.credentials.username} onChange={ event => handleChange(event)}/>
          <input type="password" placeholder="password" name="password" value={stateCreds.credentials.password} onChange={ event => handleChange(event)}/>
          <button type="submit">Log in</button>
      </form>
  )
}
