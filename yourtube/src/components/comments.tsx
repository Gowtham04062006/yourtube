import { useUser } from "@/lib/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  ThumbsUp,
  ThumbsDown,
  Flag,
} from "lucide-react";

const Comments = ({ videoId }: { videoId: string }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [translatedComments, setTranslatedComments] = useState<{ [key: string]: string }>({});
  const [location, setLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);

  const { user } = useUser();

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/comment/${videoId}`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation(
          `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
        );
      },
      () => {
        setLocation("");
      }
    );
  }, []);

  const handleComment = async () => {
    if (!text.trim()) return;

    try {
      await axiosInstance.post("/comment", {
        user: user._id,
        video: videoId,
        message: text,
        location,
        showLocation,
      });

      setText("");
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (id: string) => {
    try {
      await axiosInstance.patch(`/comment/like/${id}`);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async (id: string) => {
    try {
      await axiosInstance.patch(`/comment/dislike/${id}`);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReport = async (id: string) => {
    try {
      await axiosInstance.patch(`/comment/report/${id}`, {
        reason: "Reported by user",
      });

      alert("Comment reported.");
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTranslate = async (id: string) => {
    try {
      const response = await axiosInstance.post(
        `/comment/translate/${id}`,
        {
          targetLanguage: "en",
        }
      );

      setTranslatedComments((prev) => ({
        ...prev,
        [id]: response.data.translated,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="mb-6 text-xl font-semibold">
        {comments.length} Comments
      </h2>

      <div className="mb-8 flex gap-4">
        <Avatar>
          <AvatarFallback>
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Input
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <label className="mt-3 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showLocation}
              onChange={(e) =>
                setShowLocation(e.target.checked)
              }
            />
            Show my location
          </label>

          <div className="mt-3 flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setText("")}
            >
              Cancel
            </Button>

            <Button onClick={handleComment}>
              Comment
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex gap-4"
          >
            <Avatar>
              <AvatarFallback>
                {comment.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {comment.user?.name}
                </span>

                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(
                    new Date(comment.createdAt),
                    {
                      addSuffix: true,
                    }
                  )}
                </span>
              </div>

              <div className="mt-2">
                <p>{comment.message}</p>

                {comment.showLocation &&
                  comment.location && (
                    <p className="mt-1 text-xs text-gray-500">
                      📍 {comment.location}
                    </p>
                  )}

                {translatedComments[comment._id] && (
                  <p className="mt-2 text-sm text-blue-600">
                    {translatedComments[comment._id]}
                  </p>
                )}
              </div>

              <div className="mt-3 flex items-center gap-5">
                <button
                  onClick={() =>
                    handleLike(comment._id)
                  }
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <ThumbsUp className="h-4 w-4" />
                  {comment.likes}
                </button>

                <button
                  onClick={() =>
                    handleDislike(comment._id)
                  }
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <ThumbsDown className="h-4 w-4" />
                  {comment.dislikes}
                </button>

                <button
                  onClick={() =>
                    handleReport(comment._id)
                  }
                  className="flex items-center gap-1 text-red-500 cursor-pointer"
                >
                  <Flag className="h-4 w-4" />
                  Report
                </button>

                <button
                  onClick={() =>
                    handleTranslate(comment._id)
                  }
                  className="flex items-center gap-1 text-blue-500 cursor-pointer"
                >
                  🌐 Translate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;