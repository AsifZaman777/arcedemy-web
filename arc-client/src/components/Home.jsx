import { useState } from "react";
import goody1 from "../assets/images/hero/image1.png";
import goody2 from "../assets/images/hero/image2.png";
import Navbar from "./Navbar"; // Adjust the path as needed
import Typewriter from "typewriter-effect";
import SignUpModal from "./signup/SignUpModal";

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = [goody1, goody2];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  return (
    <div>
      {/* Navbar Component */}
      <Navbar toggleModal={toggleModal} userLoggedIn={false} />

      <div id="home" className="relative min-h-screen flex flex-col overflow-hidden mt-0">
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

        {/* Text Content */}
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

        {/* Image Change Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentImage === index ? "bg-orange-400 w-6" : "bg-gray-300"
              }`}
              onClick={() => handleImageChange(index)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <SignUpModal onClose={toggleModal} />}
    </div>
  );
};

export default Home;
