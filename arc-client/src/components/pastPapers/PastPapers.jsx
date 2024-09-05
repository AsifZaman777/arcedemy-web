import { useState } from "react";
import { FaFilter, FaChevronDown } from "react-icons/fa"; // Importing Font Awesome icons from react-icons
import paperImage from "../../assets/images/paper.jpg"; // Ensure correct path
import { useNavigate } from "react-router-dom";

const pastPapers = [
    {
      title: "Mathematics Paper 1",
      curriculum: "Cambridge",
      level: "IGCSE",
      subject: "Mathematics",
      year: 2023,
    },
    {
      title: "Physics Paper 2",
      curriculum: "Cambridge",
      level: "IAL",
      subject: "Physics",
      year: 2022,
    },
    {
      title: "Biology Paper 3",
      curriculum: "Edexcel",
      level: "O",
      subject: "Biology",
      year: 2023,
    },
    {
      title: "Chemistry Paper 1",
      curriculum: "Edexcel",
      level: "AS",
      subject: "Chemistry",
      year: 2021,
    },
    {
      title: "English Paper 2",
      curriculum: "Cambridge",
      level: "IAS",
      subject: "English",
      year: 2022,
    },
    {
      title: "Economics Paper 1",
      curriculum: "Edexcel",
      level: "A2",
      subject: "Economics",
      year: 2020,
    },
    // Add more papers as needed
  ];

const PastPapers = () => {
  const navigate = useNavigate(); // Proper use of the useNavigate hook inside the component

  const handleHome = () => {
    navigate("/"); // This will navigate to the home page
  };

  const [sorting, setSorting] = useState("Select year");

  const handleSort = (e) => {
    const selectedYear = e.target.value;
    setSorting(selectedYear);
  };

  const sortedPapers = sorting === "Select year" 
    ? pastPapers 
    : pastPapers.filter(paper => paper.year === parseInt(sorting));

  return (
    <div className="min-h-screen bg-gray-100" data-theme="halloween">
      {/* Breadcrumb */}
      <div className="py-4 px-8 bg-white shadow-sm">
        <button className="btn btn-ghost rounded-md bg-orange-500 text-white hover:bg-orange-600 hover:text-white" onClick={handleHome}>
          Home
        </button>
      </div>

      {/* Category and Sorting Bar */}
      <div className="py-4 px-8 bg-white shadow-md flex justify-between items-center">
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
          <button className="px-4 py-2 border border-orange-500 rounded hover:bg-orange-500 hover:text-white text-orange-500 duration-200">
            AS level
          </button>
          <button className="px-4 py-2 border border-orange-500 rounded hover:bg-orange-500 hover:text-white text-orange-500 duration-200">
            A2 level
          </button>
          <button className="px-4 py-2 border border-orange-500 rounded hover:bg-orange-500 hover:text-white text-orange-500 duration-200">
            O level
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
            <select
              className="block appearance-none w-full bg-white border border-orange-500 px-10 py-2 rounded leading-tight focus:outline-none text-orange-500 hover:text-white hover:bg-orange-500 duration-200"
            >
              <option>Default sort</option>
              <option>Sort by year</option>
              <option>Sort by name</option>
            </select>
            <FaChevronDown className="absolute top-3 right-3 text-gray-300 pointer-events-none duration-200" />
          </div>
        </div>
      </div>

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
  );
};

export default PastPapers;
