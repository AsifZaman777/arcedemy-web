import { useState } from "react";
import { FaRankingStar } from "react-icons/fa6";
import LeaderboardModal from "./LeaderboardModal"; // Import the modal component
import { userLoggedIn } from "../Home";

const LeaderboardIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

///test
  return (
  
    <div className={`fixed group z-50 top-3 right-20 ${userLoggedIn? `visible`: `hidden`}`}>
      {/* Pulsating Indicator */}
      <span className="absolute flex h-3 w-3 top-10 left-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
      </span>

      {/* Ranking Icon */}
      <div
        className="flex items-center justify-center bg-neutral-700 text-white p-2 rounded-full ring-2 ring-gray-700 shadow-lg hover:bg-orange-600 duration-300 cursor-pointer"
        onClick={toggleModal} //toggle logic
      >
        <FaRankingStar className="text-4xl" />
      </div>

      {/* Tooltip for Ranking Icon */}
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900 text-white text-sm py-1 px-2 rounded-lg w-24 text-center">
        Leaderboard
      </div>

     {/*render the modal */}
      {isModalOpen && (
        <LeaderboardModal closeModal={toggleModal} />
      )}
    </div>
  );
};

export default LeaderboardIcon;
