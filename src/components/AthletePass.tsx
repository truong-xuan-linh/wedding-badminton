'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ShuttlecockSVG from './ShuttlecockSVG';

interface AthletePassProps {
  guestName?: string;
}

export default function AthletePass({ guestName }: AthletePassProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const displayName = guestName
    ? decodeURIComponent(guestName)
    : null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (!displayName) return null;

  return (
    <section ref={ref} className="section-pad court-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-court-line" style={{ opacity: 0.15 }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-court-line" style={{ opacity: 0.15 }} />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5"
          style={{ fontFamily: 'var(--font-display)', fontSize: '20rem', color: '#52b788', lineHeight: 1 }}>
          VIP
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="font-mono text-[10px] tracking-[0.4em] text-court-light/50 uppercase mb-2">
            ◆ VIP Court Access ◆
          </div>
          <h2 className="display-md text-white uppercase">
            Athlete Pass
          </h2>
        </motion.div>

        {/* The Pass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: -20 }}
          animate={visible ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 80 }}
          className="athlete-pass rounded-none mx-auto"
          style={{
            maxWidth: 480,
            perspective: '1000px',
          }}
        >
          {/* Top gold strip (from CSS ::before) */}
          <div className="h-1 w-full"
            style={{ background: 'linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b)' }} />

          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="font-mono text-[13px] tracking-[0.4em] uppercase mb-1"
                  style={{ color: 'rgba(245,158,11,0.6)' }}>
                  The Championship Match 2026
                </div>
                <div className="font-heading font-bold text-xs tracking-[0.2em] uppercase text-white/50">
                  Badminton Wedding Series
                </div>
              </div>
              <div className="flex-shrink-0">
                <ShuttlecockSVG size={28} color="#f59e0b" />
              </div>
            </div>

            {/* Main content */}
            <div className="flex gap-5 items-start">
              {/* Photo placeholder */}
              <div className="flex-shrink-0">
                <div className="w-20 h-24 relative overflow-hidden"
                  style={{ border: '2px solid rgba(245,158,11,0.4)' }}>
                  <Image
                    src="/4.webp"
                    alt="Guest pass photo"
                    width={160}
                    height={192}
                    quality={90}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Badge overlay */}
                  <div className="absolute bottom-0 left-0 right-0 py-0.5 text-center"
                    style={{ background: 'rgba(245,158,11,0.85)' }}>
                    <div className="font-mono text-[7px] tracking-widest text-court-dark font-bold">GUEST</div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                {/* Guest name */}
                <div className="mb-1">
                  <div className="font-mono text-[13px] tracking-widest uppercase mb-1"
                    style={{ color: 'rgba(148,210,173,0.5)' }}>
                    Kính Mời
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={visible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="font-heading font-bold uppercase leading-tight"
                    style={{
                      color: '#fcd34d',
                      fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                      textShadow: '0 0 20px rgba(252,211,77,0.3)',
                    }}
                  >
                    {displayName}
                  </motion.div>
                </div>

                {/* Access level */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="px-2 py-0.5 font-mono text-[13px] tracking-widest uppercase"
                    style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', color: '#fcd34d' }}>
                    VIP ACCESS
                  </div>
                  <div className="px-2 py-0.5 font-mono text-[13px] tracking-widest uppercase"
                    style={{ background: 'rgba(82,183,136,0.1)', border: '1px solid rgba(82,183,136,0.3)', color: '#52b788' }}>
                    ALL AREAS
                  </div>
                </div>

                {/* Event */}
                <div className="mt-3">
                  <div className="font-mono text-[13px] text-white/30 tracking-wider">SỰ KIỆN</div>
                  <div className="font-heading text-sm font-semibold text-white/80 tracking-wider">
                    Lễ Cưới Minh Khoa & Thanh Vy
                  </div>
                  <div className="font-mono text-[13px] tracking-wider mt-0.5 text-court-light/60">
                    18.04.2026 · White Palace · TP.HCM
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 court-line" />

            {/* Bottom info & barcode */}
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="font-mono text-[13px] text-white/30 tracking-wider mb-1">GHI CHÚ</div>
                <div className="font-body text-xs text-white/50 italic leading-relaxed">
                  "Chúng tôi rất trân trọng sự hiện diện<br />
                  của bạn trong ngày trọng đại nhất."
                </div>
              </div>
              {/* Fake barcode */}
              <div className="flex-shrink-0 flex flex-col items-center gap-1">
                <div className="flex items-end gap-[1.5px]">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white/60"
                      style={{
                        width: i % 3 === 0 ? 2 : 1,
                        height: 24 + (i % 5) * 4,
                      }}
                    />
                  ))}
                </div>
                <div className="font-mono text-[7px] tracking-[0.3em] text-white/30">
                  MK·TV·2026
                </div>
              </div>
            </div>
          </div>

          {/* Floating animation hint */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-3 top-8 opacity-40"
          >
            <ShuttlecockSVG size={20} color="#f59e0b" />
          </motion.div>
        </motion.div>

        {/* Message below */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-6 font-body text-sm text-white/40 italic"
        >
          Bạn được mời tham dự trận chung kết cuộc đời của chúng tôi 🏸
        </motion.p>
      </div>
    </section>
  );
}
