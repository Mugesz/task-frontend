import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ProtuctedRoute from "./components/ProtuctedRoute";
import { DarkModeProvider } from "./components/Context";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import ViewTask from "./components/ViewTask";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>  
          <Route element={<ProtuctedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
            <Route path="/tasks/:id" element={<ViewTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
