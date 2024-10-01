import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EditNoteModal from "./EditPaperModal"; // Assuming you have a component for editing papers
import DeletePaperModal from "./DeletePaperModal"; // Import the DeletePaperModal

const PaperList = ({ isDarkMode }) => {
  const pastPapersData = [
    // Sample papers data
    {
      id: 1,
      chapterName: "Algebra Basics",
      subjectName: "Mathematics",
      curriculum: "Cambridge",
      level: "AS-Level",
      noteLink: "https://drive.google.com/file/d/1example1/view?usp=sharing",
      createdBy: "Admin",
      modifiedBy: "Sadman Sakib",
    },
    {
      id: 2,
      chapterName: "Kinematics",
      subjectName: "Physics",
      curriculum: "Cambridge",
      level: "AS-Level",
      noteLink: "https://drive.google.com/file/d/1example2/view?usp=sharing",
      createdBy: "Admin",
      modifiedBy: "Sadman Sakib",
    },
    {
      id: 3,
      chapterName: "Organic Chemistry Basics",
      subjectName: "Chemistry",
      curriculum: "Cambridge",
      level: "AS-Level",
      noteLink: "https://drive.google.com/file/d/1example3/view?usp=sharing",
      createdBy: "Admin",
      modifiedBy: "Sadman Sakib",
    },
    // Add more papers data as needed
  ];

  const [papers, setPapers] = useState(pastPapersData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);

  const handleEdit = (paper) => {
    setSelectedPaper(paper);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedPapers = papers.filter((paper) => paper.id !== id);
    setPapers(updatedPapers);
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (paper) => {
    setSelectedPaper(paper);
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedPaper(null);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedPaper(null);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/papers")
      .then((response) => response.json())
      .then((data) => {
        setPapers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div
      className={`p-4 rounded-2xl ${
        isDarkMode ? "bg-orange-500 text-white" : "bg-orange-200 text-black"
      }`}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">Past papers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr
              className={`${
                isDarkMode
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Past papers</th>
              <th className="px-4 py-2 border">Chapter Name</th>
              <th className="px-4 py-2 border">Subject Name</th>
              <th className="px-4 py-2 border">Curriculum</th>
              <th className="px-4 py-2 border">Level</th>
              <th className="px-4 py-2 border">Created By</th>
              <th className="px-4 py-2 border">Modified By</th>
              <th className="px-4 py-2 border">Edit</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper, index) => (
              <tr
                key={paper.id}
                className={`${
                  index % 2 === 0
                    ? isDarkMode
                      ? "bg-gray-900"
                      : "bg-gray-100"
                    : isDarkMode
                    ? "bg-gray-800"
                    : "bg-white"
                } hover:bg-orange-300`}
              >
                <td className="px-4 py-2 border text-center">{paper._id}</td>
                <td className="px-4 py-2 border text-center">
                  <a
                    href={paper.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    View in Google Drive
                  </a>
                </td>
                <td className="px-4 py-2 border text-center">{paper.chapter}</td>
                <td className="px-4 py-2 border text-center">{paper.subject}</td>
                <td className="px-4 py-2 border text-center">{paper.curriculum}</td>
                <td className="px-4 py-2 border text-center">{paper.level}</td>
                <td className="px-4 py-2 border text-center">{paper.createdBy}</td>
                <td className="px-4 py-2 border text-center">{paper.modifiedBy}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleEdit(paper)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => openDeleteModal(paper)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedPaper && (
        <EditNoteModal
          isDarkMode={isDarkMode}
          pastPapersData={selectedPaper}
          onClose={handleModalClose}
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedPaper && (
        <DeletePaperModal
          isDarkMode={isDarkMode}
          paper={selectedPaper}
          onClose={handleDeleteModalClose}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

// Prop validation
PaperList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default PaperList;
