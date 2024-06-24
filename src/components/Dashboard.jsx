import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "./Context";
import axios from "axios";
import { config } from "../confij";

const Dashboard = () => {
  const { tasks, fetchTasks } = useContext(DarkModeContext);
  const [thisMonthTasks, setThisMonthTasks] = useState([]);
  const [nextMonthTasks, setNextMonthTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tasks) {
      const currentDate = new Date();
      const thisMonth = currentDate.getMonth() + 1;
      const nextMonth = (thisMonth % 12) + 1;

      const thisMonthFiltered = tasks.filter(
        (task) => new Date(task.date).getMonth() + 1 === thisMonth
      );

      const nextMonthFiltered = tasks.filter(
        (task) => new Date(task.date).getMonth() + 1 === nextMonth
      );

      const completedTasksFiltered = tasks.filter(
        (task) => new Date(task.date) < currentDate
      );

      setThisMonthTasks(thisMonthFiltered);
      setNextMonthTasks(nextMonthFiltered);
      setCompletedTasks(completedTasksFiltered);
    }
  }, [tasks]);

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${config.Api}/tasks/${id}`);
      alert("Task Deleted");
      fetchTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (tasks.length === 0) {
    return <div>Loading...</div>;
  }

  const renderTasks = (taskList, categoryTitle) => {
    return (
      <div className="col-sm-6">
        <h2>{categoryTitle}</h2>
        {taskList.length > 0 ? (
          taskList.map((item, index) => (
            <div className="card bgcolour mt-2" key={index}>
              <div className="card-body" style={{ marginBottom: "15px" }}>
                <h3 className="card-title">Title: {item.title}</h3>
                <p className="card-text">To Do: {item.about}</p>
                <footer className="blockquote-footer">Date: {item.date}</footer>
                <Link to={`/edit-task/${item._id}`} className="btn btn-warning">
                  Edit
                </Link>
                <Link to={`/tasks/${item._id}`}>
                  <button className="btn btn-info leftmargin">View</button>
                </Link>
                <button
                  onClick={() => deleteTask(item._id)}
                  className="btn btn-danger leftmargin"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks in this category.</p>
        )}
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {renderTasks(thisMonthTasks, "This Month's Tasks")}
        {renderTasks(nextMonthTasks, "Next Month's Tasks")}
        {renderTasks(completedTasks, "Completed Tasks")}
      </div>
    </div>
  );
};

export default Dashboard;
