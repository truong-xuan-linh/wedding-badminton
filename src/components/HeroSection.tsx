'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ShuttlecockSVG from './ShuttlecockSVG';
import { weddingData } from '@/lib/weddingData';

const { groom, bride, wedding } = weddingData;

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: visible ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  });

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #030f07 0%, #071a0e 50%, #0d2b18 100%)',
      }}
    >
      {/* Court Background Lines SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="heroGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#1a472a" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)"/>
          {/* Court outer lines */}
          <rect x="5%" y="8%" width="90%" height="84%" fill="none" stroke="#2d6a4f" strokeWidth="1.5"/>
          {/* Net */}
          <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="#3a7a5e" strokeWidth="2.5"/>
          {/* Service boxes */}
          <line x1="5%" y1="32%" x2="95%" y2="32%" stroke="#2d6a4f" strokeWidth="0.8"/>
          <line x1="5%" y1="68%" x2="95%" y2="68%" stroke="#2d6a4f" strokeWidth="0.8"/>
          <line x1="50%" y1="32%" x2="50%" y2="68%" stroke="#2d6a4f" strokeWidth="0.8"/>
        </svg>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #52b788 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #2d6a4f 0%, transparent 70%)' }} />
      </div>

      {/* ===== TOP BROADCAST BAR ===== */}
      <motion.div {...fadeUp(0)} className="relative z-10 border-b border-court-medium/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="live-badge">
              <div className="live-dot" />
              LIVE
            </div>
            <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-court-light/70 uppercase">
              Championship Wedding Series 2026
            </div>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div className="font-mono text-[10px] tracking-widest text-white/40 hidden sm:block">
              TP.HCM · VIỆT NAM
            </div>
            <div className="font-mono text-[10px] tracking-widest text-court-light/60">
              {wedding.dateDisplay}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== MAIN SCOREBOARD AREA ===== */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">

        {/* Event Label */}
        <motion.div {...fadeUp(0.1)} className="text-center mb-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full"
            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
            <ShuttlecockSVG size={16} color="#f59e0b" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: '#f59e0b' }}>
              The Championship Match
            </span>
            <ShuttlecockSVG size={16} color="#f59e0b" rotate={180} />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div {...fadeUp(0.2)} className="text-center mb-10">
          <h1 className="display-xl text-white uppercase leading-none">
            The Final
            <br />
            <span className="text-gradient-green">Match</span>
          </h1>
        </motion.div>

        {/* ===== PLAYER VS PLAYER CARD ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-none p-1"
            style={{ border: '1px solid rgba(82,183,136,0.25)' }}>

            {/* Header bar */}
            <div className="px-4 py-2 flex items-center justify-between"
              style={{ background: 'rgba(26,71,42,0.6)', borderBottom: '1px solid rgba(82,183,136,0.15)' }}>
              <div className="font-mono text-[10px] tracking-widest text-court-bright uppercase">
                Court 1 — Final Match
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <div className="font-mono text-[10px] tracking-widest text-green-400">IN PLAY</div>
              </div>
              <div className="font-mono text-[10px] tracking-widest text-white/40">{wedding.dayOfWeek}</div>
            </div>

            {/* Players row */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-0">
              {/* GROOM */}
              <div className="p-4 md:p-8 flex flex-col items-center md:flex-row md:items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2"
                    style={{ borderColor: 'rgba(245,158,11,0.5)' }}>
                    <Image
                      src="/2.webp"
                      alt={groom.name}
                      width={224}
                      height={224}
                      quality={90}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Jersey number */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                    style={{ background: '#f59e0b', color: '#040d08' }}>
                    {groom.number}
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="font-mono text-[13px] tracking-[0.3em] mb-0.5 uppercase"
                    style={{ color: '#52b788' }}>
                    {groom.position}
                  </div>
                  <div className="uppercase text-white leading-tight"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>
                    {groom.name.split(' ')[0]}<br />{groom.name.split(' ').slice(1).join(' ')}
                  </div>
                  <div className="font-mono text-[13px] tracking-wider mt-1"
                    style={{ color: 'rgba(148,210,173,0.5)' }}>
                    {groom.nickname}
                  </div>
                  {/* Mini stats */}
                  <div className="hidden md:flex gap-3 mt-2">
                    <StatPill label="HT" value={groom.stats.height} />
                    <StatPill label="CLB" value={groom.stats.club} />
                  </div>
                </div>
              </div>

              {/* CENTER SCORE */}
              <div className="flex flex-col items-center justify-center px-4 md:px-8 py-4"
                style={{ borderLeft: '1px solid rgba(82,183,136,0.15)', borderRight: '1px solid rgba(82,183,136,0.15)' }}>
                <div className="font-mono text-[13px] tracking-widest text-white/30 mb-2">SCORE</div>
                <div className="flex items-center gap-2">
                  <div className="led-text text-2xl md:text-4xl score-digit">21</div>
                  <div className="font-mono text-white/30">:</div>
                  <div className="led-text text-2xl md:text-4xl score-digit">21</div>
                </div>
                <div className="font-mono text-[13px] tracking-widest mt-2 mb-3"
                  style={{ color: '#f59e0b' }}>
                  GAME OVER — BOTH WIN
                </div>
                <motion.div
                  animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <ShuttlecockSVG size={36} color="#52b788" />
                </motion.div>
              </div>

              {/* BRIDE */}
              <div className="p-4 md:p-8 flex flex-col items-center md:flex-row-reverse md:items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2"
                    style={{ borderColor: 'rgba(82,183,136,0.5)' }}>
                    <Image
                      src="/1.webp"
                      alt={bride.name}
                      width={224}
                      height={224}
                      quality={90}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                    style={{ background: '#52b788', color: '#040d08' }}>
                    {bride.number}
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="font-mono text-[13px] tracking-[0.3em] mb-0.5 uppercase"
                    style={{ color: '#f59e0b' }}>
                    {bride.position}
                  </div>
                  <div className="uppercase text-white leading-tight"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>
                    {bride.name.split(' ')[0]}<br />{bride.name.split(' ').slice(1).join(' ')}
                  </div>
                  <div className="font-mono text-[13px] tracking-wider mt-1"
                    style={{ color: 'rgba(148,210,173,0.5)' }}>
                    {bride.nickname}
                  </div>
                  <div className="hidden md:flex gap-3 mt-2 justify-end">
                    <StatPill label="HT" value={bride.stats.height} />
                    <StatPill label="CLB" value={bride.stats.club} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar — achievements */}
            <div className="px-4 py-2 flex items-center justify-between flex-wrap gap-2"
              style={{ background: 'rgba(7,26,14,0.8)', borderTop: '1px solid rgba(82,183,136,0.15)' }}>
              <div className="font-mono text-[13px] tracking-wider text-white/30 flex-1 text-left">
                🏆 {groom.stats.achievement}
              </div>
              <div className="font-mono text-[13px] tracking-[0.2em] text-gold-light uppercase text-center">
                ♥ TOGETHER FOREVER ♥
              </div>
              <div className="font-mono text-[13px] tracking-wider text-white/30 flex-1 text-right">
                🏆 {bride.stats.achievement}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== EVENT INFO STRIP ===== */}
        <motion.div {...fadeUp(0.5)} className="w-full max-w-4xl mx-auto mt-4">
          <div className="grid grid-cols-3 gap-1">
            {[
              { icon: '📅', label: 'Ngày', value: wedding.dateDisplay },
              { icon: '📍', label: 'Địa Điểm', value: 'White Palace' },
              { icon: '⏰', label: 'Giờ Đón Khách', value: wedding.reception.time },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center py-3 px-2"
                style={{
                  background: 'rgba(13,43,24,0.5)',
                  border: '1px solid rgba(82,183,136,0.15)',
                }}
              >
                <div className="text-lg mb-0.5">{item.icon}</div>
                <div className="font-mono text-[10px] tracking-widest text-white/40 uppercase mb-0.5">{item.label}</div>
                <div className="font-heading font-semibold text-sm md:text-base tracking-wider text-court-light">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          {...fadeUp(0.8)}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <div className="font-mono text-[13px] tracking-[0.4em] text-white/25 uppercase">Cuộn để xem</div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8"
            style={{ background: 'linear-gradient(180deg, rgba(82,183,136,0.5), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1 px-2 py-0.5 rounded"
      style={{ background: 'rgba(26,71,42,0.6)', border: '1px solid rgba(82,183,136,0.2)' }}>
      <span className="font-mono text-[11px] tracking-wider text-white/30">{label}</span>
      <span className="font-mono text-[13px] text-court-light font-bold">{value}</span>
    </div>
  );
}
