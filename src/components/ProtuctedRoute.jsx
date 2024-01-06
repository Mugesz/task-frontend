import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { isAuthenticated } from "./authService";

const ProtuctedRoute = () => {
  const auth = isAuthenticated();
  return (
    <>
      {auth ? (
        <div>
          <div style={{marginTop:"50px"}}>
            <Navbar />
          </div>
          <hr style={{ color: "grey" }} />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtuctedRoute;
