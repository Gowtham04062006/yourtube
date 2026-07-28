import { useRouter } from "next/router";

import ChannelHeader from "@/components/channelheader";
import ChannelTabs from "@/components/channeltabs";
import VideoUploader from "@/components/videouploader";
import ChannelVideos from "@/components/channelvideos";

const ChannelPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) return null;

  return (
    <div className="w-full">
      {/* Header */}
      <ChannelHeader channelId={id} />

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4">
          <ChannelTabs />
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        <VideoUploader channelId={id} />

        <ChannelVideos channelId={id} />
      </div>
    </div>
  );
};

export default ChannelPage;