import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./Context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../confij";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode, fetchTasks } = useContext(DarkModeContext);
  const [loading, setLoading] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      title: "",
      about: "",
      date: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "Title is mandatory";
      }
      if (!values.about) {
        errors.about = "Task needs to be created";
      }
      if (!values.date) {
        errors.date = "Please provide a valid date";
      } else if (new Date(values.date) < new Date()) {
        errors.date = "Please provide a future date";
      }
      return errors;
    },
    onSubmit: async (values, formikbag) => {
      setLoading(true);
      try {
        await axios.put(`${config.Api}/tasks/${id}`, values);
        formikbag.resetForm();
        navigate("/");
        fetchTasks();
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchSingletask = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.Api}/tasks/${id}`);
        formik.setValues(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingletask();
  }, [id]);

  return (
    <div>
      <div
        className={`d-flex align-items-center justify-content-center vh-90 ${
          darkMode ? "dark" : "light"
        }`}
      >
        <div className="container mt-3 shadow p-3 mb-5 rounded bg-warning">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h3 className="text-center">
                <u>Edit Task</u>
              </h3>
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  <div className="input-container mb-3">
                    <label className="form-label" htmlFor="title">
                      Edit Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Change Title..."
                      className="form-control input-field"
                      autoComplete="true"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="text-danger">
                      {formik.touched.title && formik.errors.title}
                    </span>
                  </div>
                  <div className="input-container mb-3">
                    <label className="form-label" htmlFor="about">
                      Change About:
                    </label>
                    <textarea
                      type="text"
                      id="about"
                      name="about"
                      placeholder="Task to be done ..."
                      className="form-control input-field"
                      autoComplete="true"
                      value={formik.values.about}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="text-danger">
                      {formik.touched.about && formik.errors.about}
                    </span>
                  </div>
                  <div className="input-container mb-3">
                    <label className="form-label" htmlFor="date">
                      Edit Date:
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control input-field"
                      autoComplete="true"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="text-danger">
                      {formik.touched.date && formik.errors.date}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="col-lg-12 mt-4">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value={"Update"}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
