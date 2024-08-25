import { useState } from "react";
import PropTypes from "prop-types";

const AddCurrModal = ({ onClose, isDarkMode }) => {
  const [curriculumName, setCurriculumName] = useState("");
  const [levelCount, setLevelCount] = useState(0);
  const [levelNames, setLevelNames] = useState([]);

  // Handle curriculum name change
  const handleCurriculumChange = (e) => {
    setCurriculumName(e.target.value);
  };

  // Handle radio button selection
  const handleLevelCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setLevelCount(count);

    // Initialize an array with empty strings for level names
    setLevelNames(Array(count).fill(""));
  };

  // Handle level name change
  const handleLevelNameChange = (index, value) => {
    const updatedLevels = [...levelNames];
    updatedLevels[index] = value;
    setLevelNames(updatedLevels);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform save logic here
    console.log("Curriculum:", curriculumName);
    console.log("Levels:", levelNames);
    onClose();
  };

  return (
    <dialog
      id="add_curr_modal"
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
        <h3 className="font-bold text-2xl mb-4">Add New Curriculum</h3>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <label className="block text-lg mb-2">Curriculum Name:</label>
            <input
              type="text"
              value={curriculumName}
              onChange={handleCurriculumChange}
              className="input input-bordered w-full text-lg p-2"
              placeholder="Enter curriculum name"
            />
          </div>
          <div className="py-4">
            <label className="block text-lg mb-2">How many academic levels do you want to add?</label>
            <div className="flex gap-4">

            <label className="flex items-center">
                <input
                  type="radio"
                  name="levelCount"
                  value={1}
                  onChange={handleLevelCountChange}
                  className="radio radio-primary mr-2"
                />
                1 Level
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="levelCount"
                  value={2}
                  onChange={handleLevelCountChange}
                  className="radio radio-primary mr-2"
                />
                2 Levels
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="levelCount"
                  value={4}
                  onChange={handleLevelCountChange}
                  className="radio radio-primary mr-2"
                />
                4 Levels
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="levelCount"
                  value={6}
                  onChange={handleLevelCountChange}
                  className="radio radio-primary mr-2"
                />
                6 Levels
              </label>
            </div>
          </div>
          {levelCount > 0 && (
            <div className="py-4 ease-in duration-300">
              {Array.from({ length: levelCount }).map((_, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-lg mb-2">{`Level ${index + 1}:`}</label>
                  <input
                    type="text"
                    value={levelNames[index]}
                    onChange={(e) =>
                      handleLevelNameChange(index, e.target.value)
                    }
                    className="input input-bordered w-full text-lg p-2"
                    placeholder={`e.g. O level, A level, etc.`}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="modal-action mt-4">
            <button
              type="submit"
              className="btn bg-orange-500 text-xl font-normal text-slate-200 hover:bg-orange-600 p-2"
            >
              Save
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
AddCurrModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default AddCurrModal;
