import { useState } from "react";
import PropTypes from "prop-types";

const AddPaperModal = ({ onClose, isDarkMode }) => {
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Sample data for the form
  const curriculum = ["Cambridge", "Edexcel"];
  const levels = ["AS-Level", "A2-Level", "O-Level", "IGCSE", "IAL", "IAS"];
  const subjects = ["Math", "Physics", "Chemistry"];
  const chapters = ["Algebra Basics", "Kinematics", "Chemical Reactions"];

  const handleCurriculumChange = (e) => setSelectedCurriculum(e.target.value);
  const handleLevelChange = (e) => setSelectedLevel(e.target.value);
  const handleSubjectChange = (e) => setSelectedSubject(e.target.value);
  const handleChapterChange = (e) => setSelectedChapter(e.target.value);
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("curriculum", selectedCurriculum);
    formData.append("level", selectedLevel);
    formData.append("subject", selectedSubject);
    formData.append("chapter", selectedChapter);
    formData.append("files", selectedFile);

    fetch("http://localhost:5000/api/paper/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSuccessMessage(`${selectedFile.name} uploaded successfully`);
        setErrorMessage("");
        onClose();
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage("An error occurred while uploading the file");
        setSuccessMessage("");
      });
  };

  return (
    <dialog
      id="add_paper_modal"
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
        <h3 className="font-bold text-2xl mb-4">Add New Paper</h3>
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
            <label className="block text-lg mb-2">Select Chapter:</label>
            <select
              value={selectedChapter}
              onChange={handleChapterChange}
              className="input input-bordered w-full text-lg p-2"
            >
              <option value="">Select a chapter</option>
              {chapters.map((chapter, index) => (
                <option key={index} value={chapter}>
                  {chapter}
                </option>
              ))}
            </select>
          </div>

          <div className="py-4">
            <label className="block text-lg mb-2">Upload File:</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="input input-bordered w-full text-lg p-2"
            />
          </div>

          {successMessage && <p className="text-green-500 font-bold">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 font-bold">{errorMessage}</p>}

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

AddPaperModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default AddPaperModal;
