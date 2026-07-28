import { useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import { useUser } from "@/lib/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChannelDialogueProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ChannelDialogue = ({
  open,
  onOpenChange,
}: ChannelDialogueProps) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const { user, login } = useUser();

  const handleCreate = async () => {

    if (!channelName.trim()) {
      alert("Please enter a channel name.");
      return;
    }

    try {
      console.log("Sending PATCH request...");

      const response = await axiosInstance.patch(
        `/user/update/${user._id}`,
        {
          channelname: channelName,
          description: description,
        }
      );

      console.log("Response:", response.data);

      login(response.data);

      onOpenChange(false);
    } catch (error) {
      console.error("PATCH ERROR:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Create your channel
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Channel Name
            </label>

            <Input
              placeholder="John Doe"
              value={channelName}
              onChange={(e) =>
                setChannelName(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Channel Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Tell viewers about your channel..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button onClick={handleCreate}>
              Create channel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelDialogue;