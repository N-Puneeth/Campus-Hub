import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BottomNavbar from "./BottomNavbar";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Sidebar (Hidden on mobile) */}
      <div className="hidden md:flex w-64 flex-shrink-0 border-r border-slate-200 bg-white">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile Topbar */}
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Navigation (Hidden on desktop) */}
      <div className="md:hidden">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default MainLayout;