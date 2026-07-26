import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import MessMenu from "./pages/MessMenu";
import Notes from "./pages/Notes";
import Calendar from "./pages/Calendar";
import Cgpa from "./pages/Cgpa";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Analytics } from "@vercel/analytics/next"

// A simple placeholder component for the pages we haven't built yet 
// so the app doesn't crash when you click the sidebar links!
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-full min-h-[50vh]">
    <h2 className="text-2xl font-bold text-slate-400">{title} Page Coming Soon</h2>
  </div>
);

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/mess" element={<MessMenu />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/cgpa" element={<Cgpa />} />
          <Route path="/about" element={<Placeholder title="About Campus" />} />
          <Route path="/contact" element={<Placeholder title="Contact" />} />
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
}

export default App;