import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"; // Import Link from react-scroll
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
          : "bg-transparent bg-opacity-80 backdrop-blur-lg text-white font-medium"
      }`}
    >
      {/* Navbar Start */}
      <div className="navbar-start flex items-center">
        {/* Mobile Menu Toggle Button */}
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
          {/* Mobile Navigation Menu */}
          <ul
            tabIndex={0}
            className={`menu menu-lg backdrop-blur-lg font-semibold dropdown-content rounded-lg z-[10] mt-3 w-[90vw] max-w-xs p-3 shadow-lg text-lg transition-all ${
              navbarScrolled
                ? "bg-slate-200 bg-opacity-95 text-orange-500"
                : "bg-slate-100 bg-opacity-95 text-orange-500"
            }`}
          >
            <li>
              <ScrollLink to="home" smooth={true} duration={500} className="text-lg hover:bg-orange-400 hover:text-white">
                Home
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="about" smooth={true} duration={500} className="text-lg hover:bg-orange-400 hover:text-white">
                About
              </ScrollLink>
            </li>
            <li>
            <ScrollLink to="stats" smooth={true} duration={500} className="text-lg hover:bg-orange-400 hover:text-white">
              Stats
            </ScrollLink>
          </li>
            <li>
              <ScrollLink to="service" smooth={true} duration={500} className="text-lg hover:bg-orange-400 hover:text-white">
                Service
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="features" smooth={true} duration={500} className="text-lg hover:bg-orange-400 hover:text-white">
                FAQ
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="contact" smooth={true} duration={500} className="text-lg hover:bg-orange-400 hover:text-white">
                Contact
              </ScrollLink>
            </li>
            <li>
              <Link to="/mcqsolver" className="text-lg hover:bg-orange-400 hover:text-white">
                Mcq Solver
              </Link>
            </li>
            {/* Past Papers Dropdown */}
            <li className="relative">
              <details>
                <summary className="text-lg cursor-pointer hover:bg-orange-400 hover:text-white">
                  Past Papers
                </summary>
                <ul className="absolute -left-5 w-full bg-orange-200 rounded-lg shadow-md bg-opacity-95 mt-2">
                  <li>
                    <Link to="/cambridge" className="block px-4 py-2 hover:bg-orange-500 hover:text-white">
                      Cambridge
                    </Link>
                  </li>
                  <li>
                    <Link to="/edexcel" className="block px-4 py-2 hover:bg-orange-500 hover:text-white">
                      Edexcel
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        {/* Logo */}
        <a href="#home" className="flex items-center transition-transform duration-500 ease-in-out hover:scale-95">
          <img className="ml-0 md:ml-20" src={arcLogo} width={70} alt="Arcedemy" />
        </a>
      </div>
      {/* Navbar Center */}
      <div className="navbar-center ml-0 hidden xl:flex flex-grow justify-center">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li>
            <ScrollLink to="home" smooth={true} duration={500} className="hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded">
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="about" smooth={true} duration={500} className="hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded">
              About
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="stats" smooth={true} duration={500} className="hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded">
              Stats
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="service" smooth={true} duration={500} className="hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded">
              Service
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="features" smooth={true} duration={500} className="hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded">
              Features
            </ScrollLink>
          </li>
          <li>
            <Link to="/mcqsolver" className="hover:bg-orange-500 hover:text-gray-200">
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
