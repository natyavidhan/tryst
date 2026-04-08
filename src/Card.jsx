import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Card = ({ data, isSelected, onClick }) => {
  const cardRef = useRef(null);

  // 3D Tilt Effect Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isSelected) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layoutId={`card-container-${data.id}`}
      onClick={() => onClick(data.id)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        width: 'min(80vw, 420px)',
        height: 'min(110vw, 580px)' 
      }}
      className={`relative rounded-[2rem] cursor-pointer group flex-shrink-0 transition-opacity duration-300 ${
        isSelected ? 'opacity-0 z-0' : 'opacity-100 z-10'
      }`}
    >
      {/* Light Mode Glow Effect referencing Gold/Cyan */}
      <div className="absolute -inset-[2px] bg-gradient-to-br from-[#d4af37]/40 via-[#0891b2]/20 to-[#1e3a8a]/20 rounded-[2.1rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

      {/* Main Card Content */}
      <motion.div 
        className="absolute inset-0 rounded-[2rem] overflow-hidden border border-[#1e3a8a]/10 bg-white shadow-[0_20px_40px_rgba(30,58,138,0.08)] group-hover:shadow-[0_40px_80px_rgba(30,58,138,0.2)] transition-shadow duration-500 z-10"
        style={{ transform: 'translateZ(20px)' }} // 3D Pop internal element
      >
        <motion.div layoutId={`card-image-${data.id}`} className="absolute inset-0 overflow-hidden bg-[#f0f6ff]">
          <img 
            src={data.image} 
            alt={data.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
          />
        </motion.div>
        
        {/* Top Vignette so dark blue text reads well over the starry skies */}
        <div className="absolute inset-0 h-[60%] bg-gradient-to-b from-[#fdfbf7] via-[#fdfbf7]/80 to-transparent z-10 pointer-events-none" />

        {/* Content Container */}
        <motion.div 
          layoutId={`card-content-${data.id}`}
          className="absolute inset-0 z-20 flex flex-col justify-start p-8 md:p-10 pointer-events-none"
        >
          {/* Accent Gold Text */}
          <motion.p layoutId={`subtitle-${data.id}`} className="text-[#a18218] font-inter text-xs md:text-sm tracking-[0.3em] font-black uppercase mb-3 drop-shadow-sm">
            {data.subtitle}
          </motion.p>
          <motion.h2 layoutId={`title-${data.id}`} className="text-4xl md:text-5xl font-black text-[#1e3a8a] leading-[1.1] tracking-tight group-hover:text-[#0891b2] transition-colors duration-500">
            {data.title}
          </motion.h2>
          
          {/* Detailed Read More animated bar */}
          <div className="overflow-hidden h-0 group-hover:h-10 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 flex items-center gap-3 mt-4">
             <div className="w-10 h-[2px] bg-[#d4af37]"></div>
             <span className="text-xs uppercase tracking-widest font-bold text-[#1e3a8a]">Uncover More</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
