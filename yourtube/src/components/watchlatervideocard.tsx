import Link from "next/link";
import {
  MoreVertical,
  Share2,
  Trash2,
  ListVideo,
  Play,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

const WatchLaterVideoCard = ({ video }: any) => {
  return (
    <div className="group flex gap-4 rounded-xl p-2 hover:bg-gray-100 transition-all">
      {/* Thumbnail */}

      <Link
        href={`/watch/${video._id}`}
        className="relative w-[320px] h-[180px] flex-shrink-0 overflow-hidden rounded-xl bg-black"
      >
        <video
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${video.filepath}`}
          className="w-full h-full object-cover"
          muted
          autoPlay
          loop
          playsInline
        />

        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          0:07
        </div>
      </Link>

      {/* Details */}

      <div className="flex flex-1 justify-between">
        <Link
          href={`/watch/${video._id}`}
          className="flex-1"
        >
          <h2 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600">
            {video.videotitle}
          </h2>

          <p className="text-gray-600 mt-2">
            {video.videochannel}
          </p>

          <p className="text-gray-500 text-sm mt-1">
            {video.views.toLocaleString()} views
          </p>

          <p className="text-gray-500 text-sm mt-4">
            {formatDistanceToNow(new Date(video.addedAt), {
              addSuffix: true,
            })}
          </p>
        </Link>

        {/* Three Dot Menu */}

        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full p-2 hover:bg-gray-200">
              <MoreVertical className="w-5 h-5" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuItem>
                <Play className="mr-3 h-4 w-4" />
                Play Next
              </DropdownMenuItem>

              <DropdownMenuItem>
                <ListVideo className="mr-3 h-4 w-4" />
                Save to Playlist
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Share2 className="mr-3 h-4 w-4" />
                Share
              </DropdownMenuItem>

              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-3 h-4 w-4" />
                Remove from Watch later
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default WatchLaterVideoCard;