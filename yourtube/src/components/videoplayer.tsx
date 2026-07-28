import React, { useRef, useState } from "react";
import { RotateCcw, RotateCw } from "lucide-react";

const Videoplayer = ({ video }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const lastTap = useRef(0);

  const handleDoubleTap = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const now = Date.now();

    if (now - lastTap.current < 300) {
      const rect = e.currentTarget.getBoundingClientRect();

      const x = e.clientX - rect.left;

      if (x < rect.width / 2) {
        backward10();
      } else {
        forward10();
      }
    }

    lastTap.current = now;
  };

  const forward10 = () => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = Math.min(
      videoRef.current.currentTime + 10,
      videoRef.current.duration
    );
  };

  const backward10 = () => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = Math.max(
      videoRef.current.currentTime - 10,
      0
    );
  };

  return (
    <div
      className="relative w-full"
      onClick={handleDoubleTap}
    >

      <div className="absolute left-4 top-4 z-10">
        <button
          onClick={backward10}
          className="rounded-full bg-black/60 p-3 text-white hover:bg-black"
        >
          <RotateCcw className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute right-4 top-4 z-10">
        <button
          onClick={forward10}
          className="rounded-full bg-black/60 p-3 text-white hover:bg-black"
        >
          <RotateCw className="h-6 w-6" />
        </button>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          </div>
        )}
        <video
          ref={videoRef}
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${video.filepath}`}
          controls
          onLoadStart={() => setLoading(true)}
          onWaiting={() => setLoading(true)}
          onCanPlay={() => setLoading(false)}
          onPlaying={() => setLoading(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

    </div>
  );
};

export default Videoplayer;