import { useState } from "react";
import { FaTrophy, FaUsers, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";

const LeaderboardModal = ({ closeModal }) => {

  const leagueData = [
    { rank: 1, name: "Alice", marks: 1500 },
    { rank: 2, name: "Bob", marks: 1400 },
    { rank: 3, name: "Charlie", marks: 1300 },
    { rank: 4, name: "David", marks: 1200 },
    { rank: 5, name: "Eve", marks: 1100 },
    { rank: 6, name: "Frank", marks: 1000 },
    { rank: 7, name: "Grace", marks: 900 },
    { rank: 8, name: "Hank", marks: 850 },
    { rank: 9, name: "Ivy", marks: 800 },
    { rank: 10, name: "Jack", marks: 750 },
  ];

  const topPlayersData = [
    { rank: 1, name: "Zara", marks: 1600 },
    { rank: 2, name: "Yusuf", marks: 1500 },
    { rank: 3, name: "Oliver", marks: 1450 },
    { rank: 4, name: "Liam", marks: 1400 },
    { rank: 5, name: "Noah", marks: 1350 },
    { rank: 6, name: "Emma", marks: 1300 },
    { rank: 7, name: "Sophia", marks: 1250 },
    { rank: 8, name: "Mia", marks: 1200 },
    { rank: 9, name: "Lucas", marks: 1150 },
    { rank: 10, name: "Mason", marks: 1100 },
  ];

  const [activeTab, setActiveTab] = useState("league");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="modal-overlay fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="modal-box relative bg-white dark:bg-gray-700 p-8 rounded-lg shadow-2xl max-w-2xl w-full">
        {/* Close button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-orange-500 hover:text-orange-600"
          onClick={closeModal}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
            Monthly Leaderboard
        </h2>
        <hr className="border-gray-300 dark:border-gray-400 mb-5" />


        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
          <button
            className={`btn ${
              activeTab === "league"
                ? "bg-orange-500 text-white"
                : "bg-transparent border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            } text-lg px-6 py-2`}
            onClick={() => handleTabClick("league")}
          >
            <FaUsers className="mr-2 " size={20} /> League
          </button>
          <button
            className={`btn ${
              activeTab === "top-players"
                ? "bg-orange-500 text-white"
                : "bg-transparent border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            } text-lg px-6 py-2`}
            onClick={() => handleTabClick("top-players")}
          >
            <FaTrophy className="mr-2" size={20} /> Top Players
          </button>
        </div>

        {/* Leaderboard Content */}
        <div className="overflow-y-auto max-h-96">
          <table className="table w-full text-center text-lg md:text-xl">
            <thead className="sticky -top-1 bg-white dark:bg-gray-700 z-10">
              <tr>
                <th className="px-4 py-0 text-xl md:px-6 md:py-3">Rank</th>
                <th className="px-4 py-0 text-xl md:px-6 md:py-3">Name</th>
                <th className="px-4 py-0 text-xl md:px-6 md:py-3">Marks</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "league" ? leagueData : topPlayersData).map(
                (player) => (
                  <tr key={player.rank} className="text-white">
                    <td className="px-4 py-2 md:px-6 md:py-3">{player.rank}</td>
                    <td className="px-4 py-2 md:px-6 md:py-3">{player.name}</td>
                    <td className="px-4 py-2 md:px-6 md:py-3">
                      <div className="bg-gray-100 dark:bg-orange-500 p-3 rounded-lg font-bold text-gray-700 dark:text-gray-200">
                        {player.marks}
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Prop validation
LeaderboardModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default LeaderboardModal;
