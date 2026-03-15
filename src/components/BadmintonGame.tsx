'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { weddingData } from '@/lib/weddingData';

const { groom, bride } = weddingData;

type PlayerSide = 'groom' | 'bride';
type Shot = 'smash' | 'drop' | 'lob';
type GamePhase = 'select' | 'playing' | 'gameover';

const WIN_SCORE = 5;

const SHOTS: Array<{ type: Shot; label: string; icon: string; beats: string; color: string }> = [
  { type: 'smash', label: 'SMASH',    icon: '💥', beats: 'DROP',  color: '#ef4444' },
  { type: 'drop',  label: 'DROP SHOT',icon: '🪶', beats: 'LOB',   color: '#52b788' },
  { type: 'lob',   label: 'LOB',      icon: '⬆️', beats: 'SMASH', color: '#f59e0b' },
];

const WINS_AGAINST: Record<Shot, Shot> = {
  smash: 'drop',
  drop:  'lob',
  lob:   'smash',
};

type RallyMsg = { text: string; outcome: 'win' | 'lose' | 'tie' };
const RALLY_MSGS: Record<Shot, Record<Shot, RallyMsg>> = {
  smash: {
    drop:  { text: 'SMASH đập nát Drop Shot! Điểm rồi! 💥',            outcome: 'win'  },
    smash: { text: 'Cả hai đều SMASH! Cầu rơi lưới — hòa! 🤝',         outcome: 'tie'  },
    lob:   { text: 'Lob né tránh được SMASH! Đối thủ lấy điểm! 😱',    outcome: 'lose' },
  },
  drop: {
    lob:   { text: 'Drop Shot cắt Lob ngay lưới! Thắng điểm! 🪶',       outcome: 'win'  },
    drop:  { text: 'Cùng thả Drop Shot — cầu lơ lửng, hòa! 🤝',         outcome: 'tie'  },
    smash: { text: 'SMASH đối thủ quá mạnh! Mất điểm rồi! 😵',          outcome: 'lose' },
  },
  lob: {
    smash: { text: 'Lob đẩy đối thủ ra sân sau! Điểm đẹp! ⬆️',          outcome: 'win'  },
    lob:   { text: 'Cùng Lob — cầu bay cao mãi, hòa! 🤝',               outcome: 'tie'  },
    drop:  { text: 'Drop Shot kéo Lob xuống lưới! Mất điểm! 😬',         outcome: 'lose' },
  },
};

const WIN_MSGS = [
  'BẠN LÀ NÓC NHÀ! 👑 Nắm giữ remote TV từ hôm nay!',
  'CHIẾN THẮNG! 🏆 Toàn quyền quyết định ăn gì tối nay!',
  'NÓC NHÀ ĐÃ CÓ CHỦ! 👑 Chìa khóa tủ lạnh thuộc về bạn!',
];
const LOSE_MSGS = [
  'Chịu thua rồi... 😅 Để người kia làm nóc nhà một bữa!',
  'Thất bại vẻ vang! 😄 Nhưng trong tim bạn vẫn là số 1!',
  'Cứ thua đi — bạn vẫn là nóc nhà trong tình yêu! ❤️',
];

