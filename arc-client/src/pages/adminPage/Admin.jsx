import { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopPanel from "./components/shared/TopPanel";
import Dashboard from "./components/panels/dashboard/Dashboard";
import CurrentStudents from "./components/panels/dashboard/CurrentStudents";

const Layout = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className={` min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className=" ">
        <TopPanel isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <div className="p-4 mt-4"> {/* Added mt-4 for margin-top */}
          <Outlet /> {/* This is where routed content will be rendered */}
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "autumn"
    );
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Routes>
      <Route
        element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}
      >
        <Route
          path="/"
          element={
            <div className="space-y-4">
              <Dashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
              <CurrentStudents isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default Admin;
