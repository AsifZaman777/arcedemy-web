import { useState } from "react";
import PropTypes from 'prop-types';

const CurrentStudents = ({ isDarkMode }) => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      curriculum: "Cambridge",
      level: "A-Level",
      createdDate: "2024-08-01",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      curriculum: "Edexcel",
      level: "IGCSE",
      createdDate: "2024-08-02",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      curriculum: "Cambridge",
      level: "O-Level",
      createdDate: "2024-08-03",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      curriculum: "Edexcel",
      level: "AS-Level",
      createdDate: "2024-08-04",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 5,
      name: "William Green",
      email: "william@example.com",
      curriculum: "Cambridge",
      level: "IGCSE",
      createdDate: "2024-08-05",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 6,
      name: "Sophia White",
      email: "sophia@example.com",
      curriculum: "Edexcel",
      level: "IGCSE",
      createdDate: "2024-08-06",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 7,
      name: "Liam Black",
      email: "liam@example.com",
      curriculum: "Cambridge",
      level: "O-Level",
      createdDate: "2024-08-07",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 8,
      name: "Olivia Blue",
      email: "olivia@example.com",
      curriculum: "Edexcel",
      level: "AS-Level",
      createdDate: "2024-08-08",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 9,
      name: "Ethan Gray",
      email: "ethan@example.com",
      curriculum: "Cambridge",
      level: "A-Level",
      createdDate: "2024-08-09",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 10,
      name: "Ava Green",
      email: "ava@example.com",
      curriculum: "Edexcel",
      level: "IGCSE",
      createdDate: "2024-08-10",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 11,
      name: "James Taylor",
      email: "james@example.com",
      curriculum: "Cambridge",
      level: "O-Level",
      createdDate: "2024-08-11",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 12,
      name: "Mia Johnson",
      email: "mia@example.com",
      curriculum: "Edexcel",
      level: "AS-Level",
      createdDate: "2024-08-12",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 13,
      name: "Alexander Lee",
      email: "alexander@example.com",
      curriculum: "Cambridge",
      level: "IGCSE",
      createdDate: "2024-08-13",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 14,
      name: "Isabella Martinez",
      email: "isabella@example.com",
      curriculum: "Edexcel",
      level: "A-Level",
      createdDate: "2024-08-14",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 15,
      name: "Benjamin Wilson",
      email: "benjamin@example.com",
      curriculum: "Cambridge",
      level: "O-Level",
      createdDate: "2024-08-15",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 16,
      name: "Charlotte Brown",
      email: "charlotte@example.com",
      curriculum: "Edexcel",
      level: "IGCSE",
      createdDate: "2024-08-16",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 17,
      name: "Daniel King",
      email: "daniel@example.com",
      curriculum: "Cambridge",
      level: "A-Level",
      createdDate: "2024-08-17",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 18,
      name: "Amelia Scott",
      email: "amelia@example.com",
      curriculum: "Edexcel",
      level: "AS-Level",
      createdDate: "2024-08-18",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 19,
      name: "Matthew Davis",
      email: "matthew@example.com",
      curriculum: "Cambridge",
      level: "IGCSE",
      createdDate: "2024-08-19",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 20,
      name: "Harper Allen",
      email: "harper@example.com",
      curriculum: "Edexcel",
      level: "O-Level",
      createdDate: "2024-08-20",
      enrollmentStatus: "Unenrolled",
    },
  ]);

  const handleEnrollmentChange = (id, status) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, enrollmentStatus: status } : student
    );
    setStudents(updatedStudents);
  };

  const handleEdit = (id) => {
    alert(`Edit student with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  return (
    <div
      className={`p-4 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4">Current Students</h2>
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
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Curriculum</th>
              <th className="px-4 py-2 border">Level</th>
              <th className="px-4 py-2 border">Created Date</th>
              <th className="px-4 py-2 border">Enrollment Status</th>
              <th className="px-4 py-2 border">Edit</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.id}
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
                <td className="px-4 py-2 border text-center">{student.id}</td>
                <td className="px-4 py-2 border text-center">{student.name}</td>
                <td className="px-4 py-2 border text-center">
                  {student.email}
                </td>
                <td className="px-4 py-2 border text-center">
                  {student.curriculum}
                </td>
                <td className="px-4 py-2 border text-center">
                  {student.level}
                </td>
                <td className="px-4 py-2 border text-center">
                  {student.createdDate}
                </td>
                <td className="px-4 py-2 border text-center">
                  <select
                    value={student.enrollmentStatus}
                    onChange={(e) =>
                      handleEnrollmentChange(student.id, e.target.value)
                    }
                    className={`p-1 border rounded ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <option value="Enrolled">Enrolled</option>
                    <option value="Unenrolled">Unenrolled</option>
                  </select>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//props validation
CurrentStudents.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default CurrentStudents;
