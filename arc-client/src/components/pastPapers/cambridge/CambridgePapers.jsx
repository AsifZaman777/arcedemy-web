import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CambridgePapers = () => {
  const navigate = useNavigate();

  const [papers, setPapers] = useState([]);
  const [sorting, setSorting] = useState("Select year");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch past papers from the backend
    const fetchPapers = async () => {
      try {
        const response = await axios.get("/api/papers");
        setPapers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching past papers:", error);
        setLoading(false);
      }
    };
    fetchPapers();
  }, []);

  const handleHome = () => {
    navigate("/");
  };

  const handleSort = (e) => {
    const selectedYear = e.target.value;
    setSorting(selectedYear);
  };

  

  const sortedPapers =
    sorting === "Select year"
      ? papers
      : papers.filter((paper) => paper.year === parseInt(sorting));

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100" data-theme="halloween">
      {/* Navbar and Sorting Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 sm:translate-y-0">
        <div className="py-4 px-4 sm:px-8 bg-white shadow-sm flex flex-row items-center justify-between w-full">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-500">Cambridge</h2>
          <button
            className="btn btn-ghost rounded-md bg-red-400 text-white text-md sm:text-md hover:bg-orange-600 hover:text-white"
            onClick={handleHome}
          >
            <FaHome className="inline mr-2 text-lg sm:text-2xl" />
            Home
          </button>
        </div>

        {/* Sorting Bar */}
        <div className="py-4 px-4 sm:px-8 bg-white border-none shadow-md flex flex-col sm:flex-row justify-between items-center w-full space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="px-4 py-2 text-md sm:text-md border border-orange-500 rounded hover:bg-orange-500 hover:text-white">
              IGCSE level
            </button>
            <button className="px-4 py-2 text-md sm:text-md border border-orange-500 rounded hover:bg-orange-500 hover:text-white">
              IAS level
            </button>
            <button className="px-4 py-2 text-md sm:text-md border border-orange-500 rounded hover:bg-orange-500 hover:text-white">
              IAL level
            </button>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={sorting}
              onChange={handleSort}
              className="block w-full bg-white border border-orange-500 sm:px-10 py-2 text-md rounded leading-tight focus:outline-none text-orange-500 hover:bg-orange-500"
            >
              <option>Select year</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="pt-36">
        <div className="container mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {sortedPapers.map((paper, index) => (
            <div
              key={index}
              className="max-w-full bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105"
            >
              <a href={paper.filePath} target="_blank" rel="noopener noreferrer">
                <img
                  className="rounded-t-lg w-full h-50 sm:w-80 mx-auto mt-4 object-cover"
                  src={paper.thumbnail || "default-thumbnail.jpg"}
                  alt={paper.title}
                />
              </a>
              <div className="p-5">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-500">{paper.title}</h5>
                <p className="mb-3 text-md text-orange-500">{`Subject: ${paper.subject}`}</p>
                <p className="mb-3 text-md text-orange-500">{`Level: ${paper.curriculum} - ${paper.level}`}</p>
                <p className="mb-3 text-md text-orange-500">{`Year: ${paper.year}`}</p>
                <a
                  href={paper.filePath}
                  className="inline-flex items-center px-3 py-2 text-md font-medium text-white bg-blue-700 rounded-lg hover:bg-orange-600"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CambridgePapers;
