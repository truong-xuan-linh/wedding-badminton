'use client';

import { useState, useEffect } from 'react';
import ShuttlecockSVG from './ShuttlecockSVG';

const navLinks = [
  { label: 'Câu Chuyện', href: '#story' },
  { label: 'Album', href: '#album' },
  { label: 'Địa Điểm', href: '#venue' },
  { label: 'Lời Chúc', href: '#guestbook' },
];

interface NavBarProps {
  onMusicToggle: () => void;
  isMusicPlaying: boolean;
}

export default function NavBar({ onMusicToggle, isMusicPlaying }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'nav-blur shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="transition-transform group-hover:rotate-12 duration-300">
            <ShuttlecockSVG size={22} color="#52b788" />
          </div>
          <div className="font-mono text-xs tracking-[0.25em] uppercase">
            <span style={{ color: '#52b788' }}>MK</span>
            <span className="text-white/50 mx-1">×</span>
            <span style={{ color: '#74c69d' }}>TV</span>
          </div>
          <div className="font-mono text-[10px] tracking-widest text-white/30 hidden sm:block">
            18.04.2026
          </div>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-sm font-medium tracking-wider text-white/60 hover:text-court-light uppercase transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-court-light transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Music toggle */}
          <button
            onClick={onMusicToggle}
            className="w-9 h-9 rounded-full border border-court-medium/50 flex items-center justify-center transition-all hover:border-court-light hover:bg-court-medium/20"
            aria-label="Toggle music"
          >
            {isMusicPlaying ? (
              <MusicPlayingIcon />
            ) : (
              <MusicOffIcon />
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`w-5 h-px bg-white/70 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`w-5 h-px bg-white/70 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-px bg-white/70 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden nav-blur border-t border-court-medium/30">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 font-heading text-sm font-medium tracking-wider text-white/70 hover:text-court-light uppercase transition-colors border-b border-court-medium/20 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function MusicPlayingIcon() {
  const heights = [6, 10, 8, 10, 6];
  return (
    <div className="flex items-end gap-[2px] h-4">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full"
          style={{
            height: `${h}px`,
            background: '#52b788',
            animation: `navMusicBar 0.6s ease-in-out ${i * 0.1}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function MusicOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="2" strokeLinecap="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
      <line x1="3" y1="3" x2="21" y2="21" stroke="#ef4444" strokeWidth="1.5"/>
    </svg>
  );
}
