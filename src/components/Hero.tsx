import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToReservation = () => {
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Overlay gradient for text readability - fading seamlessly to transparent to avoid harsh lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory/80 to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-4 justify-center">
            <div className="h-[1px] w-8 md:w-12 bg-maroon/40" />
            <h2 className="text-maroon tracking-[0.25em] uppercase text-[10px] md:text-sm font-semibold">
              Authentic Vegetarian Delights
            </h2>
            <div className="h-[1px] w-8 md:w-12 bg-maroon/40" />
          </div>
          
          <div className="inline-flex items-center bg-saffron/10 border border-saffron/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm shadow-sm">
            <p className="text-maroon-dark text-xs md:text-sm font-medium tracking-wide">
              * Jain Friendly: No Onion, No Garlic upon request
            </p>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] text-maroon-dark tracking-tight mb-4 drop-shadow-sm leading-none"
        >
          Kesar
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="text-lg md:text-2xl text-maroon/80 font-serif italic mb-8 max-w-2xl"
        >
          A Full Flavour Inside. <br className="hidden md:inline" /> Authentic flavors crafted for you.
        </motion.p>

        {/* Rating badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex items-center gap-1 sm:gap-2 mb-10 text-charcoal/80 bg-white/60 px-4 sm:px-5 py-2.5 rounded-full border border-gold/40 shadow-sm backdrop-blur"
        >
          <span className="text-yellow-500 font-bold text-base sm:text-lg">★ 4.2</span>
          <span className="text-[10px] sm:text-sm font-medium uppercase tracking-widest text-charcoal/70">| Based on 740+ Reviews</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none justify-center items-center"
        >
          <button 
            onClick={scrollToReservation}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-maroon text-ivory font-semibold tracking-wide uppercase text-sm border-2 border-maroon hover:bg-maroon-dark hover:border-maroon-dark transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Book a Table
          </button>
          <button 
            onClick={scrollToMenu}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/50 backdrop-blur text-maroon font-semibold tracking-wide uppercase text-sm border-2 border-maroon hover:bg-maroon hover:text-ivory transition-all duration-300 rounded-xl inline-flex items-center justify-center cursor-pointer"
          >
            Explore Menu
          </button>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 z-10 cursor-pointer text-maroon hover:text-saffron transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={scrollToMenu}
      >
        <ChevronDown size={32} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
