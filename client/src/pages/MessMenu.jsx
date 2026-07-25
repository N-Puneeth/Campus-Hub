import { useState, useEffect } from "react";
// Make sure this path is correct for your PageHeader component
import PageHeader from "../components/layout/PageHeader"; 
import { Coffee, Sun, Moon, Utensils } from "lucide-react";
import api from "../../services/api"; // Verify your API path

const MealCard = ({ type, time, items, icon: Icon, iconColor, iconBg }) => (
  <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-start gap-4">
    <div className={`p-3 rounded-2xl ${iconBg} ${iconColor} flex-shrink-0 mt-1`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-base font-bold text-slate-900">{type}</h3>
        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{time}</span>
      </div>
      {/* Items are passed as a single string joined by commas, we render it directly */}
      <p className="text-sm text-slate-600 leading-relaxed">{items}</p>
    </div>
  </div>
);

const MessMenu = () => {
  const [activeDay, setActiveDay] = useState("Today");
  const [allMenus, setAllMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const days = ["Yesterday", "Today", "Tomorrow"];

  // 1. Get week type (Even or Odd) matching your DB casing
  const getWeekType = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);
    return weekNumber % 2 === 0 ? "Even" : "Odd"; 
  };

  // 2. Helper to figure out the actual day name based on the button clicked
  const getTargetDayName = (dayOffsetLabel) => {
    const date = new Date(); 
    if (dayOffsetLabel === "Yesterday") {
      date.setDate(date.getDate() - 1);
    } else if (dayOffsetLabel === "Tomorrow") {
      date.setDate(date.getDate() + 1);
    }
    return date.toLocaleDateString('en-US', { weekday: 'long' }); // Returns "Monday", "Tuesday", etc.
  };

  // 3. Fetch ALL menu data once on load
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/mess'); 
        setAllMenus(response.data);
      } catch (error) {
        console.error("Failed to fetch mess menu:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // 4. Filter the data based on the Active Tab AND the Current Week Type
  const currentWeekType = getWeekType();
  const targetDayName = getTargetDayName(activeDay);
  
  const displayMenu = allMenus.find(
    menu => menu.day === targetDayName && 
    (menu.weekType.toLowerCase() === currentWeekType.toLowerCase() || menu.weekType.toLowerCase() === 'both')
  );

  return (
    <div className="max-w-3xl">
      <PageHeader 
        title="Mess Menu" 
        description={`Displaying timetable for an ${currentWeekType} week.`}
        showBack={true}
      />

      {/* Navigation Tabs */}
      <div className="flex p-1 bg-slate-200/50 rounded-2xl mb-6 w-full md:w-fit">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`flex-1 px-8 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              activeDay === day ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Menu Content */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-center text-slate-500 py-10 animate-pulse">Loading menu...</p>
        ) : !displayMenu ? (
          <div className="text-center bg-white rounded-2xl p-8 border border-slate-100">
            <Utensils className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No menu data found for {targetDayName} ({currentWeekType} week).</p>
          </div>
        ) : (
          <>
            {/* Explicitly render the 4 meals using optional chaining (?.) and .join() */}
            <MealCard 
              type="Breakfast"
              time="7:00 AM - 9:00 AM"
              items={displayMenu.breakfast?.join(", ")}
              icon={Coffee} iconColor="text-orange-600" iconBg="bg-orange-50"
            />
            <MealCard 
              type="Lunch"
              time="12:00 PM - 2:00 PM"
              items={displayMenu.lunch?.join(", ")}
              icon={Sun} iconColor="text-green-600" iconBg="bg-green-50"
            />
            <MealCard 
              type="Snacks"
              time="4:30 PM - 5:30 PM"
              items={displayMenu.snacks?.join(", ")}
              icon={Coffee} iconColor="text-yellow-600" iconBg="bg-yellow-50"
            />
            <MealCard 
              type="Dinner"
              time="7:30 PM - 9:00 PM"
              items={displayMenu.dinner?.join(", ")}
              icon={Moon} iconColor="text-indigo-600" iconBg="bg-indigo-50"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MessMenu;