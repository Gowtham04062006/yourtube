import Link from "next/link";
import { Eye } from "lucide-react";

interface Video {
  _id: string;
  videotitle: string;
  filepath: string;
  videochannel: string;
  views: number;
  createdAt: string;
}

interface SearchVideoCardProps {
  video: Video;
}

const SearchVideoCard = ({ video }: SearchVideoCardProps) => {
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < hour) {
      return `${Math.floor(diff / minute)} minutes ago`;
    }

    if (diff < day) {
      return `${Math.floor(diff / hour)} hours ago`;
    }

    return `${Math.floor(diff / day)} days ago`;
  };

  return (
    <Link href={`/watch/${video._id}`}>
      <div className="flex gap-6 cursor-pointer group mb-8">
        {/* Thumbnail */}
        <div className="w-[320px] flex-shrink-0">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-200">
            <video
              src={video.filepath}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1">
          <h2 className="text-xl font-semibold text-black line-clamp-2 group-hover:text-blue-600">
            {video.videotitle}
          </h2>

          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <Eye className="w-4 h-4" />
            <span>{video.views.toLocaleString()} views</span>
            <span>•</span>
            <span>{getTimeAgo(video.createdAt)}</span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
              {video.videochannel.charAt(0)}
            </div>

            <p className="text-sm text-gray-700">
              {video.videochannel}
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-500 max-w-3xl line-clamp-2">
            Watch this amazing video on YourTube. This is sample text just like
            YouTube's description shown on the search page.
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchVideoCard;