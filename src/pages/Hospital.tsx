import React, { useEffect, useState } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, Hospital as HospitalIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hospital = () => {
  const [isHelplineOpen, setHelplineOpen] = useState(false);

  useEffect(() => {
    document.title = "Our Hospitals - Medi Nova";

    // Listen for a custom event triggered from NavigationHeader
    const handleHelplineClick = () => setHelplineOpen(true);

    window.addEventListener('openHelplineModal', handleHelplineClick);
    return () => {
      window.removeEventListener('openHelplineModal', handleHelplineClick);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const services = [
    {
      title: "Emergency Care",
      description: "24/7 emergency services with state-of-the-art technology and expert staff.",
      icon: "🚑"
    },
    {
      title: "Surgery",
      description: "Advanced surgical procedures with minimally invasive options when possible.",
      icon: "⚕️"
    },
    {
      title: "Diagnostics",
      description: "Comprehensive testing services including MRI, CT scan, and laboratory tests.",
      icon: "🔬"
    },
    {
      title: "Maternity",
      description: "Family-centered birth experiences with neonatal intensive care if needed.",
      icon: "👶"
    },
    {
      title: "Rehabilitation",
      description: "Physical, occupational, and speech therapy to help patients regain functionality.",
      icon: "♿"
    },
    {
      title: "Specialty Clinics",
      description: "Specialized care for cancer, heart disease, and other complex conditions.",
      icon: "💉"
    }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Static background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg')",
          filter: 'brightness(0.4)'
        }}
      />

      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-slate-900/60 z-0"></div>

      {/* Header */}
      <NavigationHeader />

      {/* Main Content */}
      <div className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="shimmer-text">World-Class Hospital Facilities</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Advanced medical care with compassionate service in state-of-the-art facilities
            </p>
          </motion.div>

          {/* (The rest of your hospital content stays SAME as you gave above) */}
          {/* ----------- SKIPPING TO END CTA SECTION --------- */}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Need Immediate Assistance?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Our patient coordinators are available 24/7 to answer your questions and schedule appointments.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setHelplineOpen(true)}
              >
                <Phone className="w-5 h-5 mr-2" />
                24/7 Helpline
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                <Link to="/ambulance">Emergency Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Helpline Modal */}
      {isHelplineOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 relative max-w-md w-full mx-4">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setHelplineOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Emergency Contact</h2>
            <p className="text-gray-600 mb-6">Emergency contact number:</p>
            <a 
              href="tel:+919734569921" 
              className="text-blue-600 text-xl font-semibold hover:underline"
            >
              +91 9734569921
            </a>
            <div className="mt-6">
              <Button onClick={() => setHelplineOpen(false)} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hospital;
