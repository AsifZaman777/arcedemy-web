import React from "react";
import {
  FaUserGraduate,
  FaBook,
  FaChalkboardTeacher,
  FaArrowUp,
} from "react-icons/fa";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    id: 1,
    name: "Students Enrolled",
    value: 1000,
    description: "Active learners in various courses",
    icon: <FaUserGraduate size={40} className="text-orange-500" />,
  },
  {
    id: 2,
    name: "Available Courses",
    value: 50,
    description: "Covering a wide range of subjects",
    icon: <FaBook size={40} className="text-orange-500" />,
  },
  {
    id: 3,
    name: "Expert Instructors",
    value: 30,
    description: "Qualified professionals teaching globally",
    icon: <FaChalkboardTeacher size={40} className="text-orange-500" />,
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.4, duration: 0.7 },
  }),
};

const Stats = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  return (
    <div id="stats" className="py-24 sm:py-32" ref={ref}>
      <motion.h2
        className="text-4xl font-bold text-center text-orange-500 mb-12"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={textVariants}
        custom={0}
      >
        Stats
      </motion.h2>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-12 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-sm flex-col gap-y-4  shadow-lg p-6 rounded-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
            >
              <dt className="flex justify-center items-center space-x-3 text-lg font-medium text-gray-700">
                {stat.icon}
                <span>{stat.name}</span>
              </dt>
              <dd className="order-first text-4xl font-bold text-gray-900 sm:text-5xl flex items-center justify-center">
                <CountUp start={inView} end={stat.value} duration={5} />
                <span className="ml-2 text-orange-500 text-2xl">+</span>
                <FaArrowUp
                  className="ml-2 text-green-500 animate-bounce"
                  size={24}
                />
              </dd>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Stats;
