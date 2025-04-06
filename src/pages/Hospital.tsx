import React, { useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, Hospital as HospitalIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hospital = () => {
  useEffect(() => {
    document.title = "Our Hospitals - Medi Nova";
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

          {/* Hospital Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Hospital Exterior"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Medi Nova General Hospital</h2>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center">
                    <span className="mr-2">📍</span> ABC Road , New Delhi , India
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🏥</span> 350+ beds with private rooms
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">👨‍⚕️</span> 200+ physicians across 40 specialties
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🚁</span> Helipad for emergency transport
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8 flex-1">
                <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
                <p className="text-white/80">
                  At Medi Nova, we're committed to providing exceptional healthcare with compassion and integrity. 
                  We strive to improve the health and wellbeing of our community through innovative medical practices, 
                  research, and education.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 flex-1">
                <h2 className="text-2xl font-bold mb-4 text-white">Recognition & Accreditation</h2>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center">
                    <span className="mr-2">🏆</span> Ranked Top 10 Hospital Nationwide
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">⭐</span> 5-Star Patient Satisfaction Rating
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🔍</span> Joint Commission Gold Seal of Approval
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🌿</span> Environmental Excellence Certification
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-10 text-center text-white">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.5, duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-medical/30 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                  <p className="text-white/70">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Facilities Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-10 text-center text-white">Facility Highlights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" 
                  alt="Surgical Suite"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">Advanced Surgical Suites</h3>
                  <p className="text-white/70">
                    Our state-of-the-art operating rooms feature the latest surgical technology for precise, minimally invasive procedures.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80" 
                  alt="Imaging Center"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">Comprehensive Imaging Center</h3>
                  <p className="text-white/70">
                    Our imaging department offers the latest in diagnostic technology, including 3T MRI, CT, PET scans, and more.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

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
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <a href="tel:+1234567890" className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 24/7 Helpline
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                <Link to="/ambulance">Emergency Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hospital;
