import { useState, useEffect } from "react";
import { FaHome, FaEllipsisV } from "react-icons/fa";
import paperImage from "../../../assets/images/paper.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls

const CambridgePapers = () => {
  const navigate = useNavigate();

  const [papers, setPapers] = useState([]); // Stores the fetched papers
  const [loading, setLoading] = useState(true); // Tracks the loading state
  const [sorting, setSorting] = useState("Select year");
  const [showBars, setShowBars] = useState(true);

  // Fetch papers from the backend
  const fetchPapers = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/papers", { params: filters });
      setPapers(response.data); // Store fetched papers
    } catch (error) {
      console.error("Error fetching past papers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all papers on component mount
  useEffect(() => {
    fetchPapers();
  }, []);

  // Handle home button click
  const handleHome = () => {
    navigate("/");
  };

  // Handle sorting by year
  const handleSort = (e) => {
    const selectedYear = e.target.value;
    setSorting(selectedYear);

    const filters = {};
    if (selectedYear !== "Select year") {
      filters.folderName = selectedYear;
    }
    fetchPapers(filters); // Fetch papers with the selected year
  };

  // Toggle category and sorting bars
  const toggleBars = () => {
    setShowBars(!showBars);
  };

  return (
    <div className="min-h-screen bg-slate-100" data-theme="halloween">
      {/* Navbar and Sorting Bar Container */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 sm:translate-y-0 ${
          showBars ? "translate-y-0" : "-translate-y-full sm:translate-y-0"
        }`}
      >
        {/* Navbar */}
        <div className="py-4 px-4 sm:px-8 bg-white shadow-sm flex flex-row items-center justify-between w-full">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-500">
            Cambridge Papers
          </h2>
          <button
            className="btn btn-ghost rounded-md bg-red-400 text-white text-md sm:text-md hover:bg-orange-600 hover:text-white"
            onClick={handleHome}
          >
            <FaHome className="inline mr-2 text-lg sm:text-2xl" />
            Home
          </button>
        </div>

        {/* Category and Sorting Bar */}
        <div className="py-4 px-4 sm:px-8 bg-white border-none shadow-md flex flex-col sm:flex-row justify-between items-center w-full space-y-4 sm:space-y-0">
          {/* Sorting Options */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full sm:w-auto">
              <select
                value={sorting}
                onChange={handleSort}
                className="block w-full bg-white border border-orange-500 sm:px-10 py-2 text-md sm:text-md rounded leading-tight focus:outline-none text-orange-500 hover:text-white hover:bg-orange-500 duration-100"
              >
                <option>Select year</option>
                <option>2020-jan-feb</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Three-dot menu for small screens */}
      <div className="fixed -top-6 left-1/2 -translate-x-1/2 z-50 sm:hidden">
        <button
          onClick={toggleBars}
          className="text-gray-500 bg-white p-2 rounded-full shadow-md hover:bg-orange-500 hover:text-white"
        >
          <FaEllipsisV className="text-2xl" />
        </button>
      </div>

      {/* Padding top to prevent content overlap */}
      <div className="pt-36">
        {/* Cards Section */}
        <div className="container mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading papers...</p>
          ) : papers.length > 0 ? (
            papers.map((paper, index) => (
              <div
                key={index}
                className="max-w-full bg-white border border-gray-200 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:border-orange-500 hover:shadow-xl"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg w-full h-50 sm:w-80 mx-auto mt-4 object-cover"
                    src={paperImage}
                    alt="Card Image"
                  />
                </a>
                <hr className="my-2 border-gray-200" />
                <div className="p-5">
                  <a href={paper.filePath} target="_blank" rel="noreferrer">
                    <h5 className="mb-2 text-lg sm:text-2xl font-bold tracking-tight text-gray-500">
                      {paper.fileName}
                    </h5>
                  </a>
                  <p className="mb-3 text-md sm:text-md font-normal text-orange-500">
                    {`Subject: ${paper.subject}`}
                  </p>
                  <p className="mb-3 text-md sm:text-md font-normal text-orange-500">
                    {`Level: ${paper.curriculum} - ${paper.level}`}
                  </p>
                  <p className="mb-3 text-md sm:text-md font-normal text-orange-500">
                    {`Year: ${paper.year}`}
                  </p>

                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-md sm:text-md font-medium text-white bg-blue-700 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-orange-500 mt-4"
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No papers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CambridgePapers;
