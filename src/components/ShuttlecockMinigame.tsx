'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShuttlecockSVG from './ShuttlecockSVG';
import { weddingData } from '@/lib/weddingData';

const VENUES = [
  {
    id: 'ceremony',
    label: 'LỄ CƯỚI',
    icon: '⛪',
    color: '#52b788',
    revealTitle: weddingData.wedding.ceremony.venue,
    revealInfo: [
      { label: 'Thời Gian', value: weddingData.wedding.ceremony.time },
      { label: 'Địa Chỉ', value: weddingData.wedding.ceremony.address },
    ],
  },
  {
    id: 'reception',
    label: 'TIỆC CƯỚI',
    icon: '🏛️',
    color: '#f59e0b',
    revealTitle: weddingData.wedding.reception.venue,
    revealInfo: [
      { label: 'Thời Gian', value: weddingData.wedding.reception.time },
      { label: 'Phòng', value: weddingData.wedding.reception.hall },
      { label: 'Địa Chỉ', value: weddingData.wedding.reception.address },
    ],
  },
  {
    id: 'afterparty',
    label: 'AFTER PARTY',
    icon: '🥂',
    color: '#74c69d',
    revealTitle: weddingData.wedding.afterparty.venue,
    revealInfo: [
      { label: 'Thời Gian', value: weddingData.wedding.afterparty.time },
      { label: 'Địa Chỉ', value: weddingData.wedding.afterparty.address },
    ],
  },
];

