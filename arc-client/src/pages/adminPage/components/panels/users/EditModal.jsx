import { useState } from "react";
import PropTypes from "prop-types";

const EditModal = ({ student, onClose, isDarkMode }) => {
  const [formData, setFormData] = useState(student);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update student logic here
    onClose();
  };

  return (
    <dialog id="edit_modal" className="modal fixed inset-0 z-50 flex items-center justify-center" open>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className={`modal-box z-10 ${isDarkMode ? "bg-gray-900 border-cyan-600 border-2" : "bg-white border-gray-700 border-2"}`}>
        <h3 className="font-bold text-2xl mb-4">Edit Student</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="py-4">
              <label className="block text-lg mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2"
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2"
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">Curriculum:</label>
              <select
                name="curriculum"
                value={formData.curriculum}
                onChange={handleChange}
                className="select select-bordered w-full text-lg p-2"
              >
                <option value="Cambridge">Cambridge</option>
                <option value="Edexcel">Edexcel</option>
              </select>
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">Level:</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="select select-bordered w-full text-lg p-2"
              >
                <option value="IGCSE">IGCSE</option>
                <option value="A level">A level</option>
                <option value="O level">O level</option>
              </select>
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">Created Date:</label>
              <input
                type="date"
                name="createdDate"
                value={formData.createdDate}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2"
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">Enrollment Status:</label>
              <select
                name="enrollmentStatus"
                value={formData.enrollmentStatus}
                onChange={handleChange}
                className="select select-bordered w-full text-lg p-2"
              >
                <option value="enrolled">Enrolled</option>
                <option value="unenrolled">Unenrolled</option>
              </select>
            </div>
          </div>
          <div className="modal-action mt-4">
            <button type="submit" className="btn bg-orange-500 text-xl font-normal text-slate-200 hover:bg-orange-600 p-2">
              Save
            </button>
            <button type="button" onClick={onClose} className="btn bg-red-500 text-xl font-normal text-slate-200 hover:bg-red-600 p-2">
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

// props validation
EditModal.propTypes = {
  student: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default EditModal;
