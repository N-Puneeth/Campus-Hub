import { useState, useEffect } from "react";
import { Megaphone, ArrowRight, CalendarDays, Award, BookOpen, Bell, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const AnnouncementItem = ({ type, title, desc, time }) => {
  // Map different announcement types from the DB to specific icons and colors
  const iconMap = {
    academic: { icon: CalendarDays, bg: "bg-blue-50", color: "text-blue-500" },
    event: { icon: Award, bg: "bg-amber-50", color: "text-amber-500" },
    note: { icon: BookOpen, bg: "bg-green-50", color: "text-green-500" },
    alert: { icon: Bell, bg: "bg-red-50", color: "text-red-500" },
    default: { icon: Megaphone, bg: "bg-slate-100", color: "text-slate-500" }
  };

  // Fallback to default if the type isn't recognized
  const style = iconMap[type?.toLowerCase()] || iconMap.default;
  const Icon = style.icon;

  return (
    <div className="flex items-start gap-3 transition-all hover:-translate-y-0.5">
      <div className={`p-2 rounded-xl ${style.bg} ${style.color} flex-shrink-0 mt-0.5`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-slate-900 mb-0.5">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed mb-1 line-clamp-2">{desc}</p>
        <p className="text-[10px] text-slate-400 font-medium">{time}</p>
      </div>
    </div>
  );
};

const AnnouncementsWidget = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        // Ensure you have created this route in your backend!
        const response = await api.get('/announcements');
        
        // Show only the 3 most recent announcements on the dashboard
        setAnnouncements(response.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching announcements:", err);
        setError("Failed to load announcements.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Megaphone className="w-5 h-5 text-blue-500" />
          <h3>Important Announcements</h3>
        </div>
        <Link to="#" className="text-xs font-bold text-indigo-600 hover:underline">View All</Link>
      </div>

      <div className="space-y-5 flex-1">
        {isLoading ? (
          // Skeleton Loading State
          [1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-8 h-8 bg-slate-100 rounded-xl flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 bg-slate-100 rounded-full"></div>
                <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                <div className="h-2 w-1/4 bg-slate-100 rounded-full"></div>
              </div>
            </div>
          ))
        ) : error ? (
           <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-3 rounded-xl">
             <AlertCircle className="w-4 h-4" /> {error}
           </div>
        ) : announcements.length === 0 ? (
           <p className="text-sm text-slate-500 text-center py-4">No new announcements today.</p>
        ) : (
          // Dynamic Data Mapping
          announcements.map((item) => (
            <AnnouncementItem 
              key={item._id}
              type={item.type} // e.g., "academic", "event", "alert"
              title={item.title} 
              desc={item.desc} 
              time={item.time} // e.g., "2 hours ago"
            />
          ))
        )}
      </div>

      <Link to="#" className="mt-6 w-full flex items-center justify-center gap-2 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 py-3 rounded-xl text-sm font-semibold transition-colors">
        View All Announcements <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default AnnouncementsWidget;