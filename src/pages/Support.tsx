import React, { useEffect } from 'react';
import { Heart, Users, Handshake, DollarSign, Phone, Mail, MapPin, Calendar, Clock, MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';
import NavigationHeader from '@/components/NavigationHeader';
import { Button } from '@/components/ui/button';
import MouseFollower from '@/components/MouseFollower';

const Support = () => {
  useEffect(() => {
    document.title = "Support For Them - Medi Nova";
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Full screen background with image instead of video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1494832944834-a08818c634b0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdGlvbnN8ZW58MHx8MHx8fDA%3D"
          alt="Healthcare Background"
          className="w-full h-full object-cover scale-105"
          style={{ pointerEvents: 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-medical-dark/30 z-[1]" />
      </div>

      <MouseFollower />
      
      {/* Header */}
      <NavigationHeader />

      {/* Hero Section */}
      <div className="relative z-10 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="shimmer-text">Support For Them</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Together we can make a difference in healthcare for those in need
            </p>
          </motion.div>

          {/* Forms Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Volunteers Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-medical/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Users className="text-medical w-6 h-6 mr-2" />
                <h2 className="text-2xl font-semibold text-white">Call For Volunteers</h2>
              </div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border bg-white/10 backdrop-blur-sm border-white/20 rounded-lg focus:ring-2 focus:ring-medical focus:border-medical text-white"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-2 border bg-white/10 backdrop-blur-sm border-white/20 rounded-lg focus:ring-2 focus:ring-medical focus:border-medical text-white"
                />
                <textarea
                  placeholder="How would you like to help?"
                  className="w-full p-2 border bg-white/10 backdrop-blur-sm border-white/20 rounded-lg focus:ring-2 focus:ring-medical focus:border-medical text-white"
                  rows={4}
                ></textarea>
                <Button className="w-full bg-medical hover:bg-medical-dark text-white">
                  Volunteer Now
                </Button>
              </form>
            </motion.div>

            {/* NGO Collaborations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-medical/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Handshake className="text-medical w-6 h-6 mr-2" />
                <h2 className="text-2xl font-semibold text-white">NGO Collaborations</h2>
              </div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Organization Name"
                  className="w-full p-2 border bg-white/10 backdrop-blur-sm border-white/20 rounded-lg focus:ring-2 focus:ring-medical focus:border-medical text-white"
                />
                <input
                  type="email"
                  placeholder="Contact Email"
                  className="w-full p-2 border bg-white/10 backdrop-blur-sm border-white/20 rounded-lg focus:ring-2 focus:ring-medical focus:border-medical text-white"
                />
                <textarea
                  placeholder="Describe your organization and potential collaboration"
                  className="w-full p-2 border bg-white/10 backdrop-blur-sm border-white/20 rounded-lg focus:ring-2 focus:ring-medical focus:border-medical text-white"
                  rows={4}
                ></textarea>
                <Button className="w-full bg-medical hover:bg-medical-dark text-white">
                  Submit Proposal
                </Button>
              </form>
            </motion.div>

            {/* Donate Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-medical/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Heart className="text-medical w-6 h-6 mr-2" />
                <h2 className="text-2xl font-semibold text-white">Donate For Them</h2>
              </div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border bg-white/10 backdrop-blur-sm border-white/20 rounded-lg focus:ring-2 focus:ring-medical focus:border-medical text-white"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-2 border bg-white/10 backdrop-blur-sm border-white/20 rounded-lg focus:ring-2 focus:ring-medical focus:border-medical text-white"
                />
                <select className="w-full p-2 border bg-white/10 backdrop-blur-sm border-white/20 rounded-lg focus:ring-2 focus:ring-medical focus:border-medical text-white">
                  <option value="" className="bg-gray-800">Select Amount</option>
                  <option value="25" className="bg-gray-800">$25</option>
                  <option value="50" className="bg-gray-800">$50</option>
                  <option value="100" className="bg-gray-800">$100</option>
                  <option value="custom" className="bg-gray-800">Custom Amount</option>
                </select>
                <Button className="w-full bg-medical hover:bg-medical-dark text-white">
                  Donate Now
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Health Camps Section */}
          {/* ...No changes made to this section... */}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20"
          >
            <Heart className="w-16 h-16 text-medical mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Need More Information?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Contact our support team for more information about our charity programs and how you can contribute.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-medical hover:bg-medical-dark text-white">
                <Mail className="w-5 h-5 mr-2" />
                Contact Support Team
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                <Phone className="w-5 h-5 mr-2" />
                Call Helpline
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Support;
