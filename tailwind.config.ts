import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        court: {
          darkest: '#030f07',
          dark: '#071a0e',
          mid: '#0d2b18',
          DEFAULT: '#1a472a',
          medium: '#2d6a4f',
          light: '#52b788',
          bright: '#74c69d',
          line: '#95d5b2',
          glass: 'rgba(26,71,42,0.3)',
        },
        gold: {
          dark: '#92400e',
          DEFAULT: '#f59e0b',
          light: '#fcd34d',
          bright: '#fef08a',
        },
        led: {
          orange: '#ff6b35',
          amber: '#fbbf24',
          red: '#ef4444',
          green: '#22c55e',
          off: '#1a2a1e',
          dim: '#2a3f2e',
        },
        scoreboard: '#040d08',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'court-pattern': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300'%3E%3Crect width='200' height='300' fill='%23071a0e'/%3E%3Crect x='20' y='0' width='160' height='300' fill='none' stroke='%231a472a' stroke-width='1.5'/%3E%3Cline x1='20' y1='60' x2='180' y2='60' stroke='%231a472a' stroke-width='1'/%3E%3Cline x1='20' y1='240' x2='180' y2='240' stroke='%231a472a' stroke-width='1'/%3E%3Cline x1='20' y1='150' x2='180' y2='150' stroke='%231a472a' stroke-width='2'/%3E%3Cline x1='100' y1='60' x2='100' y2='240' stroke='%231a472a' stroke-width='1'/%3E%3C/svg%3E")`,
        'hero-gradient': 'linear-gradient(180deg, #030f07 0%, #071a0e 40%, #0d2b18 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(26,71,42,0.4) 0%, rgba(13,43,24,0.6) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #92400e 0%, #f59e0b 50%, #fcd34d 100%)',
        'scoreboard-gradient': 'linear-gradient(180deg, #040d08 0%, #071a0e 100%)',
      },
      animation: {
        'shuttle-in': 'shuttleIn 1.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'crack-draw': 'crackDraw 0.4s ease-out forwards',
        'shake': 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        'led-scroll': 'ledScroll 35s linear infinite',
        'led-scroll-slow': 'ledScroll 55s linear infinite',
        'pulse-led': 'pulseLed 1.2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-delay': 'float 3.5s ease-in-out infinite 1s',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-left': 'slideLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-right': 'slideRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'court-line-h': 'courtLineH 1.2s ease-out forwards',
        'court-line-v': 'courtLineV 1.2s ease-out forwards',
        'badge-pop': 'badgePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'flip-page': 'flipPage 0.6s ease-in-out forwards',
        'score-pop': 'scorePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'live-dot': 'liveDot 1.5s ease-in-out infinite',
        'sweep': 'sweep 1s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shuttleIn: {
          '0%': { transform: 'translate(60vw, 60vh) scale(0.3) rotate(0deg)', opacity: '1' },
          '80%': { transform: 'translate(0, 0) scale(5) rotate(700deg)', opacity: '1' },
          '100%': { transform: 'translate(0, 0) scale(6) rotate(720deg)', opacity: '0' },
        },
        crackDraw: {
          '0%': { strokeDashoffset: '400', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { strokeDashoffset: '0', opacity: '1' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-2px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(3px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-5px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(5px, 0, 0)' },
        },
        ledScroll: {
          '0%': { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulseLed: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 11px #f59e0b' },
          '50%': { opacity: '0.4', boxShadow: '0 0 2px #f59e0b' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(-80px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(80px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        courtLineH: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        courtLineV: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
        badgePop: {
          '0%': { transform: 'scale(0) rotate(-15deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        flipPage: {
          '0%': { transform: 'perspective(1200px) rotateY(-90deg)', opacity: '0' },
          '100%': { transform: 'perspective(1200px) rotateY(0deg)', opacity: '1' },
        },
        scorePop: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        liveDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.2', transform: 'scale(0.6)' },
        },
        sweep: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'court': '0 0 40px rgba(82,183,136,0.15), inset 0 1px 0 rgba(82,183,136,0.1)',
        'gold': '0 0 30px rgba(245,158,11,0.3)',
        'led': '0 0 20px rgba(255,107,53,0.4)',
        'card': '0 11px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(82,183,136,0.15)',
        'glow-green': '0 0 20px rgba(52,183,136,0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
