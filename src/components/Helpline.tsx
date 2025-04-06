import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Headphones } from 'lucide-react';

const ContactUsNew = () => {
  return (
    <section className="py-24 bg-black/80 dark:bg-gray-900/80 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-4xl opacity-100 h-full min-h-screen flex flex-col justify-center sticky top-0 z-10">
        {/* Contact Us Heading */}
        <div className="text-center mb-6 sticky top-0 bg-white dark:bg-gray-800 py-6 z-20 shadow-md rounded-lg">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-medical"
          >
            Contact Us
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            We’re here to assist you. Reach out to us anytime.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between w-full sticky top-20 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 z-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-1/2 space-y-6 p-6"
          >
            <h3 className="text-lg font-semibold text-medical">Contact Info</h3>
            <div className="flex items-center space-x-4">
              <Mail className="text-medical w-6 h-6" />
              <span className="text-gray-700 dark:text-gray-300">team.algogliders12425@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-medical w-6 h-6" />
              <span className="text-gray-700 dark:text-gray-300">+91 123 - 456 - 7890</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-medical w-6 h-6" />
              <span className="text-gray-700 dark:text-gray-300">123 ABC Road , India</span>
            </div>
            <div className="flex items-center space-x-4">
              <Headphones className="text-medical w-6 h-6" />
              <span className="text-gray-700 dark:text-gray-300 font-bold">24/7 Helpline : +91 (033) 888-9999</span>
            </div>
          </motion.div>

          {/* Feedback Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-medical mb-4">Feedback Form</h3>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Name</label>
              <input type="text" className="w-full p-3 border rounded-lg dark:bg-gray-600 dark:border-gray-500" placeholder="Your Name" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Email</label>
              <input type="email" className="w-full p-3 border rounded-lg dark:bg-gray-600 dark:border-gray-500" placeholder="Your Email" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Your Feedback</label>
              <textarea className="w-full p-3 border rounded-lg dark:bg-gray-600 dark:border-gray-500" rows={4} placeholder="Let us know your thoughts..."></textarea>
            </div>
            <button type="submit" className="w-full bg-medical text-white py-3 rounded-lg hover:bg-medical-dark transition-all">
              Submit Feedback
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsNew;