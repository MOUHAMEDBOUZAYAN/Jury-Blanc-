import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            {/* Routes pour les services (optionnelles) */}
            <Route path="/services" element={<div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16"><div className="text-center"><h1 className="text-4xl font-bold text-gray-900 mb-4">Services</h1><p className="text-gray-600">Page en cours de développement</p></div></div>} />
            <Route path="/services/gestion" element={<div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16"><div className="text-center"><h1 className="text-4xl font-bold text-gray-900 mb-4">Gestion de Projets</h1><p className="text-gray-600">Page en cours de développement</p></div></div>} />
            <Route path="/services/equipes" element={<div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16"><div className="text-center"><h1 className="text-4xl font-bold text-gray-900 mb-4">Équipes Spécialisées</h1><p className="text-gray-600">Page en cours de développement</p></div></div>} />
            <Route path="/services/securite" element={<div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16"><div className="text-center"><h1 className="text-4xl font-bold text-gray-900 mb-4">Sécurité & Conformité</h1><p className="text-gray-600">Page en cours de développement</p></div></div>} />
            <Route path="/services/certifications" element={<div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16"><div className="text-center"><h1 className="text-4xl font-bold text-gray-900 mb-4">Certifications</h1><p className="text-gray-600">Page en cours de développement</p></div></div>} />
            <Route path="/contact" element={<Contact />} />
            {/* Route 404 - Page non trouvée */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page non trouvée</h2>
                  <p className="text-gray-600 mb-8">La page que vous recherchez n'existe pas.</p>
                  <a 
                    href="/" 
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-full hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg"
                  >
                    Retour à l'accueil
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;