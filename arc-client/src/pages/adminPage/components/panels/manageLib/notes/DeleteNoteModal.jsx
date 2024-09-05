import PropTypes from "prop-types";

const DeleteNoteModal = ({ note, onClose, onDelete, isDarkMode }) => {
  const handleDelete = () => {
    // Call API to delete student
    console.log("Deleting student:", note._id);
    fetch(`http://localhost:5000/api/notes/delete/${note._id}`, {
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
          onDelete(note._id); // Call the onDelete function passed from the parent component
          onClose(); // Close the modal
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while deleting. Please try again.");
        });
      
  };

  return (
    <dialog
      id="delete_modal"
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
        <h3 className="font-bold text-2xl mb-4">Delete Note</h3>
        <p className="text-lg mb-6">
          Are you sure you want to delete the Note{" "}
          <span className="font-bold">{note.fileName}</span>? This action cannot
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
DeleteNoteModal.propTypes = {
    note: PropTypes.shape({
      _id: PropTypes.string.isRequired, // Validate _id as a required string
      fileName : PropTypes.string.isRequired,
      id: PropTypes.number,             // Validate id as a number (if needed)
      name: PropTypes.string,           // Validate name as a string
      // Add other properties of the student object as needed
    }).isRequired,                      // Make the entire student object required
    onClose: PropTypes.func.isRequired, // Validate onClose as a required function
    onDelete: PropTypes.func.isRequired, // Validate onDelete as a required function
    isDarkMode: PropTypes.bool.isRequired, // Validate isDarkMode as a required boolean
  };

export default DeleteNoteModal;
