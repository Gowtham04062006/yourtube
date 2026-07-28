import { Play } from "lucide-react";
import { useEffect, useState } from "react";

import axiosInstance from "@/lib/axiosinstance";
import { useUser } from "@/lib/AuthContext";

import WatchLaterVideoCard from "./watchlatervideocard";

const WatchLaterContent = () => {
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user?._id) {
      fetchWatchLater();
    }
  }, [user]);

  const fetchWatchLater = async () => {
    try {
      const response = await axiosInstance.get(
        `/watchlater/${user._id}`
      );

      const videos = response.data.map((item: any) => ({
        ...item.video,
        addedAt: item.createdAt,
      }));

      setWatchLaterVideos(videos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Watch later
          </h1>

          <p className="text-gray-500 mt-1">
            {watchLaterVideos.length} videos
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-gray-100 transition">
          <Play
            className="h-4 w-4"
            fill="currentColor"
          />
          Play all
        </button>
      </div>

      {/* Videos */}
      <div className="space-y-6">
        {watchLaterVideos.length > 0 ? (
          watchLaterVideos.map((video: any) => (
            <WatchLaterVideoCard
              key={video._id}
              video={video}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No videos added to Watch Later.
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchLaterContent;