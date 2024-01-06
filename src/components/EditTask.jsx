import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { DarkModeContext } from "./Context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../confij";

const EditTask = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
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
        errors.about = "Task need to be created";
      }
      if (!values.date) {
        errors.date = "Please provide a valid date";
      } else if (new Date(values.date) < new Date()) {
        errors.date = "Please provide a future date";
      }
      return errors;
    },
    onSubmit: async (values, formikbag) => {
      try {
        await axios.put(
          `http://localhost:5050/tasks/edit-task/${id}`,
          values
        );

        formikbag.resetForm();
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        alert("something went wrong");
      }
    },
  });

  useEffect(() => {
    const fetchSingletask = async () => {
      try {
        const response = await axios.get(`${config.taskApi}/tasks/${id}`);
        formik.setValues(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingletask();
  }, []);
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
                    change About:
                  </label>
                  <textarea
                    type="text"
                    id="about"
                    name="about"
                    placeholder="Task to done ..."
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
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
