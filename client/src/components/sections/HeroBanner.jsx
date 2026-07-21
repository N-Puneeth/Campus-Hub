const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#F4F6FF] to-[#F1F0FF] p-6 md:p-8 border border-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-center min-h-[140px] md:min-h-[180px]">
      
      {/* Illustration Image */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <img 
          src="/campus-illustration.png" 
          alt="Campus Building" 
          className="h-full max-h-[130px] md:max-h-[160px] w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default HeroBanner;