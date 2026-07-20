import { useState, useEffect } from "react";
import PageHeader from "../components/layout/PageHeader";
import { Search, FileText, Download, BookOpen, AlertCircle } from "lucide-react";
import api from "../services/api";

const NoteCard = ({ subject, title, size, date, url }) => (
  <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col h-full transition-all hover:shadow-md hover:-translate-y-1">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
        <FileText className="w-6 h-6" />
      </div>
      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
        {size || "PDF"}
      </span>
    </div>
    
    <div className="flex-1">
      <p className="text-xs font-bold text-slate-400 mb-1 tracking-wider uppercase">{subject}</p>
      <h3 className="text-base font-bold text-slate-900 leading-tight mb-2">{title}</h3>
      <p className="text-xs text-slate-500 flex items-center gap-1.5">
        <BookOpen className="w-3.5 h-3.5" /> Added {date}
      </p>
    </div>

    <a 
      href={url} 
      target="_blank" 
      rel="noreferrer"
      className="mt-5 w-full flex items-center justify-center gap-2 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 py-2.5 rounded-xl text-sm font-semibold transition-colors"
    >
      <Download className="w-4 h-4" /> Download
    </a>
  </div>
);

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/notes');
        setNotes(response.data);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load study materials.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl">
      <PageHeader 
        title="Study Notes" 
        description="Access and download subject notes and study materials."
        showBack={true}
      />

      <div className="relative mb-6 md:mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for subjects, topics, or keywords..." 
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
           <p className="text-slate-500 col-span-full">Loading notes...</p>
        ) : error ? (
           <div className="col-span-full bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2">
             <AlertCircle className="w-5 h-5"/> {error}
           </div>
        ) : filteredNotes.length === 0 ? (
           <p className="text-slate-500 col-span-full">No notes found matching your search.</p>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard 
              key={note._id}
              subject={note.subject} 
              title={note.title} 
              size={note.size} 
              date={note.date} 
              url={note.fileUrl} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;