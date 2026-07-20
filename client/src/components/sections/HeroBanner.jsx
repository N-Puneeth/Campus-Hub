const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#F4F6FF] to-[#F1F0FF] p-6 md:p-8 border border-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-between min-h-[140px] md:min-h-[180px]">
      
      {/* Text Content */}
      <div className="relative z-10 w-full md:w-2/3">
        <p className="text-xs md:text-sm text-slate-500 font-semibold mb-1 md:mb-2 tracking-wide">Stay organized. Stay informed.</p>
        <h2 className="text-xl md:text-3xl font-bold text-slate-900 leading-tight">
          Make the most of<br className="md:hidden" /> your campus life.
        </h2>
      </div>
      
      {/* Illustration Image */}
      <div className="absolute right-0 bottom-0 h-full w-2/3 md:w-1/2 flex justify-end overflow-hidden rounded-br-[2rem]">
        <img 
          src="/campus-illustration.png" 
          alt="Campus Building" 
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
    </div>
  );
};

export default HeroBanner;