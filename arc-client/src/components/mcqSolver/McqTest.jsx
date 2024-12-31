import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import dummyPdf from "../../assets/dummy.pdf";

//components
import Navbar from "../Navbar";

const McqTest = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [realtimeChecker, setRealtimeChecker] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testStarted, setTestStarted] = useState(false);

  const correctAnswers = {
    1: "A",
    2: "C",
    3: "B",
    4: "D",
    5: "A",
    6: "C",
    7: "B",
    8: "D",
    9: "A",
    10: "C",
    11: "B",
    12: "D",
    13: "A",
    14: "C",
    15: "B",
    16: "D",
    17: "A",
    18: "C",
    19: "B",
    20: "D",
  };

  const handleSubmit = () => {
    const totalQuestions = 20;
    let correctAnswersCount = 0;
    for (let i = 1; i <= totalQuestions; i++) {
      if (selectedAnswers[i] === correctAnswers[i]) {
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

  const handleAnswerSelect = (questionIndex, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex + 1]: option, // Use questionIndex + 1 since question indices start from 1
    }));
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  return (
    
    <div className="flex h-screen relative">
    <Navbar />
      <div className={`p-0 mt-20 bg-white ${drawerOpen ? "w-4/5" : "w-full"}`}>
        <div className="flex flex-col w-full mt-0 h-screen bg-gray-100">
          <iframe
            src={dummyPdf}
            title="Dummy PDF"
            className="flex-grow w-full border-none"
          >
            This browser does not support PDFs. Please download the PDF to view
            it: <a href={dummyPdf}>Download PDF</a>
          </iframe>
        </div>
      </div>

      <div
        onClick={() => setDrawerOpen(!drawerOpen)}
        className={`absolute top-1/2 transform -translate-y-1/2 cursor-pointer bg-orange-400 text-white p-2 mt-20 rounded-full shadow-lg transition-all duration-500 ${
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

      {drawerOpen && (
        <div
          className={`w-full lg:w-1/4 h-screen mt-20 lg:h-auto bg-neutral-950 shadow-lg p-7 flex flex-col items-center transition-all duration-500 ${
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

          <div className="overflow-y-auto w-full">
            {Array.from({ length: 20 }).map((_, questionIndex) => (
              <div key={questionIndex} className="mb-4 mt-2">
                <div className="flex items-center">
                  {/* Question Number */}
                  <h3 className="mr-4 font-mono text-white text-md w-6 text-right">
                    {questionIndex + 1}.
                  </h3>

                  {/* Options Group */}
                  <div className="flex space-x-2">
                    {["A", "B", "C", "D"].map((option) => {
                      const isSelected =
                        selectedAnswers[questionIndex + 1] === option;
                      const isCorrect =
                        correctAnswers[questionIndex + 1] === option;

                      return (
                        <button
                          key={option}
                          onClick={() =>
                            handleAnswerSelect(questionIndex, option)
                          }
                          className={`rounded-xl p-4 w-12 h-8 flex items-center bg-neutral-950 justify-center text-lg font-bold transition-all duration-500 ease-in-out ${
                            isSelected ? "text-white" : ""
                          }`}
                          style={{
                            backgroundColor: isSelected
                              ? realtimeChecker
                                ? isCorrect
                                  ? "#10B981"
                                  : "#EF4444"
                                : "#F97316"
                              : "black",
                          }}
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
