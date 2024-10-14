import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Sample data for subjects, their associated topics, and years
const subjects = [
  { 
    name: "Accounting", 
    code: 9706, 
    topics: ["Ledger", "Finance", "Debit-credit"], 
    years: ["2019", "2020", "2021"]
  },
  
  {
    name: "Afrikaans Language",
    code: 8679,
    topics: ["Reading", "Writing", "Listening"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Applied Information and Communication Technology",
    code: 9713,
    topics: ["Database", "Programming", "Networking"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Biology BES",
    code: 9184,
    topics: ["Cell Biology", "Genetics", "Ecology"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Biology",
    code: 9700,
    topics: ["Cell Biology", "Genetics", "Ecology"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Business Studies",
    code: 9707,
    topics: ["Marketing", "Finance", "HR"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Business",
    code: 9609,
    topics: ["Marketing", "Finance", "HR"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Chemistry",
    code: 9701,
    topics: ["Organic", "Inorganic", "Physical"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Chinese",
    code: 9715,
    topics: ["Reading", "Writing", "Listening"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Computer Science",
    code: 9608,
    topics: ["Database", "Programming", "Networking"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Computer Science",
    code: 9618,
    topics: ["Database", "Programming", "Networking"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Computing",
    code: 9691,
    topics: ["Database", "Programming", "Networking"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Design and Technology",
    code: 4234,
    topics: ["Design", "Technology", "Engineering"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Design and Textiles",
    code: 3123,
    topics: ["Design", "Textiles", "Fashion"],
    years: ["2019", "2020", "2021"]
  },

  {
    name: "Dutch",
    code: 9679,
    topics: ["Reading", "Writing", "Listening"],
    years: ["2019", "2020", "2021"]
  },

  

];

const Header = () => {
  const navigate = useNavigate();

  const homeNavigate = () => {
    navigate("/");
  };

  return (
    <header className="bg-orange-50 shadow-md py-4 px-8 flex justify-between items-center">
      {/* Logo */}
      <div className="text-3xl font-bold text-orange-500">Edexcel</div>

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

const EdPaperSelect = () => {
  const navigate = useNavigate();

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
        <div className="w-2/4 p-8 flex flex-col h-screen overflow-y-auto">
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

        {/* Years Column */}
        <div className="w-1/4 p-4 border-l border-gray-300 h-screen overflow-y-auto">
          {/* Display selected subject's years */}
          {selectedSubject && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-4">
                {selectedSubject.name} - Papers from the following years:
              </h3>
              <ul className="space-y-2">
                {selectedSubject.years.map((year, index) => (
                  <li
                    key={index}
                    onClick={() => navigate("/edexcelpapers")}
                    className="p-2 border border-gray-300 rounded cursor-pointer hover:bg-orange-100"
                  >
                    {year}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Topics Column */}
        <div className="w-1/4 p-4 border-l border-gray-300 h-screen overflow-y-auto">
          {/* Display selected subject's topics */}
          {selectedSubject && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-4">
                Topics for {selectedSubject.name}:
              </h3>
              <ul className="space-y-2">
                {selectedSubject.topics.map((topic, index) => (
                  <li
                    key={index}
                    onClick={() => navigate("/edexcelpapers")}
                    className="p-2 border border-gray-300 rounded cursor-pointer hover:bg-orange-100"
                  >
                    {topic}
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

export default EdPaperSelect;
