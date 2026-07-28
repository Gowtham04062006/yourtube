import HistoryVideoCard from "./historyvideocard";

const historyVideos = [
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
    watchedAt: "Watched about 1 hour ago",
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
    watchedAt: "Watched yesterday",
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
    watchedAt: "Watched 2 days ago",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const HistoryContent = () => {
  return (
    <div className="max-w-6xl mx-auto px-8 py-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Watch History
        </h1>

        <p className="text-gray-500 mt-1">
          {historyVideos.length} videos
        </p>

      </div>

      <div className="space-y-6">
        {historyVideos.map((video) => (
          <HistoryVideoCard
            key={video._id}
            video={video}
          />
        ))}
      </div>

    </div>
  );
};

export default HistoryContent;