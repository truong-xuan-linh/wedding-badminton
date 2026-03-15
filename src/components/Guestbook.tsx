'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShuttlecockSVG from './ShuttlecockSVG';
import { weddingData } from '@/lib/weddingData';

type Message = {
  id: number;
  name: string;
  message: string;
  time: string;
};

export default function Guestbook() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>(weddingData.guestbook);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const ref = useRef<HTMLElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));

    const msg: Message = {
      id: Date.now(),
      name: name.trim(),
      message: text.trim(),
      time: 'Vừa xong',
    };

    setMessages((prev) => [msg, ...prev]);
    setNewMessage(msg);
    setName('');
    setText('');
    setSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setNewMessage(null);
    }, 4000);
  }, [name, text]);

  const tickerMessages = [...messages, ...messages]; // duplicate for seamless loop

  return (
    <section
      ref={ref}
      id="guestbook"
      className="section-pad relative overflow-hidden"
      style={{ background: '#030f07' }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #2d6a4f 30%, #f59e0b 50%, #2d6a4f 70%, transparent)' }} />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="font-mono text-[10px] tracking-[0.5em] uppercase text-court-light/40 mb-3">
            ◆ Live Scoreboard ◆
          </div>
          <h2 className="display-md text-white uppercase mb-2">
            Sổ Lưu Bút
          </h2>
          <p className="font-body text-sm text-white/35 max-w-sm mx-auto">
            Gửi lời chúc của bạn — sẽ được hiển thị trực tiếp trên bảng điện tử!
          </p>
        </motion.div>

        {/* ===== LED TICKER ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div
            className="relative overflow-hidden py-3 px-0"
            style={{
              background: '#030f07',
              border: '1px solid rgba(255,107,53,0.3)',
              borderLeft: '4px solid #ff6b35',
              boxShadow: '0 0 20px rgba(255,107,53,0.1)',
            }}
          >
            {/* Label */}
            <div className="absolute left-0 top-0 bottom-0 flex items-center px-2 z-10"
              style={{ background: '#ff6b35', minWidth: 'auto' }}>
              <div className="font-mono text-[11px] tracking-widest text-court-dark font-bold uppercase whitespace-nowrap"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.2em' }}>
                LIVE
              </div>
            </div>

            {/* Scrolling messages */}
            <div
              ref={tickerRef}
              className="overflow-hidden pl-10"
            >
              <div
                className="flex whitespace-nowrap"
                style={{ animation: 'ledScroll 40s linear infinite' }}
              >
                {tickerMessages.map((msg, i) => (
                  <span
                    key={`${msg.id}-${i}`}
                    className="inline-flex items-center gap-2 mr-12"
                  >
                    <span className="led-text text-xs font-bold">
                      {msg.name.toUpperCase()}:
                    </span>
                    <span className="font-mono text-xs text-white/70">
                      {msg.message}
                    </span>
                    <span className="text-court-medium mx-2">◆</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
              style={{ background: 'linear-gradient(270deg, #030f07, transparent)' }} />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* ===== SUBMIT FORM ===== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-5">
                <ShuttlecockSVG size={18} color="#f59e0b" />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">
                  Gửi Lời Chúc
                </span>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-8"
                  >
                    <div className="text-4xl mb-3">🏆</div>
                    <div className="font-heading font-bold uppercase tracking-wider" style={{ color: '#52b788' }}>
                      Lời chúc đã được gửi!
                    </div>
                    <div className="font-mono text-xs text-white/40 mt-1 tracking-wider">
                      Đang hiển thị trên bảng điện tử...
                    </div>
                    {newMessage && (
                      <div className="mt-4 p-3 rounded-none text-left"
                        style={{ background: 'rgba(82,183,136,0.1)', border: '1px solid rgba(82,183,136,0.3)' }}>
                        <div className="font-mono text-[13px] tracking-wider text-court-light uppercase">{newMessage.name}</div>
                        <div className="font-body text-xs text-white/60 mt-1 italic">"{newMessage.message}"</div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label className="font-mono text-[13px] tracking-[0.3em] uppercase text-white/40 block mb-1.5">
                        Tên của bạn *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        maxLength={60}
                        required
                        className="court-input w-full px-3 py-2.5 text-sm rounded-none"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[13px] tracking-[0.3em] uppercase text-white/40 block mb-1.5">
                        Lời chúc *
                      </label>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Chúc mừng hai bạn..."
                        maxLength={200}
                        rows={3}
                        required
                        className="court-input w-full px-3 py-2.5 text-sm rounded-none resize-none"
                      />
                      <div className="font-mono text-[11px] tracking-wider text-white/20 text-right mt-0.5">
                        {text.length}/200
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting || !name.trim() || !text.trim()}
                      className="btn-gold w-full py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          >
                            <ShuttlecockSVG size={14} color="#040d08" />
                          </motion.div>
                          ĐANG GỬI...
                        </span>
                      ) : (
                        '🏸 GỬI LỜI CHÚC'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ===== MESSAGE LIST ===== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
                {messages.length} Lời Chúc
              </div>
              <div className="live-badge">
                <div className="live-dot" />
                LIVE
              </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#1a472a transparent' }}>
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i < 3 ? i * 0.08 + 0.5 : 0, duration: 0.3 }}
                    className="glass-card p-3 hover:border-court-light/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0"
                          style={{ background: 'rgba(82,183,136,0.2)', border: '1px solid rgba(82,183,136,0.4)', color: '#52b788' }}>
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-mono text-[13px] tracking-wider font-bold text-court-light uppercase truncate">
                          {msg.name}
                        </div>
                      </div>
                      <div className="font-mono text-[11px] text-white/25 flex-shrink-0">{msg.time}</div>
                    </div>
                    <p className="font-body text-xs text-white/60 leading-relaxed italic">
                      "{msg.message}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
