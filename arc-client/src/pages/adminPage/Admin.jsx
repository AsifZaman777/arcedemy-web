import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TopPanel from "./components/shared/TopPanel";

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
    <div>
      <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <TopPanel isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Admin;
