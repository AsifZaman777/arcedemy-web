import { useState, useEffect } from "react";
import goody1 from "../assets/images/image1.jpg";
import goody2 from "../assets/images/image2.jpg";
import Typewriter from "typewriter-effect";
import arcLogo from "../assets/images/icon.png";
import SignUpModal from "./signup/SignUpModal"; // Correct import for the SignUpModal
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa";

// Global variable to check if user is logged in
var userLoggedIn = false;

const Home = () => {
  // State for image carousel
  const [currentImage, setCurrentImage] = useState(0);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for signup modal

  const images = [goody1, goody2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle modal function
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <div
        className={`navbar py-3 shadow-lg fixed w-full top-0 left-0 z-20 transition-colors duration-300 md:px-20 ${
          navbarScrolled
            ? "bg-slate-100 bg-opacity-80 backdrop-blur-xl text-black font-medium"
            : "bg-slate-100 bg-opacity-80 backdrop-blur-lg text-black font-medium"
        }`}
      >
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
                  ? "bg-slate-200 bg-opacity-95  text-orange-500 font-medium shadow-lg"
                  : "bg-slate-100 bg-opacity-95  text-orange-500 font-medium shadow-lg"
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
                  href="#course"
                  className="text-lg hover:bg-orange-400 hover:text-gray-200"
                >
                  Courses
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
              {/* <li>
                <a
                  href="#ourteam"
                  className="text-lg hover:bg-orange-400 hover:text-gray-200"
                >
                  Our Team
                </a>
              </li> */}
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
            <div className="text-3xl ml-5 hidden md:block">
              {/* <span className="text-orange-500 px-0 py-0 rounded-lg">
                Arcedemy
              </span> */}
            </div>
          </a>
        </div>

        <div className="navbar-center ml-0 hidden xl:flex flex-grow justify-center">
          <ul className="menu menu-horizontal px-1 text-lg">
            <li>
              <a
                href="#home"
                className=" hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className=" hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#service"
                className=" hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded"
              >
                Service
              </a>
            </li>
            <li>
              <a
                href="#course"
                className=" hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="#features"
                className=" hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded"
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
            {/* <li>
              <a
                href="#ourteam"
                className=" hover:text-white bg-transparent hover:bg-orange-600 transition-colors duration-300 px-4 py-2 rounded"
              >
                Our Team
              </a>
            </li> */}

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

        <div className="navbar-end lg:flex">
          {userLoggedIn ? (
            (userLoggedIn = true)
          ) : (
            <div className="flex items-center space-x-6 mr-10">
              {/* Sign up Button */}
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
            <FaPhone className="relative inline text-white text-2xl animate-bounce " />
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div
        id="home"
        className="relative min-h-screen flex flex-col overflow-hidden mt-0"
      >
        {/* Image Carousel */}
        <div className="absolute top-0 left-0 w-full h-full">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Carousel ${index}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                currentImage === index ? "opacity-100" : "opacity-0"
              }`}
              style={{ height: "100vh" }}
            />
          ))}
        </div>

        {/* Dark overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

        <div className="relative z-10 text-left px-4 md:px-8 ml-10 md:ml-48">
          <h1 className="text-5xl md:text-8xl text-orange-400 font-bold mt-52">
            Arcedemy
          </h1>
          <p className="text-2xl md:text-4xl mt-4 text-white">
            Arcedemy is a community to
          </p>
          <div className="text-3xl md:text-5xl mt-4 text-white">
            <Typewriter
              options={{
                strings: ["Learn...", "Grow...", "Play..."],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <SignUpModal onClose={toggleModal} />}
    </div>
  );
};

//export home and userLoggedIn

export default Home;
export { userLoggedIn };
