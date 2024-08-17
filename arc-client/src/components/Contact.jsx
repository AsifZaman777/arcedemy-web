import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight } from 'react-icons/fa';

const textVariants = {
  hidden: { opacity: 0, x: -50 }, // Start off-screen to the left
  visible: (i) => ({
    opacity: 1,
    x: 0, // Slide in to the final position
    transition: { delay: i * 0.4, duration: 0.7 },
  }),
};

const cardVariants = {
  hidden: { opacity: 1, x: 0, scale: 0.8 }, // Start off-screen to the left with smaller scale
  visible: { 
    opacity: 1, 
    x: 0, // Slide in to the final position
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.3, 
  });

  return (
    <div id='contact' className="bg-gray-50 min-h-screen flex items-center justify-center py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8">

        {/* Heading */}
        <motion.h2
          className="text-4xl font-bold text-center text-orange-500 mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={textVariants}
          custom={0}
          ref={ref}
        >
          Our Contact
        </motion.h2>
        
        {/* Form */}
        <motion.div
          className="bg-white p-8 md:p-16 rounded-md shadow-lg"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">
            Let’s Get In Touch.
          </h2>
          <p className="text-orange-600 mb-8 animate-bounce text-center">
            Or just send a query to <a href="mailto:arcedemy@gmail.com" className="text-neutral-950 font-semibold">arcedemy@gmail.com</a>.
          </p>

          <form action="#" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-orange-500">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name..."
                  className="mt-1 block w-full px-4 py-2 border bg-gray-100 border-orange-500 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-orange-500">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name..."
                  className="mt-1 block w-full px-4 py-2 border bg-gray-100 border-orange-500 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-500">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address..."
                className="mt-1 block w-full px-4 py-2 border bg-gray-100 border-orange-500 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-500">Phone Number</label>
              <input
                type="tel"
                placeholder="+44 (000) 000-0000"
                className="mt-1 block w-full px-4 py-2 border bg-gray-100 border-orange-500 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-500">Message</label>
              <textarea
                placeholder="Enter your main text here..."
                className="mt-1 block w-full px-4 py-2 border bg-gray-100 border-orange-500 rounded-md"
                rows={4}
              ></textarea>
              <p className="text-sm text-gray-500 text-right mt-1">300/300</p>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md shadow-lg hover:bg-orange-600 transition-colors duration-100"
            >
              Send Message <FaArrowRight className="inline-block" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
