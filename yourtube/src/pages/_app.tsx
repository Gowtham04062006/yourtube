import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ChannelDialogue from "@/components/channeldialogue";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../lib/AuthContext";
import { useState } from "react";

export default function App({
  Component,
  pageProps,
}: AppProps) {
  const [openChannelDialog, setOpenChannelDialog] =
    useState(false);

  return (
    <UserProvider>
      <div className="min-h-screen bg-background text-foreground">
        <title>Your-Tube Clone</title>

        <Header
          setOpenChannelDialog={setOpenChannelDialog}
        />

        <Toaster
          position="bottom-right"
          richColors
          closeButton
        />

        <div className="flex">
          <Sidebar
            setOpenChannelDialog={setOpenChannelDialog}
          />

          <Component {...pageProps} />
        </div>

        <ChannelDialogue
          open={openChannelDialog}
          onOpenChange={setOpenChannelDialog}
        />
      </div>
    </UserProvider>
  );
}