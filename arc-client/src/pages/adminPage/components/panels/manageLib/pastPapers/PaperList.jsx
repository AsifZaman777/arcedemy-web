import { useState } from "react";
import PropTypes from "prop-types";
import EditNoteModal from "./EditPaperModal"; // Assuming you have a component for editing papers

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleEdit = (papers) => {
    setSelectedNote(papers);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedNotes = papers.filter((papers) => papers.id !== id);
    setPapers(updatedNotes);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

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
            {papers.map((papers, index) => (
              <tr
                key={papers.id}
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
                <td className="px-4 py-2 border text-center">{papers.id}</td>
                <td className="px-4 py-2 border text-center">
                  <a
                    href={papers.noteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    View in Google Drive
                  </a>
                </td>
                <td className="px-4 py-2 border text-center">
                  {papers.chapterName}
                </td>
                <td className="px-4 py-2 border text-center">
                  {papers.subjectName}
                </td>
                <td className="px-4 py-2 border text-center">
                  {papers.curriculum}
                </td>
                <td className="px-4 py-2 border text-center">{papers.level}</td>
                <td className="px-4 py-2 border text-center">
                  {papers.createdBy}
                </td>
                <td className="px-4 py-2 border text-center">
                  {papers.modifiedBy}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleEdit(papers)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(papers.id)}
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
      {isModalOpen && selectedNote && (
        <EditNoteModal
          isDarkMode={isDarkMode}
          pastPapersData={selectedNote}
          onClose={handleModalClose}
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
