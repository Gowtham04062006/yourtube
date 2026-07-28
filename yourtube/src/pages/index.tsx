import CategoryTabs from "@/components/Category-tabs";
import Videogrid from "@/components/videogrid";

export default function Home() {
  return (
    <div className="flex-1 p-6">
      <CategoryTabs />
      <Videogrid />
    </div>
  );
}