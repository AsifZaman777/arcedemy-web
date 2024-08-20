import { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopPanel from "./components/shared/TopPanel";
import Dashboard from "./components/panels/dashboard/Dashboard";
import CurrentStudents from "./components/panels/dashboard/CurrentStudents";

const Layout = ({ isDarkMode, toggleTheme }) => {
  return (
    <div>
      <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <TopPanel isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="p-0">
        {/* Container for routed content */}
        <Outlet /> {/* This is where routed content will be rendered */}
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
        {/* Wrapping Dashboard and CurrentStudents in a single parent element */}
        <Route
          path="/"
          element={
            <div>
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
