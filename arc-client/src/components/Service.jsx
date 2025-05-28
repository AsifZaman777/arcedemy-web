import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

//images
import image1 from "../assets/images/serviceSection/image1.png";
import image2 from "../assets/images/serviceSection/image2.png";
import image3 from "../assets/images/serviceSection/image3.png";
import image4 from "../assets/images/serviceSection/image4.png";
import image5 from "../assets/images/serviceSection/image5.png";
import image6 from "../assets/images/serviceSection/image6.png";

export default function CarouselIndicatorsInside() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.4, duration: 0.7 },
    }),
  };

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const cardContents = [
    {
      image: image1,
      title: "Ranking",
      desc: "Know your ranking worldwide and in your country.",
    },
    {
      image: image2,
      title: "Instant doubt solving",
      desc: "Get your doubts solved instantly by our experts.",
    },
    {
      image: image3,
      title: "Personalized paper generation",
      desc: "Get personalized question papers for practice.",
    },
    {
      image: image4,
      title: "Chapter wise quiz",
      desc: "Practice chapter wise quiz for better understanding.",
    },
    {
      image: image5,
      title: "Realtime MCQ solver",
      desc: "Get your MCQs solved in real time.",
    },
    {
      image: image6,
      title: "Ineractive lecture notes",
      desc: "Get interactive lecture notes for better understanding.",
    },
  ];

  useEffect(() => {
    const slider = new Glide(".glide-02", {
      type: "carousel",
      focusAt: "center",
      perView: 3,
      autoplay: 3500,
      animationDuration: 700,
      gap: 24,
      classNames: {
        nav: {
          active: "[&>*]:bg-orange-500",
        },
      },
      breakpoints: {
        1024: {
          perView: 2,
        },
        640: {
          perView: 1,
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <div ref={ref} id="service" className="py-10 bg-gray-100 select-none">
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

        {/*<!-- Component: Carousel with indicators inside --> */}
        <div className="glide-02 relative w-full">
          {/*    <!-- Slides --> */}
          <div className="overflow-hidden" data-glide-el="track">
            <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
              {cardContents.map((card, index) => (
                <li key={index} className="p-4">
                  <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="m-auto max-h-full w-full max-w-full"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{card.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/*    <!-- Indicators --> */}
          <div
            className="absolute flex w-full items-center justify-center gap-2"
            data-glide-el="controls[nav]"
          >
            {cardContents.map((_, index) => (
              <button
                key={index}
                className="group p-4"
                data-glide-dir={`=${index}`}
                aria-label={`goto slide ${index + 1}`}
              >
                <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 group-[&.glide__bullet--active]:bg-orange-500 transition-colors duration-300 focus:outline-none"></span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/*<!-- End Carousel with indicators inside --> */}
    </div>
  );
}
