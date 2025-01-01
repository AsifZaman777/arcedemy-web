import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const McqTest = () => {
  const location = useLocation();
  const pdfUrl = location.state?.filePath || ""; // PDF URL from navigation state
  const correctAnswers = location.state?.answers || {}; // Ensure correctAnswers is an object

  const [drawerOpen, setDrawerOpen] = useState(true);
  const [realtimeChecker, setRealtimeChecker] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testStarted, setTestStarted] = useState(false);

  console.log("PDF URL:", pdfUrl);
  console.log("Correct Answers on mcq test:", correctAnswers); // Use these correct answers now

  useEffect(() => {
    console.log("Location state in McqTest:", location.state);
  }, [location.state]);

  const handleAnswerSelect = (questionIndex, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = () => {
    const totalQuestions = Object.keys(correctAnswers).length;
    let correctAnswersCount = 0;

    for (let question in correctAnswers) {
      if (selectedAnswers[question] === correctAnswers[question]) {
        correctAnswersCount++;
      }
    }

    alert(
      `You answered ${correctAnswersCount} out of ${totalQuestions} questions correctly.`
    );
  };

  useEffect(() => {
    if (testStarted && !realtimeChecker) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [testStarted, realtimeChecker]);

  useEffect(() => {
    if (realtimeChecker) {
      setTime(0); // Reset timer when real-time checker is enabled
    }
  }, [realtimeChecker]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  return (
    <div className="flex h-screen relative">
      {/* PDF Viewer */}
      <div className={`p-0 bg-white ${drawerOpen ? "w-4/5" : "w-full"}`}>
        <div className="flex flex-col w-full mt-0 h-screen bg-gray-100">
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            className="flex-grow w-full border-none"
          >
            This browser does not support PDFs. Please download the PDF to view
            it: <a href={pdfUrl}>Download PDF</a>
          </iframe>
        </div>
      </div>

      {/* Drawer Toggle Button */}
      <div
        onClick={() => setDrawerOpen(!drawerOpen)}
        className={`absolute top-1/2 transform -translate-y-1/2 cursor-pointer bg-orange-400 text-white p-2 rounded-full shadow-lg transition-all duration-500 ${
          drawerOpen
            ? "left-[72%]"
            : "left-[97%] lg:left-[92%] bottom-[2%] lg:bottom-auto"
        }`}
      >
        {drawerOpen ? (
          <FiChevronRight className="text-xl" />
        ) : (
          <FiChevronLeft className="text-xl" />
        )}
      </div>

      {/* Question Sidebar */}
      {drawerOpen && (
        <div
          className={`w-full lg:w-1/4 h-screen lg:h-auto bg-neutral-950 shadow-lg p-7 flex flex-col items-center transition-all duration-500 ${
            drawerOpen ? "bottom-0" : "bottom-[100%]"
          }`}
        >
          {!realtimeChecker && !testStarted ? (
            <button
              onClick={handleStartTest}
              className="mb-8 px-4 py-2 bg-orange-500 text-white rounded-lg"
            >
              Start Test
            </button>
          ) : !realtimeChecker && testStarted ? (
            <div className="text-4xl font-bold text-orange-400 mb-8">
              Time: {formatTime(time)}
            </div>
          ) : null}

          <div className="flex justify-center items-center mb-6">
            <label className="mr-5 text-2xl font-bold text-white">
              Real-time Checker:
            </label>
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

          {/* Question List */}
          <div className="overflow-y-auto w-full">
            {Object.keys(correctAnswers).map((question, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center">
                  <h3 className="mr-4 font-thin text-2xl w-6 text-right">
                    {question}.
                  </h3>
                  <div className="flex space-x-2">
                    {["A", "B", "C", "D"].map((option) => {
                      const isSelected = selectedAnswers[question] === option;
                      const isCorrect =
                        correctAnswers[question] === option && isSelected;
                      return (
                        <button
                          key={option}
                          onClick={() => handleAnswerSelect(question, option)}
                          className={`rounded-full p-2 w-10 h-10 border flex items-center justify-center ${
                            isSelected
                              ? realtimeChecker
                                ? isCorrect
                                  ? "bg-green-400 text-white"
                                  : "bg-red-400 text-white"
                                : "bg-orange-500 text-white"
                              : "bg-white text-black border-orange-400"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!realtimeChecker && testStarted && (
            <button
              className="mt-6 px-4 py-2 bg-orange-500 text-white rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default McqTest;
