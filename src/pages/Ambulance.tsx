import React, { useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, Ambulance as AmbulanceIcon } from 'lucide-react';

const Ambulance = () => {
  useEffect(() => {
    document.title = "Ambulance Services - Medi Nova";
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Full screen background image with gradient overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/8942729/pexels-photo-8942729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-medical-dark/30 z-[1]" />
      </div>

      {/* Header */}
      <NavigationHeader />

      {/* Ambulance Service Content */}
      <div className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="shimmer-text">Emergency Ambulance Services</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Fast, reliable emergency medical transport when every second counts
            </p>
          </motion.div>

          {/* Services Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: 'Basic Life Support',
                desc: 'Equipped with essential medical supplies for non-critical emergencies and patient transfer.',
              },
              {
                title: 'Advanced Life Support',
                desc: 'Fully equipped with advanced medical equipment and staffed with paramedics for critical emergencies.',
              },
              {
                title: 'Specialty Transport',
                desc: 'Specialized vehicles for neonatal, bariatric, and other patients with unique medical needs.',
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1), duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-medical/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="rounded-full bg-medical/20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                  <AmbulanceIcon className="text-medical w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-white/70">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Emergency? Call Our 24/7 Dispatch
            </h2>
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-full h-auto text-lg font-medium"
            >
              <a href="tel:+1234567890" className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Call Now : 12425
              </a>
            </Button>
          </motion.div>

          {/* Ambulance Fleet */}
          <div className="mt-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl font-bold mb-12 text-center text-white"
            >
              Our Ambulance Fleet
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
              >
                <div className="h-64 bg-gray-300 relative">
                  <img
                    src="https://images.unsplash.com/photo-1579037005241-a79202c7e9fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Basic Ambulance"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">Type II: Van Ambulance</h3>
                  <p className="text-white/70">
                    Ideal for urban areas, offering quick response times with essential medical equipment.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
              >
                <div className="h-64 bg-gray-300 relative">
                  <img
                    src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Advanced Ambulance"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">Type I: Advanced Transport</h3>
                  <p className="text-white/70">
                    Fully equipped mobile emergency room with advanced life support systems and medical equipment.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ambulance;
