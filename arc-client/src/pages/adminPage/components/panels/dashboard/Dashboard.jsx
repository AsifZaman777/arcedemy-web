import  { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaUserGraduate, FaClipboardList, FaBookOpen, FaLayerGroup, FaFileAlt } from 'react-icons/fa';

const Dashboard = ({ isDarkMode }) => {
  
  const [studentCount, setStudentCount] = useState(0);
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [curriculumCount, setCurriculumCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);
  const [chapterCount, setChapterCount] = useState(0);

  // Fetch data from API
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentRes = await fetch('http://localhost:5000/api/students');
        const studentData = await studentRes.json();
        setStudentCount(studentData.totalStudents);
        setEnrolledCount(studentData.enrolledStudents);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    const fetchCurriculumData = async () => {
      try {
        const curriculumRes = await fetch('http://localhost:5000/api/curriculum');
        const curriculumData = await curriculumRes.json();
        // Assuming curriculumData contains the fields: totalCurriculums, totalSubjects, totalChapters
        setCurriculumCount(curriculumData.totalCurriculums);
        setSubjectCount(curriculumData.totalSubjects);
        setChapterCount(curriculumData.totalChapters);
      } catch (error) {
        console.error('Error fetching curriculum data:', error);
      }
    };

    fetchStudentData();
    fetchCurriculumData();
  }, []);

  // Conditional class for dark mode
  const containerClass = isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700';
  const cardClass = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-700';

  // Data object containing card details
  const stats = [
    {
      title: 'Current Students',
      value: studentCount,
      icon: <FaUserGraduate className="h-12 w-12 text-white" />,
      bgColor: 'bg-green-400',
    },
    {
      title: 'Enrolled Students',
      value: enrolledCount,
      icon: <FaClipboardList className="h-12 w-12 text-white" />,
      bgColor: 'bg-blue-400',
    },
    {
      title: 'Total Curriculums',
      value: curriculumCount,
      icon: <FaBookOpen className="h-12 w-12 text-white" />,
      bgColor: 'bg-yellow-400',
    },
    {
      title: 'Total Subjects',
      value: subjectCount,
      icon: <FaLayerGroup className="h-12 w-12 text-white" />,
      bgColor: 'bg-purple-400',
    },
    {
      title: 'Total Chapters',
      value: chapterCount,
      icon: <FaFileAlt className="h-12 w-12 text-white" />,
      bgColor: 'bg-red-400',
    },
  ];

  return (
    <div className={`px-4 py-20 sm:px-8 ${containerClass}`}>
      {/* Top Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center border rounded-sm overflow-hidden shadow ${cardClass}`}
          >
            <div className={`p-4 ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div className={`px-4 ${textClass}`}>
              <h3 className="text-sm tracking-wider">{stat.title}</h3>
              <p className="text-3xl">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes validation
Dashboard.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Dashboard;
