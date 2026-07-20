import { Menu, Bell, GraduationCap } from "lucide-react";

const Topbar = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 md:hidden">
      <div className="flex items-center gap-3">
        <button className="text-slate-600 p-1">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-indigo-600" />
          <span className="font-bold text-lg text-slate-900 tracking-tight">CampusHub</span>
        </div>
      </div>
      
      <button className="relative p-2 text-slate-600">
        <Bell className="w-6 h-6" />
        {/* Red notification dot */}
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
      </button>
    </header>
  );
};

export default Topbar;