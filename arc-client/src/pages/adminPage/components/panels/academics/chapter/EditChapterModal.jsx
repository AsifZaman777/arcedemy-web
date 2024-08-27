import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EditChapterModal = ({ chapterData, onClose, isDarkMode }) => {
  const [chapterName, setChapterName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  // Sample subjects, curriculums, and levels for demonstration
  const subjectOptions = ["Mathematics", "Physics", "Chemistry"];
  const curriculumOptions = ["Cambridge", "Edexcel"];
  const levelOptions = ["AS-Level", "A2-Level", "O-Level", "IGCSE", "IAL", "IAS"];

  // Prefill form with chapterData when it changes
  useEffect(() => {
    if (chapterData) {
      setChapterName(chapterData.chapterName || "");
      setSelectedSubject(chapterData.subjectName || "");
      setSelectedCurriculum(chapterData.curriculum || "");
      setSelectedLevel(chapterData.level || "");
    }
  }, [chapterData]);

  // Handle subject selection change
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

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
    console.log("Chapter Name:", chapterName);
    console.log("Selected Subject:", selectedSubject);
    console.log("Selected Curriculum:", selectedCurriculum);
    console.log("Selected Level:", selectedLevel);
    onClose();
  };

  return (
    <dialog
      id="edit_chapter_modal"
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
        <h3 className="font-bold text-2xl mb-4">Edit Chapter</h3>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <label className="block text-lg mb-2">Chapter Name:</label>
            <input
              type="text"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              className="input input-bordered w-full text-lg p-2"
              placeholder="Enter chapter name"
            />
          </div>
          <div className="py-4">
            <label className="block text-lg mb-2">Select Subject:</label>
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="input input-bordered w-full text-lg p-2"
            >
              <option value="">Select a subject</option>
              {subjectOptions.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div className="py-4">
            <label className="block text-lg mb-2">Select Curriculum:</label>
            <select
              value={selectedCurriculum}
              onChange={handleCurriculumChange}
              className="input input-bordered w-full text-lg p-2"
            >
              <option value="">Select a curriculum</option>
              {curriculumOptions.map((curriculum, index) => (
                <option key={index} value={curriculum}>
                  {curriculum}
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
              {levelOptions.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
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
EditChapterModal.propTypes = {
  chapterData: PropTypes.shape({
    chapterName: PropTypes.string,
    subjectName: PropTypes.string,
    curriculum: PropTypes.string,
    level: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default EditChapterModal;
