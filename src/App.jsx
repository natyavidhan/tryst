import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import Card from './Card';

const cardsData = [
  {
    id: 1,
    subtitle: "The Experience",
    title: "About Tryst",
    description: "Tryst is more than a cultural festival; it's an emotion. It is an experience crafted for performers, artists, and everyone looking to break away from the mundane. Join us at the Keshav Mahavidyalaya Campus, Delhi University, to witness the spectacular.",
    image: "./images/campus.png",
    details: [
      { icon: <MapPin className="w-5 h-5 text-[#d4af37]" />, text: "Keshav Mahavidyalaya Campus, DU" }
    ]
  },
  {
    id: 2,
    subtitle: "The Lineup",
    title: "Spectacular Events",
    description: "From the mesmerizing moves in Inaayat (Western Group Dance) to the intense dramatics of Baithak (Street Play), Vagmita Debsoc debates, and soulful Anhad (A-Cappella) melodies, experience art in all forms.",
    image: "./images/stage.png",
    details: [
      { icon: <Clock className="w-5 h-5 text-[#d4af37]" />, text: "10:00 AM – 10:00 PM" },
      { icon: <Calendar className="w-5 h-5 text-[#d4af37]" />, text: "Multiple Stages" }
    ]
  },
  {
    id: 3,
    subtitle: "Main Stage",
    title: "Surprise Artist",
    description: "Our April 22nd headliner is a mystery waiting to be unraveled. Prepare for an unforgettable evening as our surprise artist takes over the Main Stage. You won't want to miss this beat.",
    image: "./images/artist.png",
    details: [
      { icon: <Calendar className="w-5 h-5 text-[#d4af37]" />, text: "April 22nd" },
      { icon: <Clock className="w-5 h-5 text-[#d4af37]" />, text: "5:00 PM Onwards" }
    ]
  },
  {
    id: 4,
    subtitle: "Our Legacy",
    title: "Past Glory",
    description: "A testament to our roaring success, featuring past highlights like En Vogue, Rage, and electrifying performances by celebrated artists such as B Praak, Jassie Gill, and Milind Gaba.",
    image: "./images/crowd.png",
    details: [
      { icon: <ArrowRight className="w-5 h-5 text-[#d4af37]" />, text: "Join the legacy" }
    ]
  },
  {
    id: 5,
    subtitle: "Join Us",
    title: "Registrations",
    description: "Step into the spotlight. Secure your spot for exclusive workshops, flagship competitions, and endless celebration. Early registrations are open now.",
    image: "./images/entry.png",
    details: [
      { icon: <ArrowRight className="w-5 h-5 text-[#d4af37]" />, text: "Register Portal" }
    ]
  },
  {
    id: 6,
    subtitle: "Connect",
    title: "Support & Queries",
    description: "Have questions? We've got answers. Whether it's about the technical aspects of participation or general inquiries, we are here to assist you to ensure a smooth fest experience.",
    image: "./images/support.png",
    details: [
      { icon: <MapPin className="w-5 h-5 text-[#d4af37]" />, text: "Tech Support" },
      { icon: <MapPin className="w-5 h-5 text-[#d4af37]" />, text: "General Inquiries" }
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

    setTargetScroll(el.scrollLeft);

    const handleWheel = (e) => {
      if (selectedId) return;
      e.preventDefault();
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
    <div className="min-h-screen bg-[#fdfbf7] text-[#1e3a8a] overflow-hidden relative font-sans selection:bg-[#1e3a8a] selection:text-[#fdfbf7]">
      
      {/* SPICY: Subtle Impressionist Background Image */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply filter contrast-75 brightness-110"
        style={{
          backgroundImage: 'url("./images/bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* SPICY: Animated Noise Overlay - Light Mode Mix */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.06] mix-blend-multiply" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

      {/* SPICY: Giant Floating Orbs - Light Mode Starry Night Palette */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ x: [-100, 100, -100], y: [-50, 150, -50], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-[#d4af37]/20 rounded-full blur-[100px] md:blur-[150px] mix-blend-multiply" 
        />
        <motion.div 
          animate={{ x: [100, -100, 100], y: [100, -100, 100], rotate: [0, -90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] bg-[#0891b2]/15 rounded-full blur-[100px] md:blur-[180px] mix-blend-multiply" 
        />
      </div>

      {/* SPICY: Parallax Background Marquee - Very subtle light theme overlay */}
      <div className="fixed top-1/2 left-0 -translate-y-1/2 w-full whitespace-nowrap pointer-events-none z-0 opacity-[0.03] select-none">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="text-[15vw] font-black tracking-tighter text-[#1e3a8a]"
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
          <Sparkles className="w-8 h-8 text-[#d4af37] animate-pulse" />
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-[#1e3a8a] uppercase drop-shadow-sm">
            Tryst <span className="text-[#d4af37]">2026</span>
          </h1>
        </motion.div>
        <div className="hidden md:flex gap-8 text-sm font-bold tracking-[0.2em] uppercase text-[#1e3a8a] px-6 py-3 rounded-full border border-[#1e3a8a]/10 bg-white/70 backdrop-blur-md shadow-sm">
          <span>April 21-23</span>
          <span className="w-1 h-1 rounded-full bg-[#d4af37] self-center"></span>
          <span>Delhi University</span>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <main 
        ref={scrollRef}
        className="w-full h-[100dvh] flex items-center overflow-x-auto overflow-y-hidden hide-scroll z-10 relative px-[10vw] pt-12 pb-12 cursor-grab active:cursor-grabbing"
      >
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

      {/* Full Screen Modal - Light Mode Starry Palette */}
      <AnimatePresence>
        {selectedId && selectedData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-[#fdfbf7]/80 pointer-events-auto"
              onClick={() => setSelectedId(null)}
            />
            
            <motion.div 
              layoutId={`card-container-${selectedData.id}`}
              className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] bg-[#fdfbf7] rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(30,58,138,0.2)] z-10 pointer-events-auto flex flex-col md:flex-row border border-[#1e3a8a]/10"
            >
              {/* Image Half */}
              <motion.div layoutId={`card-image-${selectedData.id}`} className="w-full md:w-5/12 h-64 md:h-full relative flex-shrink-0 bg-[#f0f6ff] overflow-hidden">
                <img src={selectedData.image} alt={selectedData.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#fdfbf7] via-[#fdfbf7]/80 to-transparent z-10" />
              </motion.div>

              {/* Content Half */}
              <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-[#fdfbf7] relative z-20 rounded-t-3xl md:rounded-none overflow-y-auto hide-scroll">
                <motion.div layoutId={`card-content-${selectedData.id}`} className="flex flex-col h-full justify-center">
                  <motion.p layoutId={`subtitle-${selectedData.id}`} className="text-[#a18218] font-inter text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4 drop-shadow-sm">
                    {selectedData.subtitle}
                  </motion.p>
                  <motion.h2 layoutId={`title-${selectedData.id}`} className="text-4xl md:text-7xl font-black text-[#1e3a8a] mb-8 leading-[1.1] tracking-tight">
                    {selectedData.title}
                  </motion.h2>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                    className="space-y-8 flex-grow"
                  >
                    <p className="text-[#1e3a8a]/80 font-inter text-lg md:text-2xl leading-relaxed font-light">
                      {selectedData.description}
                    </p>

                    <div className="pt-8 space-y-5 border-t border-[#1e3a8a]/10 inline-block w-full">
                      {selectedData.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-6 text-[#1e3a8a] group">
                          <div className="p-4 bg-[#f0f6ff] rounded-2xl border border-[#1e3a8a]/5 shadow-sm group-hover:scale-110 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/30 transition-all">
                              {detail.icon}
                          </div>
                          <span className="font-semibold text-xl tracking-wide">{detail.text}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Action Button - Primary CTA */}
                    <div className="pt-10">
                       <button className="relative overflow-hidden bg-[#1e3a8a] text-white font-black tracking-widest uppercase py-5 px-10 rounded-full shadow-[0_10px_30px_rgba(30,58,138,0.25)] hover:shadow-[0_20px_40px_rgba(30,58,138,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group w-full md:w-auto">
                          <span className="relative z-10">Explore More</span>
                          <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform text-[#d4af37]" />
                          <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0 skew-x-12"></div>
                       </button>
                    </div>
                  </motion.div>
                </motion.div>

                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 md:top-10 md:right-10 bg-white hover:bg-gray-50 p-4 rounded-full text-[#1e3a8a] transition-all shadow-[0_5px_15px_rgba(0,0,0,0.08)] border border-gray-200 hover:scale-110 hover:rotate-90 z-30"
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
