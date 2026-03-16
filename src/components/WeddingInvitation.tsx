'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'idle' | 'envelope' | 'opening' | 'card';

interface WeddingInvitationProps {
  guestName?: string;
  onComplete: () => void;
}

const W = 340;
const H = 230;
const FLAP_H = 148;

// Deterministic ambient particles
const PARTICLES = [
  { x: '7%',  y: '18%', s: 2,   d: 3.2, delay: 0,   gold: true  },
  { x: '19%', y: '67%', s: 1.5, d: 2.8, delay: 0.5, gold: false },
  { x: '31%', y: '12%', s: 1,   d: 3.5, delay: 1.1, gold: false },
  { x: '45%', y: '82%', s: 2.5, d: 2.5, delay: 0.3, gold: true  },
  { x: '58%', y: '25%', s: 1.5, d: 3.0, delay: 0.8, gold: false },
  { x: '72%', y: '74%', s: 2,   d: 2.8, delay: 1.4, gold: true  },
  { x: '86%', y: '40%', s: 1,   d: 3.3, delay: 0.6, gold: false },
  { x: '93%', y: '88%', s: 2,   d: 2.6, delay: 0.2, gold: true  },
  { x: '14%', y: '50%', s: 1.5, d: 3.1, delay: 1.0, gold: false },
  { x: '66%', y: '10%', s: 2,   d: 2.9, delay: 0.7, gold: true  },
  { x: '80%', y: '55%', s: 1,   d: 3.4, delay: 1.3, gold: false },
  { x: '38%', y: '92%', s: 1.5, d: 2.7, delay: 0.4, gold: false },
  { x: '52%', y: '45%', s: 2.5, d: 3.0, delay: 0.9, gold: true  },
  { x: '25%', y: '30%', s: 1,   d: 3.6, delay: 1.5, gold: false },
  { x: '62%', y: '62%', s: 2,   d: 2.7, delay: 1.2, gold: true  },
];

export default function WeddingInvitation({ guestName, onComplete }: WeddingInvitationProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const name = guestName || 'You';

  useEffect(() => {
    const t = setTimeout(() => setPhase('envelope'), 500);
    return () => clearTimeout(t);
  }, []);

  const openEnvelope = () => {
    if (phase !== 'envelope') return;
    setPhase('opening');
    setTimeout(() => setPhase('card'), 1600);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 35%, #1c1408 0%, #080604 100%)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient gold particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.s,
              height: p.s,
              borderRadius: '50%',
              background: p.gold ? '#d4af37' : '#f5f0e0',
            }}
            animate={{ opacity: [0.08, 0.45, 0.08], y: [0, -10, 0] }}
            transition={{ duration: p.d, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── ENVELOPE PHASE ── */}
        {(phase === 'envelope' || phase === 'opening') && (
          <motion.div
            key="envelope-scene"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.45 } }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="flex flex-col items-center gap-7"
          >
            {/* Recipient label */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.35em',
                  color: '#b89940',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                Kính Mời
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
                  color: '#f5f0e0',
                  letterSpacing: '0.06em',
                }}
              >
                {name}
              </p>
            </motion.div>

            {/* Envelope */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 }}
              style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.65))' }}
            >
              <EnvelopeComp isOpening={phase === 'opening'} onClick={openEnvelope} />
            </motion.div>

            {/* Click hint */}
            <AnimatePresence>
              {phase === 'envelope' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.28em',
                    color: '#b89940',
                    textTransform: 'uppercase',
                  }}
                >
                  ✦ Nhấn để mở ✦
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── CARD PHASE ── */}
        {phase === 'card' && (
          <InvitationCard key="card" name={name} onComplete={onComplete} />
        )}
      </AnimatePresence>

      {/* Skip */}
      <button
        onClick={onComplete}
        className="absolute bottom-6 right-6 font-mono text-xs tracking-widest uppercase transition-colors"
        style={{ color: 'rgba(255,255,255,0.18)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.18)'; }}
      >
        BỎ QUA →
      </button>
    </motion.div>
  );
}

