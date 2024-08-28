import { useState } from "react";
import PropTypes from "prop-types";
import EditVideoModal from "./EditVideoModal"; // Assuming you have a component for editing videos

const VideoList = ({ isDarkMode }) => {
  const videosData = [
    // Sample video data
    {
      id: 1,
      chapterName: "Algebra Basics",
      subjectName: "Mathematics",
      curriculum: "Cambridge",
      level: "AS-Level",
      youtubeLink: "https://www.youtube.com/watch?v=example1",
      createdBy: "Admin",
      modifiedBy: "Sadman Sakib",
    },
    {
      id: 2,
      chapterName: "Kinematics",
      subjectName: "Physics",
      curriculum: "Cambridge",
      level: "AS-Level",
      youtubeLink: "https://www.youtube.com/watch?v=example2",
      createdBy: "Admin",
      modifiedBy: "Sadman Sakib",
    },
    {
      id: 3,
      chapterName: "Organic Chemistry Basics",
      subjectName: "Chemistry",
      curriculum: "Cambridge",
      level: "AS-Level",
      youtubeLink: "https://www.youtube.com/watch?v=example3",
      createdBy: "Admin",
      modifiedBy: "Sadman Sakib",
    },
    // Add more video data as needed
  ];

  const [videos, setVideos] = useState(videosData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div
      className={`p-4 rounded-2xl ${
        isDarkMode ? "bg-orange-500 text-white" : "bg-orange-200 text-black"
      }`}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">Video List</h2>
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
              <th className="px-4 py-2 border">Video Link</th>
              <th className="px-4 py-2 border">Chapter Name</th>
              <th className="px-4 py-2 border">Subject Name</th>
              <th className="px-4 py-2 border">Curriculum</th>
              <th className="px-4 py-2 border">Level</th>
              <th className="px-4 py-2 border">Created By</th>
              <th className="px-4 py-2 border">Modified By</th>
              <th className="px-4 py-2 border">Edit</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr
                key={video.id}
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
                <td className="px-4 py-2 border text-center">{video.id}</td>
                <td className="px-4 py-2 border text-center">
                  <a
                    href={video.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {video.youtubeLink}
                  </a>
                </td>
                <td className="px-4 py-2 border text-center">{video.chapterName}</td>
                <td className="px-4 py-2 border text-center">{video.subjectName}</td>
                <td className="px-4 py-2 border text-center">{video.curriculum}</td>
                <td className="px-4 py-2 border text-center">{video.level}</td>
                <td className="px-4 py-2 border text-center">{video.createdBy}</td>
                <td className="px-4 py-2 border text-center">{video.modifiedBy}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleEdit(video)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(video.id)}
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
      {isModalOpen && selectedVideo && (
        <EditVideoModal
          isDarkMode={isDarkMode}
          videoData={selectedVideo}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

// Prop validation
VideoList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default VideoList;
