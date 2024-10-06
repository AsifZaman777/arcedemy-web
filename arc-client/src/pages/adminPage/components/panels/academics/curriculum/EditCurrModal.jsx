import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EditCurrModal = ({ curr, onClose, isDarkMode }) => {
  const [curriculum, setCurriculumName] = useState(curr.curriculum || "");
  const [createdBy, setCreatedBy] = useState(curr.createdBy || "");
  const [modifiedBy, setModifiedBy] = useState(curr.modifiedBy || "");
  const [levels, setLevels] = useState(curr.levels || []); // Handle levels as an array of objects
  const [isSaving, setIsSaving] = useState(false); // State to manage saving status

  // Prefill form with curr data when it changes
  useEffect(() => {
    setCurriculumName(curr.curriculum || "");
    setCreatedBy(curr.createdBy || "");
    setModifiedBy(curr.modifiedBy || "");
    setLevels(curr.levels || []); // Ensure levels are objects with id and level
  }, [curr]);

  // Handle curriculum name change
  const handleCurriculumChange = (e) => {
    setCurriculumName(e.target.value);
  };

  

  // Handle level name change
  const handleLevelChange = (index, value) => {
    const updatedLevels = [...levels];
    updatedLevels[index] = { ...updatedLevels[index], level: value }; // Ensure you update the object
    setLevels(updatedLevels);
  };

  // Handle delete level
  const handleDeleteLevel = (index) => {
    const updatedLevels = levels.filter((_, i) => i !== index);
    setLevels(updatedLevels);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true); // Set saving state

    const updatedCurriculum = {
      curriculum,
      createdBy,
      modifiedBy,
      levels,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/curriculum/${curr._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCurriculum),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Curriculum updated successfully:", result);
        onClose(); // Close modal on success
      } else {
        console.error("Error updating curriculum:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsSaving(false); // Reset saving state
    }
  };

  return (
    <dialog
      id="edit_curr_modal"
      className="modal fixed inset-0 z-50 flex items-center justify-center"
      open
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        className={`modal-box z-10 ${
          isDarkMode
            ? "bg-gray-900 border-cyan-600 border-2"
            : "bg-white border-gray-700 border-2"
        }`}
      >
        <h3 className="font-bold text-2xl mb-4">Edit Curriculum</h3>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <label className="block text-lg mb-2">Curriculum Name:</label>
            <input
              type="text"
              value={curriculum}
              onChange={handleCurriculumChange}
              className="input input-bordered w-full text-lg p-2"
              placeholder="Enter curriculum name"
            />
          </div>
          
          
          <div className="py-4">
            <label className="block text-lg mb-2">Levels:</label>

            {levels.length > 0 ? (
              levels.map((level, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={level.level}
                    onChange={(e) => handleLevelChange(index, e.target.value)}
                    className="input input-bordered w-full text-lg p-2"
                    placeholder={`Level ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteLevel(index)}
                    className="ml-2 btn bg-red-500 text-slate-200 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No levels available.</p>
            )}
          </div>
          <div className="modal-action mt-4">
            <button
              type="submit"
              className="btn bg-orange-500 text-xl font-normal text-slate-200 hover:bg-orange-600 p-2"
              disabled={isSaving} // Disable button during save
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn bg-red-500 text-xl font-normal text-slate-200 hover:bg-red-600 p-2"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

// Props validation
EditCurrModal.propTypes = {
  curr: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Ensure _id is validated
    curriculum: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    modifiedBy: PropTypes.string.isRequired,
    levels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        level: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default EditCurrModal;
