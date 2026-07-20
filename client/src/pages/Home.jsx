import { Sun } from "lucide-react";
import QuoteCard from "../components/cards/QuoteCard";
import HeroBanner from "../components/sections/HeroBanner";
import QuickAccessGrid from "../components/sections/QuickAccessGrid";
import MessWidget from "../components/widgets/MessWidget";
import EventsWidget from "../components/widgets/EventsWidget";
import AnnouncementsWidget from "../components/widgets/AnnouncementsWidget";

const Home = () => {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      
      {/* Mobile only quote card */}
      <div className="block md:hidden">
        <QuoteCard />
      </div>

      {/* Greeting Section */}
      <div className="flex justify-between items-start mt-2 md:mt-0">
        <div>
          <p className="text-xs md:text-sm text-slate-500 font-medium mb-1">Welcome back! 👋</p>
          <h1 className="text-xl md:text-3xl font-bold text-slate-900">Hello, Students</h1>
          <p className="text-[11px] md:text-sm text-slate-500 mt-1 md:mt-2">Here's what's happening in your campus today.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
          <Sun className="w-4 h-4 text-amber-500" /> IIITDM Kancheepuram
        </div>
      </div>

      {/* Main Banner */}
      <HeroBanner />

      {/* Grid Features */}
      <QuickAccessGrid />

      {/* Widgets Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-4">
        <MessWidget />
        <EventsWidget />
        <AnnouncementsWidget />
      </div>

    </div>
  );
};

export default Home;