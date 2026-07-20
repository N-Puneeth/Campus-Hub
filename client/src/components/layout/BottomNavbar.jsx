import { Home, Calendar, Utensils, BookOpen, Calculator } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";

const BottomNavbar = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Calendar, label: "Calendar", path: "/calendar" },
    { icon: Utensils, label: "Mess Menu", path: "/mess" },
    { icon: BookOpen, label: "Notes", path: "/notes" },
    { icon: Calculator, label: "CGPA", path: "/cgpa" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-full py-1 gap-1 transition-colors",
              isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-900"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavbar;