import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@/lib/AuthContext";

interface ChannelHeaderProps {
  channelId?: string | string[];
}

const ChannelHeader = ({ channelId }: ChannelHeaderProps) => {
  const { user } = useUser();

  return (
    <div className="w-full">
      <div className="h-48 w-full bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500" />

      <div className="flex items-start gap-6 px-6 py-6">
        <Avatar className="h-28 w-28">
          <AvatarImage src={user?.image} />

          <AvatarFallback className="bg-gray-100 text-4xl">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <h1 className="text-5xl font-bold">
            {user?.channelname || user?.name}
          </h1>

          <p className="mt-2 text-gray-500">
            @{user?.channelname || user?.name}
          </p>

          <p className="mt-2 text-gray-600">
            {user?.description || "No description"}
          </p>

          <p className="mt-2 text-blue-600">
            Channel ID : {channelId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;