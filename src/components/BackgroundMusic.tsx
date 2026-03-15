'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShuttlecockSVG from './ShuttlecockSVG';

export interface BackgroundMusicHandle {
  toggle: () => void;
  isPlaying: boolean;
}

const TRACK = {
  title: 'A Thousand Years',
  artist: 'Christina Perri',
  src: '/background-music.mp3', // user should place MP3 here
};

const BackgroundMusic = forwardRef<BackgroundMusicHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const audio = new Audio(TRACK.src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('error', () => {
      // Audio file not found — silent fail
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!hasInteracted) setHasInteracted(true);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000);
      });
      setIsPlaying(true);
    }
  };

  useImperativeHandle(ref, () => ({
    toggle,
    isPlaying,
  }));

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const formatTime = (t: number) => {
    if (!isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player">

      {/* Expanded player */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 glass-card-gold w-64 p-4"
          >
            {/* Track info */}
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <ShuttlecockSVG size={28} color="#f59e0b" />
              </motion.div>
              <div>
                <div className="font-heading font-semibold text-xs text-white truncate">{TRACK.title}</div>
                <div className="font-mono text-[9px] text-white/40 truncate">{TRACK.artist}</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-2">
              <div className="w-full h-1 rounded-full overflow-hidden"
                style={{ background: 'rgba(245,158,11,0.15)' }}>
                <div
                  className="h-full transition-all duration-1000"
                  style={{ width: `${progress}%`, background: '#f59e0b' }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[8px] text-white/30">{formatTime(currentTime)}</span>
                <span className="font-mono text-[8px] text-white/30">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
              <input
                type="range"
                min={0} max={1} step={0.05}
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 appearance-none cursor-pointer"
                style={{ accentColor: '#52b788' }}
              />
            </div>

            {/* Play/Pause button */}
            <button
              onClick={toggle}
              className="btn-gold w-full mt-3 py-2 text-xs"
            >
              {isPlaying ? '⏸ TẠM DỪNG' : '▶ PHÁT NHẠC'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main music button */}
      <motion.button
        className="music-btn relative"
        onClick={() => {
          setExpanded(!expanded);
          if (!expanded && !isPlaying) toggle();
        }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle music"
      >
        {isPlaying ? (
          <MusicPlayingAnimation />
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
        )}

        {/* Pulse ring when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ borderColor: '#52b788' }}
          />
        )}
      </motion.button>
    </div>
  );
});

BackgroundMusic.displayName = 'BackgroundMusic';
export default BackgroundMusic;

function MusicPlayingAnimation() {
  return (
    <div className="flex items-end gap-[3px] h-5">
      {[4, 6, 5, 7, 4].map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ background: '#52b788' }}
          animate={{ height: [`${h * 2}px`, `${(h + 4) * 2}px`, `${h * 2}px`] }}
          transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
