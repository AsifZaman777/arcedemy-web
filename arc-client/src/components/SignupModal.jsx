import { useState } from "react";
import PropTypes from "prop-types";

const SignupModal = ({ onClose, isDarkMode }) => {
  // Initialize formData state with correct keys
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    curriculum: "",
    level: "",
  });

  // Handle input changes and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission logic here
  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim whitespace from name fields
    const trimmedFirstName = formData.firstName.trim();
    const trimmedLastName = formData.lastName.trim();

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Prepare the data to send, removing unnecessary fields
    const signupData = {
      name: `${trimmedFirstName} ${trimmedLastName}`,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      curriculum: formData.curriculum,
      level: formData.level,
      password: formData.password,
    };

    // Call API to signup
    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {

        "Content-Type": "application/json",

      },
      body: JSON.stringify(signupData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        onClose(); // Close the modal after successful signup
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <dialog id="signup_modal" className="modal fixed inset-0 z-50 flex items-center justify-center" open>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className={`modal-box z-10 ${isDarkMode ? "bg-gray-900 border-cyan-600 border-2" : "bg-white border-gray-700 border-2"}`}>
        <h3 className="font-bold text-2xl mb-4">Signup</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="py-4">
              <label className="block text-lg mb-2">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2"
                required
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2"
                required
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2"
                required
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
                required
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2"
                required
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2"
                required
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">Curriculum:</label>
              <select
                name="curriculum"
                value={formData.curriculum}
                onChange={handleChange}
                className="select select-bordered w-full text-lg p-2"
                required
              >
                <option value="" disabled>Select Curriculum</option>
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
                required
              >
                <option value="" disabled>Select Level</option>
                <option value="IGCSE">IGCSE</option>
                <option value="A level">A level</option>
                <option value="O level">O level</option>
              </select>
            </div>
          </div>
          <div className="modal-action mt-4">
            <button type="submit" className="btn bg-orange-500 text-xl font-normal text-slate-200 hover:bg-orange-600 p-2">
              Signup
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

// Props validation
SignupModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default SignupModal;
