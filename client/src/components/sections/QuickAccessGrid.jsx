import { Calendar, Utensils, BookOpen, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, desc, iconBg, iconColor, path }) => (
  <Link to={path} className="bg-white p-3 md:p-4 rounded-[1.25rem] shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-md hover:-translate-y-1">
    <div className={`p-3 md:p-3.5 rounded-2xl ${iconBg} ${iconColor} mb-2.5 md:mb-3`}>
      <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
    </div>
    <h3 className="font-bold text-slate-900 text-[13px] md:text-sm mb-1">{title}</h3>
    <p className="text-[10px] md:text-xs text-slate-500 leading-tight hidden md:block">{desc}</p>
  </Link>
);

const QuickAccessGrid = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-4">
      <FeatureCard 
        icon={Calendar} title="Calendar" desc="View important dates, exams, and events"
        iconBg="bg-blue-50" iconColor="text-blue-500" path="/calendar"
      />
      <FeatureCard 
        icon={Utensils} title="Mess Menu" desc="Check today's breakfast, lunch and dinner"
        iconBg="bg-green-50" iconColor="text-green-500" path="/mess"
      />
      <FeatureCard 
        icon={BookOpen} title="Notes" desc="Access subject notes and study materials"
        iconBg="bg-purple-50" iconColor="text-purple-500" path="/notes"
      />
      <FeatureCard 
        icon={Calculator} title="CGPA" desc="Calculate your GPA/CGPA easily"
        iconBg="bg-orange-50" iconColor="text-orange-500" path="/cgpa"
      />
    </div>
  );
};

export default QuickAccessGrid;