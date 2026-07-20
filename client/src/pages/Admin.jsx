import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import { Shield, Plus, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import api from "../services/api";

const Admin = () => {
  // State for the Announcement Form
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    type: "default",
    time: ""
  });
  
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // Send the data to your backend
      await api.post("/announcements", formData);
      
      setStatus({ type: "success", message: "Announcement added successfully!" });
      
      // Clear the form after success
      setFormData({ title: "", desc: "", type: "default", time: "" });
      
      // Remove the success message after 3 seconds
      setTimeout(() => setStatus({ type: "", message: "" }), 3000);
    } catch (error) {
      console.error("Error creating announcement:", error);
      setStatus({ type: "error", message: "Failed to add announcement. Check server logs." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <PageHeader 
        title="Admin Dashboard" 
        description="Manage platform content and add new records to the database."
        showBack={true}
      />

      <div className="mt-6 md:mt-8 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Post Announcement</h2>
            <p className="text-sm text-slate-500">Push a new announcement to the student dashboard.</p>
          </div>
        </div>

        {/* Status Message */}
        {status.message && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}>
            {status.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {status.message}
          </div>
        )}

        {/* Entry Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Mid-sem Exams Timetable Released"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <textarea 
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Provide the details..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category Type</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
              >
                <option value="default">General</option>
                <option value="academic">Academic</option>
                <option value="event">Event</option>
                <option value="alert">Alert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Display Time</label>
              <input 
                type="text" 
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                placeholder="e.g., Just now, 2 hours ago"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-[15px] shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <><Plus className="w-5 h-5" /> Publish Announcement</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;