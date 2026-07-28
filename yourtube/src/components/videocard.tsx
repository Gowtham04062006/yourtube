import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";

const VideoCard = ({ video }: any) => {
  return (
    <Link href={`/watch/${video._id}`} className="group">
      <div className="space-y-3">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
          <video
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${video.filepath}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            muted
            autoPlay
            loop
            playsInline
          />

          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
            0:07
          </div>
        </div>

        <div className="flex gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {video.videochannel?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-sm font-medium group-hover:text-blue-600">
              {video.videotitle}
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              {video.videochannel}
            </p>

            <p className="text-sm text-gray-600">
              {video.views} views • 5 minutes ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
