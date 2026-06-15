import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2 } from 'lucide-react';

const ZONES = [
  { id: 'hall', name: 'Main Dining Hall', desc: 'Air-conditioned pristine comfort' },
  { id: 'group', name: 'Group / Kitty Party', desc: 'Spacious setup for 50-60 people' },
  { id: 'lounge', name: 'Private Section', desc: 'Intimate setup for special occasions' }
];

export function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    zone: 'hall'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking process
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="reservation" className="py-24 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-maroon mb-4">Reserve Your Experience</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-8" />
          <p className="text-maroon/70 max-w-2xl mx-auto italic">
            Secure your table for an unforgettable culinary journey at Kesar.
          </p>
        </motion.div>

        <div className="bg-white/60 backdrop-blur-md border border-saffron/20 rounded-3xl p-6 md:p-12 shadow-xl relative overflow-hidden">
          
          {/* subtle background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none pattern-bg" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -50 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10"
                onSubmit={handleSubmit}
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-maroon/80 mb-2 uppercase tracking-wider">Full Name</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-300 focus:border-maroon text-charcoal pb-2 focus:outline-none transition-colors" 
                      placeholder="e.g. Maharaja Ranjit"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-maroon/80 mb-2 uppercase tracking-wider">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-300 focus:border-maroon text-charcoal pb-2 focus:outline-none transition-colors" 
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-maroon/80 mb-2 uppercase tracking-wider flex items-center gap-2">
                        <CalendarIcon size={16} className="text-saffron-dark" /> Date
                      </label>
                      <input 
                        required
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-gray-300 focus:border-maroon text-charcoal pb-2 focus:outline-none transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-maroon/80 mb-2 uppercase tracking-wider flex items-center gap-2">
                        <Clock size={16} className="text-saffron-dark" /> Time
                      </label>
                      <input 
                        required
                        type="time" 
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-gray-300 focus:border-maroon text-charcoal pb-2 focus:outline-none transition-colors" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-maroon/80 mb-2 uppercase tracking-wider flex items-center gap-2">
                      <Users size={16} className="text-saffron-dark" /> Guests
                    </label>
                    <select 
                      name="guests" 
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-300 focus:border-maroon text-charcoal pb-2 focus:outline-none transition-colors appearance-none"
                    >
                      {[1,2,3,4,5,6,7,8,10,20,30,40,50,60].map(num => (
                        <option key={num} value={num} className="bg-ivory text-charcoal">{num} Person{num !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-maroon/80 mb-4 uppercase tracking-wider">Select Seating Zone</label>
                    <div className="space-y-4">
                      {ZONES.map(zone => (
                        <div 
                          key={zone.id}
                          onClick={() => setFormData(prev => ({ ...prev, zone: zone.id }))}
                          className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
                            formData.zone === zone.id 
                              ? 'border-maroon bg-maroon/5' 
                              : 'border-gray-200 hover:border-gold/50 bg-white/50'
                          }`}
                        >
                          {formData.zone === zone.id && (
                            <motion.div 
                              layoutId="zone-indicator" 
                              className="absolute left-0 top-0 bottom-0 w-1 bg-maroon" 
                            />
                          )}
                          <h4 className={`font-serif text-lg ${formData.zone === zone.id ? 'text-maroon' : 'text-charcoal'}`}>
                            {zone.name}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">{zone.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex-grow flex items-end">
                    <button 
                      type="submit"
                      className="w-full py-4 bg-maroon text-ivory font-semibold tracking-wide uppercase text-sm border-2 border-maroon hover:bg-maroon-dark hover:border-maroon-dark transition-all rounded-xl flex justify-center items-center gap-2 group shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      Confirm Booking
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </button>
                  </div>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center relative z-10"
              >
                {/* Simulated Sparkle/Confetti using framer-motion */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 0, 
                      scale: Math.random() * 2 + 1,
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute w-2 h-2 rounded-full bg-gold pointer-events-none"
                    style={{ left: '50%', top: '30%' }}
                  />
                ))}

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                >
                  <CheckCircle2 size={80} className="text-saffron-dark mb-6" />
                </motion.div>
                
                <h3 className="font-serif text-4xl text-maroon mb-4">Table Confirmed</h3>
                <p className="text-charcoal/80 max-w-md mx-auto mb-8">
                  Thank you, {formData.name}. We look forward to hosting you in the {ZONES.find(z => z.id === formData.zone)?.name}. A confirmation SMS has been sent to your number.
                </p>

                <div className="bg-ivory-dark/50 border border-gold/30 p-6 rounded-2xl w-full max-w-sm">
                  <h4 className="text-maroon font-serif mb-4 pb-2 border-b border-gray-300">Digital Pass</h4>
                  <div className="flex justify-between text-sm mb-2 text-charcoal/70">
                    <span>Date:</span> <span className="text-charcoal font-medium">{formData.date}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2 text-charcoal/70">
                    <span>Time:</span> <span className="text-charcoal font-medium">{formData.time}</span>
                  </div>
                  <div className="flex justify-between text-sm text-charcoal/70">
                    <span>Guests:</span> <span className="text-charcoal font-medium">{formData.guests}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-sm text-gray-500 hover:text-maroon uppercase tracking-widest border-b border-transparent hover:border-maroon pb-1 transition-all"
                >
                  Make another booking
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