function randomShot(): Shot {
  const s: Shot[] = ['smash', 'drop', 'lob'];
  return s[Math.floor(Math.random() * 3)];
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function BadmintonGame() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<GamePhase>('select');
  const [side, setSide] = useState<PlayerSide | null>(null);
  const [playerPts, setPlayerPts] = useState(0);
  const [opponentPts, setOpponentPts] = useState(0);
  const [lastRally, setLastRally] = useState<RallyMsg | null>(null);
  const [shuttleX, setShuttleX] = useState(50);
  const [shuttleY, setShuttleY] = useState(50);
  const [locked, setLocked] = useState(false);
  const [finalMsg, setFinalMsg] = useState('');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const playerInfo   = side === 'groom' ? groom : bride;
  const opponentInfo = side === 'groom' ? bride : groom;
  const playerColor  = side === 'groom' ? '#f59e0b' : '#52b788';
  const oppColor     = side === 'groom' ? '#52b788' : '#f59e0b';

  function selectSide(s: PlayerSide) {
    setSide(s);
    setPlayerPts(0);
    setOpponentPts(0);
    setLastRally(null);
    setShuttleX(50);
    setShuttleY(50);
    setPhase('playing');
  }

  function handleShot(shot: Shot) {
    if (locked) return;
    const oppShot = randomShot();
    const result = RALLY_MSGS[shot][oppShot];
    setLastRally(result);
    setLocked(true);

    // Animate shuttle to winner's side
    if (result.outcome === 'win') {
      setShuttleX(20 + Math.random() * 60);
      setShuttleY(12);
    } else if (result.outcome === 'lose') {
      setShuttleX(20 + Math.random() * 60);
      setShuttleY(88);
    } else {
      setShuttleX(50);
      setShuttleY(50);
    }

    setTimeout(() => {
      const np = playerPts   + (result.outcome === 'win'  ? 1 : 0);
      const no = opponentPts + (result.outcome === 'lose' ? 1 : 0);
      setPlayerPts(np);
      setOpponentPts(no);
      setLocked(false);

      if (np >= WIN_SCORE || no >= WIN_SCORE) {
        const msgs = np >= WIN_SCORE ? WIN_MSGS : LOSE_MSGS;
        setFinalMsg(msgs[Math.floor(Math.random() * msgs.length)]);
        setPhase('gameover');
      } else {
        // drift shuttle back to center
        setTimeout(() => { setShuttleX(50); setShuttleY(50); }, 400);
      }
    }, 1500);
  }

  function reset() {
    setPhase('select');
    setSide(null);
    setPlayerPts(0);
    setOpponentPts(0);
    setLastRally(null);
    setShuttleX(50);
    setShuttleY(50);
  }

  return (
    <section
      ref={ref}
      id="game"
      className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d2b18 0%, #030f07 100%)' }}
    >
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #f59e0b 30%, #fcd34d 50%, #f59e0b 70%, transparent)' }} />

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <div className="font-mono text-[10px] tracking-[0.5em] uppercase text-court-light/40 mb-3">
            ◆ Guest Challenge ◆
          </div>
          <h2 className="display-md text-white uppercase mb-2">
            Ai Là Nóc Nhà?
          </h2>
          <p className="font-body text-sm text-white/40 max-w-xs mx-auto">
            Chọn phe · Đánh đến 5 điểm · Chiến thắng làm nóc nhà!
          </p>
        </motion.div>

        {/* Game area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          <AnimatePresence mode="wait">
            {phase === 'select' && (
              <SelectPhase key="sel" onSelect={selectSide} />
            )}
            {phase === 'playing' && side && (
              <PlayingPhase
                key="play"
                playerInfo={playerInfo}
                opponentInfo={opponentInfo}
                playerColor={playerColor}
                oppColor={oppColor}
                playerPts={playerPts}
                opponentPts={opponentPts}
                lastRally={lastRally}
                shuttleX={shuttleX}
                shuttleY={shuttleY}
                locked={locked}
                onShot={handleShot}
              />
            )}
            {phase === 'gameover' && side && (
              <GameOverPhase
                key="over"
                playerWon={playerPts >= WIN_SCORE}
                playerInfo={playerInfo}
                opponentInfo={opponentInfo}
                playerColor={playerColor}
                oppColor={oppColor}
                playerPts={playerPts}
                opponentPts={opponentPts}
                message={finalMsg}
                onReset={reset}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Select Phase ────────────────────────────────────────────────────────────

function SelectPhase({ onSelect }: { onSelect: (s: PlayerSide) => void }) {
  const players = [
    { side: 'groom' as PlayerSide, info: groom, color: '#f59e0b', img: '/2.webp' },
    { side: 'bride' as PlayerSide, info: bride, color: '#52b788', img: '/1.webp' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <p className="font-mono text-[10px] tracking-[0.4em] text-white/35 uppercase text-center mb-6">
        Bạn sẽ chiến đấu cho ai?
      </p>

      {/* Player cards */}
      <div className="relative grid grid-cols-2 gap-5 mb-5">
        {players.map(({ side, info, color, img }) => (
          <motion.button
            key={side}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(side)}
            className="glass-card p-5 md:p-6 text-center group transition-all"
            style={{ borderColor: `${color}35` }}
          >
            {/* Avatar */}
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="w-full h-full rounded-full overflow-hidden border-2"
                style={{ borderColor: `${color}60` }}>
                <Image
                  src={img} alt={info.name}
                  width={80} height={80}
                  quality={90}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold"
                style={{ background: color, color: '#040d08' }}
              >
                {info.number}
              </div>
            </div>

            <div className="font-mono text-[9px] tracking-[0.3em] mb-1 uppercase" style={{ color }}>
              {info.position}
            </div>
            <div className="font-heading font-bold text-sm md:text-base uppercase tracking-wider text-white leading-tight mb-1">
              {info.name}
            </div>
            <div className="font-mono text-[9px] text-white/35 mb-4">{info.nickname}</div>

            <div
              className="py-1.5 font-mono text-[9px] tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ borderTop: `1px solid ${color}25`, color }}
            >
              Chọn phe này →
            </div>
          </motion.button>
        ))}

        {/* VS badge overlay */}
        <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-heading text-xs font-bold"
            style={{ background: '#030f07', border: '2px solid #2d6a4f', color: '#52b788' }}
          >
            VS
          </div>
        </div>
      </div>

      {/* Shot legend */}
      <div className="glass-card px-4 py-4">
        <div className="font-mono text-[9px] tracking-[0.35em] text-white/30 uppercase text-center mb-4">
          Luật chơi — kéo búa bao dạng cầu lông
        </div>
        <div className="flex justify-center gap-6 md:gap-10 text-center">
          {SHOTS.map(s => (
            <div key={s.type}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-mono text-[9px] tracking-wider uppercase font-bold" style={{ color: s.color }}>
                {s.label}
              </div>
              <div className="font-mono text-[8px] text-white/30 mt-0.5">
                thắng {s.beats}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center font-mono text-[8px] tracking-widest text-white/20 uppercase">
          Smash → Drop → Lob → Smash → ...
        </div>
      </div>
    </motion.div>
  );
}

// ─── Court View ──────────────────────────────────────────────────────────────

function CourtView({
  shuttleX,
  shuttleY,
  playerColor,
  oppColor,
}: {
  shuttleX: number;
  shuttleY: number;
  playerColor: string;
  oppColor: string;
}) {
  return (
    <div className="relative mx-auto" style={{ width: '100%', maxWidth: 200, aspectRatio: '5/7' }}>
      <svg
        className="w-full h-full"
        viewBox="0 0 200 280"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width="200" height="280" fill="#071a0e" rx="2" />

        {/* Zone tints */}
        <rect x="10" y="10" width="180" height="128" fill={oppColor} fillOpacity="0.04" />
        <rect x="10" y="142" width="180" height="128" fill={playerColor} fillOpacity="0.04" />

        {/* Outer boundary */}
        <rect x="10" y="10" width="180" height="260" fill="none" stroke="#2d6a4f" strokeWidth="1.5" />

        {/* Back service lines */}
        <line x1="10" y1="52"  x2="190" y2="52"  stroke="#1a472a" strokeWidth="0.8" strokeDasharray="5,4" />
        <line x1="10" y1="228" x2="190" y2="228" stroke="#1a472a" strokeWidth="0.8" strokeDasharray="5,4" />

        {/* Short service lines */}
        <line x1="10" y1="104" x2="190" y2="104" stroke="#1a472a" strokeWidth="1" />
        <line x1="10" y1="176" x2="190" y2="176" stroke="#1a472a" strokeWidth="1" />

        {/* Centre service line */}
        <line x1="100" y1="104" x2="100" y2="176" stroke="#1a472a" strokeWidth="1" />

        {/* NET */}
        <line x1="10" y1="140" x2="190" y2="140" stroke="#52b788" strokeWidth="2.5" />
        <text x="100" y="136" textAnchor="middle" fill="#52b788" fontSize="6"
          fontFamily="monospace" letterSpacing="3" opacity="0.45">NET</text>

        {/* Zone labels */}
        <text x="100" y="270" textAnchor="middle" fill={playerColor}
          fontSize="7" fontFamily="monospace" letterSpacing="2" opacity="0.5">BẠN</text>
        <text x="100" y="26" textAnchor="middle" fill={oppColor}
          fontSize="7" fontFamily="monospace" letterSpacing="2" opacity="0.5">ĐỐI THỦ</text>
      </svg>

      {/* Animated shuttlecock */}
      <motion.div
        className="absolute pointer-events-none select-none text-xl leading-none"
        animate={{ top: `${shuttleY}%`, left: `${shuttleX}%` }}
        transition={{ type: 'spring', stiffness: 90, damping: 13 }}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        🏸
      </motion.div>
    </div>
  );
}

// ─── Playing Phase ───────────────────────────────────────────────────────────

interface PlayingProps {
  playerInfo: typeof groom;
  opponentInfo: typeof bride;
  playerColor: string;
  oppColor: string;
  playerPts: number;
  opponentPts: number;
  lastRally: RallyMsg | null;
  shuttleX: number;
  shuttleY: number;
  locked: boolean;
  onShot: (s: Shot) => void;
}

function PlayingPhase({
  playerInfo, opponentInfo,
  playerColor, oppColor,
  playerPts, opponentPts,
  lastRally,
  shuttleX, shuttleY,
  locked, onShot,
}: PlayingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Scoreboard */}
      <div className="glass-card px-5 py-3 mb-4 flex items-center justify-between">
        <div className="text-center flex-1">
          <div className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ color: playerColor }}>
            {playerInfo.name}
          </div>
          <motion.div
            key={playerPts}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            className="font-mono text-4xl font-bold"
            style={{ color: playerColor, textShadow: `0 0 15px ${playerColor}60` }}
          >
            {playerPts}
          </motion.div>
        </div>

        <div className="flex flex-col items-center px-3 gap-1">
          <div className="font-mono text-[9px] tracking-[0.3em] text-white/25 uppercase">first to</div>
          <div className="font-mono text-lg font-bold text-white/30">{WIN_SCORE}</div>
        </div>

        <div className="text-center flex-1">
          <div className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ color: oppColor }}>
            {opponentInfo.name}
          </div>
          <motion.div
            key={opponentPts}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            className="font-mono text-4xl font-bold"
            style={{ color: oppColor, textShadow: `0 0 15px ${oppColor}60` }}
          >
            {opponentPts}
          </motion.div>
        </div>
      </div>

      {/* Court + info panel */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Court */}
        <div className="mx-auto md:mx-0 flex-shrink-0" style={{ width: 160 }}>
          <CourtView
            shuttleX={shuttleX}
            shuttleY={shuttleY}
            playerColor={playerColor}
            oppColor={oppColor}
          />
        </div>

        {/* Rally result + shot buttons */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Rally message */}
          <AnimatePresence mode="wait">
            {lastRally ? (
              <motion.div
                key={lastRally.text}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="glass-card p-4"
                style={{
                  borderColor:
                    lastRally.outcome === 'win'  ? `${playerColor}50` :
                    lastRally.outcome === 'lose' ? '#ef444450' : '#52b78840',
                }}
              >
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2 text-white/30">
                  Kết quả rally
                </div>
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  {lastRally.text}
                </p>
                <div
                  className="mt-2 font-mono text-[9px] font-bold tracking-wider uppercase"
                  style={{
                    color:
                      lastRally.outcome === 'win'  ? playerColor :
                      lastRally.outcome === 'lose' ? '#ef4444' : '#52b788',
                  }}
                >
                  {lastRally.outcome === 'win'  ? '▲ +1 điểm cho bạn!'  :
                   lastRally.outcome === 'lose' ? '▼ +1 điểm cho đối thủ' :
                   '◆ Hòa — không ai được điểm'}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card p-4 text-center"
              >
                <div className="text-2xl mb-2">🏸</div>
                <p className="font-body text-xs text-white/40 leading-relaxed">
                  Chọn cú đánh bên dưới để bắt đầu rally!<br />
                  Đối thủ sẽ phản công ngẫu nhiên.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shot buttons */}
          <div className="grid grid-cols-3 gap-2">
            {SHOTS.map((s) => (
              <motion.button
                key={s.type}
                whileHover={locked ? {} : { scale: 1.06, y: -3 }}
                whileTap={locked ? {} : { scale: 0.94 }}
                onClick={() => onShot(s.type)}
                disabled={locked}
                className="glass-card py-3 px-2 text-center transition-all"
                style={{
                  borderColor: locked ? 'rgba(82,183,136,0.1)' : `${s.color}45`,
                  cursor: locked ? 'not-allowed' : 'pointer',
                  opacity: locked ? 0.45 : 1,
                }}
              >
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="font-mono text-[9px] tracking-wider uppercase font-bold" style={{ color: s.color }}>
                  {s.label}
                </div>
                <div className="font-mono text-[7px] text-white/25 mt-0.5">
                  thắng {s.beats}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Point progress bars */}
      <div className="glass-card px-4 py-2 flex items-center gap-3">
        <div className="font-mono text-[8px] text-white/30 w-4 text-right">{playerPts}</div>
        <div className="flex-1 flex gap-0.5">
          {Array.from({ length: WIN_SCORE }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-2 transition-all duration-300"
              style={{
                background: i < playerPts ? playerColor : 'transparent',
                border: `1px solid ${playerColor}30`,
              }}
            />
          ))}
        </div>
        <div className="font-mono text-[8px] text-white/20 tracking-widest">VS</div>
        <div className="flex-1 flex gap-0.5 flex-row-reverse">
          {Array.from({ length: WIN_SCORE }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-2 transition-all duration-300"
              style={{
                background: i < opponentPts ? oppColor : 'transparent',
                border: `1px solid ${oppColor}30`,
              }}
            />
          ))}
        </div>
        <div className="font-mono text-[8px] text-white/30 w-4">{opponentPts}</div>
      </div>
    </motion.div>
  );
}

