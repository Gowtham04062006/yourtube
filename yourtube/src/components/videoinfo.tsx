import { useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import {
  ThumbsUp,
  ThumbsDown,
  Share,
  Download,
  MoreHorizontal,
} from "lucide-react";

import { useUser } from "@/lib/AuthContext";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";

const Videoinfo = ({ video }: any) => {
  const [likes, setLikes] = useState(video.like || 0);
  const [dislikes, setDislikes] = useState(video.dislike || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useUser();

  const handleLike = async () => {

    try {

      const response = await axiosInstance.patch(
        `/video/like/${video._id}`
      );

      setLikes(response.data.like);
      setIsLiked(true);
    } catch (error) {
      console.error("LIKE ERROR:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axiosInstance.patch(
        `/video/dislike/${video._id}`
      );

      setDislikes(response.data.dislike);
      setIsDisliked(true);

      if (isLiked) {
        setLikes(response.data.like);
        setIsLiked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleWatchLater = async () => {
    try {

      await axiosInstance.post("/watchlater", {
        user: user._id,
        video: video._id,
      });

      alert("Added to Watch Later");
    } catch (error: any) {
      console.error(error);
      console.log(error.response);

      if (error.response) {
        console.log(error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }
    }
  };
  const handleComment = async () => {
    try {
      if (!comment.trim()) {
        return alert("Please enter a comment");
      }

      await axiosInstance.post("/comment", {
        user: user._id,
        video: video._id,
        message: comment,
      });

      alert("Comment added successfully");
      setComment("");
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.post("/download", {
        userId: user._id,
        videoId: video._id,
      });

      alert(response.data.message);
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">
        {video.videotitle}
      </h1>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback>
              {video.videochannel?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold">
              {video.videochannel}
            </h3>

            <p className="text-sm text-gray-500">
              1.2M subscribers
            </p>
          </div>

          <Button className="rounded-full">
            Subscribe
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isLiked ? "default" : "secondary"}
            className="rounded-full"
            onClick={handleLike}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            {likes}
          </Button>

          <Button
            variant={isDisliked ? "default" : "secondary"}
            className="rounded-full"
            onClick={handleDislike}
          >
            <ThumbsDown className="w-4 h-4 mr-2" />
            {dislikes}
          </Button>

          <Button
            variant="secondary"
            className="rounded-full"
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>

          <Button
            variant="secondary"
            className="rounded-full"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>

          <Button
            variant="secondary"
            className="rounded-full"
            onClick={handleWatchLater}
          >
            Watch Later
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-gray-100 p-4">
        <p className="font-medium">
          {video.views?.toLocaleString()} views
          <span className="ml-4 text-sm">
            {formatDistanceToNow(new Date(video.createdAt), {
              addSuffix: true,
            })}
          </span>
        </p>

        <p className="mt-3 text-gray-700">
          {video.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default Videoinfo;