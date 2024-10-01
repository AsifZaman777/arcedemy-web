import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EditVideoModal from "./EditVideoModal"; // Assuming you have a component for editing videos
import VideoDeleteModal from "./VideoDeleteModal"; // Import the delete modal

const VideoList = ({ isDarkMode }) => {
  const [videos, setVideos] = useState([]); // Fetch videos from the API
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedVideos = videos.filter((video) => video._id !== id);
    setVideos(updatedVideos);
    setIsDeleteModalOpen(false); // Close the delete modal after deletion
  };

  const openDeleteModal = (video) => {
    setSelectedVideo(video);
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedVideo(null);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedVideo(null);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

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
                key={video._id}
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
                <td className="px-4 py-2 border text-center">{video._id}</td>
                <td className="px-4 py-2 border text-center">
                  <a
                    href={video.VideoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {video.videoLink}
                  </a>
                </td>
                <td className="px-4 py-2 border text-center">{video.chapter}</td>
                <td className="px-4 py-2 border text-center">{video.subject}</td>
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
                    onClick={() => openDeleteModal(video)}
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
      {isEditModalOpen && selectedVideo && (
        <EditVideoModal
          isDarkMode={isDarkMode}
          videoData={selectedVideo}
          onClose={handleModalClose}
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedVideo && (
        <VideoDeleteModal
          isDarkMode={isDarkMode}
          video={selectedVideo}
          onClose={handleDeleteModalClose}
          onDelete={handleDelete} // Pass the handleDelete function to delete the video
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
