import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ data, isSelected, onClick }) => {
  return (
    <motion.div
      layoutId={`card-${data.id}`}
      onClick={() => onClick(data.id)}
      className={`relative rounded-3xl overflow-hidden cursor-pointer group flex-shrink-0 transition-all duration-500 ease-out border border-white/10 ${
        isSelected ? 'opacity-0 z-0' : 'opacity-100 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] hover:-translate-y-2 z-10'
      }`}
      style={{
        width: 'min(85vw, 400px)',
        height: 'min(113vw, 533px)' // 3:4 aspect ratio -> 400 * 4/3 = 533
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-electric-blue/95 via-electric-blue/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80" />
      <img 
        src={data.image} 
        alt={data.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
      />
      
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
        <motion.p layoutId={`subtitle-${data.id}`} className="text-vibrant-yellow font-inter text-sm md:text-xs tracking-[0.2em] font-bold uppercase mb-3 drop-shadow-md">
          {data.subtitle}
        </motion.p>
        <motion.h2 layoutId={`title-${data.id}`} className="text-3xl md:text-3xl font-extrabold text-white leading-none drop-shadow-lg font-sans">
          {data.title}
        </motion.h2>
        
        {/* Hover Read More line */}
        <div className="overflow-hidden mt-0 group-hover:mt-4 transition-all duration-300 ease-in-out sm:h-0 sm:group-hover:h-8 h-8 opacity-50 sm:opacity-0 group-hover:opacity-100 flex items-center gap-2">
           <span className="text-sm font-semibold text-white/90">Click to expand</span>
           <div className="w-8 h-[1px] bg-vibrant-yellow"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
