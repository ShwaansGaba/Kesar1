/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Reservation } from './components/Reservation';
import { Story, Footer } from './components/Story';
import { ThreeMandala } from './components/ThreeMandala';
import { Testimonials } from './components/Testimonials';

function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio playback prevented by browser:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        // A gentle generic classical indian loop placeholder
        src="https://actions.google.com/sounds/v1/water/rain_on_roof.ogg" 
      />
      <button 
        onClick={toggleAudio}
        className="fixed top-6 right-6 z-50 p-3 bg-ivory/80 backdrop-blur-md text-maroon hover:text-saffron border border-saffron/30 rounded-full shadow-md transition-all focus:outline-none"
        aria-label="Toggle ambient music"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </>
  );
}

export default function App() {
  return (
    <main className="w-full min-h-screen bg-transparent text-charcoal selection:bg-maroon selection:text-ivory relative">
      <ThreeMandala />
      
      {/* Wrapper to stack standard DOM over fixed WebGL */}
      <div className="relative z-10 w-full">
        <AudioToggle />
        <Hero />
        <Story />
        <Menu />
        <Testimonials />
        <Reservation />
        <Footer />
      </div>
    </main>
  );
}
