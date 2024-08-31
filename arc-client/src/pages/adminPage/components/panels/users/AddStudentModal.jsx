import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import countryData from "../../../../../data/countryCode"; // Import your country data

const AddStudentModal = ({ student, onClose, isDarkMode }) => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    countryCode: "",
    country: "",
    city: "",
    curriculum: "",
    level: "",
    createdDate: "",
    enrollmentStatus: "",
  });

  
  

  // Prefill form data when student prop changes
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        mobile: student.mobile || "",
        countryCode: student.countryCode || "",
        country: student.country || "",
        city: student.city || "",
        curriculum: student.curriculum || "",
        level: student.level || "",
        createdDate: student.createdDate || "",
        enrollmentStatus: student.enrollmentStatus || "",
      });
    }
  }, [student]);

  // Update countryCode when country changes
  useEffect(() => {
    const selectedCountry = countryData.find(
      (country) => country.name === formData.country
    );
    if (selectedCountry) {
      setFormData((prevData) => ({
        ...prevData,
        countryCode: selectedCountry.dial_code || "",
      }));
    }
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    const data ={
      name: formData.name,
      email: formData.email,
      mobile: selectedCountry.dial_code+formData.mobile,
      country: formData.country,
      countryCode: selectedCountry.countryCode,
      city: formData.city,
      curriculum: formData.curriculum,
      level: formData.level,
      enrollmentStatus: formData.enrollmentStatus
    }
    
    //fetch to add student
  fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === "Student added successfully") {
        setSuccessMessage(data.message);
      } else {
        setError(data.message);
      }
    })
    .catch((error) => {
      console.error("Error adding student:", error);
      setError("An error occurred. Please try again.");
    });
    onClose();
  };

  // Find the flag and dial code for the selected country
  const selectedCountry = countryData.find(
    (country) => country.name === formData.country
  );

  return (
    <dialog
      id="edit_modal"
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
        <h3 className="font-bold text-2xl mb-4">Add new student</h3>
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
              <label className="block text-lg mb-2">Country:</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="select select-bordered w-full text-lg p-2"
              >
                <option value="">Select a country</option>
                {countryData.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">Mobile Number:</label>
              <div className="flex items-center">
                {selectedCountry && (
                  <>
                    <img
                      src={`https://flagcdn.com/16x12/${selectedCountry.flag}.png`}
                      alt={`${selectedCountry.name} flag`}
                      className="inline-block mr-2"
                    />
                    <input
                      type="text"
                      name="countryCode"
                      value={selectedCountry.dial_code || ""}
                      readOnly
                      className="input rounded-lg w-16 bg-transparent text-lg text-black px-0 mr-2"
                    />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="input input-bordered w-36  -ml-5 text-lg p-1"
                      placeholder="Enter mobile"
                    />
                  </>
                )}
                {!selectedCountry && (
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="input input-bordered w-full text-lg p-2"
                    placeholder="Enter mobile"
                  />
                )}
              </div>
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
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
                <option value="">Select a curriculum</option>
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
                <option value="">Select a level</option>
                <option value="IGCSE">IGCSE</option>
                <option value="A level">A level</option>
                <option value="O level">O level</option>
              </select>
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2">Enrollment Status:</label>
              <select
                name="enrollmentStatus"
                value={formData.enrollmentStatus}
                onChange={handleChange}
                className="select select-bordered w-60 text-lg p-2"
              >
                <option value="">Select enrollment status</option>
                <option value="enrolled">Enrolled</option>
                <option value="unenrolled">Unenrolled</option>
              </select>
            </div>
          </div>
          {/* error message */}
          {error && (<p className="text-red-500 text-lg font-bold">{error}</p>)}
          {successMessage && (<p className="text-green-500 text-lg font-bold">{successMessage}</p>)}
          <div className="modal-action mt-4">
            <button
              type="submit"
              className="btn bg-orange-500 text-xl font-normal text-slate-200 hover:bg-orange-600 p-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn bg-red-500 text-xl font-normal text-slate-200 hover:bg-red-600 p-2"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

// Props validation
AddStudentModal.propTypes = {
  student: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    countryCode: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    curriculum: PropTypes.string,
    level: PropTypes.string,
    createdDate: PropTypes.string,
    enrollmentStatus: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default AddStudentModal;
