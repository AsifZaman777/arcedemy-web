import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFlask, FaCompass, FaSquareRootAlt} from 'react-icons/fa';
import CourseCard from './shared/courseCard/CourseCard'; 

import physics from '../assets/images/phsyics.jpg';
import chem from '../assets/images/chem.jpg';
import math from '../assets/images/math.jpg';

const courses = [
  {
    title: "Physics",
    description: "Learn the fundamental concepts of physics both theoretically and practically. The course is avaliable for A level and O level and EDEXCEL and CAMBRIDGE boards.",
    image: physics,
    icon: FaCompass,
  },
  {
    title: "Chemistry",
    description: "Understand the basic concepts of chemistry and its applications. The course is avaliable for A level and O level and EDEXCEL and CAMBRIDGE boards.",
    image: chem,
    icon: FaFlask,
  },
  {
    title: "Mathematics",
    description: "Master the concepts of mathematics and its applications. The course is avaliable for A level and O level and EDEXCEL and CAMBRIDGE boards.",
    image: math,
    icon: FaSquareRootAlt,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.4, duration: 0.7 },
  }),
};

const Course = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <div id="course" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center text-orange-500 mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={textVariants}
          custom={0}
        >
          Our Courses
        </motion.h2>

        <motion.div
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          ref={ref} // Attach the ref to the container
        >
          {courses.map((course, index) => (
            <motion.div key={index} variants={cardVariants}>
              <CourseCard
                title={course.title}
                description={course.description}
                image={course.image}
                Icon={course.icon}
                custom={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Course;
