
import { motion } from 'framer-motion';
import { FaRegLightbulb, FaUsers, FaGamepad, FaChalkboardTeacher, FaArrowCircleUp, FaFlushed } from 'react-icons/fa';
import ServiceCard from '../components/shared/ServiceCard'; // Adjust the path if necessary
import { useInView } from 'react-intersection-observer';

const services = [
  {
    number: "01",
    icon: FaRegLightbulb,
    title: "Innovative Learning Assets",
    description:
      "Explore innovative learning assets to support your educational journey.",
  },
  {
    number: "02",
    icon: FaUsers,
    title: "Playful Learning Community",
    description:
      "Join games, quizzes, and other activities to make learning fun and engaging.",
  },
  {
    number: "03",
    icon: FaGamepad,
    title: "Interactive Learning Resources",
    description:
      "Access interactive learning resources to help you master your subjects.",
  },

  {
    number: "04",
    icon: FaChalkboardTeacher,
    title: "Teacher-Student Collaboration",
    description:
      "Teachers and students can collaborate to achieve their learning goals.",
  },
  {
    number: "05",
    icon: FaArrowCircleUp,
    title: "Continuous Improvement",
    description:
      "Focus on continuous improvement and growth to achieve your learning goals.",
  },
  {
    number: "06",
    icon: FaFlushed,
    title: "Fun and Engaging Learning",
    description:
      "Enjoy a fun and engaging learning experience with games, quizzes, and more.",
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

const Service = () => {
  const { ref, inView } = useInView({
    threshold: 0.1, 
  });

  return (
    <div id="service" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        
        <motion.h2
          className="text-4xl font-bold text-center text-orange-500 mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={textVariants}
          custom={0}
        >
          Our Services
        </motion.h2>

        <motion.div
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"} 
          custom={1}
          ref={ref} // Attach the ref to the container
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <ServiceCard
                number={service.number}
                Icon={service.icon}
                title={service.title}
                description={service.description}
                custom={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Service;
