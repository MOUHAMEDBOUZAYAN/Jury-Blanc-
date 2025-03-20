import React from 'react';

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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to ConstructionXpert
          </h1>
          <p className="text-xl text-white/90">
            Manage your construction projects efficiently.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;