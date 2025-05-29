import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ContentCard from './ContentCard';

const videos = [
  {
    id: '1',
    title: '1.1 - Properties of Waves',
    subject: 'Cambridge IGCSE Physics',
    subjectColor: '#3B82F6',
    duration: 'O Level'
  },
  {
    id: '2',
    title: '2.3 - Chemical Bonding',
    subject: 'Edexcel IGCSE Chemistry',
    subjectColor: '#06B6D4',
    duration: 'O Level'
  },
  {
    id: '3',
    title: '5.2 - Photosynthesis and Respiration',
    subject: 'Cambridge International A Level Biology',
    subjectColor: '#10B981',
    duration: 'A Level'
  },
  {
    id: '4',
    title: '3.1 - Kinematics and Dynamics',
    subject: 'Edexcel IAL Physics',
    subjectColor: '#F97316',
    duration: 'A Level'
  },
  {
    id: '5',
    title: '4.4 - Acids, Bases and Salt Preparation',
    subject: 'Cambridge IGCSE Chemistry',
    subjectColor: '#3B82F6',
    duration: 'O Level'
  },
  {
    id: '6',
    title: '2.2 - Forces and Motion',
    subject: 'Edexcel IGCSE Physics',
    subjectColor: '#F59E0B',
    duration: 'O Level'
  },
  {
    id: '7',
    title: '3.3 - Energy Resources and Energy Transfer',
    subject: 'Cambridge International A Level Physics',
    subjectColor: '#8B5CF6',
    duration: 'A Level'
  },
  {
    id: '8',
    title: '1.2 - Cell Structure and Function',
    subject: 'Edexcel IAL Biology',
    subjectColor: '#EC4899',
    duration: 'A Level'
  },
];

const ContentCarosel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('All courses');

  const tabs = ['All courses', 'A-level', 'O-level'];
  const visibleCards = 3;
  const maxIndex = Math.max(0, videos.length - visibleCards);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="flex gap-8 mb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-lg font-medium pb-2 border-b-2 transition-colors duration-200 ${
              activeTab === tab
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-600 border-transparent hover:text-orange-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <hr className="border-orange-300 mb-6" />

      {/* Carousel */}
      <div className="relative bg-gradient-to-br from-orange-100 via-pink-100 to-orange-200 rounded-3xl p-8 overflow-hidden">
        {/* Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
        >
          <ArrowRight size={20} className="text-gray-700" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (320 + 24)}px)`,
              width: `${videos.length * (320 + 24)}px`
            }}
          >
            {videos.map((video) => (
              <div key={video.id} className="flex-shrink-0 w-[320px]">
                <ContentCard
                  title={video.title}
                  subject={video.subject}
                  subjectColor={video.subjectColor}
                  duration={video.duration}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === index ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCarosel;
