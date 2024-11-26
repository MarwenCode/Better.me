import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
  faSearch,
  faGraduationCap,
  faUsers,
  faComments,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../redux/authSlice/authSlice";
import ProfileSettingsModal from "./ProfileSettingsModal";
import "./navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/assets/logo.png"
          alt="Logo"
        />
        <h1 className="sr-only">Better.me</h1>
      </Link>
      <div className="main-nav-items">
        {token && (
          <>
            <div className={`search-bar ${searchFocused ? "focused" : ""}`}>
              <span className="search-button">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search..."
              />
            </div>
            <Link className="main-nav-item" to="/" data-label="home">
              <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link className="main-nav-item" to="/journeys" data-label="Journeys">
              <FontAwesomeIcon icon={faGraduationCap} />
            </Link>
            <Link className="main-nav-item" to="/communities" data-label="Communities">
              <FontAwesomeIcon icon={faUsers} />
            </Link>
            <Link className="main-nav-item" to="/messages" data-label="Messages">
              <FontAwesomeIcon icon={faComments} />
            </Link>
            <span
              className="main-nav-item"
              onClick={() => setIsModalOpen(true)}
              data-label="Profile"
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faUserCircle} />
            </span>
            <span
              className="main-nav-item"
              onClick={handleLogout}
              data-label="Sign out"
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </span>

       
            <div className="modalBackGround">
            {isModalOpen && (
              <ProfileSettingsModal onClose={() => setIsModalOpen(false)} />
            )}

            </div>
           
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
