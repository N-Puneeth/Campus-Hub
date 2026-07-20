import { useState, useEffect } from "react";
import { Utensils, ArrowRight, AlertCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const MessWidget = () => {
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeekType, setCurrentWeekType] = useState("");

  // 1. Setup today's dates
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }); 

  // 2. Helper function to calculate if current week is even or odd
  const getWeekType = () => {
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    
    return weekNumber % 2 === 0 ? "even" : "odd";
  };

  useEffect(() => {
    const fetchMess = async () => {
      try {
        setIsLoading(true);
        const weekType = getWeekType();
        setCurrentWeekType(weekType); // Save to state so we can display it on the UI

        const response = await api.get('/mess');
        
        // 3. Filter by BOTH the current day AND the current week type
        const todaysMenu = response.data.find(m => 
          m.day === dayName && (m.weekType === weekType || m.weekType === 'both')
        );
        
        setMenu(todaysMenu || response.data[0]); 
      } catch (err) {
        console.error("Error fetching mess menu:", err);
        setError("Failed to load mess menu.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMess();
  }, [dayName]);

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-2 font-bold text-slate-900 text-lg">
          <Utensils className="w-5 h-5 text-slate-400 mt-1" />
          <h3 className="leading-tight">Today's Mess<br/>Menu</h3>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <div className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-xs font-bold text-center">
            {dateString}
          </div>
          {/* Badge to show students which week it is */}
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
            <Calendar className="w-3 h-3" /> {currentWeekType} Week
          </div>
        </div>
      </div>

      <div className="space-y-5 flex-1 relative">
        <div className="absolute left-2.5 top-2 bottom-6 border-l-2 border-dotted border-slate-200"></div>

        {isLoading ? (
          <p className="text-sm text-slate-500 pl-8 animate-pulse">Loading menu...</p>
        ) : error ? (
          <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-3 rounded-xl ml-6">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        ) : !menu ? (
          <p className="text-sm text-slate-500 text-center py-4">No menu data available for this week.</p>
        ) : (
          <>
            <div className="relative pl-8">
              <div className="absolute left-1.5 top-1.5 w-2.5 h-2.5 bg-yellow-400 rounded-full ring-4 ring-white"></div>
              <h4 className="text-sm font-bold text-slate-900">Breakfast</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed pr-4">{menu.breakfast}</p>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-1.5 top-1.5 w-2.5 h-2.5 bg-green-500 rounded-full ring-4 ring-white"></div>
              <h4 className="text-sm font-bold text-slate-900">Lunch</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed pr-4">{menu.lunch}</p>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-1.5 top-1.5 w-2.5 h-2.5 bg-purple-500 rounded-full ring-4 ring-white"></div>
              <h4 className="text-sm font-bold text-slate-900">Dinner</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed pr-4">{menu.dinner}</p>
            </div>
          </>
        )}
      </div>

      <Link to="/mess" className="mt-6 w-full flex items-center justify-center gap-2 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 py-3 rounded-xl text-sm font-semibold transition-colors">
        View Full Mess Menu <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default MessWidget;