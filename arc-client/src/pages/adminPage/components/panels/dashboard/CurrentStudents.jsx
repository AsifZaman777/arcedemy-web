import { useState } from "react";
import PropTypes from 'prop-types';
import EditModal from './EditModal';

const CurrentStudents = ({ isDarkMode }) => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      mobile: "+1 123-456-7890",
      country: "United States",
      countryCode: "us",
      city: "New York",
      curriculum: "Cambridge",
      level: "A-Level",
      createdDate: "2024-08-01",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "+44 20-1234-5678",
      country: "United Kingdom",
      countryCode: "gb",
      city: "London",
      curriculum: "Edexcel",
      level: "IGCSE",
      createdDate: "2024-08-02",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 3,
      name: "Carlos Gomez",
      email: "carlos@example.com",
      mobile: "+34 654-321-987",
      country: "Spain",
      countryCode: "es",
      city: "Madrid",
      curriculum: "Cambridge",
      level: "O-Level",
      createdDate: "2024-08-03",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 4,
      name: "Akira Tanaka",
      email: "akira@example.com",
      mobile: "+81 3-1234-5678",
      country: "Japan",
      countryCode: "jp",
      city: "Tokyo",
      curriculum: "Edexcel",
      level: "AS-Level",
      createdDate: "2024-08-04",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 5,
      name: "Anna Müller",
      email: "anna@example.com",
      mobile: "+49 30-1234-5678",
      country: "Germany",
      countryCode: "de",
      city: "Berlin",
      curriculum: "Cambridge",
      level: "IGCSE",
      createdDate: "2024-08-05",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 6,
      name: "Ravi Patel",
      email: "ravi@example.com",
      mobile: "+91 98765-43210",
      country: "India",
      countryCode: "in",
      city: "Mumbai",
      curriculum: "Edexcel",
      level: "A-Level",
      createdDate: "2024-08-06",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 7,
      name: "Sofia Rossi",
      email: "sofia@example.com",
      mobile: "+39 06-1234-5678",
      country: "Italy",
      countryCode: "it",
      city: "Rome",
      curriculum: "Cambridge",
      level: "O-Level",
      createdDate: "2024-08-07",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 8,
      name: "Chen Wei",
      email: "chen@example.com",
      mobile: "+86 10-1234-5678",
      country: "China",
      countryCode: "cn",
      city: "Beijing",
      curriculum: "Edexcel",
      level: "AS-Level",
      createdDate: "2024-08-08",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 9,
      name: "Maria Silva",
      email: "maria@example.com",
      mobile: "+55 21-1234-5678",
      country: "Brazil",
      countryCode: "br",
      city: "Rio de Janeiro",
      curriculum: "Cambridge",
      level: "IGCSE",
      createdDate: "2024-08-09",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 10,
      name: "David Johnson",
      email: "david@example.com",
      mobile: "+61 2-9876-5432",
      country: "Australia",
      countryCode: "au",
      city: "Sydney",
      curriculum: "Edexcel",
      level: "A-Level",
      createdDate: "2024-08-10",
      enrollmentStatus: "Unenrolled",
    },
    {
      id: 11,
      name: "Amina Ahmed",
      email: "amina@example.com",
      mobile: "+971 50-123-4567",
      country: "United Arab Emirates",
      countryCode: "ae",
      city: "Dubai",
      curriculum: "Cambridge",
      level: "O-Level",
      createdDate: "2024-08-11",
      enrollmentStatus: "Enrolled",
    },
    {
      id: 12,
      name: "Pierre Dupont",
      email: "pierre@example.com",
      mobile: "+33 1-2345-6789",
      country: "France",
      countryCode: "fr",
      city: "Paris",
      curriculum: "Edexcel",
      level: "IGCSE",
      createdDate: "2024-08-12",
      enrollmentStatus: "Unenrolled",
    }
  ]);
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div
      className={`p-4 rounded-2xl ${
        isDarkMode ? "bg-orange-500 text-white" : "bg-orange-200 text-black"
      }`}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">Current students</h2>
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
              <th className="px-4 py-2 border">Mobile</th>
              <th className="px-4 py-2 border">Country</th>
              <th className="px-4 py-2 border">City</th>
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
                  {student.mobile}
                </td>
                <td className="px-4 py-2 border text-center">
                  <img
                    src={`https://flagcdn.com/16x12/${student.countryCode}.png`}
                    alt={`${student.country} flag`}
                    className="inline-block mr-2"
                  />
                  {student.country}
                </td>
                <td className="px-4 py-2 border text-center">{student.city}</td>
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
                  {student.enrollmentStatus}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedStudent && (
        <EditModal
          student={selectedStudent}
          onClose={handleModalClose}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

//props validation
CurrentStudents.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default CurrentStudents;
