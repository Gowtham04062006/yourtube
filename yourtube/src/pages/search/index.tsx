import { useRouter } from "next/router";
import { videos } from "@/lib/videos";
import SearchVideoCard from "@/components/SearchVideoCard";

const SearchPage = () => {
  const router = useRouter();

  const query =
    typeof router.query.q === "string"
      ? router.query.q.toLowerCase()
      : "";

  const filteredVideos = videos.filter(
    (video) =>
      video.videotitle.toLowerCase().includes(query) ||
      video.videochannel.toLowerCase().includes(query)
  );

  return (
    <div className="flex-1 px-10 py-6">
      <div className="max-w-5xl">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <SearchVideoCard
              key={video._id}
              video={video}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg mt-20">
            No videos found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;