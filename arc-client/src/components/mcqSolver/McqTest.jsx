import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Rnd } from "react-rnd";
//start, stop, reset icons
import { FaPlay, FaStop, FaRedo } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert2

//assets
import dummyPdf from "../../assets/dummy.pdf";

//components
import Navbar from "../Navbar";

const McqTest = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [realtimeChecker, setRealtimeChecker] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testStarted, setTestStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false); // Added state to track timer running

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

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup on stop or component unmount
    }
  }, [isRunning]);

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

  const handleStart = () => {
    setTestStarted(true);
    setIsRunning(true); 
  };

  const handleStop = () => {
    setIsRunning(false); 
  };

  const handleReset = () => {
    setIsRunning(false); 
    setTime(0);
  };

  const handleSubmit = () => {
    const totalQuestions = 20;
    let correctAnswersCount = 0;
    for (let i = 1; i <= totalQuestions; i++) {
      if (selectedAnswers[i] === correctAnswers[i]) {
        correctAnswersCount++;
      }
    }
    Swal.fire({
      title: 'Test Results',
      text: `You answered ${correctAnswersCount} out of ${totalQuestions} questions correctly.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div className="mcq-container bg-neutral-950 flex h-screen relative"> 
      <Navbar />
      <div
        className={`pdf-viewer p-0 mt-20 bg-white ${
          drawerOpen ? "w-full lg:w-4/5" : "w-full"
        }`}
      >
        <div className="flex flex-col w-full mt-0 h-full">
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
        className={`absolute left-[45%] lg:top-1/2 lg:transform lg:-translate-y-1/2 cursor-pointer bg-orange-400 text-white p-2 rounded-full shadow-lg transition-all duration-500 ${
          drawerOpen
            ? "bottom-[50%] lg:left-[72%] lg:bottom-auto"
            : "bottom-[2%] lg:left-[97%] lg:bottom-auto"
        }`  }
      >
        {drawerOpen ? (
          <FiChevronDown className="text-xl lg:hidden" />
        ) : (
          <FiChevronUp className="text-xl lg:hidden" />
        )}
        {drawerOpen ? (
          <FiChevronRight className="text-xl hidden lg:block" />
        ) : (
          <FiChevronLeft className="text-xl hidden lg:block" />
        )}
      </div>

      {drawerOpen && (
        <div
          className={`w-full lg:w-1/4 h-1/2 lg:h-full bg-neutral-950 lg:mt-20  shadow-lg p-7 flex flex-col items-center transition-all duration-300 ${
            drawerOpen ? "bottom-0 lg:bottom-auto lg:right-0" : "bottom-[100%] lg:right-[-100%]"
          } absolute lg:relative`}
        >

          {!realtimeChecker && !testStarted ? (
            <button
              onClick={handleStart}
              className="mb-8 px-4 py-2 bg-orange-500 text-white rounded-lg"
            >
              Start Test
            </button>
          ) : null}

          {!realtimeChecker && testStarted && (
            <Rnd
              default={{ x: -200, y: 50, width: 200, height: 100 }}
              bounds=".mcq-container"
              enableResizing={false}
              className="z-40"
            >
              <div className="flex flex-col items-center bg-orange-400 rounded-md w-70 h-50 shadow-2xl border-4 border-gray-800 p-2">
                {/* Timer */}

                  <p className="text-white text-xl ">🕰️ Timer 🕰️</p>

                {/* Screen */}
                <div className="flex-grow bg-gray-800 rounded-lg w-full flex items-center justify-center mb-4">
                  <span
                    className="neon-text"
                    style={{
                      fontSize: "28px",
                      color: "#0ff",
                      textShadow: "0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff",
                    }}
                  >
                    {formatTime(time)}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex justify-evenly w-full">
                  <button onClick={handleStart} className="bg-gray-700 text-white font-bold py-4 px-4 rounded-full  shadow-md transition-transform transform duration-500 hover:scale-105 hover:bg-neutral-950 hover:rotate-[360deg]">
                    <FaPlay color="orange" />
                  </button>
                  <button onClick={handleStop} className="bg-gray-700 text-white font-bold py-4 px-4 rounded-full  shadow-md transition-transform transform duration-500 hover:scale-105 hover:bg-neutral-950 hover:rotate-[360deg]">
                    <FaStop color="orange" />
                  </button>
                  <button onClick={handleReset} className="bg-gray-700 text-white font-bold py-4 px-4 rounded-full  shadow-md transition-transform transform duration-500 hover:scale-105 hover:bg-neutral-950 hover:rotate-[360deg]">
                    <FaRedo color="orange"/>
                  </button>
                </div>
              </div>
            </Rnd>
          )}

          <div className="w-full flex justify-start mb-4">
            <nav className="text-white text-lg font-bold">
              <ol className="list-reset flex">
                <li>
                  <a href="#" className="text-orange-500 hover:text-orange-700">
                    Subject Name
                  </a>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-gray-400">MCQ Test</li>
              </ol>
            </nav>
          </div>

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
