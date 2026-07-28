import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Movies",
  "News",
  "Sports",
  "Technology",
  "Comedy",
  "Education",
  "Science",
  "Travel",
  "Food",
  "Fashion",
];

const CategoryTabs = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <Button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          variant={activeCategory === cat ? "default" : "secondary"}
          className="rounded-full whitespace-nowrap"
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};

export default CategoryTabs;