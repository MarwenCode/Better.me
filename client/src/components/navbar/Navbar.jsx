
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faSearch, faGraduationCap, faUsers, faComments } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../redux/authSlice/authSlice';
import "./navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [searchFocused, setSearchFocused] = useState(false)

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src="/assets/logo.png" alt="Logo" />
        <h1 className="sr-only">Better.me</h1>
      </Link>
      <div className="main-nav-items">
        {token && (
          <>
           <div className={`search-bar ${searchFocused ? 'focused' : ''}`}>
              <span className="search-button">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} />
            </div>
            <Link className="main-nav-item" to="/journeys">
              <FontAwesomeIcon icon={faGraduationCap} />
            
            </Link>
            <Link className="main-nav-item" to="/communities">
              <FontAwesomeIcon icon={faUsers} />
          
            </Link>
            <Link className="main-nav-item" to="/messages">
            <FontAwesomeIcon icon={faComments} />
          
            </Link>
            {/* <Link className="main-nav-item" to="/profile">
              <FontAwesomeIcon icon={faUserCircle} />
              <span className="sr-only">{user?.username}</span>
            </Link> */}
            <Link className="main-nav-item" to="/">
            <FontAwesomeIcon icon={faUserCircle} />
            
          </Link>
            <span className="main-nav-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="sr-only">Sign out</span>
            </span>
            
          </>
        )  
      }
        
        
      </div>
    </nav>
  );
};

export default Navbar;














