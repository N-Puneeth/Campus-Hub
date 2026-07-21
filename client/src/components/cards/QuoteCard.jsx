import { useState, useEffect } from "react";
import { Quote as QuoteIcon, Edit3 } from "lucide-react";
import api from "../../services/api";

const QuoteCard = () => {
  const [quote, setQuote] = useState({
    text: "Loading today's motivation...",
    author: "CampusHub"
  });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await api.get('/quote');
        // Ensure your backend sends back 'text' and 'author' fields matching this
        if (response.data) {
          setQuote(response.data);
        }
      } catch (error) {
        console.error("Error fetching daily quote:", error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="bg-[#F8F5FF] rounded-2xl p-4 md:p-5 flex flex-row items-center justify-between border border-purple-100 gap-4 shadow-sm">
      <div className="flex gap-3 md:gap-4 items-start flex-1">
         <div className="text-purple-400 mt-1">
           <QuoteIcon className="w-8 h-8 fill-current opacity-60" />
         </div>
         <div>
           <p className="text-sm md:text-base text-slate-800 font-medium leading-relaxed">
             {quote.text}
           </p>
           <p className="text-xs text-slate-500 font-medium mt-1">- {quote.author}</p>
         </div>
      </div>
      
    </div>
  );
};

export default QuoteCard;