import { MainContent } from "@/components/main-content";
import { Sidebar } from "@/components/sidebar";

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}
