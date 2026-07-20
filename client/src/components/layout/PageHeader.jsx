import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, description, showBack = false }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 md:mb-8">
      {showBack && (
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
      {description && (
        <p className="text-sm md:text-base text-slate-500 mt-1 md:mt-2">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;