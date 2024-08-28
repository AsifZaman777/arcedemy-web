import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EditCurrModal from "./EditCurrModal";

const CurrList = ({ isDarkMode }) => {
  const curriculumsData = [
    {
      id: 1,
      curriculum: "Cambridge",
      createdBy: "Admin",
      modifiedBy: "Sadman Sakib",
      levels: [
        { id: 1, level: "AS-Level" },
        { id: 2, level: "A2-Level" },
        { id: 3, level: "O-Level" },
      ],
    },
    {
      id: 2,
      curriculum: "Edexcel",
      createdBy: "Super Admin",
      modifiedBy: "Zafri",
      levels: [
        { id: 4, level: "IGCSE" },
        { id: 5, level: "IAL" },
        { id: 6, level: "IAS" },
      ],
    },
  ];

  // Flatten the curriculum data to a single list
  const [currs, setCurrs] = useState(
    curriculumsData.flatMap(({curriculum, createdBy, modifiedBy, levels }) =>
      levels.map((level) => ({
        id: level.id,
        curriculum,
        level: level.level,
        createdBy,
        modifiedBy,
      }))
    )
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurr, setSelectedCurr] = useState(null);

  //get all the curriculums from the API
  useEffect(()=>{
    fetch("http://localhost:5000/api/curriculum")
    .then((response) => response.json())
    .then(data=>{
      console.log(data);
      setCurrs(data);
    })
    
  },[currs])

  const handleEdit = (curr) => {
    setSelectedCurr(curr);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedCurrs = currs.filter((curr) => curr.id !== id);
  
    setCurrs(updatedCurrs);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCurr(null);
  };

  return (
    <div
      className={`p-4 rounded-2xl ${
        isDarkMode ? "bg-orange-500 text-white" : "bg-orange-200 text-black"
      }`}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">Curriculum List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr
              className={`${
                isDarkMode
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Curriculum</th>
              <th className="px-4 py-2 border">Level</th>
              <th className="px-4 py-2 border">Created By</th>
              <th className="px-4 py-2 border">Modified By</th>
              <th className="px-4 py-2 border">Edit</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currs.map((curr, index) => (
              <tr
                key={curr.id}
                className={`${
                  index % 2 === 0
                    ? isDarkMode
                      ? "bg-gray-900"
                      : "bg-gray-100"
                    : isDarkMode
                    ? "bg-gray-800"
                    : "bg-white"
                } hover:bg-orange-300`}
              >
                <td className="px-4 py-2 border text-center">{curr._id}</td>
                <td className="px-4 py-2 border text-center">
                  {curr.curriculum}
                </td>

                <td className="px-4 py-2 border text-center">
    {curr.levels?.map((level, index) => (
      <span key={index}>
        {level.level}
        {index < curr.levels.length - 1 && ', '}
      </span>
    ))}
  </td>
                
                <td className="px-4 py-2 border text-center">
                  {curr.createdBy}
                </td>
                <td className="px-4 py-2 border text-center">
                  {curr.modifiedBy}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleEdit(curr)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(curr.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete curriculum
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedCurr && (
        <EditCurrModal
          isDarkMode={isDarkMode}
          curr={{
            curriculum: selectedCurr.curriculum,
            createdBy: selectedCurr.createdBy,
            modifiedBy: selectedCurr.modifiedBy,
            levels: [
              { id: selectedCurr.id, level: selectedCurr.level },
            ],
          }}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

// Prop validation
CurrList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default CurrList;
