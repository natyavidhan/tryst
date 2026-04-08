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

  // Spicy Placeholder Generator based on Card ID
  const renderPlaceholder = () => {
    const isEven = data.id % 2 === 0;
    const hue = data.id * 40;
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#001b33]">
        {/* Base Gradient abstract */}
        <div 
          className="absolute inset-0 opacity-60 mix-blend-screen transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-3"
          style={{
            background: `radial-gradient(circle at ${isEven ? '0% 0%' : '100% 100%'}, hsl(${hue}, 80%, 50%) 0%, transparent 70%),
                         radial-gradient(circle at ${isEven ? '100% 0%' : '0% 100%'}, #FFD700 0%, transparent 60%)`
          }}
        />
        {/* Dynamic Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: isEven 
              ? `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 16px)`
              : `radial-gradient(circle, #fff 2px, transparent 2px)`,
            backgroundSize: isEven ? 'auto' : '24px 24px'
          }}
        />
        {/* Large ID Graphic */}
        <div className="absolute -bottom-10 -left-10 text-[15rem] font-black text-white/5 tracking-tighter leading-none group-hover:-translate-y-4 group-hover:text-white/10 transition-all duration-700">
          0{data.id}
        </div>
      </div>
    );
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
      {/* Glow Effect Element */}
      <div className="absolute -inset-[2px] bg-gradient-to-b from-vibrant-yellow/50 to-electric-blue/10 rounded-[2.1rem] blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

      {/* Main Card Content */}
      <motion.div 
        className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 bg-[#002244] shadow-2xl z-10"
        style={{ transform: 'translateZ(20px)' }} // 3D Pop internal element
      >
        <motion.div layoutId={`card-image-${data.id}`} className="absolute inset-0">
          {renderPlaceholder()}
        </motion.div>
        
        {/* Heavy Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001122] via-[#001122]/60 to-transparent z-10" />
        
        {/* Content Container */}
        <motion.div 
          layoutId={`card-content-${data.id}`}
          className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-10"
        >
          <motion.p layoutId={`subtitle-${data.id}`} className="text-vibrant-yellow font-inter text-xs md:text-sm tracking-[0.3em] font-black uppercase mb-3 drop-shadow-md">
            {data.subtitle}
          </motion.p>
          <motion.h2 layoutId={`title-${data.id}`} className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-2 tracking-tight group-hover:text-vibrant-yellow transition-colors duration-500">
            {data.title}
          </motion.h2>
          
          {/* Detailed Read More animated bar */}
          <div className="overflow-hidden h-0 group-hover:h-12 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 flex items-center gap-3 mt-4">
             <div className="w-10 h-[2px] bg-vibrant-yellow"></div>
             <span className="text-xs uppercase tracking-widest font-bold text-vibrant-yellow">Uncover More</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