// ─── Game Over Phase ─────────────────────────────────────────────────────────

interface GameOverProps {
  playerWon: boolean;
  playerInfo: typeof groom;
  opponentInfo: typeof bride;
  playerColor: string;
  oppColor: string;
  playerPts: number;
  opponentPts: number;
  message: string;
  onReset: () => void;
}

function GameOverPhase({
  playerWon,
  playerInfo, opponentInfo,
  playerColor, oppColor,
  playerPts, opponentPts,
  message, onReset,
}: GameOverProps) {
  const accentColor = playerWon ? playerColor : oppColor;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 80 }}
      className="text-center"
    >
      {/* Trophy / Emoji */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: playerWon ? [-4, 4, -4, 0] : [0, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-7xl mb-5"
      >
        {playerWon ? '👑' : '😅'}
      </motion.div>

      {/* Result card */}
      <div className="glass-card-gold p-6 mb-5">
        <div
          className="font-mono text-[9px] tracking-[0.5em] uppercase mb-2"
          style={{ color: accentColor, opacity: 0.65 }}
        >
          {playerWon ? '🏆 Chúc Mừng Chiến Thắng!' : '— Cố lên lần sau! —'}
        </div>

        <h3
          className="display-md uppercase mb-1"
          style={{ color: accentColor }}
        >
          {playerWon ? 'Nóc Nhà!' : opponentInfo.name}
        </h3>

        <div className="font-body text-sm text-white/45 mb-5">
          {playerWon
            ? `${playerInfo.name} chính thức nắm quyền lực trong nhà!`
            : `${opponentInfo.name} thắng lần này — thách đấu lại ngay!`}
        </div>

        {/* Final score */}
        <div
          className="flex items-center justify-center gap-8 py-4 mb-4"
          style={{ borderTop: `1px solid ${accentColor}20`, borderBottom: `1px solid ${accentColor}20` }}
        >
          <div className="text-center">
            <div className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ color: playerColor, opacity: 0.7 }}>
              {playerInfo.name}
            </div>
            <div className="font-mono text-4xl font-bold" style={{ color: playerColor }}>{playerPts}</div>
          </div>
          <div className="font-mono text-xl text-white/20">:</div>
          <div className="text-center">
            <div className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ color: oppColor, opacity: 0.7 }}>
              {opponentInfo.name}
            </div>
            <div className="font-mono text-4xl font-bold" style={{ color: oppColor }}>{opponentPts}</div>
          </div>
        </div>

        <p className="font-body text-sm text-white/55 italic max-w-xs mx-auto leading-relaxed">
          {message}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="btn-court px-6 py-2.5 text-xs"
        >
          🏸 Chơi lại
        </motion.button>
      </div>

      <p className="mt-6 font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase">
        * Kết quả chỉ để vui — không có giá trị pháp lý! 😄
      </p>
    </motion.div>
  );
}
