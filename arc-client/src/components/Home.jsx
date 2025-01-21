import { useState,useEffect } from "react";
import goody1 from "../assets/images/hero/image1.png";
import goody2 from "../assets/images/hero/image2.png";
import Navbar from "./Navbar"; // Adjust the path as needed
import Typewriter from "typewriter-effect";
import SignUpModal from "./signup/SignUpModal";

const Home = () => {
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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



  return (
    <div>
      {/* Navbar Component */}
      <Navbar toggleModal={toggleModal} userLoggedIn={false} />

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
      {isModalOpen && (<SignUpModal onClose={toggleModal}/>) }
    </div>
  );
};

export default Home;

