import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AddSubjectModal = ({ onClose, isDarkMode }) => {
  const [levelCount] = useState(0);
  const [levelNames, setLevelNames] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  // Sample curriculum and levels for demonstration
  // const curriculum = ["Cambridge", "Edexcel"];
  // const levels = ["AS-Level", "A2-Level", "O-Level", "IGCSE", "IAL", "IAS"];

  //currilum and levels from api
  const [curriculum, setCurriculum] = useState([]);
  const [levels, setLevels] = useState(curriculum.levels || []);


  
  useEffect(() => {
    // Initialize level names array when levelCount changes
    setLevelNames(Array(levelCount).fill(""));

    // Fetch curriculum data from API
    fetch("http://localhost:5000/api/curriculum")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurriculum(data);
        setLevels(curriculum.levels || []);
      });
  }, []);

  // Handle curriculum selection change
  const handleCurriculumChange = (e) => {
    setSelectedCurriculum(e.target.value);
  };

  // Handle level selection change
  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform save logic here
    console.log("Selected Curriculum:", selectedCurriculum);
    console.log("Selected Level:", selectedLevel);
    console.log("Subject Name:", subjectName);
    console.log("Levels:", levelNames);
    onClose();
  };

  return (
    <dialog
      id="add_subject_modal"
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
        <h3 className="font-bold text-2xl mb-4">Add New Subject</h3>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <label className="block text-lg mb-2">Select Curriculum:</label>
            <select
              value={selectedCurriculum}
              onChange={handleCurriculumChange}
              className="input input-bordered w-full text-lg p-2"
            >
              <option value="">Select a curriculum</option>
              {curriculum.map((curriculum, index) => (
                <option key={index} value={curriculum.curriculum}>
                  {curriculum.curriculum}
                </option>
              ))}
            </select>
          </div>

          <div className="py-4">
            <label className="block text-lg mb-2">Select Level:</label>
            <select
              value={selectedLevel}
              onChange={handleLevelChange}
              className="input input-bordered w-full text-lg p-2"
            >
              <option value="">Select a level</option>
              {levels.map((level, index) => (
                <option key={index} value={level.level}>
                  {level.level}
                </option>
              ))}
            </select>
          </div>

          <div className="py-4">
            <label className="block text-lg mb-2">Subject Name:</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="input input-bordered w-full text-lg p-2"
              placeholder="Enter subject name"
            />
          </div>

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
AddSubjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default AddSubjectModal;
