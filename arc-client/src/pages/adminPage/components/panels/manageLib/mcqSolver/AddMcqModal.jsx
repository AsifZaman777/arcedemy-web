import { useState } from "react";
import PropTypes from "prop-types";

const AddMcqModal = ({ onClose, isDarkMode }) => {
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const curriculumOptions = ["Cambridge", "Edexcel"];
  const levelOptions = ["AS-Level", "A2-Level", "O-Level", "IGCSE", "IAL", "IAS"];
  const subjectOptions = ["Math", "Physics", "Chemistry", "Biology"];
  const sessionOptions = ["Jan-Feb", "May-Jun", "Oct-Nov"];

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleFileChange = (e) => {
    if (e.target.files.length > 70) {
      alert("You can upload up to 70 files at a time.");
    } else {
      setSelectedFiles([...e.target.files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedCurriculum ||
      !selectedLevel ||
      !selectedSubject ||
      !selectedYear ||
      !selectedSession ||
      selectedFiles.length === 0
    ) {
      alert("Please fill out all fields and select at least one file.");
      return;
    }

    const formData = new FormData();
    formData.append("curriculum", selectedCurriculum);
    formData.append("level", selectedLevel);
    formData.append("subject", selectedSubject);
    formData.append("year", selectedYear);
    formData.append("session", selectedSession);

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    console.log("Form data:", formData);

    try {
      setUploadMessage("Uploading files...");
      console.log("Uploading started...");

      const response = await fetch("http://localhost:5000/api/mcqs/aws/upload", {
        method: "POST",
        body: formData,
        onUploadProgress: (event) => {
          if (event.lengthComputable) {
            console.log("upload progress", event.loaded, event.total);
            const percentCompleted = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percentCompleted);
          }
        },
      });

      const result = await response.json();
      console.log("upload result", result);

      if (response.ok) {
        setUploadMessage("Files uploaded successfully!");
      } else {
        setUploadMessage(
          `Failed to upload files: ${result.error || "Unknown error occurred."}`
        );
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadMessage(""), 3000);
    }
  };

  return (
    <dialog
      id="add_mcq_modal"
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
        <h3 className="font-bold text-2xl mb-4">Upload MCQs</h3>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <label className="block text-lg mb-2">Select Curriculum:</label>
            <input
              list="curriculum-options"
              value={selectedCurriculum}
              onChange={handleInputChange(setSelectedCurriculum)}
              className="input input-bordered w-full text-lg p-2"
              placeholder="Type or select a curriculum"
            />
            <datalist id="curriculum-options">
              {curriculumOptions.map((cur, index) => (
                <option key={index} value={cur}>
                  {cur}
                </option>
              ))}
            </datalist>
          </div>

          <div className="py-4">
            <label className="block text-lg mb-2">Select Level:</label>
            <input
              list="level-options"
              value={selectedLevel}
              onChange={handleInputChange(setSelectedLevel)}
              className="input input-bordered w-full text-lg p-2"
              placeholder="Type or select a level"
            />
            <datalist id="level-options">
              {levelOptions.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </datalist>
          </div>

          <div className="py-4">
            <label className="block text-lg mb-2">Select Subject:</label>
            <input
              list="subject-options"
              value={selectedSubject}
              onChange={handleInputChange(setSelectedSubject)}
              className="input input-bordered w-full text-lg p-2"
              placeholder="Type or select a subject"
            />
            <datalist id="subject-options">
              {subjectOptions.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </datalist>
          </div>

          <div className="py-4">
            <label className="block text-lg mb-2">Year:</label>
            <input
              type="text"
              value={selectedYear}
              onChange={handleInputChange(setSelectedYear)}
              className="input input-bordered w-full text-lg p-2"
              placeholder="Enter year (e.g., 2020)"
            />
          </div>

          <div className="py-4">
            <label className="block text-lg mb-2">Session:</label>
            <input
              list="session-options"
              value={selectedSession}
              onChange={handleInputChange(setSelectedSession)}
              className="input input-bordered w-full text-lg p-2"
              placeholder="Type or select a session"
            />
            <datalist id="session-options">
              {sessionOptions.map((session, index) => (
                <option key={index} value={session}>
                  {session}
                </option>
              ))}
            </datalist>
          </div>

          <div className="py-4">
            <label className="block text-lg mb-2">Upload Files:</label>
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
              className="input input-bordered w-full text-lg p-2"
            />
          </div>

          {isUploading && (
            <div className="py-4">
              <label className="block text-lg mb-2">Uploading Files:</label>
              <div className="w-full bg-gray-300 rounded">
                <div
                  className="bg-blue-500 text-white text-sm font-medium text-center p-1 leading-none rounded"
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress}%
                </div>
              </div>
            </div>
          )}

          {uploadMessage && (
            <div className="py-4">
              <p className="text-center text-lg font-medium text-green-500">
                {uploadMessage}
              </p>
            </div>
          )}

          <div className="modal-action mt-4">
            <button
              type="submit"
              disabled={isUploading}
              className="btn bg-orange-500 text-xl font-normal text-slate-200 hover:bg-orange-600 p-2"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
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

AddMcqModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default AddMcqModal;
