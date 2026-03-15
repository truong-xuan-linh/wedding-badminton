'use client';

import { motion } from 'framer-motion';
import ShuttlecockSVG from './ShuttlecockSVG';
import { weddingData } from '@/lib/weddingData';

export default function Footer() {
  const { groom, bride, wedding } = weddingData;

  return (
    <footer className="relative overflow-hidden"
      style={{ background: '#020a05' }}>
      {/* Top court line */}
      <div className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #1a472a 30%, #52b788 50%, #1a472a 70%, transparent)' }} />

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        {/* Main footer content */}
        <div className="text-center mb-10">
          {/* Shuttlecock logo */}
          <motion.div
            className="flex justify-center mb-4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <ShuttlecockSVG size={44} color="#2d6a4f" />
          </motion.div>

          {/* Names */}
          <div className="display-lg text-white uppercase mb-2">
            {groom.name}
            <span style={{ color: '#2d6a4f', margin: '0 0.3em' }}>×</span>
            {bride.name}
          </div>

          {/* Date */}
          <div className="font-mono text-sm tracking-[0.5em] text-court-light/50 mb-6">
            {wedding.dateDisplay} · {wedding.dayOfWeek}
          </div>

          {/* Divider */}
          <div className="court-line max-w-xs mx-auto mb-6" />

          {/* Quote */}
          <blockquote className="font-body text-sm italic text-white/35 max-w-sm mx-auto leading-relaxed">
            "Hành trình một nghìn dặm bắt đầu từ một bước chân.
            <br />
            Hành trình của chúng tôi bắt đầu từ một cú giao cầu."
          </blockquote>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-court/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <div className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase">
            The Championship Match · Wedding Series 2026
          </div>

          {/* Social (mock) */}
          <div className="flex items-center gap-4">
            {['Instagram', 'Facebook'].map((s) => (
              <button
                key={s}
                className="font-mono text-[9px] tracking-widest text-court-light/30 hover:text-court-light/70 uppercase transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase">
            Made with 🏸 & ❤️
          </div>
        </div>
      </div>

      {/* Corner jersey numbers */}
      <div className="absolute bottom-0 left-4 font-mono text-[8rem] font-bold leading-none pointer-events-none select-none"
        style={{ color: 'rgba(26,71,42,0.15)', fontFamily: 'var(--font-display)', lineHeight: 0.8 }}>
        09
      </div>
      <div className="absolute bottom-0 right-4 font-mono text-[8rem] font-bold leading-none pointer-events-none select-none text-right"
        style={{ color: 'rgba(26,71,42,0.15)', fontFamily: 'var(--font-display)', lineHeight: 0.8 }}>
        17
      </div>
    </footer>
  );
}
