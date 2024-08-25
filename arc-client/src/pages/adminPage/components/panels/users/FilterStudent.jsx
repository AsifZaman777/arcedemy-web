import { useState } from 'react';
import { FaPlus, FaFilter, FaSearch, FaSearchPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import AddStudentModal from './AddStudentModal';

const Filter = ({ isDarkMode }) => {
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
      {/* Main Row */}
      <div className="flex items-center justify-between w-full mb-6">
        {/* Add Student Section */}
        <div className="flex items-center space-x-6">
          <button
            onClick={handleOpenModal}
            className={`flex items-center px-6 py-3 ${
              isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'
            } rounded-lg text-lg font-medium`}
          >
            <FaPlus className="mr-2" />
            Add New Student
          </button>
        </div>

        {/* Select Filters */}
        <div className="flex items-center space-x-6">
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
              <option value="a-level">A level</option>
              <option value="o-level">O level</option>
            </select>
          </div>

          


          {/* Enrollment Status Select */}
          <div className="flex items-center space-x-3">
            <label
              htmlFor="status"
              className={`text-2xl font-semibold ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`}
            >
              Enrollment Status:
            </label>
            <select
              id="status"
              className={`px-4 py-2 border border-gray-400 rounded-lg text-base font-medium focus:outline-none focus:ring-2 ${
                isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-300 focus:ring-blue-500' : 'focus:ring-blue-500'
              }`}
            >
              <option value="">Select Status</option>
              <option value="enrolled">Enrolled</option>
              <option value="unenrolled">Unenrolled</option>
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
      <div className="flex items-center w-full justify-center">
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

      {/* AddStudentModal */}
      {isModalOpen && (
        <AddStudentModal
          student={null} // Pass the student data if available
          onClose={handleCloseModal}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

// Props validation
Filter.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default Filter;
