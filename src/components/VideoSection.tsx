import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const imageUrl =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVuZ2VyJTIwY2hpbGRyZW58ZW58MHx8MHx8fDA%3D";

const VideoSection = () => {
  return (
    <section className="py-24 dark:bg-gray-900/80 min-h-screen text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 text-sm md:text-base font-semibold text-medical bg-white/10 backdrop-blur-sm rounded-full">
                Healthcare Challenges
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Helping Those <span className="text-medical">Most In Need</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2x1 mb-10"
            >
              <p className="text-white-300">
                Millions of people in rural areas lack access to basic healthcare services.
                At MediNova, we're committed to bringing quality healthcare to underserved communities
                and addressing the challenges they face.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 group-hover:from-black/70 transition-all duration-300" />

            <motion.img
              src={imageUrl}
              alt="Hungry children in need of aid"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 10 }}
            />

            <div className="absolute bottom-6 left-6 z-20 text-white">
              <h3 className="text-xl font-semibold mb-2">Your One Support Can Make Them Smile</h3>
              <p className="text-white/90 text-sm max-w-md">
                Millions of children worldwide lack access to proper nutrition and healthcare, creating a humanitarian crisis.
              </p>
            </div>

            <div className="absolute bottom-6 right-6 z-20">
              <Link to="/support">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Support Our Mission
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
