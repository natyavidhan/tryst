import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Card from './Card';

const cardsData = [
  {
    id: 1,
    subtitle: "The Experience",
    title: "About Tryst",
    description: "Tryst is more than a cultural festival; it's an emotion. It is an experience crafted for performers, artists, and everyone looking to break away from the mundane. Join us at the Keshav Mahavidyalaya Campus, Delhi University, to witness the spectacular.",
    image: "https://images.unsplash.com/photo-1540039155732-d674140af310?auto=format&fit=crop&q=80&w=1920",
    details: [
      { icon: <MapPin className="w-5 h-5 text-vibrant-yellow" />, text: "Keshav Mahavidyalaya Campus, DU" }
    ]
  },
  {
    id: 2,
    subtitle: "The Lineup",
    title: "Spectacular Events",
    description: "From the mesmerizing moves in Inaayat (Western Group Dance) to the intense dramatics of Baithak (Street Play), Vagmita Debsoc debates, and soulful Anhad (A-Cappella) melodies, experience art in all forms.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1920",
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
    image: "https://images.unsplash.com/photo-1470229722913-7c092bbcde5f?auto=format&fit=crop&q=80&w=1920",
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
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1920",
    details: [
      { icon: <ArrowRight className="w-5 h-5 text-vibrant-yellow" />, text: "Join the legacy" }
    ]
  },
  {
    id: 5,
    subtitle: "Join Us",
    title: "Registrations",
    description: "Step into the spotlight. Secure your spot for exclusive workshops, flagship competitions, and endless celebration. Early registrations are open now.",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=1920",
    details: [
      { icon: <ArrowRight className="w-5 h-5 text-vibrant-yellow" />, text: "Register Portal" }
    ]
  },
  {
    id: 6,
    subtitle: "Connect",
    title: "Support & Queries",
    description: "Have questions? We've got answers. Whether it's about the technical aspects of participation or general inquiries, we are here to assist you to ensure a smooth fest experience.",
    image: "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?auto=format&fit=crop&q=80&w=1920",
    details: [
      { icon: <MapPin className="w-5 h-5 text-vibrant-yellow" />, text: "Tech Support" },
      { icon: <MapPin className="w-5 h-5 text-vibrant-yellow" />, text: "General Inquiries" }
    ]
  }
];

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      
      // Block standard vertical scroll and apply it to horizontal scroll
      // but only if the modal is not open
      if (!selectedId) {
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 1.5,
          behavior: 'instant'
        });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [selectedId]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedId]);

  const selectedData = cardsData.find((c) => c.id === selectedId);

  return (
    <div className="min-h-screen bg-electric-blue text-white overflow-hidden relative font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-vibrant-yellow/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-8 md:px-16 z-10 flex justify-between items-center pointer-events-none">
        <h1 className="text-3xl font-extrabold tracking-widest text-white uppercase pointer-events-auto backdrop-blur-sm bg-electric-blue/30 px-4 py-2 rounded-lg mix-blend-screen">
          Tryst <span className="text-vibrant-yellow">2026</span>
        </h1>
        <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wider uppercase opacity-80 backdrop-blur-sm bg-electric-blue/30 px-6 py-3 rounded-xl border border-white/10">
          <span>April 21-23</span>
          <span>Delhi University</span>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <main 
        ref={scrollRef}
        className="w-full h-screen flex items-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scroll z-10 relative px-[5vw] md:px-[10vw] overscroll-x-contain"
      >
        <div className="flex gap-8 md:gap-16 items-center flex-nowrap py-16 pr-[20vw] h-full">
          {cardsData.map((card) => (
            <div key={card.id} className="snap-center flex items-center h-full">
              <Card 
                data={card} 
                isSelected={selectedId === card.id} 
                onClick={setSelectedId} 
              />
            </div>
          ))}
        </div>
      </main>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedId && selectedData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-electric-blue/90 backdrop-blur-md pointer-events-auto"
              onClick={() => setSelectedId(null)}
            />
            
            <motion.div 
              layoutId={`card-${selectedData.id}`}
              className="relative w-full max-w-6xl h-[90vh] md:h-[80vh] bg-electric-blue rounded-3xl overflow-y-auto md:overflow-hidden shadow-2xl z-10 pointer-events-auto mx-4 md:mx-auto flex flex-col md:flex-row border border-white/10 hide-scroll"
            >
              <div className="w-full md:w-5/12 h-64 md:h-full relative flex-shrink-0">
                <img src={selectedData.image} alt={selectedData.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-electric-blue to-transparent md:to-electric-blue/20" />
              </div>

              <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-electric-blue/50 md:bg-transparent -mt-6 md:mt-0 relative z-10 rounded-t-3xl md:rounded-none">
                <motion.p layoutId={`subtitle-${selectedData.id}`} className="text-vibrant-yellow font-inter text-sm md:text-base font-semibold tracking-wider uppercase mb-4">
                  {selectedData.subtitle}
                </motion.p>
                <motion.h2 layoutId={`title-${selectedData.id}`} className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
                  {selectedData.title}
                </motion.h2>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="space-y-6 flex-grow"
                >
                  <p className="text-gray-300 font-inter text-lg md:text-xl leading-relaxed">
                    {selectedData.description}
                  </p>

                  <div className="pt-8 space-y-4 border-t border-white/10 inline-block w-full">
                    {selectedData.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-white/90">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/5 shadow-inner">
                            {detail.icon}
                        </div>
                        <span className="font-medium text-lg leading-none">{detail.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Action Button */}
                  <div className="pt-8">
                     <button className="bg-vibrant-yellow hover:bg-vibrant-yellow/90 text-electric-blue font-bold tracking-wider uppercase py-4 px-8 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all flex items-center justify-center gap-2 group w-full md:w-auto">
                        <span>Explore More</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                     </button>
                  </div>
                </motion.div>

                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 md:top-8 md:right-8 bg-black/40 hover:bg-black/70 p-3 rounded-full text-white transition-colors backdrop-blur-md border border-white/10"
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
