import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const MedicalHero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center z-10">
      {/* Enhanced glowing orbs effect */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-medical/30 rounded-full blur-3xl opacity-40 animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 mt-16">
        <div className="max-w-3xl mx-auto md:mx-0">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } }
            }}
            className="text-center md:text-left"
          >
            
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] } }
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance text-safari"
            >
              Your Health, <span className="shimmer-text">Our Commitment</span>
            </motion.h1>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] } }
              }}
              className="mb-4"
            >
              <span className="inline-block px-3 py-1 text-lg font-medium text-medical bg-white/10 backdrop-blur-sm rounded-full mb-4">
                We Believe Premium Healthcare Is for Everyone
              </span>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] } }
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild className="bg-medical hover:bg-medical-dark text-white px-8 py-6 rounded-full h-auto text-lg font-medium">
                  <Link to="/signup">
                    Sign Up
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-6 rounded-full h-auto text-lg font-medium backdrop-blur-sm">
                  <Link to="/helpline">
                    Contact Us
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className="w-1 h-2 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default MedicalHero;
