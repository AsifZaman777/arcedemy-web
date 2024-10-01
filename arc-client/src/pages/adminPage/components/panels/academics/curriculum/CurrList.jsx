import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EditCurrModal from "./EditCurrModal";
import DeleteCurriculumModal from "./DeleteCurriculumModal"; // Import the delete modal

const CurrList = ({ isDarkMode }) => {
  const [currs, setCurrs] = useState([]); // Fetch curriculums from API
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const [selectedCurr, setSelectedCurr] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/curriculum")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrs(data);
      })
      .catch((error) => {
        console.error("Error fetching curriculums:", error);
      });
  }, []);

  const handleEdit = (curr) => {
    setSelectedCurr(curr);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/curriculum/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrs(currs.filter((curr) => curr.id !== id));
        setIsDeleteModalOpen(false); // Close the delete modal after deletion
      })
      .catch((error) => {
        console.error("Error deleting curriculum:", error);
      });
  };

  const openDeleteModal = (curr) => {
    setSelectedCurr(curr);
    setIsDeleteModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedCurr(null);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedCurr(null);
  };

  return (
    <div
      className={`p-4 rounded-2xl ${
        isDarkMode ? "bg-orange-500 text-white" : "bg-orange-200 text-black"
      }`}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">Curriculum List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr
              className={`${
                isDarkMode
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Curriculum</th>
              <th className="px-4 py-2 border">Level</th>
              <th className="px-4 py-2 border">Created By</th>
              <th className="px-4 py-2 border">Modified By</th>
              <th className="px-4 py-2 border">Edit</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currs.map((curr, index) => (
              <tr
                key={curr.id}
                className={`${
                  index % 2 === 0
                    ? isDarkMode
                      ? "bg-gray-900"
                      : "bg-gray-100"
                    : isDarkMode
                    ? "bg-gray-800"
                    : "bg-white"
                } hover:bg-orange-300`}
              >
                <td className="px-4 py-2 border text-center">{curr._id}</td>
                <td className="px-4 py-2 border text-center">
                  {curr.curriculum}
                </td>
                <td className="px-4 py-2 border text-center">
                  {curr.levels.map((level) => level.level).join(", ")}
                </td>
                <td className="px-4 py-2 border text-center">
                  {curr.createdBy}
                </td>
                <td className="px-4 py-2 border text-center">
                  {curr.modifiedBy}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleEdit(curr)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => openDeleteModal(curr)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedCurr && (
        <EditCurrModal
          isDarkMode={isDarkMode}
          curr={{
            curriculum: selectedCurr.curriculum,
            createdBy: selectedCurr.createdBy,
            modifiedBy: selectedCurr.modifiedBy,
            levels: [{ id: selectedCurr.id, level: selectedCurr.level }],
          }}
          onClose={handleEditModalClose}
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedCurr && (
        <DeleteCurriculumModal
          isDarkMode={isDarkMode}
          curriculum={selectedCurr}
          onDelete={handleDelete}
          onClose={handleDeleteModalClose}
        />
      )}
    </div>
  );
};

// Prop validation
CurrList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default CurrList;
