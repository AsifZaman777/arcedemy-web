import { useState } from "react";
import PropTypes from "prop-types";
import EditSubjectModal from "./EditSubjectModal";

const SubjectList = ({ isDarkMode }) => {
    const subjectsData = [
        // Cambridge Curriculum
        {
          id: 1,
          subjectName: "Mathematics",
          curriculum: "Cambridge",
          level: "AS-Level",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 2,
          subjectName: "Physics",
          curriculum: "Cambridge",
          level: "AS-Level",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 3,
          subjectName: "Chemistry",
          curriculum: "Cambridge",
          level: "AS-Level",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 4,
          subjectName: "Mathematics",
          curriculum: "Cambridge",
          level: "A2-Level",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 5,
          subjectName: "Physics",
          curriculum: "Cambridge",
          level: "A2-Level",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 6,
          subjectName: "Chemistry",
          curriculum: "Cambridge",
          level: "A2-Level",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 7,
          subjectName: "Mathematics",
          curriculum: "Cambridge",
          level: "O-Level",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 8,
          subjectName: "Physics",
          curriculum: "Cambridge",
          level: "O-Level",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 9,
          subjectName: "Chemistry",
          curriculum: "Cambridge",
          level: "O-Level",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
      
        // Edexcel Curriculum
        {
          id: 10,
          subjectName: "Mathematics",
          curriculum: "Edexcel",
          level: "IGCSE",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 11,
          subjectName: "Physics",
          curriculum: "Edexcel",
          level: "IGCSE",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 12,
          subjectName: "Chemistry",
          curriculum: "Edexcel",
          level: "IGCSE",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 13,
          subjectName: "Mathematics",
          curriculum: "Edexcel",
          level: "IAL",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 14,
          subjectName: "Physics",
          curriculum: "Edexcel",
          level: "IAL",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 15,
          subjectName: "Chemistry",
          curriculum: "Edexcel",
          level: "IAL",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 16,
          subjectName: "Mathematics",
          curriculum: "Edexcel",
          level: "IAS",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 17,
          subjectName: "Physics",
          curriculum: "Edexcel",
          level: "IAS",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
        {
          id: 18,
          subjectName: "Chemistry",
          curriculum: "Edexcel",
          level: "IAS",
          createdBy: "Admin",
          modifiedBy: "Sadman Sakib",
        },
      ];
      

  const [subjects, setSubjects] = useState(subjectsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedSubjects = subjects.filter((subject) => subject.id !== id);
    setSubjects(updatedSubjects);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSubject(null);
  };

  return (
    <div
      className={`p-4 rounded-2xl ${
        isDarkMode ? "bg-orange-500 text-white" : "bg-orange-200 text-black"
      }`}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">Subject List</h2>
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
            {subjects.map((subject, index) => (
              <tr
                key={subject.id}
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
                <td className="px-4 py-2 border text-center">{subject.id}</td>
                <td className="px-4 py-2 border text-center">{subject.subjectName}</td>
                <td className="px-4 py-2 border text-center">{subject.curriculum}</td>
                <td className="px-4 py-2 border text-center">{subject.level}</td>
                <td className="px-4 py-2 border text-center">{subject.createdBy}</td>
                <td className="px-4 py-2 border text-center">{subject.modifiedBy}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleEdit(subject)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(subject.id)}
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
      {isModalOpen && selectedSubject && (
        <EditSubjectModal
          isDarkMode={isDarkMode}
          subjectData={selectedSubject}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

// Prop validation
SubjectList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default SubjectList;
