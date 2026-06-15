import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react';

export function Story() {
  return (
    <section id="story" className="py-24 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-saffron-dark tracking-[0.2em] uppercase text-sm font-semibold">Our Heritage</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-maroon leading-tight">
              A Legacy of Royal Spices in Ashok Vihar
            </h3>
            <p className="text-charcoal/80 leading-relaxed text-lg pt-4">
              At Kesar, we don't just serve food; we serve history. Inspired by the opulent kitchens of royal Indian courts, our master chefs blend generations-old recipes with contemporary finesse to offer a pure vegetarian delight.
            </p>
            <p className="text-charcoal/80 leading-relaxed text-lg pb-4">
              Every dish features hand-pounded spices, pure saffron sourced directly, and seasonal ingredients. From our highly celebrated Dal Makhani to our exquisite Kesari Phirni, every bite ensures an authentic, soulful dining experience.
            </p>
            
            <a 
              href="https://maps.app.goo.gl/ffZCxRTwzuAh9Mnr5?g_st=ac" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border border-maroon text-maroon hover:bg-maroon hover:text-ivory transition-all duration-300 rounded-xl uppercase tracking-wider text-sm font-semibold shadow-sm hover:shadow-md"
            >
              <MapPin size={18} />
              Visit Us Today
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gradient-to-tr from-saffron/20 to-gold/20 rounded-t-full border border-saffron/30 p-2 shadow-lg">
              <div className="w-full h-full bg-ivory-dark rounded-t-full overflow-hidden relative group">
                <img 
                  src="/images/rest.jpeg" 
                  alt="Restaurant interior" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                  onError={(e) => {
                    // Fallback to placeholder if user hasn't uploaded it yet
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/20 via-transparent to-transparent opacity-80" />
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-2 -right-2 md:-bottom-6 md:-left-6 bg-ivory border border-saffron-dark p-4 md:p-6 rounded-full shadow-xl shrink-0 h-28 w-28 md:h-40 md:w-40 flex flex-col items-center justify-center text-center animate-spin-slow" style={{ animationDuration: '20s' }}>
              <div className="font-serif text-maroon text-xl md:text-2xl">Full</div>
              <div className="font-sans text-charcoal tracking-widest mt-0 md:mt-1 uppercase text-[10px] md:text-sm">Flavour</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ivory-dark/80 backdrop-blur-md border-t border-gold/40 pt-16 pb-8 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
        
        <div>
          <h3 className="font-serif text-3xl text-maroon mb-6">Kesar</h3>
          <p className="text-charcoal/70 text-sm max-w-xs mx-auto md:mx-0 leading-relaxed">
            Experience the symphony of royal Indian flavors in an ambiance crafted for comfortable family dining and social celebrations.
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-saffron-dark tracking-widest uppercase text-sm mb-6 font-semibold">Contact & Location</h4>
          <ul className="space-y-4 text-charcoal/80 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-saffron shrink-0 mt-1" />
              <a href="https://maps.app.goo.gl/ffZCxRTwzuAh9Mnr5?g_st=ac" className="hover:text-maroon transition-colors line-clamp-3 text-left">
                11, Local Shopping Complex, Near Satyawati College Rd, Phase 2, Ashok Vihar, New Delhi 110052
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-saffron shrink-0" />
              <a href="tel:+919717816600" className="hover:text-maroon transition-colors">+91 97178 16600</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-saffron shrink-0" />
              <a href="tel:+919717815500" className="hover:text-maroon transition-colors">+91 97178 15500</a>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-saffron-dark tracking-widest uppercase text-sm mb-6 font-semibold">Operating Hours</h4>
          <ul className="space-y-4 text-charcoal/80 text-sm">
            <li className="flex items-center gap-3">
              <Clock size={16} className="text-saffron shrink-0" />
              <span>Mon - Sun: 11:45 AM - 11:45 PM</span>
            </li>
            <li className="flex items-start gap-3 mt-4 text-left">
              <p className="text-xs text-charcoal/50 italic max-w-[200px]">
                * Weekend reservations highly recommended. Options for groups of 50-60 available.
              </p>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs text-center md:text-left">
          &copy; {new Date().getFullYear()} Kesar Restaurant. All Rights Reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-saffron hover:text-maroon transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-saffron hover:text-maroon transition-colors"><Facebook size={20} /></a>
        </div>
      </div>
    </footer>
  );
}
