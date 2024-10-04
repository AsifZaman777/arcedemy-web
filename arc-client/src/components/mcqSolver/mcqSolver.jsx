import { useState } from "react";
import { FaHome } from "react-icons/fa";

// Sample data for subjects
const subjects = [
  { name: "Accounting", code: 9706 },
  { name: "Afrikaans Language", code: 8679 },
  { name: "Applied Information and Communication Technology", code: 9713 },
  { name: "Biology BES", code: 9184 },
  { name: "Biology", code: 9700 },
  { name: "Business Studies", code: 9707 },
  { name: "Business", code: 9609 },
  { name: "Chemistry", code: 9701 },
  { name: "Chinese", code: 9715 },
  { name: "Computer Science", code: 9608 },
  { name: "Computer Science", code: 9618 },
  { name: "Computing", code: 9691 },
];

const Header = () => {
  

  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-700">
        Mcq Solver
      </div>

      

      {/* Dropdowns */}
      

      {/* Home Button */}
      <button className="bg-red-300 text-white rounded-lg px-4 py-2 flex items-center">
        <FaHome className="mr-2" />
        Home
      </button>
    </header>
  );
};

const MCQSolver = () => {
  const [selectedCourse, setSelectedCourse] = useState("Alevels");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Filter subjects based on search term
  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle subject selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Include the Header at the top */}
      <Header />

      {/* Main content area */}
      <div className="flex">
        {/* Sidebar for course selection */}
        <div className="w-1/4 p-4 bg-gray-100">
          <h2 className="text-xl font-bold mb-4">Courses</h2>
          <ul>
            <li
              onClick={() => setSelectedCourse("Alevels")}
              className={`cursor-pointer mb-2 p-2 rounded ${
                selectedCourse === "Alevels" ? "bg-orange-100 text-orange-500" : ""
              }`}
            >
              A levels
            </li>
            <li
              onClick={() => setSelectedCourse("Olevels")}
              className={`cursor-pointer mb-2 p-2 rounded ${
                selectedCourse === "Olevels" ? "bg-orange-100 text-orange-500" : ""
              }`}
            >
              O levels
            </li>
            <li
              onClick={() => setSelectedCourse("IGCSE")}
              className={`cursor-pointer mb-2 p-2 rounded ${
                selectedCourse === "IGCSE" ? "bg-orange-100 text-orange-500" : ""
              }`}
            >
              IGCSE
            </li>
          </ul>
        </div>

        {/* Main content area */}
        <div className="w-3/4 p-8">
          {/* Header */}
          <h2 className="text-2xl font-bold mb-4">{selectedCourse}</h2>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search subject"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded mb-4"
          />

          {/* Subject List */}
          <ul className="space-y-2">
            {filteredSubjects.map((subject) => (
              <li
                key={subject.code}
                className="p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
                onClick={() => handleSubjectSelect(subject)}
              >
                {subject.name} ({subject.code})
              </li>
            ))}
          </ul>

          {/* Display selected subject MCQ Solver */}
          {selectedSubject && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">
                MCQ Solver for {selectedSubject.name} ({selectedSubject.code})
              </h3>
              {/* MCQ Solver content goes here */}
             
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCQSolver;
