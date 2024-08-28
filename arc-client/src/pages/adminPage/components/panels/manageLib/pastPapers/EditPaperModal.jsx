import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EditPaperModal = ({ pastPapersData, onClose, isDarkMode }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  // Sample subjects, curriculums, levels, and chapters for demonstration
  const subjectOptions = ["Mathematics", "Physics", "Chemistry"];
  const curriculumOptions = ["Cambridge", "Edexcel"];
  const levelOptions = ["AS-Level", "A2-Level", "O-Level", "IGCSE", "IAL", "IAS"];
  const chapters = ["Algebra Basics", "Kinematics", "Organic Chemistry Basics"];

  // Prefill form with pastPapersData when it changes
  useEffect(() => {
    if (pastPapersData) {
      setUploadedFile(pastPapersData.file || null); // Prefill with existing file if available
      setSelectedSubject(pastPapersData.subjectName || "");
      setSelectedCurriculum(pastPapersData.curriculum || "");
      setSelectedLevel(pastPapersData.level || "");
      setSelectedChapter(pastPapersData.chapterName || "");
    }
  }, [pastPapersData]);

  // Handle changes for form fields
  const handleFileChange = (e) => setUploadedFile(e.target.files[0]);
  const handleSubjectChange = (e) => setSelectedSubject(e.target.value);
  const handleCurriculumChange = (e) => setSelectedCurriculum(e.target.value);
  const handleLevelChange = (e) => setSelectedLevel(e.target.value);
  const handleChapterChange = (e) => setSelectedChapter(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform save logic here
    console.log("Uploaded File:", uploadedFile);
    console.log("Selected Chapter:", selectedChapter);
    console.log("Selected Subject:", selectedSubject);
    console.log("Selected Curriculum:", selectedCurriculum);
    console.log("Selected Level:", selectedLevel);
    onClose();
  };

  return (
    <dialog
      id="edit_note_modal"
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
        <h3 className="font-bold text-2xl mb-4">Edit Note</h3>
        <form onSubmit={handleSubmit}>
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
            <label className="block text-lg mb-2">Upload Note:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="input input-bordered w-full text-lg p-2"
            />
            {uploadedFile && (
              <p className="mt-2 text-gray-500">
                Current file: {uploadedFile.name || uploadedFile}
              </p>
            )}
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
EditPaperModal.propTypes = {
  pastPapersData: PropTypes.shape({
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Handle both string (URL) and File object
    chapterName: PropTypes.string,
    subjectName: PropTypes.string,
    curriculum: PropTypes.string,
    level: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default EditPaperModal;
