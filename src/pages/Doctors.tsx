import React, { useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const Doctors = () => {
  useEffect(() => {
    document.title = "Our Doctors - Medi Nova";
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      description: "Specialized in interventional cardiology with 15+ years of experience treating complex heart conditions."
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      specialty: "Neurology",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      description: "Expert in neuro-disorders with advanced training in epilepsy and movement disorders treatment."
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      specialty: "Pediatrics",
      image: "https://images.unsplash.com/photo-1536064479547-7ee40b74b807?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Compassionate pediatrician dedicated to child health, development, and preventive care."
    },
    {
      id: 4,
      name: "Dr. Michael Rodriguez",
      specialty: "Oncology",
      image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Leading oncologist specializing in innovative cancer treatments and personalized care plans."
    },
    {
      id: 5,
      name: "Dr. Aisha Patel",
      specialty: "Orthopedics",
      image: "https://plus.unsplash.com/premium_photo-1682089874677-3eee554feb19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Sports medicine expert focusing on minimally invasive surgical techniques for joint conditions."
    },
    {
      id: 6,
      name: "Dr. Robert Kim",
      specialty: "Dermatology",
      image: "https://images.unsplash.com/photo-1666887360742-974c8fce8e6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Board-certified dermatologist with expertise in skin cancer, cosmetic procedures, and skin disorders."
    }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">

      {/* Static background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-medical-dark/30" />
      </div>

      {/* Header */}
      <NavigationHeader />

      {/* Content */}
      <div className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Page Title */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="shimmer-text">Meet Our Expert Doctors</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Our team of highly qualified medical professionals is dedicated to providing exceptional care.
            </p>
          </motion.div>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-16 text-center bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20"
          >
            <Stethoscope className="w-16 h-16 text-medical mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Need a Specialist?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Our team is ready to help you find the right doctor for your specific medical needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-medical hover:bg-medical-dark text-white">
                Find a Doctor
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                <Link to="/medicare">View All Services</Link>
              </Button>
            </div>
          </motion.div>

          {/* Specialties Filter (Static for now) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {["All Specialties", "Cardiology", "Neurology", "Pediatrics", "Oncology", "Orthopedics", "Dermatology"].map((item, index) => (
              <Button 
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-medical hover:bg-medical-dark" : "text-white border-white/30 hover:bg-white/20"}
              >
                {item}
              </Button>
            ))}
          </motion.div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:border-medical/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-medical text-white text-sm font-medium rounded-full">
                      {doctor.specialty}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{doctor.name}</h3>
                  <p className="text-white/70 mb-4">{doctor.description}</p>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" className="border-medical text-medical hover:bg-medical/10">
                      View Profile
                    </Button>
                    <Button size="sm" className="bg-medical hover:bg-medical-dark">
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
