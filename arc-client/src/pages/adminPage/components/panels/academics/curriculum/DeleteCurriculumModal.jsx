import PropTypes from "prop-types";

const DeleteCurriculumModal = ({ isDarkMode, curriculum, onDelete, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDarkMode ? "bg-gray-800 bg-opacity-75" : "bg-gray-300 bg-opacity-75"
      }`}
    >
      <div
        className={`w-full max-w-md p-4 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">Delete Curriculum</h2>
        <p>Are you sure you want to delete the curriculum <strong>{curriculum.curriculum}</strong> with level <strong>{curriculum.level}</strong>?</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded ${
              isDarkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(curriculum._id)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteCurriculumModal.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  curriculum: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteCurriculumModal;