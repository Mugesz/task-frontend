import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DarkModeContext } from "./Context";

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // const handleLogout = () => {
  //   alert("Are you sure you want to logout");
  //   logout();
  //   navigate("/");
  // };

  return (
    <nav className="navbar navbar-expand-lg bgforNav fixed-top">
      <div className="container-fluid">
        <Link
          className="btn text-light"
          to={"/"}
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={
                  darkMode ? "nav-link text-light" : "nav-link text-light "
                }
                to="/create-task"
                aria-current="page"
              >
                Create task
              </Link>
            </li>
            <li className="nav-item">
              <button
                className={
                  darkMode ? " btn btn-light" : "btn btn-secondary"
                }
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
            // onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
