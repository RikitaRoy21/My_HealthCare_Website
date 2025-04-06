import React, { useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import MedicalHero from '@/components/MedicalHero';
import ServicesSection from '@/components/ServicesSection';
import VideoSection from '@/components/VideoSection';
import Helpline from '@/components/Helpline';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import MouseFollower from '@/components/MouseFollower';
import { motion, useScroll, useSpring } from 'framer-motion';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.title = "MediNOVA";
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-medical z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Fullscreen background video covering all screen ratios */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden w-screen h-screen">
        <iframe
          src="https://www.youtube.com/embed/Q40senBIrFI?autoplay=1&mute=1&controls=0&loop=1&playlist=Q40senBIrFI&showinfo=0&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3"
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen"
          title="Healthcare background video"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: 'scale(1.1)',
            aspectRatio: '16/9', // fallback for some older browsers
          }}
        ></iframe>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent z-10" />
      </div>

      {/* Content on top of video */}
      <div className="relative z-20">
        <MouseFollower />
        <NavigationHeader />
        <MedicalHero />
        <ServicesSection />
        <VideoSection />
        <Helpline />
        <Footer />
        <ChatAssistant />
      </div>
    </div>
  );
};

export default Index;
