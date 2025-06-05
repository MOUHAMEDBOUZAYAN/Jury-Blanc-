import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HardHat, Menu, X, Phone, Mail, MapPin, Clock, 
  ChevronDown, ExternalLink, Shield, Award, Users
} from 'lucide-react';

const ProfessionalNavbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const services = [
    {
      title: "Gestion de Projets",
      description: "Supervision complète de vos projets",
      icon: HardHat,
      link: "/services/gestion"
    },
    {
      title: "Équipes Spécialisées", 
      description: "Professionnels qualifiés",
      icon: Users,
      link: "/services/equipes"
    },
    {
      title: "Sécurité & Conformité",
      description: "Respect des normes",
      icon: Shield,
      link: "/services/securite"
    },
    {
      title: "Certifications",
      description: "Qualité garantie",
      icon: Award,
      link: "/services/certifications"
    }
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-teal-400" />
              <span>+212 6 90 81 56 05</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-teal-400" />
              <span>contact@constructionxpert.ma</span>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-teal-400" />
            <span>Lun - Ven: 8h00 - 18h00</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-200' 
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <HardHat className="w-7 h-7 text-white" />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  ConstructionXpert
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Solutions Professionnelles</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className={`relative py-2 px-4 font-medium transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'text-teal-600' 
                    : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                Accueil
                {location.pathname === '/' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"
                  />
                )}
              </Link>

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="flex items-center py-2 px-4 font-medium text-gray-700 hover:text-teal-600 transition-colors">
                  Services
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Nos Services</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {services.map((service, index) => (
                            <Link
                              key={index}
                              to={service.link}
                              className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                            >
                              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-teal-200 transition-colors">
                                <service.icon className="w-5 h-5 text-teal-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
                                  {service.title}
                                </div>
                                <div className="text-sm text-gray-500">{service.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Link
                            to="/services"
                            className="flex items-center text-teal-600 hover:text-teal-700 font-medium"
                          >
                            Voir tous nos services
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/projects"
                className={`relative py-2 px-4 font-medium transition-all duration-300 ${
                  location.pathname === '/projects' 
                    ? 'text-teal-600' 
                    : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                Projets
                {location.pathname === '/projects' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"
                  />
                )}
              </Link>

              <Link
                to="/about"
                className="py-2 px-4 font-medium text-gray-700 hover:text-teal-600 transition-colors"
              >
                À Propos
              </Link>

              <Link
                to="/contact"
                className="py-2 px-4 font-medium text-gray-700 hover:text-teal-600 transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.a
                href="tel:+212690815605"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-full hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                Devis Gratuit
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6 text-gray-700" />
                  ) : (
                    <Menu className="w-6 h-6 text-gray-700" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md overflow-hidden"
              >
                <div className="py-6 space-y-4">
                  <Link
                    to="/"
                    onClick={toggleMenu}
                    className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                      location.pathname === '/' 
                        ? 'bg-teal-50 text-teal-600 border-l-4 border-teal-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Accueil
                  </Link>

                  {/* Mobile Services */}
                  <div className="px-4">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex items-center justify-between w-full py-3 text-gray-700 font-medium"
                    >
                      Services
                      <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-4 mt-2 space-y-2 overflow-hidden"
                        >
                          {services.map((service, index) => (
                            <Link
                              key={index}
                              to={service.link}
                              onClick={toggleMenu}
                              className="flex items-center py-2 text-gray-600 hover:text-teal-600 transition-colors"
                            >
                              <service.icon className="w-4 h-4 mr-3 text-teal-500" />
                              {service.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    to="/projects"
                    onClick={toggleMenu}
                    className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                      location.pathname === '/projects' 
                        ? 'bg-teal-50 text-teal-600 border-l-4 border-teal-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Projets
                  </Link>

                  <Link
                    to="/about"
                    onClick={toggleMenu}
                    className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    À Propos
                  </Link>

                  <Link
                    to="/contact"
                    onClick={toggleMenu}
                    className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Contact
                  </Link>

                  {/* Mobile CTA */}
                  <div className="px-4 pt-4 border-t border-gray-200">
                    <a
                      href="tel:+212690815605"
                      className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-full hover:from-teal-600 hover:to-teal-700 transition-all"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Devis Gratuit
                    </a>
                  </div>

                  {/* Mobile Contact Info */}
                  <div className="px-4 pt-4 border-t border-gray-200 space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-3 text-teal-500" />
                      <span className="text-sm">Casablanca, Maroc</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-3 text-teal-500" />
                      <span className="text-sm">contact@constructionxpert.ma</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-3 text-teal-500" />
                      <span className="text-sm">Lun - Ven: 8h00 - 18h00</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default ProfessionalNavbar;