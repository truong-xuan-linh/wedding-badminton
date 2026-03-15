'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ShuttlecockSVG from './ShuttlecockSVG';
import { weddingData } from '@/lib/weddingData';

const PHOTOS_PER_PAGE = 4;
const photos = weddingData.photos;
const totalPages = Math.ceil(photos.length / PHOTOS_PER_PAGE);

export default function PhotoAlbum() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const goNext = useCallback(() => {
    setDirection('next');
    setPage((p) => Math.min(p + 1, totalPages - 1));
  }, []);

  const goPrev = useCallback(() => {
    setDirection('prev');
    setPage((p) => Math.max(p - 1, 0));
  }, []);

  const currentPhotos = photos.slice(page * PHOTOS_PER_PAGE, (page + 1) * PHOTOS_PER_PAGE);

  const slideVariants = {
    enter: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? 60 : -60,
      opacity: 0,
      rotateY: dir === 'next' ? 15 : -15,
    }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? -60 : 60,
      opacity: 0,
      rotateY: dir === 'next' ? -15 : 15,
    }),
  };

  return (
    <section
      ref={ref}
      id="album"
      className="section-pad relative overflow-hidden"
      style={{ background: '#030f07' }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #1a472a 30%, #52b788 50%, #1a472a 70%, transparent)' }} />

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="font-mono text-[10px] tracking-[0.5em] uppercase text-court-light/40 mb-3">
            ◆ Athlete Profile ◆
          </div>
          <h2 className="display-md text-white uppercase mb-2">
            Photo Album
          </h2>
          <div className="font-mono text-xs tracking-widest text-white/30">
            Những khoảnh khắc đáng nhớ
          </div>
        </motion.div>

        {/* Album book */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Book spine effect */}
          <div className="absolute left-0 top-0 bottom-0 w-3 hidden lg:block"
            style={{
              background: 'linear-gradient(90deg, #0a2010, #1a472a)',
              borderRight: '1px solid rgba(82,183,136,0.3)',
              boxShadow: '4px 0 12px rgba(0,0,0,0.5)',
            }}
          />

          {/* Pages container */}
          <div className="glass-card p-4 md:p-8 lg:ml-3"
            style={{ minHeight: 360 }}>

            {/* Page header */}
            <div className="flex items-center justify-between mb-6 pb-3"
              style={{ borderBottom: '1px solid rgba(82,183,136,0.15)' }}>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5">
                  <ShuttlecockSVG size={20} color="#52b788" />
                </div>
                <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                  Athletes Profile Book
                </span>
              </div>
              <div className="font-mono text-[10px] tracking-wider text-white/30">
                Page {page + 1} of {totalPages}
              </div>
            </div>

            {/* Photo grid with flip animation */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
                style={{ perspective: '1000px' }}
              >
                {currentPhotos.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="group cursor-pointer relative"
                    onClick={() => setLightbox(photos.indexOf(photo))}
                  >
                    {/* Photo frame */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        aspectRatio: '3/4',
                        border: '1px solid rgba(82,183,136,0.2)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                      }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        style={{ background: 'rgba(26,71,42,0.7)' }}
                      >
                        <div className="text-center">
                          <div className="font-mono text-[10px] tracking-widest text-court-light uppercase">
                            {photo.caption}
                          </div>
                          <div className="font-mono text-[11px] text-white/50 mt-1">
                            Tap to view
                          </div>
                        </div>
                      </div>
                      {/* Number tag */}
                      <div className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-[11px] font-mono"
                        style={{ background: 'rgba(245,158,11,0.85)', color: '#040d08' }}>
                        {photo.id}
                      </div>
                    </div>
                    {/* Caption */}
                    <div className="pt-1.5 px-0.5">
                      <div className="font-body text-[11px] tracking-wide text-white/60 truncate">
                        {photo.caption}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4"
              style={{ borderTop: '1px solid rgba(82,183,136,0.1)' }}>
              <button
                onClick={goPrev}
                disabled={page === 0}
                className="flex items-center gap-2 btn-court px-4 py-2 text-xs disabled:opacity-25 disabled:cursor-not-allowed transition-all"
              >
                ← PREV PAGE
              </button>

              {/* Page dots */}
              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > page ? 'next' : 'prev');
                      setPage(i);
                    }}
                    className="transition-all duration-200"
                    style={{
                      width: i === page ? 16 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i === page ? '#52b788' : 'rgba(82,183,136,0.25)',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                disabled={page === totalPages - 1}
                className="flex items-center gap-2 btn-court px-4 py-2 text-xs disabled:opacity-25 disabled:cursor-not-allowed transition-all"
              >
                NEXT PAGE →
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            photos={photos}
            initialIndex={lightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: typeof weddingData.photos;
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);

  const goNext = () => setIndex((i) => Math.min(i + 1, photos.length - 1));
  const goPrev = () => setIndex((i) => Math.max(i - 1, 0));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const photo = photos[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(3,15,7,0.95)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="relative max-w-3xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo */}
        <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Caption */}
        <div className="mt-3 text-center">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-court-light">
            {photo.caption}
          </div>
          <div className="font-mono text-[13px] text-white/30 mt-1">
            {index + 1} / {photos.length}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={goPrev}
            disabled={index === 0}
            className="btn-court px-5 py-2 text-xs disabled:opacity-20"
          >
            ← PREV
          </button>
          <button
            onClick={onClose}
            className="font-mono text-xs text-white/40 hover:text-white/80 tracking-widest uppercase"
          >
            CLOSE ✕
          </button>
          <button
            onClick={goNext}
            disabled={index === photos.length - 1}
            className="btn-court px-5 py-2 text-xs disabled:opacity-20"
          >
            NEXT →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
