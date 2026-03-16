'use client';

import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WeddingInvitation from './WeddingInvitation';
import NavBar from './NavBar';
import HeroSection from './HeroSection';
import AthletePass from './AthletePass';
import Countdown from './Countdown';
import OurStory from './OurStory';
import PhotoAlbum from './PhotoAlbum';
import ShuttlecockMinigame from './ShuttlecockMinigame';
import WeddingDetails from './WeddingDetails';
import Guestbook from './Guestbook';
import BadmintonGame from './BadmintonGame';
import BackgroundMusic, { BackgroundMusicHandle } from './BackgroundMusic';
import Footer from './Footer';

interface MainContentProps {
  guestName?: string;
}

export default function MainContent({ guestName }: MainContentProps) {
  const [introComplete, setIntroComplete] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const musicRef = useRef<BackgroundMusicHandle>(null);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    // Auto-attempt music play after intro
    setTimeout(() => {
      if (musicRef.current && !isMusicPlaying) {
        musicRef.current.toggle();
      }
    }, 500);
  };

  const handleMusicToggle = () => {
    if (musicRef.current) {
      musicRef.current.toggle();
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <>
      {/* Wedding Invitation Onboarding */}
      <AnimatePresence>
        {!introComplete && (
          <WeddingInvitation guestName={guestName} onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Main Website */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Navigation */}
            <NavBar
              onMusicToggle={handleMusicToggle}
              isMusicPlaying={isMusicPlaying}
            />

            {/* Sections */}
            <main>
              {/* 1. Hero: ESPN-style scoreboard */}
              <HeroSection />

              {/* 2. Athlete Pass: personalized guest card (if URL has ?guest=Name) */}
              <AthletePass guestName={guestName} />

              {/* 3. Countdown: Digital timer */}
              <Countdown />

              {/* 4. Our Story: Timeline */}
              <OurStory />

              {/* 5. Photo Album: Flip book */}
              <PhotoAlbum />

              {/* 6. Minigame: Serve & reveal venue */}
              <ShuttlecockMinigame />

              {/* 7. Wedding Details: Full info */}
              <WeddingDetails />

              {/* 8. Badminton Game: Who's the boss? */}
              <BadmintonGame />

              {/* 9. Guestbook: LED ticker + messages */}
              <Guestbook />
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating Background Music Player */}
            <BackgroundMusic
              ref={musicRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