/* ─── Envelope ─────────────────────────────────────────── */

function EnvelopeComp({ isOpening, onClick }: { isOpening: boolean; onClick: () => void }) {
  return (
    <div
      style={{ width: W, height: H, position: 'relative', cursor: 'pointer' }}
      onClick={onClick}
    >
      {/* Static body SVG */}
      <svg
        width={W}
        height={H}
        style={{ position: 'absolute', top: 0, left: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width={W} height={H} fill="#f5eed8" rx="3" />
        {/* Diamond fold lines */}
        <line x1={0}   y1={0}   x2={W / 2} y2={H / 2} stroke="#ddd0a8" strokeWidth="1" />
        <line x1={W}   y1={0}   x2={W / 2} y2={H / 2} stroke="#ddd0a8" strokeWidth="1" />
        <line x1={0}   y1={H}   x2={W / 2} y2={H / 2} stroke="#ddd0a8" strokeWidth="1" />
        <line x1={W}   y1={H}   x2={W / 2} y2={H / 2} stroke="#ddd0a8" strokeWidth="1" />
        {/* Gold outer border */}
        <rect x="0" y="0" width={W} height={H} fill="none" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.55" rx="3" />
        {/* Gold inner border */}
        <rect x="7" y="7" width={W - 14} height={H - 14} fill="none" stroke="#c8a84b" strokeWidth="0.4" strokeOpacity="0.3" rx="1.5" />
      </svg>

      {/* Flap with 3D open animation */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: W, perspective: '700px' }}>
        <motion.div
          style={{
            width: W,
            height: FLAP_H,
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
          }}
          animate={{ rotateX: isOpening ? -178 : 0 }}
          transition={{ duration: 1.05, ease: [0.4, 0, 0.2, 1] }}
        >
          <svg
            width={W}
            height={FLAP_H}
            style={{ display: 'block' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Flap triangle */}
            <polygon points={`0,0 ${W},0 ${W / 2},${FLAP_H}`} fill="#ede3be" />
            {/* Fold shadow lines */}
            <line x1={0} y1={0} x2={W / 2} y2={FLAP_H} stroke="#ddd0a8" strokeWidth="1" />
            <line x1={W} y1={0} x2={W / 2} y2={FLAP_H} stroke="#ddd0a8" strokeWidth="1" />
            {/* Gold outline */}
            <polygon
              points={`0,0 ${W},0 ${W / 2},${FLAP_H}`}
              fill="none"
              stroke="#c8a84b"
              strokeWidth="0.5"
              strokeOpacity="0.45"
            />
          </svg>

          {/* Wax seal centered on flap */}
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }}
          >
            <WaxSeal />
          </div>
        </motion.div>
      </div>

      {/* Card peeking out as flap opens */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -48, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.55, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: 10,
              left: 18,
              right: 18,
              height: 58,
              background: 'linear-gradient(to bottom, #fffef8, #faf6e8)',
              borderRadius: 2,
              border: '1px solid #e0d090',
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 11,
                letterSpacing: '0.22em',
                color: '#8B7040',
                textTransform: 'uppercase',
              }}
            >
              Wedding Invitation
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WaxSeal() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23" cy="23" r="21" fill="#7a1515" />
      <circle cx="23" cy="23" r="21" fill="none" stroke="#c8a84b" strokeWidth="1.2" strokeOpacity="0.7" />
      <circle cx="23" cy="23" r="15" fill="#8b1a1a" />
      {/* Cross pattern */}
      <line x1="23" y1="11" x2="23" y2="35" stroke="#f5eed8" strokeWidth="1.2" strokeOpacity="0.85" />
      <line x1="11" y1="23" x2="35" y2="23" stroke="#f5eed8" strokeWidth="1.2" strokeOpacity="0.85" />
      <line x1="15" y1="15" x2="31" y2="31" stroke="#f5eed8" strokeWidth="0.7" strokeOpacity="0.5" />
      <line x1="31" y1="15" x2="15" y2="31" stroke="#f5eed8" strokeWidth="0.7" strokeOpacity="0.5" />
      <circle cx="23" cy="23" r="2.8" fill="#f5eed8" fillOpacity="0.9" />
      <circle cx="23" cy="23" r="18" fill="none" stroke="#c8a84b" strokeWidth="0.5" strokeOpacity="0.4" />
    </svg>
  );
}

