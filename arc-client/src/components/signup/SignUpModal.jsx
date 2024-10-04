import { useState } from "react";
import PropTypes from "prop-types";
import countryData from "../../data/countryCode"; // Import your country data
import emailjs from "../../../emailjs"; // Updated

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
    createdDate: new Date().toLocaleDateString(), // Set createdDate to current date
    enrollmentStatus: "Pending", // Default enrollment status
  });

  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false); // For verification modal
  const [verificationCode, setVerificationCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

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

  const handleSave = () => {  
    setLoading(true);  // Set loading to true when Save is clicked
    
    // Immediately call sendMail and handle modal state based on the result
    sendMail()
      .then((response) => {
        console.log("Email successfully sent!", response.status, response.text);
        setIsCodeModalOpen(true); // Open the verification modal if the email is sent
      })
      .catch((err) => {
        console.error("Failed to send email. Error:", err);
      })
      .finally(() => {
        setLoading(false);  // Reset loading regardless of success or failure
      });
  };
  

  const generateVerificationCode = () => {
    // Generate a random 6-digit code
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(randomCode);
    return randomCode;
  };

  const sendMail = () => {
    const verificationCode = generateVerificationCode(); // Generate code before sending email
    const message = {
      to_name: formData.name,
      email: formData.email,
      verification_code: verificationCode,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,  // Use environment variables
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Use environment variables
        message,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY   // Use environment variables
      )
      .then((response) => {
        console.log("Email successfully sent!", response.status, response.text);
        setIsCodeModalOpen(true); // Show verification modal after email is sent
      })
      .catch((err) => {
        console.error("Failed to send email. Error:", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(); // Save and send mail after form submission
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (verificationCode === generatedCode) {
      setIsCodeModalOpen(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose(); 
      }, 3000);
    } else {
      setIsFailure(true);
    }
  };

  const handleFailure = () => { 
    setIsFailure(false);
  };
  


  const selectedCountry = countryData.find(
    (country) => country.name === formData.country
  );

  return (
    <>
      {/* Sign-Up Modal */}
      <dialog
        id="edit_modal"
        className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0 backdrop-blur-lg"
        open
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="modal-box z-10 bg-orange-100 bg-opacity-70 backdrop-blur-3xl border border-orange-500 rounded-xl p-8 shadow-xl">
          <h3 className="font-bold text-3xl text-orange-600 text-center mb-4">Join Arcedemy</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="py-4">
                <label className="block text-lg mb-2 text-orange-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
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
                  placeholder="example@gmail.com"
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
                  placeholder="San Francisco"
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
            </div>
            <div className="modal-action mt-4">
              {loading ? (
                <span className="text-orange-500 text-xl font-normal flex justify-center items-center">
                  Saving
                  <span className="ml-2 animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </span>
              ) : (
                <>
                  <button
                    onClick={handleSave}
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
                </>
              )}
            </div>
          </form>
        </div>
      </dialog>

      {/* Verification Modal */}
      {isCodeModalOpen && (
        <dialog
          id="verification_modal"
          className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0 backdrop-blur-lg"
          open
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="modal-box z-10 bg-orange-100 bg-opacity-70 backdrop-blur-3xl border border-orange-500 rounded-xl p-8 shadow-xl">
            <h3 className="font-bold text-2xl text-orange-600 text-center mb-4">Verify your email</h3>
            <form onSubmit={handleCodeSubmit}>
              <div className="py-4">
                <label className="block text-lg mb-2 text-orange-700">Verification Code:</label>
                <input
                  type="text"
                  name="verificationCode"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="input input-bordered w-full text-lg p-2 bg-white bg-opacity-60 border-orange-400 text-black"
                />
              </div>
              <div className="modal-action mt-4">
                <button
                  type="submit"
                  className="btn bg-orange-500 text-xl font-normal text-white hover:bg-orange-600 p-2"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Success Modal */}
      {isSuccess && (
        <dialog
          id="success_modal"
          className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0 backdrop-blur-lg"
          open
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="modal-box z-10 bg-orange-100 bg-opacity-70 backdrop-blur-3xl border border-orange-500 rounded-xl p-8 shadow-xl">
            <h3 className="font-bold text-2xl text-orange-600 text-center mb-4">Success!</h3>
            <p className="text-lg text-orange-700 text-center">
            You have been registered successfully to Arcedemy.
            </p>
            <div className="modal-action mt-4">
              <button
                onClick={onClose}
                className="btn bg-orange-500 text-xl font-normal text-white hover:bg-orange-600 p-2"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* failure modal */}
      {isFailure && (
        <dialog
          id="failure_modal"
          className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0 backdrop-blur-lg"
          open
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="modal-box z-10 bg-red-400 bg-opacity-70 backdrop-blur-3xl border border-white rounded-xl p-8 shadow-xl">
            <h3 className="font-bold text-2xl text-white text-center mb-4">Failed!</h3>
            <p className="text-lg text-white text-center">
              You have entered wrong verification code. Please try again.
            </p>
            <div className="modal-action mt-4">
              <button
                onClick={handleFailure}
                className="btn bg-orange-500 text-xl font-normal text-white hover:bg-orange-600 p-2"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

    </>
  );
};

SignUpModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SignUpModal;
