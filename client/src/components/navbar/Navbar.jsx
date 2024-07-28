import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../redux/authSlice/authSlice';
import "./navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

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
        {token ? (
          <>
            <div className="search-bar">
            <span className="search-button">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input placeholder="Search Journey" />
         
            </div>
            <Link className="main-nav-item" to="/journeys">
              Journeys
            </Link>
            <Link className="main-nav-item" to="/communities">
              Communities
            </Link>
            <Link className="main-nav-item" to="/profile">
              <FontAwesomeIcon icon={faUserCircle} />
              {user?.username}
            </Link>
            <span className="main-nav-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Sign out
            </span>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;











