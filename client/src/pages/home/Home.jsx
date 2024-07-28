import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
  
    React.useEffect(() => {
      if (!token) {
        navigate('/login');
      }
    }, [token, navigate]);
  
    return (
      <div>
        <h1>Profile Page</h1>
        {token ? <p>You are logged in.</p> : <p>Redirecting to login...</p>}
      </div>
    );
  };
export default Home