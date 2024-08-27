import { useState } from "react";
import PropTypes from "prop-types";
import EditChapterModal from "./EditChapterModal"; // Assuming you have a component for editing chapters

const ChapterList = ({ isDarkMode }) => {
  const chaptersData = [
    // Sample chapter data
    {
      id: 1,
      chapterName: "Algebra Basics",
      subjectName: "Mathematics",
      curriculum: "Cambridge",
      level: "AS-Level",
      createdBy: "Admin",
      modifiedBy: "Sadman Sakib",
    },
    {
      id: 2,
      chapterName: "Kinematics",
      subjectName: "Physics",
      curriculum: "Cambridge",
      level: "AS-Level",
      createdBy: "Admin",
      modifiedBy: "Sadman Sakib",
    },
    {
      id: 3,
      chapterName: "Organic Chemistry",
      subjectName: "Chemistry",
      curriculum: "Cambridge",
      level: "AS-Level",
      createdBy: "Admin",
      modifiedBy: "Sadman Sakib",
    },
    // Add more chapter data as needed
  ];

  const [chapters, setChapters] = useState(chaptersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const handleEdit = (chapter) => {
    setSelectedChapter(chapter);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedChapters = chapters.filter((chapter) => chapter.id !== id);
    setChapters(updatedChapters);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedChapter(null);
  };

  return (
    <div
      className={`p-4 rounded-2xl ${
        isDarkMode ? "bg-orange-500 text-white" : "bg-orange-200 text-black"
      }`}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">Chapter List</h2>
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
            {chapters.map((chapter, index) => (
              <tr
                key={chapter.id}
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
                <td className="px-4 py-2 border text-center">{chapter.id}</td>
                <td className="px-4 py-2 border text-center">{chapter.chapterName}</td>
                <td className="px-4 py-2 border text-center">{chapter.subjectName}</td>
                <td className="px-4 py-2 border text-center">{chapter.curriculum}</td>
                <td className="px-4 py-2 border text-center">{chapter.level}</td>
                <td className="px-4 py-2 border text-center">{chapter.createdBy}</td>
                <td className="px-4 py-2 border text-center">{chapter.modifiedBy}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleEdit(chapter)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(chapter.id)}
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
      {isModalOpen && selectedChapter && (
        <EditChapterModal
          isDarkMode={isDarkMode}
          chapterData={selectedChapter}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

// Prop validation
ChapterList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default ChapterList;
