import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import { Calculator, Plus, RotateCcw } from "lucide-react";

const Cgpa = () => {
  // Pre-fill with 5 empty courses to match the image structure
  const [courses, setCourses] = useState([
    { id: 1, grade: "", credits: "" },
    { id: 2, grade: "", credits: "" },
    { id: 3, grade: "", credits: "" },
    { id: 4, grade: "", credits: "" },
    { id: 5, grade: "", credits: "" },
  ]);
  
  const [result, setResult] = useState(null);

  // Standard grade points mapping (Modify if your college uses different letters)
  const gradePoints = { S: 10, A: 9, B: 8, C: 7, D: 6, E: 5, U: 0 };
  const creditOptions = [1, 2, 3, 4, 5, 6];

  const handleUpdate = (id, field, value) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addCourse = () => {
    setCourses([...courses, { id: courses.length + 1, grade: "", credits: "" }]);
  };

  const resetForm = () => {
    setCourses(courses.map(c => ({ ...c, grade: "", credits: "" })));
    setResult(null);
  };

  const calculateCGPA = (e) => {
    e.preventDefault();
    let totalCredits = 0;
    let earnedPoints = 0;

    courses.forEach(course => {
      if (course.grade && course.credits) {
        const credits = parseInt(course.credits);
        totalCredits += credits;
        earnedPoints += (gradePoints[course.grade] * credits);
      }
    });

    if (totalCredits > 0) {
      const gpa = (earnedPoints / totalCredits).toFixed(2);
      setResult(gpa);
    } else {
      setResult("0.00");
    }
  };

  return (
    <div className="max-w-2xl">
      <PageHeader 
        title="GPA / CGPA Calculator" 
        description="Select your grades and credits for each course to calculate your GPA."
        showBack={true}
      />

      <form onSubmit={calculateCGPA} className="mt-6 md:mt-8 space-y-3">
        {/* Course Rows */}
        {courses.map((course, index) => (
          <div key={course.id} className="flex bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
            
            {/* Course Label Block (Replaces the dark grey 'Course' block in your image) */}
            <div className="bg-slate-100 text-slate-600 font-bold px-4 py-3.5 w-24 md:w-32 flex items-center justify-center border-r border-slate-200 text-sm">
              Course {index + 1}
            </div>
            
            {/* Grade Dropdown */}
            <select 
              value={course.grade}
              onChange={(e) => handleUpdate(course.id, "grade", e.target.value)}
              className="flex-1 bg-transparent px-3 md:px-5 py-3.5 text-slate-700 font-medium outline-none border-r border-slate-200 cursor-pointer text-sm"
            >
              <option value="" disabled>Grade</option>
              {Object.keys(gradePoints).map(grade => (
                <option key={grade} value={grade}>{grade} ({gradePoints[grade]})</option>
              ))}
            </select>
            
            {/* Credits Dropdown */}
            <select 
              value={course.credits}
              onChange={(e) => handleUpdate(course.id, "credits", e.target.value)}
              className="flex-1 bg-transparent px-3 md:px-5 py-3.5 text-slate-700 font-medium outline-none cursor-pointer text-sm"
            >
              <option value="" disabled>Credits</option>
              {creditOptions.map(credit => (
                <option key={credit} value={credit}>{credit} Credits</option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex justify-between items-center pt-2 mb-6">
          <button 
            type="button" 
            onClick={addCourse}
            className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Course
          </button>
          
          <button 
            type="button" 
            onClick={resetForm}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>

        {/* Result Banner (Placed where the Advertisement box was in your image) */}
        {result !== null && (
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6 text-center shadow-sm mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-sm font-bold text-indigo-500 tracking-widest uppercase mb-1">Your Calculated GPA</p>
            <h2 className="text-4xl font-black text-indigo-900">{result}</h2>
          </div>
        )}

        {/* Big Submit Button */}
        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl text-[15px] shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" /> Calculate GPA
        </button>
      </form>
    </div>
  );
};

export default Cgpa;