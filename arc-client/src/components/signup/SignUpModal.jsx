import { useState } from "react";
import PropTypes from "prop-types";
import countryData from "../../data/countryCode"; // Import your country data

const SignUpModal = ({ onClose }) => {
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

  // Update countryCode when country changes
  useState(() => {
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
    // Handle the form submission logic here
    onClose();
  };

  // Find the flag and dial code for the selected country
  const selectedCountry = countryData.find(
    (country) => country.name === formData.country
  );

  return (
    <dialog
      id="edit_modal"
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0 backdrop-blur-sm"
      open
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="modal-box z-10 bg-white bg-opacity-70 backdrop-blur-3xl border border-orange-500 rounded-xl p-8 shadow-xl">
        <h3 className="font-bold text-3xl text-orange-600 mb-4">Add new student</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">Country:</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="select select-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
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
              <label className="block text-lg mb-2 text-orange-700">Mobile Number:</label>
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
                      className="input input-bordered w-36 -ml-5 text-lg p-1 bg-white bg-opacity-60 border-orange-400"
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
                    className="input input-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400"
                    placeholder="Enter mobile"
                  />
                )}
              </div>
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">Curriculum:</label>
              <select
                name="curriculum"
                value={formData.curriculum}
                onChange={handleChange}
                className="select select-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
              >
                <option value="">Select a curriculum</option>
                <option value="Cambridge">Cambridge</option>
                <option value="Edexcel">Edexcel</option>
              </select>
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">Level:</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="select select-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
              >
                <option value="">Select a level</option>
                <option value="IGCSE">IGCSE</option>
                <option value="A level">A level</option>
                <option value="O level">O level</option>
              </select>
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">Created Date:</label>
              <input
                type="date"
                name="createdDate"
                value={formData.createdDate}
                onChange={handleChange}
                className="input input-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
              />
            </div>
            <div className="py-4">
              <label className="block text-lg mb-2 text-orange-700">Enrollment Status:</label>
              <select
                name="enrollmentStatus"
                value={formData.enrollmentStatus}
                onChange={handleChange}
                className="select select-bordered w-60 text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
              >
                <option value="">Select enrollment status</option>
                <option value="enrolled">Enrolled</option>
                <option value="unenrolled">Unenrolled</option>
              </select>
            </div>
          </div>
          <div className="modal-action mt-4">
            <button
              type="submit"
              className="btn bg-orange-500 text-xl font-normal text-white hover:bg-orange-600 p-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn bg-red-500 text-xl font-normal text-white hover:bg-red-600 p-2"
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
SignUpModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SignUpModal;