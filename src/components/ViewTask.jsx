import React, { useContext, useEffect } from "react";
import { DarkModeContext } from "./Context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ViewTask = () => {
  const params = useParams();
  const { viewTask, setViewTask } = useContext(DarkModeContext);

  const fetchSingletask = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/tasks/${params.id}`
      );
      setViewTask(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingletask();
  }, [params.id, viewTask]);

  if (!viewTask || viewTask.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div key={viewTask.id} className="container-fluid">
      <div className="card colorbg">
        <h1 className="card-header text-center">
          {" "}
          <b>Title</b> : {viewTask.title}
        </h1>
        <p className="card-body  text-center">
          {" "}
          <b>About</b> : {viewTask.about}
        </p>
        <footer className="blockquote-footer  text-center">
          {" "}
          <b>Exp-Date</b> : {viewTask.date}
        </footer>
      </div>
    </div>
  );
};

export default ViewTask;
