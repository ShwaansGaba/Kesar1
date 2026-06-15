import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

// Generates high-fidelity traditional Indian symmetric paths for a 2D Vector Mandala.
// Centered at 500, 500 in a 1000x1000 viewBox.
export function ThreeMandala() {
  const { scrollY } = useScroll();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Smooth scroll interpolation
  const smoothScroll = useSpring(scrollY, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Different speeds and directions of rotation for continuous infinite scrolling loops
  // Mapping scroll pixels purely to rotation degrees smoothly.
  const rotateOuter = useTransform(smoothScroll, (v: number) => v * 0.045);
  const rotateMidCcw = useTransform(smoothScroll, (v: number) => v * -0.055);
  const rotateMidCw = useTransform(smoothScroll, (v: number) => v * 0.065);
  const rotateInnerCcw = useTransform(smoothScroll, (v: number) => v * -0.08);
  const rotateCore = useTransform(smoothScroll, (v: number) => v * 0.1);

  // Bloom animation configurations
  const bloomTransition = (delay: number) => ({
    type: "spring" as const,
    stiffness: 50,
    damping: 15,
    delay: delay,
    duration: 1.8
  });

  // Radians/Degrees helpers to generate repetitive design children easily
  const renderRadial = (count: number, renderFn: (index: number) => React.ReactNode) => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i * 360) / count;
      return (
        <g key={i} transform={`rotate(${angle}, 500, 500)`}>
          {renderFn(i)}
        </g>
      );
    });
  };

  // Dynamic background blur and opacity for legibility when scrolling past the hero
  const isMobile = windowWidth < 768;
  const bgFilter = useTransform(smoothScroll, [0, 600], ["blur(0px)", "blur(3px)"]);
  const bgOpacity = useTransform(smoothScroll, [0, 600], isMobile ? [0.4, 0.25] : [0.24, 0.15]);

  // Adjust placement based on layout responsiveness
  const scaleValue = isMobile ? 1.4 : 1.1;

  return (
    <motion.div 
      className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden select-none"
      style={{ filter: bgFilter, opacity: bgOpacity }}
    >
      <motion.svg
        id="royal-mandala-vector"
        viewBox="0 0 1000 1000"
        className="w-[110vh] h-[110vh] max-w-none origin-center"
        initial={{ opacity: 0, scale: scaleValue * 0.4, rotate: -45 }}
        animate={{ opacity: 1, scale: scaleValue, rotate: 0 }}
        transition={{ type: "spring", stiffness: 35, damping: 15, duration: 2.2 }}
      >
        <defs>
          <linearGradient id="maroonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B1E22" />
            <stop offset="100%" stopColor="#501013" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C5A059" />
            <stop offset="50%" stopColor="#E2C48E" />
            <stop offset="100%" stopColor="#9C7938" />
          </linearGradient>
          <linearGradient id="saffronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D05316" />
            <stop offset="100%" stopColor="#9C3A0A" />
          </linearGradient>
          
          <g id="outer-lotus-petal">
            <path d="M 500,60 C 532,100 550,150 500,210 C 450,150 468,100 500,60 Z" fill="none" stroke="url(#maroonGrad)" strokeWidth="2.5" />
            <path d="M 500,74 C 525,110 538,148 500,196 C 462,148 475,110 500,74 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="2" />
            <path d="M 500,88 C 516,118 526,146 500,182 C 474,146 484,118 500,88 Z" fill="url(#saffronGrad)" fillOpacity="0.15" stroke="url(#saffronGrad)" strokeWidth="1.2" />
            <line x1="500" y1="88" x2="500" y2="180" stroke="url(#maroonGrad)" strokeWidth="1" strokeDasharray="2,3" />
          </g>

          <g id="paisley-bead">
            <path d="M 500,195 C 514,210 514,235 500,245 C 486,235 486,210 500,195 Z" fill="url(#goldGrad)" stroke="url(#maroonGrad)" strokeWidth="1.2" />
            <circle cx="500" cy="225" r="3" fill="#7B1E22" />
          </g>
        </defs>

        {/* Outer Static Shadow Ring */}
        <circle cx="500" cy="500" r="460" fill="none" stroke="url(#maroonGrad)" strokeWidth="1" strokeDasharray="4,8" opacity="0.4" />
        <circle cx="500" cy="500" r="450" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6" />

        {/* LAYER 1: GRAND EXTERIOR PETALS */}
        {/* We inject a full 1000x1000 transparent rect into every layer so framer-motion computes the originX/Y at exactly 500, 500 */}
        <motion.g
          style={{ rotate: rotateOuter, originX: "50%", originY: "50%" }}
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={bloomTransition(0)}
        >
          <rect x="0" y="0" width="1000" height="1000" fill="none" pointerEvents="none" />
          {renderRadial(36, () => <use href="#outer-lotus-petal" x="0" y="0" />)}
        </motion.g>

        {/* LAYER 2: INTERIOR DOT CHAINS & CONCENTRIC FRAME */}
        <motion.g
          style={{ rotate: rotateMidCcw, originX: "50%", originY: "50%" }}
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={bloomTransition(0.3)}
        >
          <rect x="0" y="0" width="1000" height="1000" fill="none" pointerEvents="none" />
          {renderRadial(72, () => (
            <path d="M 500,208 C 506,203 514,203 520,208" fill="none" stroke="url(#maroonGrad)" strokeWidth="1.8" />
          ))}
          <circle cx="500" cy="500" r="282" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" strokeDasharray="1,6" />
          <circle cx="500" cy="500" r="274" fill="none" stroke="url(#maroonGrad)" strokeWidth="1.2" />
        </motion.g>

        {/* LAYER 3: MID-RING LOTUS SHIELDS */}
        <motion.g
          style={{ rotate: rotateMidCw, originX: "50%", originY: "50%" }}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={bloomTransition(0.6)}
        >
          <rect x="0" y="0" width="1000" height="1000" fill="none" pointerEvents="none" />
          {renderRadial(24, () => (
            <g>
              <path d="M 500,230 C 518,250 528,290 500,320 C 472,290 482,250 500,230 Z" fill="url(#saffronGrad)" fillOpacity="0.08" stroke="url(#maroonGrad)" strokeWidth="2" />
              <path d="M 500,242 C 512,258 518,285 500,310 C 482,285 488,258 500,242 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="1.2" />
              <circle cx="500" cy="285" r="4" fill="url(#maroonGrad)" />
            </g>
          ))}
        </motion.g>

        {/* LAYER 4: DOUBLE-BAND & BEADS */}
        <motion.g
          style={{ rotate: rotateInnerCcw, originX: "50%", originY: "50%" }}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={bloomTransition(0.9)}
        >
          <rect x="0" y="0" width="1000" height="1000" fill="none" pointerEvents="none" />
          <circle cx="500" cy="500" r="172" fill="none" stroke="url(#goldGrad)" strokeWidth="1" />
          <circle cx="500" cy="500" r="166" fill="none" stroke="#7B1E22" strokeWidth="3" strokeDasharray="2,5" />
          {renderRadial(48, () => <line x1="500" y1="316" x2="500" y2="330" stroke="url(#maroonGrad)" strokeWidth="1.5" />)}
          {renderRadial(24, () => <use href="#paisley-bead" x="0" y="0" />)}
        </motion.g>

        {/* LAYER 5: SUN/LOTUS CORE */}
        <motion.g
          style={{ rotate: rotateCore, originX: "50%", originY: "50%" }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={bloomTransition(1.2)}
        >
          <rect x="0" y="0" width="1000" height="1000" fill="none" pointerEvents="none" />
          {renderRadial(16, () => (
            <g>
              <path d="M 500,345 C 512,360 512,385 500,400 C 488,385 488,360 500,345 Z" fill="url(#maroonGrad)" stroke="url(#goldGrad)" strokeWidth="1" />
              <circle cx="500" cy="372" r="2.5" fill="#FDF9F1" />
            </g>
          ))}
          <circle cx="500" cy="500" r="92" fill="none" stroke="url(#maroonGrad)" strokeWidth="2" />
          <circle cx="500" cy="500" r="84" fill="url(#saffronGrad)" fillOpacity="0.1" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <circle cx="500" cy="500" r="72" fill="none" stroke="url(#maroonGrad)" strokeWidth="1" strokeDasharray="3,3" />
          {renderRadial(30, () => <path d="M 500,424 L 500,436" stroke="url(#goldGrad)" strokeWidth="2.2" strokeLinecap="round" />)}
          <circle cx="500" cy="500" r="54" fill="url(#maroonGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <circle cx="500" cy="500" r="44" fill="none" stroke="#FDF9F1" strokeWidth="1" strokeDasharray="2,4" />
          {renderRadial(8, () => <path d="M 500,466 C 506,474 506,488 500,494 C 494,488 494,474 500,466 Z" fill="url(#goldGrad)" />)}
          <circle cx="500" cy="500" r="10" fill="url(#saffronGrad)" stroke="url(#goldGrad)" strokeWidth="1" />
          <circle cx="500" cy="500" r="3" fill="#FDF9F1" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}
