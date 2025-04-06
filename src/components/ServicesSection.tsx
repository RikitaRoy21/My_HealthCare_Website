
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HeartPulse, Users, Pill, Stethoscope, ActivitySquare, Ambulance } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    title: "24/7 Emergency Care",
    description: "Round-the-clock emergency medical services with state-of-the-art facilities and expert care.",
    icon: HeartPulse,
    color: "from-red-500/40 to-red-400/20",
    cardBg: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
  },
  {
    title: "Specialist Consultation",
    description: "Expert medical consultation with experienced healthcare professionals in every specialty.",
    icon: Users,
    color: "from-blue-500/40 to-blue-400/20",
    cardBg: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
  },
  {
    title: "Online Pharmacy",
    description: "Easy access to medications with online prescription uploads and rapid delivery to your door.",
    icon: Pill,
    color: "from-green-500/40 to-green-400/20",
    cardBg: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
  },
  {
    title: "Preventive Health Checkups",
    description: "Comprehensive health assessments to detect potential issues before they become serious problems.",
    icon: Stethoscope,
    color: "from-purple-500/40 to-purple-400/20",
    cardBg: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
  },
  {
    title: "Remote Patient Monitoring",
    description: "Advanced technology that allows continuous monitoring of vital signs from the comfort of your home.",
    icon: ActivitySquare,
    color: "from-yellow-500/40 to-yellow-400/20",
    cardBg: "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20"
  },
  {
    title: "Ambulance Services",
    description: "Rapid response emergency transport with fully equipped medical facilities and trained paramedics.",
    icon: Ambulance,
    color: "from-medical/40 to-medical/20",
    cardBg: "bg-gradient-to-br from-medical-light to-blue-100 dark:from-medical-dark/30 dark:to-blue-800/20"
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className={`h-full overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 border-white/50 dark:border-white/10 ${service.cardBg}`}>
        <CardHeader className="relative pb-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-40 -z-10`} />
          <div className="mb-2">
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.5 }
              }}
              className={`inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/80 dark:bg-white/20 shadow-lg text-medical`}
            >
              <service.icon size={28} />
            </motion.div>
          </div>
          <CardTitle className="text-xl font-bold group-hover:text-medical transition-colors duration-300">
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <CardDescription className="text-gray-700 dark:text-gray-300 text-sm font-medium">
            {service.description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ServicesSection = () => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px 0px" });

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-background dark:to-background/80">
      <div className="container mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-medical uppercase tracking-wider mb-2 px-4 py-1 bg-medical/10 rounded-full"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-medical via-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            Our Premium Services
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl"
          >
            <p className="text-gray-600 dark:text-gray-300">
              We provide comprehensive healthcare services with a focus on patient comfort, 
              cutting-edge technology, and personalized care plans.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
