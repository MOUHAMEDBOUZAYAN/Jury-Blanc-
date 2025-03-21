import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <main className="min-h-screen w-full relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-teal-600/80"></div>
      </div>
      
      <div className="relative min-h-screen flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          {/* Animation pour le titre */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Welcome to ConstructionXpert
          </motion.h1>

          {/* Animation pour le sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="text-xl text-gray-200/90 font-semibold"
          >
            Manage your construction projects efficiently.
          </motion.p>
        </div>
      </div>
    </main>
  );
};

export default Home;