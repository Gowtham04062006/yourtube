import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axiosInstance from "@/lib/axiosinstance";

import Videoplayer from "@/components/videoplayer";
import Videoinfo from "@/components/videoinfo";
import Comments from "@/components/comments";
import RelatedVideos from "@/components/Relatedvideos";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  const [video, setVideo] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchVideo = async () => {
      try {
        const res = await axiosInstance.get(`/video/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideo();
  }, [id]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get("/video");
        setVideos(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideos();
  }, []);

  if (!video) {
    return (
      <div className="p-10 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">
            <Videoplayer video={video} />
            <Videoinfo video={video} />
            <Comments videoId={video._id} />
          </div>

          <RelatedVideos
            videos={videos}
            currentVideoId={video._id}
          />

        </div>
      </div>
    </div>
  );
};

export default Index;