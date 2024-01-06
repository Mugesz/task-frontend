import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { config } from "../confij";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.firstname) {
        errors.firstname = "Please enter your first name";
      }

      if (!values.lastname) {
        errors.lastname = "Please enter your last name";
      }

      if (!values.email) {
        errors.email = "Please enter your email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password.trim()) {
        errors.password = "Please enter the Password";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
          values.password
        )
      ) {
        errors.password = "Please enter a strong password";
      }

      return errors;
    },
    onSubmit: async (values,formikbag) => {
      try {
        await axios.post(`${config.authApi}/signup`, values);
        alert("user created");
        formikbag.resetForm();
      } catch (error) {
        console.log(error);
        alert("something went wrong");
      }
    },
  });

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 login-background">
      <div className="container mt-5 shadow p-3 mb-5 rounded inside-bg">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3 className="text-center">
              <u>Create an Account</u>
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="firstname">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="form-control"
                  autoComplete="true"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="text-danger">{formik.errors.firstname}</span>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="lastname">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="form-control"
                  autoComplete="true"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="text-danger">{formik.errors.lastname}</span>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  autoComplete="true"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="text-danger">{formik.errors.email}</span>
              </div>
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
              <div className="mb-3 text-center">
                <input
                  type="submit"
                  name="submit"
                  value="Sign Up"
                  className="btn btn-primary"
                />
              </div>
            </form>
            <div className="text-center">
              <Link className="btn" to="/">
                Already have an account? Login!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
