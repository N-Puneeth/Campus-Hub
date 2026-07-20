import { GraduationCap, Home, Calendar, Utensils, BookOpen, Calculator, Info, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Calendar, label: "Academic Calendar", path: "/calendar" },
    { icon: Utensils, label: "Mess Menu", path: "/mess" },
    { icon: BookOpen, label: "Notes", path: "/notes" },
    { icon: Calculator, label: "CGPA Calculator", path: "/cgpa" },
  ];

  const bottomItems = [
    { icon: Info, label: "About Campus", path: "/about" },
    { icon: Mail, label: "Contact", path: "/contact" },
  ];

  const NavLink = ({ item }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    
    return (
      <Link 
        to={item.path}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm",
          isActive 
            ? "bg-indigo-50 text-indigo-600" 
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
        )}
      >
        <Icon className="w-5 h-5" />
        {item.label}
      </Link>
    );
  };

  return (
    <aside className="w-full h-full flex flex-col bg-white overflow-y-auto">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-2 mb-2">
        <GraduationCap className="w-8 h-8 text-indigo-600" />
        <span className="font-bold text-xl text-slate-900 tracking-tight">CampusHub</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
        
        {/* Divider */}
        <div className="pt-6 pb-2">
          <div className="w-full h-px bg-slate-100"></div>
        </div>

        {bottomItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
      </nav>

      {/* Bottom Desktop Quote Card */}
      <div className="p-4 mt-auto">
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
          <div className="text-slate-300 mb-3">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 21L16.415 14.282C16.415 14.282 16.592 13.916 16.711 13.565C16.829 13.214 16.929 12.87 17.012 12.535C17.095 12.2 17.16 11.859 17.208 11.512C17.255 11.165 17.279 10.824 17.279 10.49V3H24V10.49C24 12.296 23.633 13.957 22.898 15.474C22.164 16.99 21.05 18.232 19.558 19.199C18.065 20.165 16.219 20.766 14.017 21ZM3 21L5.398 14.282C5.398 14.282 5.575 13.916 5.694 13.565C5.812 13.214 5.912 12.87 5.995 12.535C6.078 12.2 6.143 11.859 6.19 11.512C6.238 11.165 6.262 10.824 6.262 10.49V3H12.983V10.49C12.983 12.296 12.616 13.957 11.881 15.474C11.147 16.99 10.033 18.232 8.54 19.199C7.048 20.165 5.201 20.766 3 21Z"/></svg>
          </div>
          <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
            Stay focused, keep learning, and never stop growing.
          </p>
          <p className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
            Have a great day! <span className="text-base">🚀</span>
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;