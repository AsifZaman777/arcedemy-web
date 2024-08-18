import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import PropTypes from "prop-types";
import mithun from "../assets/images/mithun.jpg";
import zafri from "../assets/images/zafri.jpg";
import asif from "../assets/images/asif.png";
import adir from "../assets/images/adir.jpg";
import oni from "../assets/images/oni.jpg";

const OurTeam = () => {
  return (
    <div id="ourteam" className="py-0 bg-neutral-900">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-orange-500 mb-8 md:mb-12">
        Arcedemy Team
      </h2>
      <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-neutral-900 py-10">
        <hr className="absolute z-0 w-1/2 h-6 bg-gradient-to-r from-orange-100 to-orange-500 rounded-sm top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <h2 className="relative z-0 text-[10vw] font-black text-neutral-100 md:text-[120px]">
          OUR TEAM
        </h2>
        <Cards />
      </section>
    </div>
  );
};

const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-1" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src={mithun}
        alt="Team Member 1"
        rotate="6deg"
        top="20%"
        left="25%"
        className="w-36  md:w-56 text-lg text-orange-400"
        name="Shadman Mithun"
        designation="Co-founder"
      />

      <Card
        containerRef={containerRef}
        src={zafri}
        alt="Team Member 2"
        rotate="-6deg"
        top="30%"
        left="50%"
        className="w-36 md:w-56 text-lg text-orange-400"
        name="Zafri"
        designation="Co-founder"
      />

      <Card
        containerRef={containerRef}
        src={asif}
        alt="Team Member 3"
        rotate="0deg"
        top="20%"
        left="40%"
        className="w-36 md:w-56 text-lg text-orange-400"
        name="Asif Zaman"
        designation="Software Engineer"
      />

      <Card
        containerRef={containerRef}
        src={adir}
        alt="Team Member 4"
        rotate="-5deg"
        top="50%"
        left="30%"
        className="w-36 md:w-56 text-lg text-orange-400"
        name="Sharafat Ali Adir"
        designation="Software Engineer"
      />

      <Card
        containerRef={containerRef}
        src={oni}
        alt="Team Member 5"
        rotate="10deg"
        top="40%"
        left="60%"
        className="w-36 md:w-56 text-lg text-orange-400"
        name="Oni"
        designation="UI/UX Designer"
      />
    </div>
  );
};

const Card = ({
  containerRef,
  src,
  alt,
  top,
  left,
  rotate,
  className,
  name,
  designation,
}) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    setZIndex((prevZIndex) => prevZIndex + 1);
  };

  return (
    <motion.div
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute bg-neutral-200 p-2 sm:p-4 rounded-lg shadow-lg",
        "w-28 sm:w-36 md:w-56", // Adjusted width for mobile responsiveness
        className
      )}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
      whileDrag={{ zIndex: 1000 }}
    >
      <img
        src={src}
        alt={alt}
        className="h-40 sm:h-60 md:h-72 w-full object-cover rounded-lg mb-2 sm:mb-4" // Adjusted height for mobile responsiveness
      />
      <div className="text-center">
        <h3 className="text-sm sm:text-lg font-bold">{name}</h3>
        <p className="text-xs sm:text-sm text-gray-500">{designation}</p>
        <div className="flex justify-center mt-2 space-x-2 sm:space-x-3 text-gray-700">
          <a href="#">
            <FaFacebook className="text-xs sm:text-sm" />
          </a>
          <a href="#">
            <FaInstagram className="text-xs sm:text-sm" />
          </a>
          <a href="#">
            <FaTwitter className="text-xs sm:text-sm" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// PropTypes validation
Card.propTypes = {
  containerRef: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  rotate: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
};

export default OurTeam;
