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
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [uploadMessage, setUploadMessage] = useState("");
   const [currentFileIndex, setCurrentFileIndex] = useState(0);

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
      setIsLoading(true); // Start loader
      setUploadProgress(0);
      setCurrentFileIndex(0);

      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentCompleted);
          setCurrentFileIndex(Math.floor((percentCompleted / 100) * selectedFiles.length));
        }
      };
      

      xhr.onload = () => {
        setIsUploading(false);
        setIsLoading(false); // Stop loader
        if (xhr.status === 200) {
          setUploadMessage("Files uploaded successfully!");
          setTimeout(() => setUploadMessage(""), 3000); // Clear message after 3 seconds
        } else {
          setUploadMessage("Failed to upload files. Please try again.");
          setTimeout(() => setUploadMessage(""), 3000);
        }
      };

      xhr.onerror = () => {
        setIsUploading(false);
        setIsLoading(false); // Stop loader
        setUploadMessage("An unexpected error occurred. Please try again.");
        setTimeout(() => setUploadMessage(""), 3000);
      };

      xhr.open("POST", "http://localhost:5000/api/paper/aws/upload", true);
      xhr.send(formData);
    } catch (err) {
      setIsUploading(false);
      setIsLoading(false); // Stop loader
      console.error("Error uploading files:", err);
      setUploadMessage("An unexpected error occurred. Please try again.");
      setTimeout(() => setUploadMessage(""), 3000);
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
        <h3 className="font-bold text-2xl mb-4">Upload Past Papers</h3>
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
           {/* type or select a level */}
           <input list="level-options" value={selectedLevel} onChange={handleInputChange(setSelectedLevel)} className="input input-bordered w-full text-lg p-2" 
           placeholder="Type or select a level" />
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
              list="chapter-options"
              value={selectedChapter}
              onChange={handleInputChange(setSelectedChapter)}
              className="input input-bordered w-full text-lg p-2"
              placeholder="Type or select a year"
              />
              <datalist id="chapter-options">
                {chapterOptions.map((chapter, index) => (
                  <option key={index} value={chapter}>
                    {chapter}
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
              <p className="text-lg mt-2 text-center">
                Uploading file {currentFileIndex}/{selectedFiles.length}
              </p>
            </div>
          )}

          {isLoading && (
            <div className="py-4 text-center">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500"></div>
              <p className="text-lg mt-2">Uploading...</p>
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
