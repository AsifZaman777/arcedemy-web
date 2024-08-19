import PropTypes from 'prop-types';  // Import PropTypes
import { useNavigate } from 'react-router-dom';

const TopPanel = ({ isDarkMode}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here, e.g., clearing user session or tokens
    navigate('/');
  };

  return (
    <div className={`flex justify-between items-center p-4 shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Admin Panel Title */}
      <div className="flex-1 text-lg font-semibold text-center">
        Admin Panel
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className={`py-2 px-4 rounded ${isDarkMode ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
      >
        Logout
      </button>
    </div>
  );
};

// Define PropTypes for the TopPanel component
TopPanel.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default TopPanel;
