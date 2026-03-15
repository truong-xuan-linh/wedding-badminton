'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ShuttlecockSVG from './ShuttlecockSVG';
import { weddingData } from '@/lib/weddingData';

const TARGET_DATE = new Date(weddingData.wedding.dateISO).getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = TARGET_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft());
  const [visible, setVisible] = useState(false);
  const [prevTime, setPrevTime] = useState<TimeLeft>(getTimeLeft());
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevTime(time);
      setTime(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const isOver = TARGET_DATE <= Date.now();

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d2b18 0%, #071a0e 100%)' }}
    >
      {/* Court net decoration */}
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #2d6a4f 20%, #52b788 50%, #2d6a4f 80%, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #1a472a, transparent)' }} />

      {/* Background shuttlecock watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-3">
        <ShuttlecockSVG size={400} color="#52b788" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="shuttle-divider max-w-md mx-auto mb-4">
            <ShuttlecockSVG size={20} color="#f59e0b" />
          </div>
          <div className="font-mono text-[10px] tracking-[0.5em] uppercase text-court-light/50 mb-3">
            Match Countdown
          </div>
          <h2 className="display-md text-white uppercase">
            Đếm Ngược Đến
            <br />
            <span className="text-gradient-gold">Ngày Trọng Đại</span>
          </h2>
          <p className="mt-3 font-body text-sm text-white/40 tracking-wider">
            {weddingData.wedding.dayOfWeek} · {weddingData.wedding.dateDisplay}
          </p>
        </motion.div>

        {isOver ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, type: 'spring' }}
            className="text-center"
          >
            <div className="display-lg text-gradient-gold uppercase">
              🏆 The Match Has Begun! 🏆
            </div>
            <p className="mt-4 font-mono text-court-light tracking-widest">
              GAME · SET · MATCH
            </p>
          </motion.div>
        ) : (
          <>
            {/* Countdown digits */}
            <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
              {[
                { value: time.days, label: 'NGÀY', prev: prevTime.days },
                { value: time.hours, label: 'GIỜ', prev: prevTime.hours },
                { value: time.minutes, label: 'PHÚT', prev: prevTime.minutes },
                { value: time.seconds, label: 'GIÂY', prev: prevTime.seconds },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  {/* Digit box */}
                  <div className="countdown-digit w-full aspect-square flex items-center justify-center relative overflow-hidden rounded-none">
                    {/* Flip animation when value changes */}
                    <motion.div
                      key={item.value}
                      initial={{ y: '-50%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span
                        className="font-mono font-bold leading-none"
                        style={{ fontSize: 'clamp(1.8rem, 6vw, 3.5rem)' }}
                      >
                        {pad(item.value)}
                      </span>
                    </motion.div>
                    {/* Divider line (flip clock effect) */}
                    <div className="absolute top-1/2 left-0 right-0 h-px"
                      style={{ background: 'rgba(82,183,136,0.2)', transform: 'translateY(-50%)' }} />
                    {/* Corner accent */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l"
                      style={{ borderColor: 'rgba(82,183,136,0.3)' }} />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r"
                      style={{ borderColor: 'rgba(82,183,136,0.3)' }} />
                  </div>
                  {/* Label */}
                  <div className="mt-2 font-mono text-[13px] md:text-[10px] tracking-[0.3em] text-white/35 uppercase">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress dots (tennis match points style) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center justify-center gap-3"
            >
              <div className="font-mono text-[13px] tracking-widest text-white/30">SETS</div>
              {['LOVE', '15', '30', '40', 'GAME'].map((point, i) => (
                <div key={point} className="flex flex-col items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: i < 3 ? '#52b788' : 'rgba(82,183,136,0.2)',
                      boxShadow: i < 3 ? '0 0 6px rgba(82,183,136,0.5)' : 'none',
                    }}
                  />
                  <div className="font-mono text-[7px] tracking-wider text-white/25">{point}</div>
                </div>
              ))}
            </motion.div>
          </>
        )}

        {/* Wedding date display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 glass-card">
            <span className="font-mono text-xs tracking-[0.3em] text-white/40">NGÀY CƯỚI</span>
            <span className="font-mono text-lg font-bold led-gold tracking-[0.2em]">
              {weddingData.wedding.dateDisplay}
            </span>
            <span className="font-mono text-xs tracking-[0.3em] text-white/40">
              {weddingData.wedding.dayOfWeek.toUpperCase()}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
