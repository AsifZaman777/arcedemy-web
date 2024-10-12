import { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi"; // Import the three-dot icon from React Icons
import dummyPdf from "../../assets/dummy.pdf"; // Import the dummy PDF file

const McqTest = () => {
  const [drawerOpen, setDrawerOpen] = useState(true); // State to control the drawer
  const [realtimeChecker, setRealtimeChecker] = useState(false); // Toggle state for real-time checker
  const [time, setTime] = useState(0); // State for time in seconds
  const [selectedAnswers, setSelectedAnswers] = useState({}); // State to store selected answers

  // Timer function
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer); // Clean up interval on unmount
  }, []);

  // Format time (min:sec)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (questionIndex, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Dummy Page Content */}
      <div className={`p-8 bg-white ${drawerOpen ? "w-4/5" : "w-full"}`}>
        {/* Embed PDF using iframe */}
        <div className="mt-0">
          <iframe
            src={dummyPdf} // Ensure this path is correct
            width="100%"
            height="900px"
            title="Dummy PDF"
            style={{ border: 'none' }} // Optional: Remove border
          >
            This browser does not support PDFs. Please download the PDF to view it: <a href={dummyPdf}>Download PDF</a>
          </iframe>
        </div>
      </div>

      {/* Drawer Toggle Button (Three Dots with Animation) */}
      <button
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="absolute top-4 right-4 p-2 rounded-full bg-orange-400 text-white"
      >
        <FiMoreVertical
          className={`text-2xl transform transition-transform duration-500 ${
            drawerOpen ? "rotate-90" : "rotate-0"
          }`}
        />
      </button>

      {/* Drawer */}
      {drawerOpen && (
        <div className="w-1/5 h-screen bg-neutral-950 shadow-lg p-7 flex flex-col items-center ">
          {/* Timer at the Top Center */}
          <div className="text-4xl font-bold text-orange-400 mb-8">
            Time: {formatTime(time)}
          </div>

          {/* Top Bar (Real-time Checker Toggle) */}
          <div className="flex justify-center items-center mb-6">
            <label className="mr-5 text-2xl font-bold text-white">Real-time Checker:</label>
            <div className="relative">
              <input
                type="checkbox"
                checked={realtimeChecker}
                onChange={() => setRealtimeChecker(!realtimeChecker)}
                className="hidden"
                id="realtimeCheckerToggle"
              />
              <label
                htmlFor="realtimeCheckerToggle"
                className={`flex items-center cursor-pointer w-12 h-6 bg-gray-300 rounded-full transition duration-300 ${
                  realtimeChecker ? "bg-yellow-400" : ""
                }`}
              >
                <span
                  className={`w-6 h-6 bg-gray-100 rounded-full shadow-sm transform transition-transform duration-300 ${
                    realtimeChecker ? "translate-x-6" : ""
                  }`}
                ></span>
              </label>
            </div>
          </div>

          {/* MCQ Options */}
          <div className="overflow-y-auto w-full">
            {Array.from({ length: 20 }).map((_, questionIndex) => (
              <div key={questionIndex} className="mb-4">
                <div className="flex items-center">
                  {/* Question Number */}
                  <h3 className="mr-4 font-thin text-2xl">
                    {questionIndex + 1}.
                  </h3>

                  {/* Options */}
                  <div className="flex space-x-2">
                    {["A", "B", "C", "D"].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswerSelect(questionIndex, option)}
                        className={`rounded-full p-2 w-10 h-10 border border-orange-400 flex items-center justify-center ${
                          selectedAnswers[questionIndex] === option
                            ? "bg-orange-500 text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default McqTest;
