import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

const ContentCard = ({ 
  title, 
  subject, 
  subjectColor, 
  duration = "এস.এস.সি",
  thumbnail 
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-[300px] h-[380px] flex flex-col justify-between">
      
      {/* Top Section */}
      <div>
        {/* Video Thumbnail Area */}
        <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl h-32 mb-4 flex items-center justify-center group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-purple-200/50 rounded-xl"></div>

          {/* Read Button */}
          <div className="relative z-10 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <BookOpen size={20} className="text-white" />
          </div>

          {/* Duration Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-gray-700">
            {duration}
          </div>
        </div>

        {/* Subject Badge */}
        <div className="flex items-center mb-2">
          <div 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: subjectColor }}
          ></div>
          <span className="text-sm text-gray-600 font-medium">{subject}</span>
        </div>

        {/* Title */}
        <h3 className="text-gray-800 font-semibold text-base leading-relaxed mb-2 line-clamp-2">
          {title}
        </h3>
      </div>

      {/* Read Button */}
      <button className="w-full bg-gradient-to-r from-orange-300 to-orange-500 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 group mt-auto">
        Read
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
      </button>
    </div>
  );
};

export default ContentCard;
