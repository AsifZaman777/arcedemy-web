import { useState } from 'react';
import game from '../assets/images/game.jpg';
import mission from '../assets/images/mission.jpg';
import study from '../assets/images/study.jpg';

const Features = () => {
  // State to track which feature is selected
  const [activeFeature, setActiveFeature] = useState(0);

  // List of features with title and corresponding image
  const features = [
    {
      id: 0,
      title: 'Live and recorded classes',
      icon: '📷', // Placeholder for actual icon
      image: game, // Replace with actual image paths
    },
    {
      id: 1,
      title: 'Animated video lessons',
      icon: '🎥',
      image: mission,
    },
    {
      id: 2,
      title: 'Practice MCQ tests',
      icon: '❓',
      image: study,
    },
    {
      id: 3,
      title: 'Past year question papers',
      icon: '📚',
      image: game,
    },
    {
      id: 4,
      title: 'Smart notes',
      icon: '📝',
      image: study,
    },
    {
      id: 5,
      title: 'Report cards',
      icon: '📊',
      image: mission,
    },
  ];

  return (
    <div id="features" className="bg-neutral-900 py-20">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-orange-500 mb-8 md:mb-12">
        Arcedemy Features
      </h2>
      <hr className="absolute z-0 w-1/2 h-3 bg-gradient-to-r from-orange-100 to-orange-500 rounded-sm -mt-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="relative z-10 flex justify-center items-center">
        <p className="text-3xl text-center text-white mt-5 ml-10 ">
          Just have a look what Arcedemy gives you
        </p>
        <span className="text-3xl text-center text-white mt-10 ml-2 animate-bounce ">
          👇
        </span>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10 py-10">
        {/* Left: Feature Tabs */}
        <div className="flex flex-col space-y-5 w-full p-10 md:w-1/3 mt-32">
          {features.map((feature) => (
            <button
              key={feature.id}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 ${
                activeFeature === feature.id
                  ? 'border-orange-200 bg-orange-500 text-white' // Change background and text color when active
                  : 'border-neutral-600 bg-white text-orange-500' // Default state
              }`}
              onClick={() => setActiveFeature(feature.id)}
            >
              <span className="text-3xl mr-3">{feature.icon}</span>
              <span className="text-2xl">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Right: Feature Image */}
        <div className="w-full md:w-2/4 flex justify-center mr-60 mt-32">
          <div className="w-[800px] h-[600px]"> {/* Set fixed width and height */}
            <img
              src={features[activeFeature].image}
              alt={features[activeFeature].title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
