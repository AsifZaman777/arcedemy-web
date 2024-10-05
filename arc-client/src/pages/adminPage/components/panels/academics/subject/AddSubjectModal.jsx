import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AddSubjectModal = ({ onClose, isDarkMode }) => {
  const [subjectName, setSubjectName] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  //curriculum and levels from API
  const [curriculum, setCurriculum] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    // Fetch curriculum data from API
    fetch("http://localhost:5000/api/curriculum")
      .then((response) => response.json())
      .then((data) => {
        setCurriculum(data);
      })
      .catch((error) => console.error("Error fetching curriculum:", error));
  }, []);

  // Handle curriculum selection change
  const handleCurriculumChange = (e) => {
    const selectedCurriculum = curriculum.find(
      (curr) => curr.curriculum === e.target.value
    );
    setSelectedCurriculum(selectedCurriculum);
    setLevels(selectedCurriculum ? selectedCurriculum.levels : []);
    console.log(selectedCurriculum.levels);
  };

  // Handle level selection change
  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSubject = {
      curriculum: selectedCurriculum.curriculum,
      createdBy: "Admin", // Placeholder
      modifiedBy: "Sadman Sakib", // Placeholder
      levels: [
        {
          level: selectedLevel,
          subjects: [
            {
              id: Math.floor(Math.random() * 1000),
              subject: subjectName,
              chapters: [], 
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch("http://localhost:5000/api/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubject),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Subject added successfully:", result);
        onClose(); // Close modal on success
      } else {
        console.error("Error adding subject:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
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
              value={selectedCurriculum.curriculum || ""}
              onChange={handleCurriculumChange}
              className="input input-bordered w-full text-lg p-2"
            >
              <option value="">Select a curriculum</option>
              {curriculum.map((curr, index) => (
                <option key={index} value={curr.curriculum}>
                  {curr.curriculum}
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
              disabled={!selectedCurriculum}
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
