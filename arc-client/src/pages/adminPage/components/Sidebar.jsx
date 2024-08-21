import PropTypes from "prop-types";
import {
  FaTachometerAlt,
  FaSun,
  FaMoon,
  FaUser,
  FaCaretDown,
  FaEllipsisV,
  FaGraduationCap,
  FaHandHoldingUsd,
  FaSchool,
  FaBook,
  FaFile,
  FaPlay,
  FaBookOpen,
  FaQuestion,
  FaFolderPlus,
  FaLayerGroup,
} from "react-icons/fa";
import { useState } from "react";
import logo from "../../../assets/images/arc-logo.png";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FaTachometerAlt className="w-5 h-5" />,
    href: "#",
    bgColor: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
  },
  {
    title: "Users",
    icon: <FaUser className="w-5 h-5" />,
    href: "#",
    bgColor: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
    subItems: [
      {
        title: "Students List",
        href: "#",
        icon: <FaGraduationCap className="w-5 h-5" />,
        bgColor: "bg-orange-600",
        hoverColor: "hover:bg-orange-700",
      },
      {
        title: "Enrolled Students",
        href: "#",
        icon: <FaHandHoldingUsd className="w-5 h-5" />,
        bgColor: "bg-orange-600",
        hoverColor: "hover:bg-orange-700",
      },
    ],
  },

  //add item Academics and subitems curriculum subjects chapters
  {
    title: "Academics",
    icon: <FaGraduationCap className="w-5 h-5" />,
    href: "#",
    bgColor: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
    subItems: [
      {
        title: "Curriculum",
        href: "#",
        icon: <FaSchool className="w-5 h-5" />,
        bgColor: "bg-orange-600",
        hoverColor: "hover:bg-orange-700",
      },
      {
        title: "Subjects",
        href: "#",
        icon: <FaBook className="w-5 h-5" />,
        bgColor: "bg-orange-600",
        hoverColor: "hover:bg-orange-700",
      },
      {
        title: "Chapters",
        href: "#",
        icon: <FaFile className="w-5 h-5" />,
        bgColor: "bg-orange-600",
        hoverColor: "hover:bg-orange-700",
      },
    ],
  },

  //add item Manage library and subitems recorded videos, notes, previous questions, create paper
  {
    title: "Manage Library",
    icon: <FaLayerGroup className="w-5 h-5" />,
    href: "#",
    bgColor: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
    subItems: [
      {
        title: "Recorded Videos",
        href: "#",
        icon: <FaPlay className="w-5 h-5" />,
        bgColor: "bg-orange-600",
        hoverColor: "hover:bg-orange-700",
      },
      {
        title: "Notes",
        href: "#",
        icon: <FaBookOpen className="w-5 h-5" />,
        bgColor: "bg-orange-600",
        hoverColor: "hover:bg-orange-700",
      },
      {
        title: "Previous Questions",
        href: "#",
        icon: <FaQuestion className="w-5 h-5" />,
        bgColor: "bg-orange-600",
        hoverColor: "hover:bg-orange-700",
      },
      {
        title: "Create Paper",
        href: "#",
        icon: <FaFolderPlus className="w-5 h-5" />,
        bgColor: "bg-orange-600",
        hoverColor: "hover:bg-orange-700",
      },
    ],
  },
];

const Sidebar = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <>
      {/* Icon button to open the drawer */}
      <div className="fixed top-4 left-4 z-50">
        <button
          className={`text-white p-3 rounded-full transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-64" : "translate-x-0"
          }`}
          type="button"
          onClick={toggleDrawer}
        >
          <FaEllipsisV className="-ms-5 w-6 h-6 text-orange-500" />
        </button>
      </div>

      {/* Drawer component */}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform duration-300 shadow-lg shadow-orange-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
        aria-labelledby="drawer-navigation-label"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between">
          <h5
            id="drawer-navigation-label"
            className={`text-base font-semibold uppercase flex items-center ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <img src={logo} alt="logo" className="w-10 h-10" />
            <span className="ms-7 text-2xl text-orange-500">Arcedemy</span>
          </h5>
        </div>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-4 font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`flex items-center p-2 rounded-lg w-full ${item.bgColor} text-white ${item.hoverColor} transition-colors duration-200`}
                    >
                      {item.icon}
                      <span className="ms-4 text-xl">{item.title}</span>
                      <FaCaretDown
                        className={`ms-auto w-5 h-5 transform transition-transform duration-200 ${
                          openDropdownIndex === index
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                        openDropdownIndex === index ? "max-h-60" : "max-h-0"
                      }`}
                    >
                      <ul className="mt-1 space-y-2 p-1 bg-orange-600 rounded-lg">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a
                              href={subItem.href}
                              className={`flex items-center p-2 rounded-lg ${subItem.bgColor} text-white ${subItem.hoverColor} transition-colors duration-200`}
                            >
                              {subItem.icon}
                              <span className="ms-4">{subItem.title}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className={`flex items-center p-2 rounded-lg ${item.bgColor} text-white ${item.hoverColor} transition-colors duration-200`}
                  >
                    {item.icon}
                    <span className="ms-4 text-xl">{item.title}</span>
                  </a>
                )}
              </li>
            ))}
            <li>
              <label className="flex items-center cursor-pointer gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  className="toggle theme-controller"
                />
                {isDarkMode ? (
                  <FaMoon className="w-6 h-6 text-blue-600" />
                ) : (
                  <FaSun className="w-6 h-6 text-yellow-500" />
                )}
                <span className="label-text">
                  {isDarkMode ? "Dark mode" : "Light mode"}
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

// Define PropTypes for the Sidebar component
Sidebar.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Sidebar;