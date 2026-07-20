import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, ArrowRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const EventItem = ({ time, title, location, color }) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    default: "bg-slate-50 text-slate-600",
  };

  const timeColorClass = colorMap[color?.toLowerCase()] || colorMap.default;

  return (
    <div className="flex items-start gap-4 transition-all hover:-translate-y-0.5">
      <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${timeColorClass} whitespace-nowrap`}>
        {time || "TBA"} {'>'}
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 leading-tight">{title}</h4>
        <p className="text-xs text-slate-500 mt-0.5">{location}</p>
      </div>
    </div>
  );
};

const EventsWidget = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/events');
        
        // 1. Get today's actual date details
        const today = new Date();
        const currentMonth = today.toLocaleString('en-US', { month: 'short' }); // e.g., "Aug", "Sep"
        const currentDay = today.getDate(); // e.g., 5, 24
        
        // 2. Filter the database response to ONLY include events happening today
        const todaysEvents = response.data.filter(event => {
          // Parse event.day to integer to safely match "05" with 5
          const eventDay = parseInt(event.day, 10);
          return event.month === currentMonth && eventDay === currentDay;
        });

        // 3. Set state with only today's events (capped at 4 for the widget view)
        setEvents(todaysEvents.slice(0, 4));
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load today's events.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-lg">
          <CalendarIcon className="w-5 h-5 text-blue-500" />
          <h3>Today's Events</h3>
        </div>
        <Link to="/calendar" className="text-sm font-bold text-indigo-600 hover:underline">View All</Link>
      </div>

      <div className="space-y-5 flex-1">
        {isLoading ? (
          <p className="text-sm text-slate-500 animate-pulse">Checking today's schedule...</p>
        ) : error ? (
          <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-3 rounded-xl">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        ) : events.length === 0 ? (
          // 4. This will now perfectly trigger if the filtered array is empty!
          <div className="flex flex-col items-center justify-center h-full opacity-60 mt-4">
             <CalendarIcon className="w-10 h-10 text-slate-300 mb-3" />
             <p className="text-sm text-slate-500 text-center">No events scheduled for today.</p>
          </div>
        ) : (
          events.map((event) => (
            <EventItem 
              key={event._id}
              time={event.time} 
              title={event.title} 
              location={event.location}
              color={event.color}
            />
          ))
        )}
      </div>

      <Link to="/calendar" className="mt-6 w-full flex items-center justify-center gap-2 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 py-3 rounded-xl text-sm font-semibold transition-colors">
        View Full Calendar <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default EventsWidget;