import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import { isAuthenticated } from "./authService";

const ProtuctedRoute = () => {
  // const auth = isAuthenticated();
  return (
    <>
      <div>
        <div style={{ marginTop: "50px" }}>
          <Navbar />
        </div>
        <hr style={{ color: "grey" }} />
        <Outlet />
      </div>
    </>
  );
};

export default ProtuctedRoute;
