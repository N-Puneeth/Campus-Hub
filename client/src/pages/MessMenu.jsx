import { useState, useEffect } from "react";
import PageHeader from "../components/layout/PageHeader";
import { Utensils, Coffee, Sun, Moon } from "lucide-react";
import api from "../services/api";

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
      <p className="text-sm text-slate-600 leading-relaxed">{items}</p>
    </div>
  </div>
);

const MessMenu = () => {
  const [activeDay, setActiveDay] = useState("Today");
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const days = ["Yesterday", "Today", "Tomorrow"];

  // 1. Utility function to check if the current week is Even or Odd
  const getWeekType = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);
    
    return weekNumber % 2 === 0 ? "even" : "odd";
  };

  // 2. Fetch the data when the page loads
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        // Ask your backend for the mess data using the routes you already built!
        const response = await api.get('/mess'); 
        
        const currentWeekType = getWeekType(); // Returns "even" or "odd"
        
        // Assuming your backend data has an "even" array and an "odd" array
        // We only save the menu for the current week type to our state
        const correctMenu = response.data.filter(menu => menu.weekType === currentWeekType);
        
        setMenuData(correctMenu);
      } catch (error) {
        console.error("Failed to fetch mess menu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="max-w-3xl">
      <PageHeader 
        title="Mess Menu" 
        description={`Displaying timetable for an ${getWeekType()} week.`}
        showBack={true}
      />

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

      <div className="space-y-4">
        {isLoading ? (
          <p className="text-center text-slate-500 py-10">Loading today's menu...</p>
        ) : menuData.length === 0 ? (
          <p className="text-center text-slate-500 py-10">No menu data found for this week.</p>
        ) : (
          // Map through your actual database items here!
          menuData.map((meal) => (
             <MealCard 
                key={meal._id}
                type={meal.type} // "Breakfast", "Lunch", etc.
                time={meal.time}
                items={meal.items.join(", ")}
                icon={Sun} iconColor="text-green-600" iconBg="bg-green-50"
             />
          ))
        )}
      </div>
    </div>
  );
};

export default MessMenu;