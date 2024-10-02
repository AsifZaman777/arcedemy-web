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
 
  const [errors, setErrors] = useState({});
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false); // For verification modal
  const [verificationCode, setVerificationCode] = useState("");
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

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile validation
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (formData.mobile.length < 7 || formData.mobile.length > 15) {
      newErrors.mobile = "Mobile number should be between 7 to 15 digits";
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    // City validation
    if (!formData.city) {
      newErrors.city = "City is required";
    }

    // Curriculum validation
    if (!formData.curriculum) {
      newErrors.curriculum = "Curriculum is required";
    }

    // Level validation
    if (!formData.level) {
      newErrors.level = "Level is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSave = () => {
    if (validate()) {
      setLoading(true); // Set loading to true when Save is clicked

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
          setLoading(false); // Reset loading regardless of success or failure
        });
    }
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
    // Check if the entered code matches the generated code
    if (verificationCode === generatedCode) {
      alert("Email successfully verified!");
      setIsCodeModalOpen(false);
      onClose(); // Close the modal after successful verification
    } else {
      alert("Invalid verification code. Please try again.");
    }
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
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
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
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
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
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
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
                {errors.curriculum && <p className="text-red-500 text-sm">{errors.curriculum}</p>}
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
                {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
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
                <button
                  type="button"
                  onClick={() => setIsCodeModalOpen(false)}
                  className="btn bg-red-500 text-xl font-normal text-white hover:bg-red-600 p-2"
                >
                  Close
                </button>
              </div>
            </form>
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
