import { useState } from "react";

const tabs = [
  "Home",
  "Videos",
  "Shorts",
  "Playlists",
  "Community",
  "About",
];

const ChannelTabs = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="border-b">
      <div className="flex items-center gap-8 px-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative py-4 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab}

            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChannelTabs;