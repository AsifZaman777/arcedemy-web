import PropTypes from 'prop-types';
import { FiTarget, FiBell, FiTrendingUp, FiAirplay } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "../components/shared/faqSection/useWindowSize";
import { useState } from "react";


import mission from "../assets/images/mission.jpg";
import game from "../assets/images/game.jpg";

const items = [
  {
    id: 1,
    title: "What is our mission?",
    Icon: FiTarget,
    imgSrc: mission,
    description:
      "Our mission is to aggregate the world's open source knowledge and make it accessible to everyone. We believe that knowledge is power and that everyone should have access to it. We are committed to providing the best learning resources to help you achieve your learning goals.",
  },
  {
    id: 2,
    title: "What is our strategy?",
    Icon: FiAirplay,
    imgSrc: game,
    description:
      "Our strategy is to provide a platform where you can access the best learning resources and tools to help you achieve your learning goals. We are constantly innovating and improving our platform to provide you with the best learning experience.",
  },
  {
    id: 3,
    title: "Keep track",
    Icon: FiBell,
    imgSrc:
      "https://images.unsplash.com/photo-1578450671530-5b6a7c9f32a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    description:
      "Our platform allows you to keep track of your progress and see how you are improving over time. You can set goals and track your progress to help you stay motivated and focused on your learning goals.",
  },
  {
    id: 4,
    title: "Grow faster",
    Icon: FiTrendingUp,
    imgSrc:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description:
      "Our platform is designed to help you grow faster and achieve your learning goals. We provide you with the best learning resources and tools to help you succeed. Join us today and start your learning journey!",
  },
];


  
const VerticalAccordion = () => {
  const [open, setOpen] = useState(items[0].id);
  

  return (
    <div className="bg-neutral-900 py-20">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-orange-500 mb-8 md:mb-12">
        Frequently Asked Questions
      </h2>
      <hr className="absolute z-0 w-1/2 h-3 bg-gradient-to-r from-orange-100 to-orange-500 rounded-sm -mt-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <section className="panelSection py-10 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row h-fit lg:h-[700px] w-full max-w-7xl mx-auto shadow overflow-hidden">
          {items.map((item) => (
            <Panel
              key={item.id}
              open={open}
              setOpen={setOpen}
              id={item.id}
              Icon={item.Icon}
              title={item.title}
              imgSrc={item.imgSrc}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const Panel = ({ open, setOpen, id, Icon, title, imgSrc, description }) => {
  const { width } = useWindowSize();
  const isOpen = open === id;

  return (
    <>
      <button
        className="bg-white hover:bg-slate-50 transition-colors p-3 sm:p-4 lg:p-3 border-r-[1px] border-b-[1px] border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
        onClick={() => setOpen(id)}
      >
        <span
          style={{ writingMode: "vertical-lr" }}
          className="hidden lg:block text-lg md:text-xl font-light rotate-180"
        >
          {title}
        </span>
        <span className="block lg:hidden text-lg md:text-xl font-light">{title}</span>
        <div className="w-6 sm:w-8 md:w-10 lg:w-full aspect-square bg-orange-500 text-white grid place-items-center">
          <Icon />
        </div>
        <span className="w-3 sm:w-4 h-3 sm:h-4 bg-white group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-black flex items-end"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white"
            >
              <p className="text-sm sm:text-base md:text-lg">{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Panel.propTypes = {
  open: PropTypes.number.isRequired,
  setOpen: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const panelVariants = {
  open: {
    width: "100%",
    height: "100%",
  },
  closed: {
    width: "0%",
    height: "100%",
  },
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "200px",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

const descriptionVariants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 0.125,
    },
  },
  closed: { opacity: 0, y: "100%" },
};

export default VerticalAccordion;
