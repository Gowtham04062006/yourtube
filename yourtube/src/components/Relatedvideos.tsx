import VideoCard from "./videocard";

const RelatedVideos = ({ videos, currentVideoId }: any) => {
  return (
    <div className="space-y-4">
      {videos
        .filter((video: any) => video._id !== currentVideoId)
        .map((video: any) => (
          <VideoCard
            key={video._id}
            video={video}
          />
        ))}
    </div>
  );
};

export default RelatedVideos;