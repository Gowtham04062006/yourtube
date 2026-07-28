import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

import {
  Menu,
  VideoIcon,
  Search,
  Mic,
  Bell,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useUser } from "@/lib/AuthContext";

interface HeaderProps {
  setOpenChannelDialog?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const Header = ({ setOpenChannelDialog }: HeaderProps) => {
  const router = useRouter();

  const {
    user,
    logout,
    handlegooglesignin,
    updateUser,
  } = useUser();


  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (typeof router.query.q === "string") {
      setSearchQuery(router.query.q);
    } else {
      setSearchQuery("");
    }
  }, [router.query.q]);

  const isChannel = router.pathname === "/channel/[id]";
  const isHistory = router.pathname === "/history";
  const isLiked = router.pathname === "/liked";
  const isWatchLater = router.pathname === "/watch-later";
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const changeTheme = async () => {
    try {
      const newTheme =
        user.theme === "dark" ? "light" : "dark";

      const response = await axios.patch(
        `http://localhost:5001/user/theme/${user._id}`,
        {
          theme: newTheme,
        }
      );

      updateUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background text-foreground px-4">
      {/* Left */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>

        <Link href="/" className="flex items-center gap-1">
          <div className="rounded bg-red-600 p-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.017 3.017 0 0 0 2.121 2.136c1.873.505 9.377.505 9.377.505s7.505 0 9.376-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12 9.545 15.568Z" />
            </svg>
          </div>

          <span className="text-xl font-medium">YourTube</span>

          <span className="ml-1 text-xs text-muted-foreground">IN</span>
        </Link>
      </div>

      {/* Search */}
      <form
        className="mx-8 flex flex-1 items-center justify-center"
        onSubmit={handleSearch}
      >
        <div className="flex w-full max-w-[640px]">
          <Input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 rounded-l-full rounded-r-none border-r-0 focus-visible:ring-0"
          />

          <button
            type="submit"
            className="flex h-10 w-16 items-center justify-center rounded-r-full border border-l-0 bg-background hover:bg-accent"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="ml-4 h-10 w-10 rounded-full bg-accent hover:bg-muted"
        >
          <Mic className="h-5 w-5" />
        </Button>
      </form>

      {/* Right */}
      {user ? (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <VideoIcon className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="cursor-pointer">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user.image}
                    alt={user.name}
                  />
                  <AvatarFallback>
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl border bg-background text-foreground p-1 shadow-lg"
            >
              <DropdownMenuItem
                className="cursor-pointer rounded-md px-3 py-2 hover:bg-accent"
                onClick={() => setOpenChannelDialog?.(true)}
              >
                Create Channel
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={`cursor-pointer rounded-md px-3 py-2 ${isChannel
                  ? "bg-accent"
                  : "hover:bg-accent"
                  }`}
                onClick={() => router.push(`/channel/${user._id}`)}
              >
                Your channel
              </DropdownMenuItem>

              <DropdownMenuItem
                className={`cursor-pointer rounded-md px-3 py-2 ${isHistory
                  ? "bg-accent"
                  : "hover:bg-accent"
                  }`}
                onClick={() => router.push("/history")}
              >
                History
              </DropdownMenuItem>

              <DropdownMenuItem
                className={`cursor-pointer rounded-md px-3 py-2 ${isLiked
                  ? "bg-accent"
                  : "hover:bg-accent"
                  }`}
                onClick={() => router.push("/liked")}
              >
                Liked videos
              </DropdownMenuItem>

              <DropdownMenuItem
                className={`cursor-pointer rounded-md px-3 py-2 ${isWatchLater
                  ? "bg-accent"
                  : "hover:bg-accent"
                  }`}
                onClick={() => router.push("/watch-later")}
              >
                Watch later
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer rounded-md px-3 py-2 hover:bg-accent"
                onClick={changeTheme}
              >
                {user.theme === "dark"
                  ? "☀ Switch to Light Theme"
                  : "🌙 Switch to Dark Theme"}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer rounded-md px-3 py-2 hover:bg-accent"
                onClick={logout}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button
          className="flex items-center gap-2"
          onClick={handlegooglesignin}
        >
          <User className="h-4 w-4" />
          Sign in
        </Button>
      )}
    </header>
  );
};

export default Header;