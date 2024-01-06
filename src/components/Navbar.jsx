import React, { useContext, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { logout } from "./authService";
import { DarkModeContext } from "./Context";

const Navbar = () => {
  const navigate = useNavigate()
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    alert("Are you sure want to logout")
    logout();
    navigate("/")
  
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link
          className={
            darkMode ? "navbar-brand btn dark" : "navbar-brand btn light"
          }
          to={"/dashboard"}
        >
          TASKS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link
                className={
                  darkMode ? "nav-link text-light" : "nav-link text-dark "
                }
                to="/create-task"
                aria-current="page"
              >
                Create task
              </Link>
            </li>
            <li class="nav-item">
              <button
                className={darkMode ? " btn btn-light" : "btn btn-secondary"}
                onClick={toggleDarkMode}
              >
                {darkMode ? "Light" : "Dark"}
              </button>
            </li>
          </ul>
        </div>
        <div className="">
          <button
            className="btn btn-danger btn-user btn-block "
            type="submit"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
