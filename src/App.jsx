import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import Card from './Card';

const cardsData = [
  {
    id: 1,
    subtitle: "The Experience",
    title: "About Tryst",
    description: "Tryst is more than a cultural festival; it's an emotion. It is an experience crafted for performers, artists, and everyone looking to break away from the mundane. Join us at the Keshav Mahavidyalaya Campus, Delhi University, to witness the spectacular.",
    details: [
      { icon: <MapPin className="w-5 h-5 text-vibrant-yellow" />, text: "Keshav Mahavidyalaya Campus, DU" }
    ]
  },
  {
    id: 2,
    subtitle: "The Lineup",
    title: "Spectacular Events",
    description: "From the mesmerizing moves in Inaayat (Western Group Dance) to the intense dramatics of Baithak (Street Play), Vagmita Debsoc debates, and soulful Anhad (A-Cappella) melodies, experience art in all forms.",
    details: [
      { icon: <Clock className="w-5 h-5 text-vibrant-yellow" />, text: "10:00 AM – 10:00 PM" },
      { icon: <Calendar className="w-5 h-5 text-vibrant-yellow" />, text: "Multiple Stages" }
    ]
  },
  {
    id: 3,
    subtitle: "Main Stage",
    title: "Surprise Artist",
    description: "Our April 22nd headliner is a mystery waiting to be unraveled. Prepare for an unforgettable evening as our surprise artist takes over the Main Stage. You won't want to miss this beat.",
    details: [
      { icon: <Calendar className="w-5 h-5 text-vibrant-yellow" />, text: "April 22nd" },
      { icon: <Clock className="w-5 h-5 text-vibrant-yellow" />, text: "5:00 PM Onwards" }
    ]
  },
  {
    id: 4,
    subtitle: "Our Legacy",
    title: "Past Glory",
    description: "A testament to our roaring success, featuring past highlights like En Vogue, Rage, and electrifying performances by celebrated artists such as B Praak, Jassie Gill, and Milind Gaba.",
    details: [
      { icon: <ArrowRight className="w-5 h-5 text-vibrant-yellow" />, text: "Join the legacy" }
    ]
  },
  {
    id: 5,
    subtitle: "Join Us",
    title: "Registrations",
    description: "Step into the spotlight. Secure your spot for exclusive workshops, flagship competitions, and endless celebration. Early registrations are open now.",
    details: [
      { icon: <ArrowRight className="w-5 h-5 text-vibrant-yellow" />, text: "Register Portal" }
    ]
  },
  {
    id: 6,
    subtitle: "Connect",
    title: "Support & Queries",
    description: "Have questions? We've got answers. Whether it's about the technical aspects of participation or general inquiries, we are here to assist you to ensure a smooth fest experience.",
    details: [
      { icon: <MapPin className="w-5 h-5 text-vibrant-yellow" />, text: "Tech Support" },
      { icon: <MapPin className="w-5 h-5 text-vibrant-yellow" />, text: "General Inquiries" }
    ]
  }
];

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const scrollRef = useRef(null);
  const [targetScroll, setTargetScroll] = useState(0);
  const scrollAnimRef = useRef(null);

  // Smooth Inertia Scroll Logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Initialize targetScroll with the current scrollLeft to prevent initial jump
    setTargetScroll(el.scrollLeft);

    const handleWheel = (e) => {
      // Don't intercept if modal is open or if spinning over a nested scroll
      if (selectedId) return;
      
      e.preventDefault();
      // Increase target distance based on wheel delta
      setTargetScroll((prev) => Math.max(0, Math.min(prev + e.deltaY * 3 + e.deltaX * 3, el.scrollWidth - el.clientWidth)));
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [selectedId]);

  // Request Animation Frame for smooth lerp scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || selectedId) return;

    const smoothScroll = () => {
      // simple lerp (linear interpolation)
      el.scrollLeft += (targetScroll - el.scrollLeft) * 0.08;
      scrollAnimRef.current = requestAnimationFrame(smoothScroll);
    };
    
    scrollAnimRef.current = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(scrollAnimRef.current);
  }, [targetScroll, selectedId]);


  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [selectedId]);

  const selectedData = cardsData.find((c) => c.id === selectedId);

  return (
    <div className="min-h-screen bg-[#001529] text-white overflow-hidden relative font-sans selection:bg-vibrant-yellow selection:text-electric-blue">
      
      {/* SPICY: Animated Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-20 mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

      {/* SPICY: Giant Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ x: [-100, 100, -100], y: [-50, 150, -50], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-vibrant-yellow/10 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen" 
        />
        <motion.div 
          animate={{ x: [100, -100, 100], y: [100, -100, 100], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-[#0066cc]/20 rounded-full blur-[100px] md:blur-[180px] mix-blend-screen" 
        />
      </div>

      {/* SPICY: Parallax Background Marquee */}
      <div className="fixed top-1/2 left-0 -translate-y-1/2 w-full whitespace-nowrap pointer-events-none z-0 opacity-5 select-none">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="text-[15vw] font-black tracking-tighter"
        >
          TRYST 2026 KESHAV MAHAVIDYALAYA TRYST 2026 KESHAV MAHAVIDYALAYA
        </motion.div>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-8 md:px-12 z-20 flex justify-between items-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          <Sparkles className="w-8 h-8 text-vibrant-yellow animate-pulse" />
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase" style={{ textShadow: '0 0 40px rgba(255,215,0,0.3)'}}>
            Tryst <span className="text-vibrant-yellow">2026</span>
          </h1>
        </motion.div>
        <div className="hidden md:flex gap-8 text-sm font-bold tracking-[0.2em] uppercase text-vibrant-yellow mix-blend-screen px-6 py-3 rounded-full border border-vibrant-yellow/30 bg-electric-blue/50 backdrop-blur-md">
          <span>April 21-23</span>
          <span className="w-1 h-1 rounded-full bg-vibrant-yellow self-center"></span>
          <span>Delhi University</span>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      {/* Removed snap-x snap-mandatory for smooth scrolling */}
      <main 
        ref={scrollRef}
        className="w-full h-[100dvh] flex items-center overflow-x-auto overflow-y-hidden hide-scroll z-10 relative px-[10vw] pt-12 pb-12 cursor-grab active:cursor-grabbing"
      >
        {/* We use a wide container to allow items to space out. Re-added spacing */}
        <div className="flex gap-12 md:gap-24 items-center flex-nowrap pr-[30vw] h-full origin-left">
          {cardsData.map((card, i) => (
            <motion.div 
              key={card.id} 
              className="flex items-center h-full relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, ease: 'easeOut', duration: 0.8 }}
            >
              <Card 
                data={card} 
                isSelected={selectedId === card.id} 
                onClick={setSelectedId} 
              />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedId && selectedData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-[#001529]/80 pointer-events-auto"
              onClick={() => setSelectedId(null)}
            />
            
            <motion.div 
              layoutId={`card-container-${selectedData.id}`}
              className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] bg-[#002244] rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,51,102,0.8)] z-10 pointer-events-auto flex flex-col md:flex-row border border-vibrant-yellow/10"
            >
              {/* Image / Graphic Half */}
              <motion.div layoutId={`card-image-${selectedData.id}`} className="w-full md:w-5/12 h-64 md:h-full relative flex-shrink-0 bg-gradient-to-br from-electric-blue to-black overflow-hidden">
                {/* Dynamically generating spicy abstract placeholder */}
                <div className="absolute inset-0 opacity-40 mix-blend-color-dodge">
                    <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[80px] bg-vibrant-yellow`}></div>
                    <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full blur-[60px] bg-blue-500"></div>
                </div>
                
                {/* Mesh grid overlay */}
                <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
                
                {/* Giant ID Number */}
                <div className="absolute bottom-4 right-4 text-[12rem] font-black tracking-tighter text-white/5 leading-none select-none pointer-events-none">
                  0{selectedData.id}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#002244] via-transparent to-transparent z-10" />
              </motion.div>

              {/* Content Half */}
              <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-[#002244] relative z-20 rounded-t-3xl md:rounded-none overflow-y-auto hide-scroll">
                <motion.div layoutId={`card-content-${selectedData.id}`} className="flex flex-col h-full justify-center">
                  <motion.p layoutId={`subtitle-${selectedData.id}`} className="text-vibrant-yellow font-inter text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4">
                    {selectedData.subtitle}
                  </motion.p>
                  <motion.h2 layoutId={`title-${selectedData.id}`} className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                    {selectedData.title}
                  </motion.h2>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                    className="space-y-8 flex-grow"
                  >
                    <p className="text-blue-100/80 font-inter text-lg md:text-2xl leading-relaxed font-light">
                      {selectedData.description}
                    </p>

                    <div className="pt-8 space-y-5 border-t border-white/10 inline-block w-full">
                      {selectedData.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-6 text-white group">
                          <div className="p-4 bg-vibrant-yellow/10 rounded-2xl border border-vibrant-yellow/20 text-vibrant-yellow shadow-[0_0_15px_rgba(255,215,0,0.1)] group-hover:scale-110 group-hover:bg-vibrant-yellow/20 transition-all">
                              {detail.icon}
                          </div>
                          <span className="font-semibold text-xl tracking-wide">{detail.text}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Action Button */}
                    <div className="pt-10">
                       <button className="relative overflow-hidden bg-vibrant-yellow text-electric-blue font-black tracking-widest uppercase py-5 px-10 rounded-full shadow-[0_0_40px_rgba(255,215,0,0.3)] hover:shadow-[0_0_60px_rgba(255,215,0,0.5)] transition-all flex items-center justify-center gap-3 group w-full md:w-auto">
                          <span className="relative z-10">Explore More</span>
                          <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
                          <div className="absolute inset-0 bg-white/40 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0 skew-x-12"></div>
                       </button>
                    </div>
                  </motion.div>
                </motion.div>

                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/5 hover:bg-white/20 p-4 rounded-full text-white transition-all backdrop-blur-md border border-white/10 hover:scale-110 hover:rotate-90 z-30"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
