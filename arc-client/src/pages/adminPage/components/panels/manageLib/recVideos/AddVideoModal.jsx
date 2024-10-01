import { useState } from "react";
import PropTypes from "prop-types";

const AddVideoModal = ({ onClose, isDarkMode }) => {
  const [subjectName, setSubjectName] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [videoLink, setVideoLink] = useState("");  // Add state for videoLink

  const curriculum = ["Cambridge", "Edexcel"];
  const levels = ["AS-Level", "A2-Level", "O-Level", "IGCSE", "IAL", "IAS"];
  const subjects = ["Math", "Physics", "Chemistry"];

  const handleCurriculumChange = (e) => {
    setSelectedCurriculum(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/videos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curriculum: selectedCurriculum,
        level: selectedLevel,
        subject: selectedSubject,
        chapter: subjectName,
        videoLink: videoLink,  // Access videoLink from state
      }),
    }).then((response) => {
      if (response.ok) {
        console.log("Chapter added successfully");
        onClose();
      } else {
        console.log("Failed to add chapter");
      }
    });
    console.log("Selected Curriculum:", selectedCurriculum);
    console.log("Selected Level:", selectedLevel);
    console.log("Subject Name:", subjectName);
    console.log("Selected Subject:", selectedSubject);
    console.log("Video Link:", videoLink);
    onClose();
  };

  return (
    <dialog
      id="add_chapter_modal"
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
        <h3 className="font-bold text-2xl mb-4">Add New Chapter</h3>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <label className="block text-lg mb-2">Select Curriculum:</label>
            <select
              value={selectedCurriculum}
              onChange={handleCurriculumChange}
              className="input input-bordered w-full text-lg p-2"
            >
              <option value="">Select a curriculum</option>
              {curriculum.map((cur, index) => (
                <option key={index} value={cur}>
                  {cur}
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
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="py-4">
            <label className="block text-lg mb-2">Select Subject:</label>
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="input input-bordered w-full text-lg p-2"
            >
              <option value="">Select a subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="py-4">
            <label className="block text-lg mb-2">Chapter Name:</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="input input-bordered w-full text-lg p-2"
              placeholder="Enter chapter name"
            />
          </div>
          <div className="py-4">
            <label className="block text-lg mb-2">Video Link:</label>
            <input
              type="text"
              value={videoLink}  // Bind value to state
              onChange={(e) => setVideoLink(e.target.value)}  // Update state on change
              className="input input-bordered w-full text-lg p-2"
              placeholder="Enter video link"
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
AddVideoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default AddVideoModal;
