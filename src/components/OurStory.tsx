'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ShuttlecockSVG from './ShuttlecockSVG';
import { weddingData } from '@/lib/weddingData';

export default function OurStory() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="story"
      className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #071a0e 0%, #030f07 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%">
          <text
            x="50%" y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontFamily: 'var(--font-display)', fontSize: '40vw', fill: '#2d6a4f' }}
            fillOpacity="0.3"
          >
            MK
          </text>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10" id="story">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-[10px] tracking-[0.5em] uppercase text-court-light/40 mb-3">
            ◆ Match History ◆
          </div>
          <h2 className="display-md text-white uppercase mb-2">
            Our Story
          </h2>
          <div className="font-mono text-xs tracking-widest text-white/30">
            From first serve to forever
          </div>
          <div className="court-line-full mt-6 max-w-xs mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(180deg, transparent, #2d6a4f 10%, #2d6a4f 90%, transparent)' }}
          />

          {weddingData.story.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <StoryCard
                key={item.year}
                item={item}
                index={index}
                isLeft={isLeft}
                visible={visible}
              />
            );
          })}
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block glass-card-gold px-8 py-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <ShuttlecockSVG size={20} color="#f59e0b" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: '#f59e0b' }}>
                Game, Set & Match
              </span>
              <ShuttlecockSVG size={20} color="#f59e0b" rotate={180} />
            </div>
            <p className="font-body text-white/70 italic text-sm leading-relaxed max-w-md">
              "Và tất cả những điều đó đã dẫn đến một ngày trọng đại — ngày chúng tôi chính thức trở thành
              <span style={{ color: '#fcd34d' }}> đôi đối tác mãi mãi </span>
              trong trận đấu tuyệt vời nhất cuộc đời."
            </p>
            <div className="mt-3 font-mono text-xs tracking-widest text-white/30">
              — Minh Khoa & Thanh Vy
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StoryCard({
  item,
  index,
  isLeft,
  visible,
}: {
  item: (typeof weddingData.story)[0];
  index: number;
  isLeft: boolean;
  visible: boolean;
}) {
  const milestoneColors = ['#52b788', '#74c69d', '#f59e0b', '#fcd34d'];
  const color = milestoneColors[index % milestoneColors.length];

  return (
    <div className={`relative flex flex-col md:flex-row items-start gap-0 mb-12 last:mb-0 ${!isLeft ? 'md:flex-row-reverse' : ''}`}>
      {/* Content side */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.15 + 0.2, duration: 0.6, type: 'spring' }}
        className="flex-1 md:max-w-[calc(50%-2rem)]"
      >
        <div className="glass-card p-5 md:p-7 hover:border-court-light/40 transition-all duration-300 group">
          {/* Event badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="px-2 py-0.5 font-mono text-[8px] tracking-[0.3em] uppercase font-bold"
              style={{ background: `${color}25`, border: `1px solid ${color}60`, color }}>
              {item.event}
            </div>
            <div className="h-px flex-1" style={{ background: `${color}30` }} />
          </div>

          {/* Year */}
          <div className="font-mono text-4xl font-bold leading-none mb-2"
            style={{
              color,
              textShadow: `0 0 20px ${color}40`,
              fontFamily: 'var(--font-display)',
            }}>
            {item.year}
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-lg uppercase tracking-wider text-white mb-2">
            {item.title}
          </h3>

          {/* Description */}
          <p className="font-body text-sm text-white/55 leading-relaxed">
            {item.desc}
          </p>

          {/* Hover photo preview */}
          <div className="mt-4 overflow-hidden"
            style={{ maxHeight: 180, borderTop: `1px solid ${color}25` }}>
            <div className="pt-3">
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={180}
                className="w-full object-cover object-top rounded-none grayscale group-hover:grayscale-0 transition-all duration-500"
                style={{ height: 160 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Center connector (desktop) */}
      <div className="hidden md:flex flex-col items-center justify-start w-16 flex-shrink-0 pt-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={visible ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.4, type: 'spring' }}
          className="w-10 h-10 rounded-full flex items-center justify-center z-10"
          style={{ background: `${color}20`, border: `2px solid ${color}`, boxShadow: `0 0 15px ${color}30` }}
        >
          <ShuttlecockSVG size={18} color={color} />
        </motion.div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block flex-1 md:max-w-[calc(50%-2rem)]" />
    </div>
  );
}
