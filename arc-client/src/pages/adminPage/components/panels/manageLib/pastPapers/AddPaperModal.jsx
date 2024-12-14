import { useState } from "react";
import PropTypes from "prop-types";

const AddPaperModal = ({ onClose, isDarkMode }) => {
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const curriculumOptions = ["Cambridge", "Edexcel"];
  const levelOptions = ["AS-Level", "A2-Level", "O-Level", "IGCSE", "IAL", "IAS"];
  const subjectOptions = ["Math", "Physics", "Chemistry", "Biology"];
  const chapterOptions = ["2018-oct-nov", "2019-may-june", "2020-jan-feb"];

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
      !selectedChapter ||
      selectedFiles.length === 0
    ) {
      alert("Please fill out all fields and select at least one file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("curriculum", selectedCurriculum);
      formData.append("level", selectedLevel);
      formData.append("subject", selectedSubject);
      formData.append("folderName", selectedChapter);

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      setIsUploading(true);
      setUploadProgress(0);

      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentCompleted);
        }
      };

      xhr.onload = () => {
        setIsUploading(false);
        if (xhr.status === 200) {
          alert("Files uploaded successfully!");
          onClose();
        } else {
          alert("Failed to upload files. Please try again.");
        }
      };

      xhr.onerror = () => {
        setIsUploading(false);
        alert("An unexpected error occurred. Please try again.");
      };

      xhr.open("POST", "http://localhost:5000/api/paper/aws/upload", true);
      xhr.send(formData);
    } catch (err) {
      setIsUploading(false);
      console.error("Error uploading files:", err);
      alert("An unexpected error occurred. Please try again.");
    }
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
              onChange={handleInputChange(setSelectedCurriculum)}
              className="input input-bordered w-full text-lg p-2"
            >
              <option value="">Select a curriculum</option>
              {curriculumOptions.map((cur, index) => (
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
              onChange={handleInputChange(setSelectedLevel)}
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
              onChange={handleInputChange(setSelectedSubject)}
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
              onChange={handleInputChange(setSelectedChapter)}
              className="input input-bordered w-full text-lg p-2"
            >
              <option value="">Select a chapter</option>
              {chapterOptions.map((chapter, index) => (
                <option key={index} value={chapter}>
                  {chapter}
                </option>
              ))}
            </select>
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

          <div className="modal-action mt-4">
            <button
              type="submit"
              disabled={isUploading}
              className="btn bg-orange-500 text-xl font-normal text-slate-200 hover:bg-orange-600 p-2"
            >
              Save
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

AddPaperModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default AddPaperModal;
