import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Sample data for subjects and their associated papers
const subjects = [
  { name: "Accounting", code: 9706, papers: ["Paper 1", "Paper 2", "Paper 3"] },
  { name: "Afrikaans Language", code: 8679, papers: ["Paper 1", "Paper 2"] },
  {
    name: "Applied Information and Communication Technology",
    code: 9713,
    papers: ["Paper 1", "Paper 2"],
  },
  {
    name: "Biology BES",
    code: 9184,
    papers: ["Paper 1", "Paper 2", "Paper 3", "Paper 4"],
  },
  { name: "Biology", code: 9700, papers: ["Paper 1", "Paper 2"] },
  {
    name: "Business Studies",
    code: 9707,
    papers: ["Paper 1", "Paper 2", "Paper 3"],
  },
  { name: "Business", code: 9609, papers: ["Paper 1"] },
  { name: "Chemistry", code: 9701, papers: ["Paper 1", "Paper 2", "Paper 3"] },
  { name: "Chinese", code: 9715, papers: ["Paper 1", "Paper 2"] },
  {
    name: "Computer Science",
    code: 9608,
    papers: ["Paper 1", "Paper 2", "Paper 3"],
  },
  { name: "Computer Science", code: 9618, papers: ["Paper 1", "Paper 2"] },
  {
    name: "Computing",
    code: 9691,
    papers: ["Paper 1", "Paper 2", "Paper 3", "Paper 4"],
  },
  { name: "Design and Technology", code: 4234, papers: ["Paper 1", "Paper 2"] },
  { name: "Design and Textiles", code: 3123, papers: ["Paper 1", "Paper 2"] },
  { name: "Dutch", code: 9679, papers: ["Paper 1", "Paper 2"] },
  { name: "Economics", code: 9708, papers: ["Paper 1", "Paper 2", "Paper 3"] },
  { name: "English Language", code: 9093, papers: ["Paper 1", "Paper 2"] },
  { name: "English Literature", code: 9695, papers: ["Paper 1", "Paper 2"] },
  { name: "Environmental Management", code: 8291, papers: ["Paper 1", "Paper 2"] },
  { name: "Food Studies", code: 9336, papers: ["Paper 1", "Paper 2"] },
  { name: "French", code: 9716, papers: ["Paper 1", "Paper 2"] },
  { name: "General Paper", code: 8004, papers: ["Paper 1"] },
  { name: "Geography", code: 9696, papers: ["Paper 1", "Paper 2"] },
  { name: "German", code: 9717, papers: ["Paper 1", "Paper 2"] },
  { name: "Global Perspectives", code: 2069, papers: ["Paper 1", "Paper 2"] },
  { name: "Hindi", code: 9687, papers: ["Paper 1", "Paper 2"] },
  { name: "Hindi Language", code: 8687, papers: ["Paper 1", "Paper 2"] },
  { name: "Human and Social Biology", code: 5096, papers: ["Paper 1", "Paper 2"] },
];

const Header = () => {
  const navigate = useNavigate();

  const homeNavigate = () => {
    navigate("/");
  };


  return (
    <header className="bg-orange-50 shadow-md py-4 px-8 flex justify-between items-center">
      {/* Logo */}
      <div className="text-3xl font-bold text-orange-500">Mcq Solver</div>

      {/* Home Button */}
      <button
        className="btn btn-ghost rounded-md bg-orange-600 text-white text-md sm:text-md hover:bg-orange-700 hover:text-white"
        onClick={homeNavigate}
      >
        <FaHome className="inline mr-2 text-lg sm:text-2xl" />
        Home
      </button>
    </header>
  );
};

const McqSolver = () => {

  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState("Alevels");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedPapers, setSelectedPapers] = useState([]);

  // Filter subjects based on search term
  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle subject selection and show papers
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedPapers(subject.papers);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Include the Header at the top */}
      <Header />

      {/* Main content area */}
      <div className="flex">
        {/* Sidebar for course selection */}
        <div className="w-1/4 p-4 bg-orange-100 h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Courses</h2>
          <ul>
            <li
              onClick={() => setSelectedCourse("Alevels")}
              className={`cursor-pointer mb-2 p-2 rounded ${
                selectedCourse === "Alevels"
                  ? "bg-orange-200 text-orange-600"
                  : ""
              }`}
            >
              A levels
            </li>
            <li
              onClick={() => setSelectedCourse("Olevels")}
              className={`cursor-pointer mb-2 p-2 rounded ${
                selectedCourse === "Olevels"
                  ? "bg-orange-200 text-orange-600"
                  : ""
              }`}
            >
              O levels
            </li>
            <li
              onClick={() => setSelectedCourse("IGCSE")}
              className={`cursor-pointer mb-2 p-2 rounded ${
                selectedCourse === "IGCSE"
                  ? "bg-orange-200 text-orange-600"
                  : ""
              }`}
            >
              IGCSE
            </li>
          </ul>
        </div>

        {/* Main content area */}
        <div className="w-3/4 p-8 flex flex-col h-screen overflow-y-auto">
          {/* Header */}
          <h2 className="text-2xl font-bold mb-4">{selectedCourse}</h2>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search subject"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full border border-orange-400 rounded mb-4 bg-white text-orange-300"
          />

          {/* Subject List */}
          <ul className="space-y-2 overflow-y-auto">
            {filteredSubjects.map((subject) => (
              <li
                key={subject.code}
                className={`p-2 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 ${
                  selectedSubject?.code === subject.code
                    ? "bg-orange-200 text-orange-600"
                    : ""
                }`}
                onClick={() => handleSubjectSelect(subject)}
              >
                {subject.name} ({subject.code})
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side for Papers */}
        <div className="w-1/4 p-4 border-l border-gray-300 h-screen overflow-y-auto">
          {/* Display selected subject and its papers */}
          {selectedSubject && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-4">
                MCQ Solver for {selectedSubject.name} ({selectedSubject.code})
              </h3>

              {/* Display list of papers */}
              <ul className="space-y-2">
                {selectedPapers.map((paper, index) => (
                  <li
                    key={index}
                    onClick={()=> navigate("/mcqtest")}
                    className="p-2 border border-gray-300 rounded cursor-pointer hover:bg-orange-100"
                  >
                    {paper}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default McqSolver;
