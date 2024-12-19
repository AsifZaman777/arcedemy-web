import { FaHome, FaFileAlt } from "react-icons/fa"; // Import FaDownload for the download icon
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const homeNavigate = () => {
    navigate("/");
  };

  return (
    <header className="bg-orange-50 shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-3xl font-bold text-orange-500">Edexcel</div>
      <button
        className="btn btn-ghost rounded-md bg-orange-600 text-white text-md sm:text-md hover:bg-orange-700 hover:text-white"
        onClick={homeNavigate}
      >
        <FaHome className="inline mr-2 text-lg sm:text-2xl" />
        Home
      </button>
    </header>
  );
};

const EdPaperSelect = () => {
  const [papers, setPapers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);

  // Fetch papers from API
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/papers"); // Replace with your API endpoint
        const data = response.data;

        setPapers(data);

        // Extract unique levels
        const uniqueLevels = [...new Set(data.map((paper) => paper.level))];
        setLevels(uniqueLevels);
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    };

    fetchPapers();
  }, []);

  // Handle level selection
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setSelectedSubject(null);
    setSelectedFolder(null);
    setFiles([]);

    // Extract unique subjects for the selected level
    const levelSubjects = [
      ...new Set(papers.filter((paper) => paper.level === level).map((paper) => paper.subject)),
    ];
    setSubjects(levelSubjects);
  };

  // Handle subject selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedFolder(null);
    setFiles([]);

    // Extract unique folders for the selected subject
    const subjectFolders = [
      ...new Set(
        papers
          .filter((paper) => paper.level === selectedLevel && paper.subject === subject)
          .map((paper) => paper.folderName)
      ),
    ];
    setFolders(subjectFolders);
  };

  // Handle folder selection
  const handleFolderSelect = (folderName) => {
    setSelectedFolder(folderName);

    // Extract files for the selected folder
    const folderFiles = papers.filter(
      (paper) =>
        paper.level === selectedLevel &&
        paper.subject === selectedSubject &&
        paper.folderName === folderName
    );
    setFiles(folderFiles);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        {/* Sidebar for hierarchical selection */}
        <div className="w-1/4 p-4 bg-orange-100 h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Levels</h2>

          {/* Levels */}
          <ul>
            {levels.map((level) => (
              <li
                key={level}
                onClick={() => handleLevelSelect(level)}
                className={`cursor-pointer mb-2 p-2 rounded ${
                  selectedLevel === level ? "bg-orange-200 text-orange-600" : ""
                }`}
              >
                {level}
              </li>
            ))}
          </ul>

          {/* Subjects */}
          {selectedLevel && (
            <>
              <h2 className="text-xl font-bold mb-4 mt-6">Subjects</h2>
              <ul>
                {subjects.map((subject) => (
                  <li
                    key={subject}
                    onClick={() => handleSubjectSelect(subject)}
                    className={`cursor-pointer mb-2 p-2 rounded ${
                      selectedSubject === subject ? "bg-orange-200 text-orange-600" : ""
                    }`}
                  >
                    {subject}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Folders */}
          {selectedSubject && (
            <>
              <h2 className="text-xl font-bold mb-4 mt-6">Year</h2>
              <ul>
                {folders.map((folder) => (
                  <li
                    key={folder}
                    onClick={() => handleFolderSelect(folder)}
                    className={`cursor-pointer mb-2 p-2 rounded ${
                      selectedFolder === folder ? "bg-orange-200 text-orange-600" : ""
                    }`}
                  >
                    {folder}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Main content area */}
        <div className="w-3/4 p-8 flex flex-col h-screen overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Files</h2>

          {/* Files */}
          {files.length > 0 ? (
            <ul className="space-y-4">
              {files.map((file) => (
                <li
                  key={file._id}
                  className="p-4 border border-gray-300 rounded shadow-md"
                >
                  <h3 className="text-lg font-bold text-orange-600">{file.fileName}</h3>
                  <p>
                    <strong>Uploaded At:</strong>{" "}
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-4 mt-2">
                    {/* View Button */}
                    <a
                      href={file.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 underline"
                    >
                      {/* file icon */}
                      <FaFileAlt className="inline mr-2 text-lg" />
                      View
                    </a>

                    {/* Download Button */}
                    {/* <a
                      href={file.filePath}
                      download
                      className="text-orange-500 underline"
                    >
                      <FaDownload className="inline mr-2 text-lg" />
                      Download
                    </a> */}
                  </div>
                </li>
              ))}
            </ul>
          ) : selectedFolder ? (
            <p className="text-center text-gray-500">No files found in this folder.</p>
          ) : (
            <p className="text-center text-gray-500">Please select a folder to view files.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EdPaperSelect;
