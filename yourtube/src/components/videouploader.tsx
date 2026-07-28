import { useRef, useState } from "react";
import { Upload, FileVideo, X } from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import { useUser } from "@/lib/AuthContext";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface VideoUploaderProps {
  channelId?: string | string[];
}

const VideoUploader = ({ channelId }: VideoUploaderProps) => {
  const { user } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setTitle(file.name.replace(/\.[^/.]+$/, ""));
  };

  const removeFile = () => {
    setSelectedFile(null);
    setTitle("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleUpload = async () => {

  if (!selectedFile) {
    alert("Please select a video.");
    return;
  }

  if (!user) {
    alert("Please login first.");
    return;
  }

  try {

    setUploading(true);

    const formData = new FormData();

    formData.append("video", selectedFile);
    formData.append("videotitle", title);
    formData.append("description", description);
    formData.append("videochannel", user.channelname);
    formData.append("uploader", user._id);

    const response = await axiosInstance.post(
      "/video/upload",
      formData
    );

    toast.success("Video uploaded successfully!");

    removeFile();
    setDescription("");
  } catch (error: any) {

    console.error(error);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
    } else if (error.request) {
      console.log("Request:", error.request);
    } else {
      console.log("Message:", error.message);
    }

    toast.error("Upload failed!");
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-2xl font-semibold">
        Upload a video
      </h2>

      {!selectedFile ? (
        <div
          onClick={openFilePicker}
          className="flex h-[170px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white transition hover:bg-gray-50"
        >
          <Upload
            size={42}
            className="text-gray-400"
          />

          <h3 className="mt-3 text-lg font-medium">
            Drag and drop video files to upload
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            or click to select files
          </p>

          <p className="mt-2 text-xs text-gray-400">
            MP4, WebM, MOV or AVI • Up to 100 MB
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          {/* File */}

          <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
            <div className="flex items-center gap-3">
              <FileVideo className="h-8 w-8 text-blue-600" />

              <div>
                <p className="text-sm font-medium">
                  {selectedFile.name}
                </p>

                <p className="text-xs text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              onClick={removeFile}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Title */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Title
            </label>

            <Input
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              placeholder="Enter video description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-black"
              rows={4}
            />
          </div>
          {/* Buttons */}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={removeFile}
              className="rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                handleUpload();
              }}
              className="rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-gray-100"
              >
              Upload
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default VideoUploader;
