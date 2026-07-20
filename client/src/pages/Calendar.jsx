import { useState, useEffect } from "react";
import PageHeader from "../components/layout/PageHeader";
import { Calendar as CalendarIcon, MapPin, Clock, AlertCircle, LayoutList, CalendarDays } from "lucide-react";
import api from "../services/api";
import CalendarGrid from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styles

// --- Existing EventCard Component ---
const EventCard = ({ title, type, time, location, description, color = "blue", date }) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    red: "bg-red-50 text-red-600 border-red-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
  };
  const activeColorClass = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-5 transition-all hover:shadow-md">
      <div className={`md:w-24 flex-shrink-0 flex flex-row md:flex-col items-center justify-center p-3 rounded-2xl border ${activeColorClass}`}>
        <span className="text-xs font-bold uppercase tracking-wider md:mb-1 mr-2 md:mr-0">{date?.month || "TBD"}</span>
        <span className="text-xl md:text-2xl font-black">{date?.day || "--"}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">{type}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 mb-4">{description}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {time}</div>
          <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {location}</div>
        </div>
      </div>
    </div>
  );
};

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("list"); // 'list' or 'grid'
  const [date, setDate] = useState(new Date()); // Used for the grid

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (err) {
        setError("Failed to load campus events.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Helper function to check if a specific date has an event (to show a dot on the calendar)
  const hasEvent = (dateToCheck) => {
    // Assuming your DB stores events with standard JS Date strings or we map month/day
    // For simplicity, let's map the month strings to numbers
    const monthMap = { "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 };
    
    return events.some(event => {
       const eventMonth = monthMap[event.month];
       const eventDay = parseInt(event.day);
       return dateToCheck.getMonth() === eventMonth && dateToCheck.getDate() === eventDay;
    });
  };

  return (
    <div className="max-w-4xl">
      <PageHeader 
        title="Academic Calendar" 
        description="Stay updated with upcoming classes, exams, and campus events."
        showBack={true}
      />

      {/* View Toggle */}
      <div className="flex bg-slate-200/50 p-1 rounded-2xl w-fit mb-6">
        <button 
          onClick={() => setView("list")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${view === "list" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
        >
          <LayoutList className="w-4 h-4" /> List View
        </button>
        <button 
          onClick={() => setView("grid")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${view === "grid" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
        >
          <CalendarDays className="w-4 h-4" /> Month View
        </button>
      </div>

      {isLoading ? (
         <p className="text-slate-500">Loading events...</p>
      ) : error ? (
         <p className="text-red-500">{error}</p>
      ) : view === "list" ? (
        // --- LIST VIEW ---
        <div className="space-y-4 md:space-y-5">
          {events.map((event) => (
            <EventCard key={event._id} {...event} date={{ month: event.month, day: event.day }} />
          ))}
        </div>
      ) : (
        // --- GRID VIEW ---
        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm custom-calendar-wrapper">
          <CalendarGrid 
            onChange={setDate} 
            value={date} 
            tileContent={({ date, view }) => 
              view === 'month' && hasEvent(date) ? (
                <div className="flex justify-center mt-1">
                   <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                </div>
              ) : null
            }
          />
          
          {/* Quick list of events for the clicked day */}
          <div className="mt-8 pt-6 border-t border-slate-100">
             <h3 className="font-bold text-slate-900 mb-4">Events on {date.toDateString()}</h3>
             {/* Filter events for selected date here if you want to expand this! */}
             <p className="text-sm text-slate-500">Select a date with a blue dot to see its events.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;