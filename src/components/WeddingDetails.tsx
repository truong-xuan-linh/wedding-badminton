'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ShuttlecockSVG from './ShuttlecockSVG';
import { weddingData } from '@/lib/weddingData';

const { wedding } = weddingData;

const events = [
  {
    id: 'ceremony',
    icon: '⛪',
    label: 'Lễ Cưới',
    tag: 'CEREMONY',
    time: wedding.ceremony.time,
    venue: wedding.ceremony.venue,
    address: wedding.ceremony.address,
    color: '#52b788',
    mapQuery: encodeURIComponent(wedding.ceremony.address),
  },
  {
    id: 'reception',
    icon: '🏛️',
    label: 'Tiệc Cưới',
    tag: 'RECEPTION',
    time: wedding.reception.time,
    venue: wedding.reception.venue,
    address: wedding.reception.address,
    extra: wedding.reception.hall,
    color: '#f59e0b',
    mapQuery: encodeURIComponent(wedding.reception.address),
  },
  {
    id: 'afterparty',
    icon: '🥂',
    label: 'After Party',
    tag: 'AFTER PARTY',
    time: wedding.afterparty.time,
    venue: wedding.afterparty.venue,
    address: wedding.afterparty.address,
    color: '#74c69d',
    mapQuery: encodeURIComponent(wedding.afterparty.address),
  },
];

export default function WeddingDetails() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

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
      className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d2b18 0%, #071a0e 100%)' }}
    >
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="font-mono text-[10px] tracking-[0.5em] uppercase text-court-light/40 mb-3">
            ◆ Match Schedule ◆
          </div>
          <h2 className="display-md text-white uppercase mb-2">
            Thông Tin Sự Kiện
          </h2>
          <div className="font-mono text-xs tracking-widest text-white/30">
            {wedding.dayOfWeek} · {wedding.dateDisplay}
          </div>
        </motion.div>

        {/* Date bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={visible ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-10 glass-card-gold px-6 py-4 flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <ShuttlecockSVG size={28} color="#f59e0b" />
            <div>
              <div className="font-mono text-[9px] tracking-widest text-white/40 uppercase">Ngày Cưới</div>
              <div className="font-heading font-bold text-xl uppercase tracking-wider" style={{ color: '#fcd34d' }}>
                {wedding.dateDisplay}
              </div>
            </div>
          </div>
          <div className="font-mono text-sm tracking-widest text-white/60 uppercase">
            {wedding.dayOfWeek}
          </div>
          <div className="flex items-center gap-2">
            <div className="live-badge">
              <div className="live-dot" />
              SAVE THE DATE
            </div>
          </div>
        </motion.div>

        {/* Event cards */}
        <div className="space-y-4">
          {events.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center"
        >
          <div className="court-line-full max-w-sm mx-auto mb-4" />
          <p className="font-body text-sm text-white/35 italic max-w-md mx-auto">
            Sự hiện diện của bạn là món quà ý nghĩa nhất với chúng tôi.<br />
            Rất mong được đón tiếp bạn trong ngày trọng đại này! 🏸
          </p>
          <div className="mt-4 font-mono text-xs tracking-[0.3em] text-court-light/40 uppercase">
            Minh Khoa & Thanh Vy
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EventCard({
  event,
  index,
  visible,
}: {
  event: typeof events[0];
  index: number;
  visible: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
    >
      <div
        className="glass-card overflow-hidden cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
        style={{ borderColor: expanded ? `${event.color}40` : 'rgba(82,183,136,0.15)' }}
      >
        {/* Main row */}
        <div className="flex items-center gap-4 p-4 md:p-5">
          {/* Left: Time column */}
          <div className="flex-shrink-0 text-center"
            style={{ minWidth: 70 }}>
            <div className="font-mono text-[8px] tracking-widest text-white/25 uppercase mb-0.5">Giờ</div>
            <div className="font-mono font-bold text-sm led-text">{event.time}</div>
          </div>

          {/* Divider */}
          <div className="w-px h-10 flex-shrink-0"
            style={{ background: `${event.color}30` }} />

          {/* Center: Event info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="px-2 py-0.5 font-mono text-[8px] tracking-[0.2em] uppercase"
                style={{ background: `${event.color}20`, border: `1px solid ${event.color}40`, color: event.color }}>
                {event.tag}
              </div>
            </div>
            <div className="font-heading font-bold text-sm md:text-base uppercase tracking-wider text-white">
              {event.icon} {event.label}
            </div>
            <div className="font-body text-xs text-white/50 mt-0.5 truncate">{event.venue}</div>
          </div>

          {/* Right: Expand toggle */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6 flex items-center justify-center rounded-full"
              style={{ border: `1px solid ${event.color}40`, color: event.color }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Expanded details */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="px-5 pb-5 pt-2"
            style={{ borderTop: `1px solid ${event.color}20` }}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <InfoRow label="Địa Điểm" value={event.venue} color={event.color} />
                <InfoRow label="Địa Chỉ" value={event.address} color={event.color} />
                {event.extra && <InfoRow label="Phòng / Hội Trường" value={event.extra} color={event.color} />}
                <InfoRow label="Thời Gian" value={event.time + ' · ' + weddingData.wedding.dateDisplay} color={event.color} />
              </div>
              <div className="flex flex-col gap-2 justify-end">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${event.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="btn-court px-4 py-2 text-xs text-center"
                  style={{ borderColor: event.color, color: event.color }}
                >
                  📍 XEM BẢN ĐỒ
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function InfoRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="mb-2">
      <div className="font-mono text-[8px] tracking-widest uppercase mb-0.5"
        style={{ color: `${color}80` }}>
        {label}
      </div>
      <div className="font-body text-sm text-white/70">{value}</div>
    </div>
  );
}
