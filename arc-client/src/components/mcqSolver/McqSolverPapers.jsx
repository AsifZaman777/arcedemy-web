import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const McqSolver = () => {
  const navigate = useNavigate();
  const [mcqs, setMcqs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [filteredMcqs, setFilteredMcqs] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [loadingAnswers, setLoadingAnswers] = useState(false);

  // Fetch MCQs from the API
  useEffect(() => {
    const fetchMcqs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mcqs");
        setMcqs(response.data);
      } catch (error) {
        console.error("Failed to fetch MCQs:", error);
      }
    };
    fetchMcqs();
  }, []);

  // Extract subjects
  useEffect(() => {
    const subjectsList = [...new Set(mcqs.map((mcq) => mcq.subject))];
    setSubjects(subjectsList);
  }, [mcqs]);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    const filtered = mcqs.filter((mcq) => mcq.subject === subject);
    setFilteredMcqs(filtered);
  };

  const fetchCorrectAnswers = async (excelUrl) => {
  console.log("Fetching correct answers for:", excelUrl);

  try {
    const encodedUrl = encodeURIComponent(excelUrl);
    const response = await axios.get(`http://localhost:5000/fetch-answers?fileUrl=${encodedUrl}`);
    const answers = response.data;
    console.log('Correct answers extracted:', answers);
    setCorrectAnswers(answers);
  } catch (error) {
    console.error('Failed to fetch answers:', error.message);
  }
};



const [selectedFile, setSelectedFile] = useState(null); 

const handleFileClick = (pdfFile) => {
  console.log("PDF File clicked:", pdfFile);

  const correspondingExcel = filteredMcqs.find(
    (mcq) =>
      mcq.fileName.endsWith(".xlsx") &&
      mcq.fileName.replace(".xlsx", "") === pdfFile.fileName.replace(".pdf", "")
  );
  console.log("Corresponding Excel:", correspondingExcel);

  const excelFilePath = correspondingExcel ? correspondingExcel.filePath : null;

  if (excelFilePath) {
    setLoadingAnswers(true); // Indicate loading state
    fetchCorrectAnswers(excelFilePath).then(() => {
      setLoadingAnswers(false); // Reset loading state once answers are fetched
    });
  }

  // Save the PDF file details for navigation once data is ready
  setSelectedFile({
    pdfPath: pdfFile.filePath,
    excelFilePath,
  });
};

// Effect to navigate after correct answers are loaded
useEffect(() => {
  if (!loadingAnswers && Object.keys(correctAnswers).length > 0 && selectedFile) {
    console.log("Navigating with correct answers:", correctAnswers);
    navigate("/mcqtest", {
      state: {
        filePath: selectedFile.pdfPath,
        excelFilePath: selectedFile.excelFilePath,
        answers: correctAnswers,
      },
    });
  }
}, [loadingAnswers, correctAnswers, selectedFile, navigate]); // Add 'navigate' to dependency array


// Effect to navigate after correct answers are loaded
useEffect(() => {
  if (!loadingAnswers && Object.keys(correctAnswers).length > 0 && selectedFile) {
    console.log("Navigating with correct answers:", correctAnswers);
    navigate("/mcqtest", {
      state: {
        filePath: selectedFile.pdfPath,
        excelFilePath: selectedFile.excelFilePath,
        answers: correctAnswers,
      },
    });
  }
}, [loadingAnswers, correctAnswers, selectedFile, navigate]); // Include all dependencies



  return (
    <div className="min-h-screen bg-white">
      <header className="bg-orange-50 shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-orange-500">MCQ Solver</h1>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4 bg-orange-100 h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Subjects</h2>
          <ul>
            {subjects.map((subject) => (
              <li
                key={subject}
                className={`cursor-pointer mb-2 p-2 rounded ${
                  selectedSubject === subject ? "bg-orange-200 text-orange-600" : ""
                }`}
                onClick={() => handleSubjectSelect(subject)}
              >
                {subject}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-8">
          {selectedSubject && (
            <>
              <h2 className="text-2xl font-bold mb-4">Papers for {selectedSubject}</h2>
              <ul>
                {filteredMcqs
                  .filter((mcq) => mcq.fileName.endsWith(".pdf"))
                  .map((pdfFile) => (
                    <li
                      key={pdfFile._id}
                      className="p-2 border rounded cursor-pointer hover:bg-orange-100"
                      onClick={() => handleFileClick(pdfFile)}
                    >
                      {pdfFile.fileName}
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default McqSolver;
