import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HardHat, Building2, Users, Calendar, TrendingUp, Shield, 
  CheckCircle, ArrowRight, Play, Star, Award, Target,
  Zap, Clock, MapPin, Phone, Mail, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0
  });

  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      title: "Construire l'Avenir",
      subtitle: "Solutions de Construction Innovantes",
      description: "Transformez vos idées en réalité avec notre expertise en gestion de projets de construction",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1920",
      cta: "Découvrir nos Services"
    },
    {
      id: 2,
      title: "Excellence & Qualité",
      subtitle: "Projets de Construction Premium",
      description: "Des standards de qualité exceptionnels pour vos projets les plus ambitieux",
      image: "https://images.unsplash.com/photo-1590496793907-eeef0d2a2fd1?auto=format&fit=crop&q=80&w=1920",
      cta: "Voir nos Réalisations"
    },
    {
      id: 3,
      title: "Innovation Technologique",
      subtitle: "Gestion Digitale des Projets",
      description: "Optimisez vos projets avec nos outils de gestion avancés et notre plateforme digitale",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920",
      cta: "Explorer la Plateforme"
    }
  ];

  // Services data
  const services = [
    {
      icon: Building2,
      title: "Gestion de Projets",
      description: "Supervision complète de vos projets de construction de A à Z",
      features: ["Planning détaillé", "Suivi en temps réel", "Contrôle qualité"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Équipes Spécialisées",
      description: "Professionnels qualifiés et équipes multidisciplinaires",
      features: ["Architectes experts", "Ingénieurs certifiés", "Artisans qualifiés"],
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Sécurité & Conformité",
      description: "Respect des normes et sécurité sur tous les chantiers",
      features: ["Normes ISO", "Sécurité renforcée", "Conformité légale"],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: TrendingUp,
      title: "Innovation & Tech",
      description: "Technologies de pointe pour optimiser vos projets",
      features: ["BIM intégré", "IoT chantiers", "Analytics avancés"],
      color: "from-purple-500 to-purple-600"
    }
  ];

  // Statistics
  const finalStats = {
    projects: 250,
    clients: 150,
    experience: 15,
    satisfaction: 98
  };

  // Client testimonials
  const testimonials = [
    {
      name: "Sarah Benali",
      position: "Directrice Développement",
      company: "Immobilier Prestige",
      content: "ConstructionXpert a transformé notre approche des projets. Leur plateforme digitale nous a fait gagner 30% de temps.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Ahmed Mansouri",
      position: "Promoteur Immobilier",
      company: "Mansouri Group",
      content: "Un niveau de qualité exceptionnel et un respect des délais remarquable. Je recommande vivement leurs services.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Fatima Zahra",
      position: "Architecte en Chef",
      company: "Studio Architecture",
      content: "L'équipe de ConstructionXpert comprend parfaitement nos besoins architecturaux. Une collaboration exemplaire.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Animate stats
  useEffect(() => {
    Object.keys(finalStats).forEach(key => {
      const finalValue = finalStats[key];
      let currentValue = 0;
      const increment = finalValue / 100;
      
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          currentValue = finalValue;
          clearInterval(timer);
        }
        
        setStats(prev => ({
          ...prev,
          [key]: Math.floor(currentValue)
        }));
      }, 20);
    });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const slideVariants = {
    enter: {
      x: 1000,
      opacity: 0
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      x: -1000,
      opacity: 0
    }
  };

  return (
    <main className="min-h-screen w-full">
      {/* Hero Section with Slider */}
      <section className="relative h-screen overflow-hidden pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("${heroSlides[currentSlide].image}")`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
            </div>
            
            <div className="relative h-full flex items-center justify-center">
              <div className="max-w-6xl mx-auto px-6 text-center text-white">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                    <HardHat className="w-5 h-5 mr-2 text-teal-400" />
                    <span className="text-sm font-medium">ConstructionXpert Solutions</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    {heroSlides[currentSlide].title}
                  </h1>
                  
                  <h2 className="text-2xl md:text-3xl font-light mb-6 text-teal-300">
                    {heroSlides[currentSlide].subtitle}
                  </h2>
                  
                  <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                    {heroSlides[currentSlide].description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <Link
                    to="/projects"
                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-full hover:from-teal-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-2xl"
                  >
                    {heroSlides[currentSlide].cta}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <button className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all">
                    <Play className="mr-2 w-5 h-5" />
                    Voir la Démo
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-teal-500 scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 right-8 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Découvrir</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/75 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div variants={itemVariants} className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stats.projects}+</div>
              <div className="text-lg opacity-90">Projets Réalisés</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stats.clients}+</div>
              <div className="text-lg opacity-90">Clients Satisfaits</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stats.experience}</div>
              <div className="text-lg opacity-90">Ans d'Expérience</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stats.satisfaction}%</div>
              <div className="text-lg opacity-90">Satisfaction Client</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos Services <span className="text-teal-600">d'Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour tous vos projets de construction, 
              de la conception à la livraison
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-teal-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Pourquoi Choisir <span className="text-teal-600">ConstructionXpert ?</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Target className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Expertise Reconnue</h3>
                    <p className="text-gray-600">15 ans d'expérience dans la gestion de projets complexes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Zap className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation Technologique</h3>
                    <p className="text-gray-600">Outils digitaux avancés pour optimiser vos projets</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Respect des Délais</h3>
                    <p className="text-gray-600">98% de nos projets livrés dans les temps impartis</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                  alt="Construction moderne"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center mb-2">
                    <Award className="w-6 h-6 text-teal-400 mr-2" />
                    <span className="font-semibold">Certifié ISO 9001</span>
                  </div>
                  <p className="text-sm opacity-90">Excellence & Qualité Garanties</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ce que disent nos <span className="text-teal-400">Clients</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Témoignages authentiques de nos partenaires satisfaits
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-teal-500 transition-all"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.position}</div>
                    <div className="text-sm text-teal-400">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à Démarrer Votre Projet ?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour une consultation gratuite 
              et découvrez comment nous pouvons réaliser vos ambitions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/projects"
                className="inline-flex items-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                <HardHat className="mr-2 w-5 h-5" />
                Commencer un Projet
              </Link>
              
              <a
                href="tel:+212690815605"
                className="inline-flex items-center px-8 py-4 bg-teal-800 text-white font-semibold rounded-full border-2 border-teal-400 hover:bg-teal-700 transition-all"
              >
                <Phone className="mr-2 w-5 h-5" />
                Appeler Maintenant
              </a>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-teal-100">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Casablanca, Maroc</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>contact@constructionxpert.ma</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default EnhancedHome;