import { useState } from "react";
import PropTypes from "prop-types";
import EditNoteModal from "./EditNoteModal"; // Assuming you have a component for editing notes

const NoteList = ({ isDarkMode }) => {
  const notesData = [
    // Sample note data
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
    // Add more note data as needed
  ];

  const [notes, setNotes] = useState(notesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleEdit = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
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
      <h2 className="text-3xl font-semibold mb-4 text-center">Note List</h2>
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
              <th className="px-4 py-2 border">Note</th>
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
            {notes.map((note, index) => (
              <tr
                key={note.id}
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
                <td className="px-4 py-2 border text-center">{note.id}</td>
                <td className="px-4 py-2 border text-center">
                  <a
                    href={note.noteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    View in Google Drive
                  </a>
                </td>
                <td className="px-4 py-2 border text-center">
                  {note.chapterName}
                </td>
                <td className="px-4 py-2 border text-center">
                  {note.subjectName}
                </td>
                <td className="px-4 py-2 border text-center">
                  {note.curriculum}
                </td>
                <td className="px-4 py-2 border text-center">{note.level}</td>
                <td className="px-4 py-2 border text-center">
                  {note.createdBy}
                </td>
                <td className="px-4 py-2 border text-center">
                  {note.modifiedBy}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleEdit(note)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(note.id)}
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
          noteData={selectedNote}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

// Prop validation
NoteList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default NoteList;
