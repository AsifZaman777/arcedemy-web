import { useState } from "react";
import { FaFilter, FaChevronDown, FaHome, FaColumns } from "react-icons/fa"; // Importing Font Awesome icons from react-icons
import paperImage from "../../assets/images/paper.jpg"; // Ensure correct path
import { useNavigate } from "react-router-dom";
import pastPapers from "../../data/pastPapers"; // Importing the pastPapers data

const CambridgePapers = () => {
  const navigate = useNavigate(); 

  const handleHome = () => {
    navigate("/"); 
  };

  const [sorting, setSorting] = useState("Select year");

  const handleSort = (e) => {
    const selectedYear = e.target.value;
    setSorting(selectedYear);
  };

  const sortedPapers =
    sorting === "Select year"
      ? pastPapers
      : pastPapers.filter((paper) => paper.year === parseInt(sorting));

  return (
    <div className="min-h-screen bg-slate-100" data-theme="halloween">
      {/* navbar */}
      <div className="fixed top-0 left-0 right-0 py-4 px-8 bg-white shadow-sm flex flex-row items-center justify-between z-50">
        <h2 className="text-4xl font-bold text-gray-500 text-center">
          Cambridge
        </h2>
        <button
          className="btn btn-ghost rounded-md bg-red-400 text-white text-md hover:bg-orange-600 hover:text-white"
          onClick={handleHome}
        >
          <FaHome className="inline mr-2 text-2xl" />
          Home
        </button>
      </div>

      {/* Category and Sorting Bar */}
      <div className="fixed top-16 left-0 right-0 py-4 px-8 bg-white border-none mt-0 shadow-md flex justify-between items-center z-40">
        {/* Category Filters */}
        <div className="flex space-x-4">
          <button className="px-4 py-2 border border-orange-500 rounded hover:bg-orange-500 hover:text-white text-orange-500 duration-200">
            <FaFilter className="inline mr-2" />
            All papers
          </button>
          <button className="px-4 py-2 border border-orange-500 rounded hover:bg-orange-500 hover:text-white text-orange-500 duration-200">
            IGCSE level
          </button>
          <button className="px-4 py-2 border border-orange-500 rounded hover:bg-orange-500 hover:text-white text-orange-500 duration-200">
            IAS level
          </button>
          <button className="px-4 py-2 border border-orange-500 rounded hover:bg-orange-500 hover:text-white text-orange-500 duration-200">
            IAL level
          </button>
        </div>

  
        {/* Sorting and Other Options */}
        <div className="flex space-x-4 items-center">
          <div className="relative">
            <select
              value={sorting}
              onChange={handleSort}
              className="block appearance-none w-full bg-white border border-orange-500 px-10 py-2 rounded leading-tight focus:outline-none text-orange-500 hover:text-white hover:bg-orange-500 duration-200"
            >
              <option>Select year</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
            </select>
            <FaChevronDown className="absolute top-3 right-3 text-gray-300 pointer-events-none duration-200" />
          </div>

          <div className="relative">
            <select className="block appearance-none w-full bg-white border border-orange-500 px-10 py-2 rounded leading-tight focus:outline-none text-orange-500 hover:text-white hover:bg-orange-500 duration-200">
              <option>Default sort</option>
              <option>Sort by year</option>
              <option>Sort by name</option>
            </select>
            <FaChevronDown className="absolute top-3 right-3 text-gray-300 pointer-events-none duration-200" />
          </div>
        </div>
      </div>

      {/* Padding top to prevent content overlap */}
      <div className="pt-36">
        {/* Cards Section */}
        <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {sortedPapers.map((paper, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-80 h-50 blur-sm mx-auto mt-4"
                  src={paperImage}
                  alt="Card Image"
                />
              </a>
              <hr className="my-2 border-gray-200" />
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-500">
                    {paper.title}
                  </h5>
                </a>
                <p className="mb-3 text-md font-normal text-orange-500">
                  {`Subject: ${paper.subject}`}
                </p>
                <p className="mb-3 text-md font-normal text-orange-500">
                  {`Level: ${paper.curriculum} - ${paper.level}`}
                </p>
                <p className="mb-3 text-md font-normal text-orange-500">
                  {`Year: ${paper.year}`}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-orange-500 mt-7"
                >
                  Read more
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
