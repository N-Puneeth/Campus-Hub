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
      
      {/* NEW CODE: About Campus & Contact Links */}
<div className="flex items-center gap-4 sm:gap-6">
  
  {/* About Campus Link */}
  <a 
    href="/about" 
    className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
  >
    {/* Info Icon (Replace with your actual icon component if needed) */}
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    {/* Text is hidden on very small phones, visible on tablets/desktops */}
    <span className="hidden sm:block text-sm font-medium">About Campus</span>
  </a>

  {/* Contact Link */}
  <a 
    href="/contact" 
    className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
  >
    {/* Mail Icon (Replace with your actual icon component if needed) */}
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
    {/* Text is hidden on very small phones, visible on tablets/desktops */}
    <span className="hidden sm:block text-sm font-medium">Contact</span>
  </a>

</div>

    </header>
  );
};

export default Topbar;