import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [viewTask, setViewTask] = useState();
  const params = useParams();

  const themeClass = darkMode ? "dark" : "light";

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const fetchTasks = async () => {
    try {
      const responce = await axios.get("http://localhost:5050/tasks");
      setTasks(responce.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tasks.length === 0) {
      fetchTasks();
    }
  }, [tasks, params.id]);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        tasks,
        fetchTasks,
        viewTask,
        setViewTask,
      }}
    >
      <div className={themeClass}>{children}</div>
    </DarkModeContext.Provider>
  );
};