export default function ShuttlecockMinigame() {
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [launching, setLaunching] = useState<string | null>(null);
  const [allRevealed, setAllRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleLaunch = useCallback((id: string) => {
    if (revealed.has(id) || launching) return;
    setLaunching(id);
    setTimeout(() => {
      setLaunching(null);
      setRevealed((prev) => {
        const next = new Set(prev);
        next.add(id);
        if (next.size === VENUES.length) setAllRevealed(true);
        return next;
      });
    }, 900);
  }, [revealed, launching]);

  return (
    <section
      ref={ref}
      id="venue"
      className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030f07 0%, #071a0e 100%)' }}
    >
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <div className="font-mono text-[10px] tracking-[0.5em] uppercase text-court-light/40 mb-3">
            ◆ Minigame ◆
          </div>
          <h2 className="display-md text-white uppercase mb-2">
            Giao Cầu
            <span className="text-gradient-green"> Nhận Thiệp</span>
          </h2>
          <p className="font-body text-sm text-white/40 max-w-md mx-auto">
            Bấm vào từng ô bí ẩn để "phát cầu" và khám phá thông tin địa điểm cưới!
          </p>
        </motion.div>

        {/* Instruction badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
            <span className="text-[10px] font-mono tracking-widest" style={{ color: '#f59e0b' }}>
              {revealed.size} / {VENUES.length} ĐÃ KHÁM PHÁ
            </span>
            <div className="flex gap-0.5">
              {VENUES.map((v) => (
                <div key={v.id} className="w-2 h-2 rounded-full transition-all"
                  style={{ background: revealed.has(v.id) ? v.color : 'rgba(255,255,255,0.15)' }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Badminton court with venue cards */}
        <div className="relative">
          {/* Court SVG background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative rounded-none overflow-hidden"
            style={{
              background: '#0a3d1c',
              border: '3px solid #2d6a4f',
              padding: '20px 16px',
              minHeight: 360,
            }}
          >
            {/* Court SVG markings */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                {/* Outer lines */}
                <rect x="3%" y="4%" width="94%" height="92%" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
                {/* Net */}
                <line x1="3%" y1="50%" x2="97%" y2="50%" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
                {/* Service lines */}
                <line x1="3%" y1="28%" x2="97%" y2="28%" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                <line x1="3%" y1="72%" x2="97%" y2="72%" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                {/* Center lines */}
                <line x1="50%" y1="28%" x2="50%" y2="72%" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                {/* Net posts */}
                <circle cx="3%" cy="50%" r="1%" fill="rgba(255,255,255,0.7)"/>
                <circle cx="97%" cy="50%" r="1%" fill="rgba(255,255,255,0.7)"/>
              </svg>
            </div>

            {/* "YOUR SIDE" label top */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-widest text-white/20 uppercase">
              Court 1 · Final Match
            </div>

            {/* Venue cards in a row */}
            <div className="relative z-10 grid grid-cols-3 gap-3 md:gap-5 py-4">
              {VENUES.map((venue, i) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  index={i}
                  isRevealed={revealed.has(venue.id)}
                  isLaunching={launching === venue.id}
                  visible={visible}
                  onLaunch={() => handleLaunch(venue.id)}
                />
              ))}
            </div>

            {/* Net label */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div className="font-mono text-[7px] tracking-widest text-white/30 bg-court-dark px-2 py-0.5 uppercase">
                NET
              </div>
            </div>

            {/* Launcher area (bottom) */}
            <div className="relative z-10 mt-4 flex justify-center">
              <LauncherArea
                onLaunchAll={() => {
                  VENUES.forEach((v, i) => {
                    if (!revealed.has(v.id)) {
                      setTimeout(() => handleLaunch(v.id), i * 400);
                    }
                  });
                }}
                allRevealed={allRevealed}
                anyLaunching={!!launching}
              />
            </div>
          </motion.div>
        </div>

        {/* All revealed celebration */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card-gold">
                <span className="text-sm">🏆</span>
                <span className="font-mono text-xs tracking-widest text-gold-light uppercase">
                  Bạn đã khám phá tất cả địa điểm!
                </span>
                <span className="text-sm">🏸</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function VenueCard({
  venue,
  index,
  isRevealed,
  isLaunching,
  visible,
  onLaunch,
}: {
  venue: typeof VENUES[0];
  index: number;
  isRevealed: boolean;
  isLaunching: boolean;
  visible: boolean;
  onLaunch: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15 + 0.4, duration: 0.4 }}
      className="relative"
    >
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          /* Mystery card */
          <motion.div
            key="mystery"
            initial={{ rotateY: 0 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ perspective: 600 }}
          >
            <button
              onClick={onLaunch}
              disabled={isLaunching}
              className="w-full relative overflow-hidden transition-all duration-200 cursor-pointer group"
              style={{
                background: 'rgba(13,43,24,0.8)',
                border: `2px solid ${venue.color}40`,
                padding: '20px 10px',
                minHeight: 160,
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at center, ${venue.color}12, transparent)` }} />

              {/* Floating shuttlecock */}
              {isLaunching ? (
                <motion.div
                  className="flex justify-center mb-3"
                  animate={{
                    y: [-60, -120, -80],
                    x: [0, 10, -5],
                    rotate: [0, 180, 360],
                    scale: [1, 1.5, 0.5],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <ShuttlecockSVG size={32} color={venue.color} />
                </motion.div>
              ) : (
                <motion.div
                  className="flex justify-center mb-3"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  <ShuttlecockSVG size={32} color={venue.color} />
                </motion.div>
              )}

              <div className="font-mono text-[11px] md:text-[13px] tracking-[0.25em] uppercase text-center mb-1"
                style={{ color: venue.color }}>
                {venue.label}
              </div>
              <div className="text-2xl text-center">{venue.icon}</div>
              <div className="font-mono text-[7px] tracking-widest text-white/25 text-center mt-2 uppercase">
                {isLaunching ? 'Đang bay...' : 'Bấm để khám phá'}
              </div>

              {/* Corner decoration */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t border-l"
                style={{ borderColor: `${venue.color}40` }} />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r"
                style={{ borderColor: `${venue.color}40` }} />
            </button>
          </motion.div>
        ) : (
          /* Revealed card */
          <motion.div
            key="revealed"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.4, type: 'spring' }}
            style={{ perspective: 600 }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${venue.color}18, rgba(13,43,24,0.9))`,
                border: `2px solid ${venue.color}60`,
                padding: '14px 10px',
                minHeight: 160,
                boxShadow: `0 0 20px ${venue.color}20`,
              }}
            >
              {/* Check badge */}
              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                style={{ background: venue.color, color: '#040d08' }}>
                ✓
              </div>

              <div className="text-base text-center mb-2">{venue.icon}</div>
              <div className="font-mono text-[7px] md:text-[11px] tracking-[0.2em] uppercase text-center mb-2"
                style={{ color: venue.color }}>
                {venue.label}
              </div>

              <div className="font-heading text-[11px] md:text-xs font-bold uppercase text-white text-center mb-2 leading-tight">
                {venue.revealTitle}
              </div>

              {venue.revealInfo.map((info) => (
                <div key={info.label} className="mb-1 text-center">
                  <div className="font-mono text-[7px] tracking-wider text-white/30 uppercase">{info.label}</div>
                  <div className="font-mono text-[11px] tracking-wide text-white/65 leading-tight">{info.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LauncherArea({
  onLaunchAll,
  allRevealed,
  anyLaunching,
}: {
  onLaunchAll: () => void;
  allRevealed: boolean;
  anyLaunching: boolean;
}) {
  if (allRevealed) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="font-mono text-[11px] tracking-widest text-white/25 uppercase">
        ↑ Bấm từng ô hoặc ↓
      </div>
      <button
        onClick={onLaunchAll}
        disabled={anyLaunching || allRevealed}
        className="btn-gold px-6 py-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
      >
        🏸 PHÁT CẦU TẤT CẢ
      </button>
    </motion.div>
  );
}
