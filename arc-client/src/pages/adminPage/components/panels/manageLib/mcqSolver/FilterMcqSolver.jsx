import { useState } from 'react';
import { FaPlus, FaFilter, FaSearch, FaSearchPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import AddMcqSolverModal from './AddMcqModal'; // Import the AddMcqSolverModal component

const FilterMcqSolver = ({ isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`flex flex-col items-center p-10 px-10 border-2 border-slate-600 rounded-lg ${
        isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-200'
      }`}
    >
      {/* Main Row - Responsive */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Add Subject */}
        <div className="grid items-center">
          <button
            onClick={handleOpenModal}
            className={`flex items-center px-6 py-3 ${
              isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'
            } rounded-lg text-lg font-medium`}
          >
            <FaPlus className="mr-2" />
            Upload
          </button>
        </div>

        {/* Filters - Responsive */}
        <div className="flex flex-col space-x-0 space-y-5 xl2:flex-row xl2:space-x-6 xl2:space-y-0">
          {/* Curriculum Select */}
          <div className="flex items-center space-x-3">
            <label
              htmlFor="curriculum"
              className={`text-2xl font-semibold ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`}
            >
              Curriculum:
            </label>
            <select
              id="curriculum"
              className={`px-4 py-2 border border-gray-400 rounded-lg text-base font-medium focus:outline-none focus:ring-2 ${
                isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-300 focus:ring-blue-500' : 'focus:ring-blue-500'
              }`}
            >
              <option value="">Select Curriculum</option>
              <option value="cambridge">Cambridge</option>
              <option value="edexcel">Edexcel</option>
            </select>
          </div>

          {/* Level Select */}
          <div className="flex items-center space-x-3">
            <label htmlFor="level" className={`text-2xl font-semibold ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`}>
              Level:
            </label>
            <select id="level" className={`px-4 py-2 border border-gray-400 rounded-lg text-base font-medium focus:outline-none focus:ring-2 ${isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-300 focus:ring-blue-500' : 'focus:ring-blue-500'}`}>
              <option value="">Select Level</option>
              <option value="igcse">IGCSE</option>
              <option value="a-level">IAL level</option>
              <option value="o-level">IAS</option>
              <option value="a-level">AS level</option>
              <option value="o-level">A2 level</option>
              <option value="o-level">O level</option>
            </select>
          </div>

          {/* Subject Select */}
          <div className="flex items-center space-x-3">
            <label htmlFor="subject" className={`text-2xl font-semibold ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`}>
              Subjects:
            </label>
            <select id="subject" className={`px-4 py-2 border border-gray-400 rounded-lg text-base font-medium focus:outline-none focus:ring-2 ${isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-300 focus:ring-blue-500' : 'focus:ring-blue-500'}`}>
              <option value="">Select Subject</option>
              <option value="math">Math</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="accounting">Accounting</option>
              <option value="economics">Economics</option>
            </select>
          </div>

          {/* Chapter Select */}
          <div className="flex items-center space-x-3">
            <label htmlFor="chapter" className={`text-2xl font-semibold ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`}>
              Chapters:
            </label>
            <select id="chapter" className={`px-4 py-2 border border-gray-400 rounded-lg text-base font-medium focus:outline-none focus:ring-2 ${isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-300 focus:ring-blue-500' : 'focus:ring-blue-500'}`}>
              <option value="">Select Chapter</option>
              <option value="algebra-basics">Algebra Basics</option>
              <option value="kinematics">Kinematics</option>
              <option value="organic-chemistry">Organic Chemistry</option>
            </select>
          </div>
        </div>

        {/* Filter Button */}
        <button
          className={`flex items-center px-6 py-3 ${
            isDarkMode ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-green-600 text-white hover:bg-green-700'
          } rounded-lg text-lg font-medium`}
        >
          <FaFilter className="mr-2" />
          Filter
        </button>
      </div>

      {/* Search Bar with Button */}
      <div className="flex items-center w-full justify-center mt-6">
        <div className="relative w-full max-w-md flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className={`px-4 py-2 border border-gray-400 rounded-lg text-base font-medium focus:outline-none focus:ring-2 ${
              isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-300 focus:ring-blue-500' : 'focus:ring-blue-500'
            } pl-10 w-full`}
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <button
            className={`ml-2 px-4 py-2 ${
              isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'
            } rounded-lg font-medium flex items-center`}
          >
            <FaSearchPlus className="mr-1" />
            Search
          </button>
        </div>
      </div>

      {/* AddChapterModal */}
      {isModalOpen && (
        <AddMcqSolverModal
          student={null} 
          onClose={handleCloseModal}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

// Props validation
FilterMcqSolver.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default FilterMcqSolver;
