import VideoCard from "./videocard";

const likedVideos = [
  {
    _id: "1",
    videotitle: "Amazing Nature Documentary",
    filename: "nature.mp4",
    filetype: "video/mp4",
    filepath: "/video/vdo.mp4",
    filesize: "500MB",
    videochannel: "Nature Channel",
    like: 1250,
    views: 45000,
    uploader: "Nature",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    videotitle: "Cooking Tutorial: Perfect Pasta",
    filename: "pasta.mp4",
    filetype: "video/mp4",
    filepath: "/video/vdo.mp4",
    filesize: "300MB",
    videochannel: "Chef's Kitchen",
    like: 890,
    views: 23000,
    uploader: "Chef",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: "3",
    videotitle: "React JS Crash Course",
    filename: "react.mp4",
    filetype: "video/mp4",
    filepath: "/video/vdo.mp4",
    filesize: "600MB",
    videochannel: "Code Academy",
    like: 2400,
    views: 92000,
    uploader: "Developer",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    _id: "4",
    videotitle: "Top 10 Travel Destinations",
    filename: "travel.mp4",
    filetype: "video/mp4",
    filepath: "/video/vdo.mp4",
    filesize: "450MB",
    videochannel: "Travel World",
    like: 1800,
    views: 61000,
    uploader: "Traveller",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
];

const LikedContent = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Liked Videos</h1>

        <p className="text-gray-500 mt-1">
          {likedVideos.length} videos
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {likedVideos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
          />
        ))}
      </div>
    </div>
  );
};

export default LikedContent;