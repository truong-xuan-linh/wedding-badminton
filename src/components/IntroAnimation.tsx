'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShuttlecockSVG from './ShuttlecockSVG';

type Phase = 'idle' | 'flying' | 'impact' | 'cracking' | 'revealing';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('flying'), 400);
    const t2 = setTimeout(() => setPhase('impact'), 1900);
    const t3 = setTimeout(() => setPhase('cracking'), 2100);
    const t4 = setTimeout(() => setPhase('revealing'), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center"
        style={{ background: '#030f07' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Dark court background lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="courtGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a472a" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#courtGrid)" />
            {/* Center horizontal line */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#2d6a4f" strokeWidth="1.5"/>
            {/* Center vertical line */}
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#2d6a4f" strokeWidth="0.8"/>
            {/* Outer court rectangle */}
            <rect x="10%" y="10%" width="80%" height="80%" fill="none" stroke="#1a472a" strokeWidth="1.5"/>
            {/* Service lines */}
            <line x1="10%" y1="35%" x2="90%" y2="35%" stroke="#1a472a" strokeWidth="1"/>
            <line x1="10%" y1="65%" x2="90%" y2="65%" stroke="#1a472a" strokeWidth="1"/>
            {/* Center circle */}
            <circle cx="50%" cy="50%" r="8%" fill="none" stroke="#1a472a" strokeWidth="1"/>
          </svg>
        </div>

        {/* Flying shuttlecock */}
        <AnimatePresence>
          {phase === 'flying' && (
            <motion.div
              className="absolute"
              initial={{
                x: '35vw',
                y: '40vh',
                scale: 0.4,
                rotate: 0,
              }}
              animate={{
                x: '-5vw',
                y: '-3vh',
                scale: 5,
                rotate: 540,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 1.4,
                ease: [0.2, 0, 0.8, 1],
              }}
            >
              <ShuttlecockSVG size={52} color="#f0faf4" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* White impact flash */}
        <AnimatePresence>
          {phase === 'impact' && (
            <motion.div
              className="absolute inset-0 bg-white pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0] }}
              transition={{ duration: 0.35, times: [0, 0.3, 1] }}
            />
          )}
        </AnimatePresence>

        {/* Screen shake wrapper */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={phase === 'impact' || phase === 'cracking' ? {
            x: [0, -8, 8, -5, 5, -3, 3, 0],
            y: [0, 5, -5, 3, -3, 0],
          } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Glass crack overlay */}
          <AnimatePresence>
            {(phase === 'cracking' || phase === 'revealing') && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCrackSVG />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ===== MAIN TITLE REVEAL ===== */}
        <AnimatePresence>
          {phase === 'revealing' && (
            <motion.div
              className="relative z-20 text-center px-4 w-full max-w-5xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* TOP LABEL */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <div className="live-badge">
                  <div className="live-dot" />
                  LIVE
                </div>
                <span className="font-mono text-xs tracking-[0.3em] text-court-light opacity-80 uppercase">
                  Championship Wedding Match · 2026
                </span>
              </motion.div>

              {/* THE FINAL MATCH */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.6, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.2, duration: 0.7, type: 'spring', stiffness: 100 }}
                className="display-xl text-white mb-4 uppercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                THE FINAL
                <br />
                <span style={{ color: '#52b788' }}>MATCH</span>
              </motion.h1>

              {/* VS ROW */}
              <div className="flex items-center justify-center gap-4 md:gap-12 my-8">
                {/* GROOM */}
                <motion.div
                  initial={{ opacity: 0, x: -120 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
                  className="text-right flex-1 max-w-xs"
                >
                  <div className="font-mono text-xs tracking-widest mb-1" style={{ color: '#f59e0b' }}>#09</div>
                  <div
                    className="uppercase text-white leading-none mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 5vw, 3.2rem)' }}
                  >
                    Minh<br />Khoa
                  </div>
                  <div className="font-mono text-xs tracking-wider opacity-50 uppercase">Chú Rể</div>
                </motion.div>

                {/* VS */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.4, type: 'spring', stiffness: 200 }}
                  className="flex flex-col items-center gap-2 flex-shrink-0"
                >
                  <div className="w-8 h-px bg-gold-DEFAULT opacity-50" />
                  <span
                    className="text-gradient-gold font-mono font-bold tracking-widest"
                    style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)' }}
                  >
                    VS
                  </span>
                  <ShuttlecockSVG size={32} color="#f59e0b" />
                  <div className="w-8 h-px bg-gold-DEFAULT opacity-50" />
                </motion.div>

                {/* BRIDE */}
                <motion.div
                  initial={{ opacity: 0, x: 120 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
                  className="text-left flex-1 max-w-xs"
                >
                  <div className="font-mono text-xs tracking-widest mb-1" style={{ color: '#f59e0b' }}>#17</div>
                  <div
                    className="uppercase text-white leading-none mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 5vw, 3.2rem)' }}
                  >
                    Thanh<br />Vy
                  </div>
                  <div className="font-mono text-xs tracking-wider opacity-50 uppercase">Cô Dâu</div>
                </motion.div>
              </div>

              {/* DATE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="font-mono tracking-[0.4em] text-court-light text-sm md:text-base mb-8"
              >
                18 · 04 · 2026
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <button
                  onClick={onComplete}
                  className="btn-gold px-8 py-4 text-base rounded-none cursor-pointer"
                >
                  ENTER THE COURT →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SKIP BUTTON */}
        {phase !== 'revealing' && (
          <button
            onClick={onComplete}
            className="absolute bottom-6 right-6 text-white/30 text-xs font-mono hover:text-white/70 transition-colors tracking-widest uppercase"
          >
            SKIP →
          </button>
        )}

        {/* Decorative corner numbers (jersey style) */}
        <div className="absolute top-6 left-6 font-mono text-court-light/20 text-5xl font-bold leading-none pointer-events-none" style={{ fontFamily: 'var(--font-display)' }}>
          09
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-court-light/20 text-5xl font-bold leading-none pointer-events-none" style={{ fontFamily: 'var(--font-display)' }}>
          17
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function GlassCrackSVG() {
  const mainCracks = [
    { d: "M 50 50 L 2 8", delay: 0 },
    { d: "M 50 50 L 25 0", delay: 0.02 },
    { d: "M 50 50 L 72 2", delay: 0.04 },
    { d: "M 50 50 L 98 12", delay: 0.06 },
    { d: "M 50 50 L 100 42", delay: 0.08 },
    { d: "M 50 50 L 96 72", delay: 0.1 },
    { d: "M 50 50 L 75 100", delay: 0.12 },
    { d: "M 50 50 L 45 100", delay: 0.14 },
    { d: "M 50 50 L 15 95", delay: 0.16 },
    { d: "M 50 50 L 0 65", delay: 0.18 },
    { d: "M 50 50 L 0 35", delay: 0.2 },
  ];

  const secondaryCracks = [
    { d: "M 18 22 L 2 8", delay: 0.1 },
    { d: "M 18 22 L 25 0", delay: 0.12 },
    { d: "M 78 25 L 72 2", delay: 0.14 },
    { d: "M 78 25 L 98 12", delay: 0.16 },
    { d: "M 88 58 L 100 42", delay: 0.18 },
    { d: "M 88 58 L 96 72", delay: 0.2 },
    { d: "M 62 88 L 75 100", delay: 0.22 },
    { d: "M 30 90 L 15 95", delay: 0.24 },
    { d: "M 12 55 L 0 65", delay: 0.26 },
    { d: "M 18 22 L 8 0", delay: 0.28 },
    { d: "M 62 15 L 72 2", delay: 0.3 },
  ];

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {mainCracks.map((crack, i) => (
        <motion.path
          key={`main-${i}`}
          d={crack.d}
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="0.25"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: crack.delay }}
        />
      ))}
      {secondaryCracks.map((crack, i) => (
        <motion.path
          key={`sec-${i}`}
          d={crack.d}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.15"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.25, delay: crack.delay }}
        />
      ))}
    </svg>
  );
}
