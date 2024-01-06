import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, login } from "./authService";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Please enter your email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address"; // checks the valid email address
      }

      if (!values.password.trim()) {
        errors.password = "Please enter the Password";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
          values.password
        )
      ) {
        errors.password = "Please enter a strong password"; // Corrected to "errors.password" and updated error message
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        await login(values);
        formik.resetForm();
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        alert("failed");
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100  login-background">
      <div className="container  mt-5 shadow p-3 mb-5  rounded inside-bg">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3 className="text-center">
              <u>Welcome Back</u>
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  {" "}
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control "
                  autoComplete="true"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="text-danger">{formik.errors.email}</span>
              </div>
              <br />
              <div className="mb-3">
                <label className="form-label" htmlFor="pass">
                  Password:
                </label>
                <input
                  type="password"
                  id="pass"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control"
                />
                <span className="text-danger">{formik.errors.password}</span>
              </div>
              <br />
              <div className="mb-3">
                <input
                  type="submit"
                  name="submit"
                  value="Login"
                  className="btn btn-primary"
                />
              </div>
            </form>
            <div className="text-center">
              <Link className="btn" to="/signup">
                Create an account? Signup!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
