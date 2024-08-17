import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaRegLightbulb,
  FaUsers,
  FaBook,
  FaArrowRight,
} from "react-icons/fa";
import study from "../assets/images/study.jpg";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.5, duration: 0.7 },
  }),
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.3, yoyo: Infinity },
  },
};

const About = () => {
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.1,
  });

  const { ref: contentRef, inView: contentInView } = useInView({
    threshold: 0.1,
  });

  return (
    <div id="about" className="py-20 bg-gray-100 mt-0">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={titleRef}
          className="text-4xl font-bold text-center text-orange-500 mb-12"
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={textVariants}
          custom={0}
        >
          About Us
        </motion.h2>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 items-start">
          <motion.div
            ref={contentRef}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={cardVariants}
            className="relative"
          >
            <img src={study} alt="study" className="rounded-lg shadow-lg" />
          </motion.div>

          <motion.div
            ref={contentRef}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <h3 className="text-4xl font-bold text-gray-700 mb-4">
              What We Do
            </h3>
            <p className="text-orange-900 font-medium mb-8">
              We offer a range of services including online courses, interactive
              learning modules, and live exam rooms where students can prepare
              for their exams. Our platform is designed to make learning fun and
              engaging, with a focus on continuous improvement. Whether you’re
              looking to master a subject or prepare for exams, Arcedemy has the
              tools and resources to help you succeed. Join us today and start
              your learning journey!
            </p>

            <motion.div
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={iconVariants}
              className="flex items-center mb-6"
            >
              <FaRegLightbulb className="text-orange-500 text-3xl mr-4" />
              <p className="text-gray-800 font-medium">
                Innovative Learning Tools
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={iconVariants}
              className="flex items-center mb-6"
            >
              <FaUsers className="text-orange-500 text-3xl mr-4" />
              <p className="text-gray-800 font-medium">Community Engagement</p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={iconVariants}
              className="flex items-center"
            >
              <FaBook className="text-orange-500 text-3xl mr-4" />
              <p className="text-gray-800 font-medium">
                Comprehensive Resources
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={buttonVariants}
              className="flex items-center mt-20 space-x-4 animate-bounce"
            >
              <p className="text-gray-800 font-medium text-xl">Watch videos</p>
              <motion.button
                whileHover="hover"
                variants={buttonVariants}
                className="bg-orange-500 border border-orange-300 text-white font-bold py-2 px-3 rounded-sm hover:bg-orange-600 hover:border-orange-400 focus:outline-none focus:ring-opacity-50 transition-colors duration-300 flex justify-center items-center"
              >
                <FaArrowRight className="text-xl" />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            ref={contentRef}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={textVariants}
            className="space-y-8"
          >
            <div>
              <h3 className="text-4xl font-bold text-gray-700 mb-4">
                Our Mission
              </h3>
              <p className="text-orange-900 font-medium">
                At Arcedemy, our mission is to provide a platform where students
                can learn, grow, and play. We are dedicated to offering
                high-quality resources and a community-driven environment to
                help students achieve their academic goals. Our team of experts
                is committed to creating a positive learning experience for all
                students, regardless of their background or skill level.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
