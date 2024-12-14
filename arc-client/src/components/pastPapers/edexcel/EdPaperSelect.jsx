import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const homeNavigate = () => {
    navigate("/");
  };

  return (
    <header className="bg-orange-50 shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-3xl font-bold text-orange-500">Edexcel</div>
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
  const [subjects, setSubjects] = useState([]); // Dynamic data from DB
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Fetch subjects from API
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/papers");
        setSubjects(response.data);
        setFilteredSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  // Filter subjects based on search term
  useEffect(() => {
    setFilteredSubjects(
      subjects.filter((subject) =>
        subject?.name?.toLowerCase().includes(searchTerm?.toLowerCase())

      )
    );
  }, [searchTerm, subjects]);
  // Handle subject selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <div className="w-1/4 p-4 bg-orange-100 h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Courses</h2>
          <ul>
            <li
              onClick={() => setSelectedCourse("Alevels")}
              className={`cursor-pointer mb-2 p-2 rounded ${
                selectedCourse === "Alevels" ? "bg-orange-200 text-orange-600" : ""
              }`}
            >
              A levels
            </li>
            <li
              onClick={() => setSelectedCourse("Olevels")}
              className={`cursor-pointer mb-2 p-2 rounded ${
                selectedCourse === "Olevels" ? "bg-orange-200 text-orange-600" : ""
              }`}
            >
              O levels
            </li>
            <li
              onClick={() => setSelectedCourse("IGCSE")}
              className={`cursor-pointer mb-2 p-2 rounded ${
                selectedCourse === "IGCSE" ? "bg-orange-200 text-orange-600" : ""
              }`}
            >
              IGCSE
            </li>
          </ul>
        </div>

        <div className="w-2/4 p-8 flex flex-col h-screen overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">{selectedCourse}</h2>
          <input
            type="text"
            placeholder="Search subject"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full border border-orange-400 rounded mb-4 bg-white text-orange-300"
          />
          <ul className="space-y-2 overflow-y-auto">
            {filteredSubjects.map((subject) => (
              <li
                key={subject.code}
                className={`p-2 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 ${
                  selectedSubject?.code === subject.code ? "bg-orange-200 text-orange-600" : ""
                }`}
                onClick={() => handleSubjectSelect(subject)}
              >
                {subject.name} ({subject.code})
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/4 p-4 border-l border-gray-300 h-screen overflow-y-auto">
          {selectedSubject && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-4">{selectedSubject.name} - Papers from:</h3>
              <ul className="space-y-2">
                {selectedSubject.years.map((year, index) => (
                  <li
                    key={index}
                    onClick={() => navigate(`/papers/${year}`)}
                    className="p-2 border border-gray-300 rounded cursor-pointer hover:bg-orange-100"
                  >
                    {year}
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
