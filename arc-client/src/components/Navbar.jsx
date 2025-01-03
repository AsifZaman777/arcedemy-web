import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arcLogo from "../assets/images/icon.png";
import { FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleModal, userLoggedIn }) => {
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setNavbarScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <div
      className={`navbar py-3 shadow-lg fixed w-full top-0 left-0 z-20 transition-colors duration-300 md:px-20 ${
        navbarScrolled
          ? "bg-slate-100 bg-opacity-80 backdrop-blur-xl text-black font-medium"
          : "bg-slate-100 bg-opacity-80 backdrop-blur-lg text-black font-medium"
      }`}
    >
      {/* Navbar Start */}
      <div className="navbar-start flex items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost xl:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-lg backdrop-blur-lg font-semibold dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow text-lg ${
              navbarScrolled
                ? "bg-slate-200 bg-opacity-95 text-orange-500 font-medium shadow-lg"
                : "bg-slate-100 bg-opacity-95 text-orange-500 font-medium shadow-lg"
            }`}
          >
            <li>
              <a
                href="#home"
                className="text-lg hover:bg-orange-400 hover:text-gray-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-lg hover:bg-orange-400 hover:text-gray-200"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#service"
                className="text-lg hover:bg-orange-400 hover:text-gray-200"
              >
                Service
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="text-lg hover:bg-orange-400 hover:text-gray-200"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-lg hover:bg-orange-400 hover:text-gray-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <a
          href="#home"
          className="flex items-center transform transition-transform duration-500 ease-in-out hover:scale-95"
        >
          <img
            className="ml-0 md:ml-20"
            src={arcLogo}
            width={70}
            alt="Arcedemy"
          />
        </a>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center ml-0 hidden xl:flex flex-grow justify-center">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li onClick={()=>{navigate("/#home")}}>
            <a
              href="#home"
              className="hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded"
            >
              Home
            </a>
          </li>
          <li onClick={()=>{navigate("/#about")}}>
            <a
              href="#about"
              className="hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded"
            >
              About
            </a>
          </li>
          <li onClick={()=>{navigate("/#service")}}>
            <a
              href="#service"
              className="hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded"
            >
              Service
            </a>
          </li>
          <li onClick={()=>{navigate("/#features")}}>
            <a
              href="#features"
              className="hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded"
            >
              Features
            </a>
          </li>
          <li>
            <Link
              to="/mcqsolver"
              className="hover:bg-orange-500 hover:text-gray-200"
            >
              Mcq Solver
            </Link>
          </li>
          <li className="dropdown dropdown-hover dropdown-down ml-0">
            <a
              href="#"
              tabIndex={0}
              role="button"
              className="hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded"
            >
              Past papers
            </a>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-orange-200 rounded-box z-[1] w-52 p-2 shadow-md bg-opacity-80"
            >
              <li>
                <Link
                  to="/cambridge"
                  className="hover:bg-orange-500 hover:text-gray-200"
                >
                  Cambridge
                </Link>
              </li>
              <li>
                <Link
                  to="/edexcel"
                  className="hover:bg-orange-500 hover:text-gray-200"
                >
                  Edexcel
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end lg:flex">
        {userLoggedIn ? (
          <div className="text-lg">Welcome Back</div>
        ) : (
          <div className="flex items-center space-x-6 mr-10">
            <div
              className="btn bg-orange-400 border-1 border-white hover:bg-orange-500"
              onClick={toggleModal}
            >
              <span className="text-white text-lg font-thin">Sign up</span>
            </div>
          </div>
        )}
        <a
          href="#contact"
          className="relative inline-block px-5 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-yellow-500 hover:to-red-500 transition-all duration-700 ease-in-out rounded-full mr-2 overflow-hidden shadow-lg hover:shadow-2xl group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out rounded-full blur-lg"></span>
          <FaPhone className="relative inline text-white text-2xl animate-bounce" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
