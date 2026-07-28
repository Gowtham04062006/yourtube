import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface ChannelVideosProps {
  channelId?: string | string[];
}

const videos = [
  {
    _id: "1",
    videotitle: "Amazing Nature Documentary",
    filepath: "/video/vdo.mp4",
    videochannel: "Nature Channel",
    uploader: "N",
    views: 45000,
    uploadedAt: "less than a minute ago",
    duration: "10:24",
  },
  {
    _id: "2",
    videotitle: "Cooking Tutorial: Perfect Pasta",
    filepath: "/video/vdo.mp4",
    videochannel: "Chef's Kitchen",
    uploader: "C",
    views: 23000,
    uploadedAt: "1 day ago",
    duration: "10:24",
  },
];

const ChannelVideos = ({ channelId }: ChannelVideosProps) => {
  return (
    <div className="mt-10">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Videos</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {videos.map((video) => (
          <Link
            href={`/watch/${video._id}`}
            key={video._id}
            className="group"
          >
            {/* Thumbnail */}

            <div className="relative overflow-hidden rounded-lg bg-black aspect-video">
              <video
                src={video.filepath}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                muted
                autoPlay
                loop
                playsInline
              />

              <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
                {video.duration}
              </span>
            </div>

            {/* Details */}

            <div className="mt-2 flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {video.uploader}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="line-clamp-2 text-sm font-semibold group-hover:text-blue-600">
                  {video.videotitle}
                </h3>

                <p className="mt-1 text-xs text-gray-600">
                  {video.videochannel}
                </p>

                <p className="text-xs text-gray-500">
                  {video.views.toLocaleString()} views •{" "}
                  {video.uploadedAt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChannelVideos;