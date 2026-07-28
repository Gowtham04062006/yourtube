import React from "react";
import Link from "next/link";

import {
  Home,
  Compass,
  PlaySquare,
  History,
  Clock,
  ThumbsUp,
  User,
  Download,
} from "lucide-react";

import { Button } from "./ui/button";

interface SidebarProps {
  setOpenChannelDialog?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const Sidebar = ({ setOpenChannelDialog }: SidebarProps) => {
  const user = {
    id: "1",
    name: "Gowtham",
    email: "leelagowtham@example.com",
    image: "https://github.com/shadcn.png",
  };

  return (
    <aside className="w-56 border-r bg-background text-foreground min-h-screen">
      <nav className="px-2 py-3 space-y-1">

        <Link href="/">
          <Button
            variant="ghost"
            className="h-10 w-full justify-start rounded-lg text-sm font-normal"
          >
            <Home className="mr-4 h-5 w-5" />
            Home
          </Button>
        </Link>

        <Link href="/explore">
          <Button
            variant="ghost"
            className="h-10 w-full justify-start rounded-lg text-sm font-normal"
          >
            <Compass className="mr-4 h-5 w-5" />
            Explore
          </Button>
        </Link>

        <Link href="/subscription">
          <Button
            variant="ghost"
            className="h-10 w-full justify-start rounded-lg text-sm font-normal"
          >
            <PlaySquare className="mr-4 h-5 w-5" />
            Subscriptions
          </Button>
        </Link>

        <hr className="my-2" />

        <Link href="/history">
          <Button
            variant="ghost"
            className="h-10 w-full justify-start rounded-lg text-sm font-normal"
          >
            <History className="mr-4 h-5 w-5" />
            History
          </Button>
        </Link>

        <Link href="/watch-later">
          <Button
            variant="ghost"
            className="h-10 w-full justify-start rounded-lg text-sm font-normal"
          >
            <Clock className="mr-4 h-5 w-5" />
            Watch Later
          </Button>
        </Link>

        <Link href="/downloads">
          <Button
            variant="ghost"
            className="h-10 w-full justify-start rounded-lg text-sm font-normal"
          >
            <Download className="mr-4 h-5 w-5" />
            Downloads
          </Button>
        </Link>

        <Link href="/liked">
          <Button
            variant="ghost"
            className="h-10 w-full justify-start rounded-lg text-sm font-normal"
          >
            <ThumbsUp className="mr-4 h-5 w-5" />
            Liked Videos
          </Button>
        </Link>

        <hr className="my-2" />

        <Button
          variant="ghost"
          onClick={() => setOpenChannelDialog?.(true)}
          className="h-10 w-full justify-start rounded-lg text-sm font-normal"
        >
          <User className="mr-4 h-5 w-5" />
          Create Channel
        </Button>
      </nav>
    </aside>
  );
};

export default Sidebar;