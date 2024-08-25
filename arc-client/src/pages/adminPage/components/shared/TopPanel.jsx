import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from 'react-router-dom';

const TopPanel = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here, e.g., clearing user session or tokens
    navigate('/');
  };

  return (
    <div
      className={`flex flex-col py-4 px-6 shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
      style={{ zIndex: 50 }}
    >
      {/* Top Row: Title */}
      <div className="flex justify-between items-center w-full">
        
        {/* Admin Panel Title */}
        <div className="text-3xl font-semibold text-left ms-10 text-orange-500">
          Sadman mithun (Super Admin)
        </div>

        {/* Logout Button */}
        <div className="w-1/3 flex justify-end">
          <button
            onClick={handleLogout}
            className={`py-2 px-6 rounded ${isDarkMode ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Horizontal Line */}
      
    </div>
  );
};

// Define PropTypes for the TopPanel component
TopPanel.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default TopPanel;