/* ─── Invitation Card ───────────────────────────────────── */

function InvitationCard({ name, onComplete }: { name: string; onComplete: () => void }) {
  const corners = [
    { top: 10,    left: 10,  rotate: 0   },
    { top: 10,    right: 10, rotate: 90  },
    { bottom: 10, right: 10, rotate: 180 },
    { bottom: 10, left: 10,  rotate: 270 },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 55, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      style={{
        position: 'relative',
        width: 'min(92vw, 460px)',
        background: 'linear-gradient(160deg, #fffef8 0%, #faf5e4 100%)',
        border: '1px solid rgba(200,168,75,0.6)',
        borderRadius: 3,
        padding: 'clamp(28px, 5vw, 48px) clamp(24px, 5vw, 44px)',
        boxShadow: '0 28px 80px rgba(0,0,0,0.75), 0 0 0 8px rgba(200,168,75,0.08)',
        textAlign: 'center',
      }}
    >
      {/* Corner ornaments */}
      {corners.map((c, i) => (
        <div key={i} style={{ position: 'absolute', ...c as Record<string, number | string>, transform: `rotate(${c.rotate}deg)` }}>
          <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <polyline points="0,14 0,0 14,0" fill="none" stroke="#c8a84b" strokeWidth="1" strokeOpacity="0.65" />
            <circle cx="0" cy="0" r="1.5" fill="#c8a84b" fillOpacity="0.65" />
          </svg>
        </div>
      ))}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.38em',
            color: '#8B7040',
            textTransform: 'uppercase',
          }}
        >
          Championship Wedding Match · 2026
        </p>
        <GoldDivider />
      </motion.div>

      {/* Kính mời + guest name */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ margin: '14px 0 10px' }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#6b5535', letterSpacing: '0.08em' }}>
          Trân trọng kính mời
        </p>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 4vw, 1.7rem)',
            color: '#1e1208',
            letterSpacing: '0.06em',
            marginTop: 5,
          }}
        >
          {name}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#6b5535', marginTop: 8, lineHeight: 1.7 }}>
          đến tham dự lễ thành hôn của
        </p>
      </motion.div>

      {/* Couple names */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, type: 'spring', stiffness: 90 }}
        style={{ margin: '16px 0' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
            color: '#100900',
            lineHeight: 1.05,
            letterSpacing: '0.03em',
          }}
        >
          Minh Khoa
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #c8a84b 80%)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#c8a84b', letterSpacing: '0.15em' }}>&amp;</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #c8a84b 80%)' }} />
        </div>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
            color: '#100900',
            lineHeight: 1.05,
            letterSpacing: '0.03em',
          }}
        >
          Thanh Vy
        </p>
      </motion.div>

      {/* Date & venue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <GoldDivider />
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            letterSpacing: '0.38em',
            color: '#7a6030',
            marginTop: 12,
          }}
        >
          18 · 04 · 2026
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#8B7040', marginTop: 6, letterSpacing: '0.04em' }}>
          Thành phố Hồ Chí Minh
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{ marginTop: 28 }}
      >
        <button
          onClick={onComplete}
          style={{
            background: 'linear-gradient(135deg, #b8922a 0%, #e8c860 50%, #b8922a 100%)',
            color: '#1a0e00',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            padding: '13px 32px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: 2,
            textTransform: 'uppercase',
            boxShadow: '0 4px 20px rgba(184,146,42,0.35)',
          }}
        >
          Vào xem thiệp cưới →
        </button>
      </motion.div>
    </motion.div>
  );
}

function GoldDivider() {
  return (
    <div
      style={{
        height: 1,
        background: 'linear-gradient(to right, transparent, #c8a84b 40%, #c8a84b 60%, transparent)',
        margin: '12px auto',
        width: '75%',
        opacity: 0.6,
      }}
    />
  );
}
