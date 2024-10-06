import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess, setError } from '../../redux/authSlice/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./login.scss";

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { identifier, password });
      const { token, user } = response.data;
      dispatch(loginSuccess({ token, user }));
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      dispatch(setError(error.response.data.error));
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <main className="signInSection">
        <div className="welcome">
        <p>Welcome To Better.Me, to be the better version of your self</p>
        </div>
      
        <section className="sign-in-content">
     
          <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="identifier">Email or Username</label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">Sign In</button>
          </form>
          <div className="register">
            <Link to='/register'>
            if your do not have an account please click here
            </Link>
           
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;

