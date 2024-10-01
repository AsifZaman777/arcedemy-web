import PropTypes from "prop-types";

const DeletePaperModal = ({ paper, onClose, onDelete, isDarkMode }) => {
  const handleDelete = () => {
    // Call API to delete paper
    console.log("Deleting paper:", paper._id);
    fetch(`http://localhost:5000/api/paper/delete/${paper._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Delete Success:", data);
          onDelete(paper._id); // Call the onDelete function passed from the parent component
          onClose(); // Close the modal
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while deleting. Please try again.");
        });
  };

  return (
    <dialog
      id="delete_paper_modal"
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
        <h3 className="font-bold text-2xl mb-4">Delete Paper</h3>
        <p className="text-lg mb-6">
          Are you sure you want to delete the Paper{" "}
          <span className="font-bold">{paper.fileName}</span>? This action cannot
          be undone.
        </p>
        <div className="modal-action">
          <button
            onClick={handleDelete}
            className="btn bg-red-500 text-xl font-normal text-slate-200 hover:bg-red-600 p-2"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="btn bg-gray-500 text-xl font-normal text-slate-200 hover:bg-gray-600 p-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

// Define PropTypes for the component
DeletePaperModal.propTypes = {
  paper: PropTypes.shape({
    _id: PropTypes.string.isRequired,   // Validate _id as a required string
    fileName: PropTypes.string.isRequired, // Validate fileName as a required string
    id: PropTypes.number,               // Validate id as a number (if needed)
    name: PropTypes.string,             // Validate name as a string
    // Add other properties of the paper object as needed
  }).isRequired,                        // Make the entire paper object required
  onClose: PropTypes.func.isRequired,   // Validate onClose as a required function
  onDelete: PropTypes.func.isRequired,  // Validate onDelete as a required function
  isDarkMode: PropTypes.bool.isRequired,// Validate isDarkMode as a required boolean
};

export default DeletePaperModal;
