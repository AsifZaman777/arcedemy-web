import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EditNoteModal from "./EditPaperModal"; // Assuming you have a component for editing papers

const PaperList = ({ isDarkMode }) => {
  const [papers, setPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch papers from the backend
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/papers");
        if (!response.ok) {
          throw new Error("Failed to fetch papers.");
        }
        const data = await response.json();
        setPapers(data); // Assuming the API response contains an array of papers
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching papers:", error);
        setIsLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const handleEdit = (paper) => {
    setSelectedNote(paper);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/paper/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete paper.");
      }
      setPapers((prevPapers) => prevPapers.filter((paper) => paper.id !== id));
      alert("Paper deleted successfully!");
    } catch (error) {
      console.error("Error deleting paper:", error);
      alert("Failed to delete paper. Please try again.");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <h2>Loading papers...</h2>
      </div>
    );
  }

  return (
    <div
      className={`p-4 rounded-2xl ${
        isDarkMode ? "bg-orange-500 text-white" : "bg-orange-200 text-black"
      }`}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">Past Papers</h2>
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
               <th className="px-4 py-2 border">Curriculum</th>
              <th className="px-4 py-2 border">Level</th>
               <th className="px-4 py-2 border">Subject Name</th>
              <th className="px-4 py-2 border">File</th>
              <th className="px-4 py-2 border">Year</th>
              <th className="px-4 py-2 border">Edit</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper, index) => (
              <tr
                key={paper._id}
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
                <td className="px-4 py-2 border text-center">{paper.curriculum}</td>
                <td className="px-4 py-2 border text-center">{paper.level}</td>
                <td className="px-4 py-2 border text-center">{paper.subject}</td>
                <td className="px-4 py-2 border text-center">{paper.fileName}</td>
                <td className="px-4 py-2 border text-center">{paper.folderName}</td>
                
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
                    onClick={() => handleDelete(paper.id)}
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
