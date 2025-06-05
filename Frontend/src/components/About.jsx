import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Users, Award, Target, Shield, TrendingUp, 
  Calendar, CheckCircle, Star, ArrowRight, Play, Quote,
  Globe, Heart, Lightbulb, Handshake, Phone, Mail,
  MapPin, ExternalLink, Clock, Zap, Eye, Trophy,
  HardHat
} from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('histoire');
  const [activeTeamMember, setActiveTeamMember] = useState(null);
  const [stats, setStats] = useState({
    projets: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0
  });

  // Animate stats on mount
  useEffect(() => {
    const finalStats = {
      projets: 250,
      clients: 150,
      experience: 15,
      satisfaction: 98
    };

    Object.keys(finalStats).forEach(key => {
      const finalValue = finalStats[key];
      let currentValue = 0;
      const increment = finalValue / 80;
      
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
      }, 25);
    });
  }, []);

  // Company values
  const values = [
    {
      icon: Shield,
      title: "Qualité & Excellence",
      description: "Nous nous engageons à délivrer des projets de la plus haute qualité, en respectant les standards internationaux et en dépassant les attentes de nos clients.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Heart,
      title: "Passion & Engagement",
      description: "Notre passion pour la construction nous pousse à donner le meilleur de nous-mêmes dans chaque projet, avec un engagement total envers la satisfaction client.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation & Technologie",
      description: "Nous intégrons les dernières technologies et méthodes innovantes pour optimiser nos processus et offrir des solutions de pointe.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Handshake,
      title: "Partenariat & Confiance",
      description: "Nous construisons des relations durables basées sur la transparence, la confiance mutuelle et le respect de nos engagements.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  // Team members
  const teamMembers = [
    {
      id: 1,
      name: "Mouhamed Bouzayan",
      position: "Fondateur & CEO",
      specialty: "Gestion de Projets & Innovation",
      experience: "15 ans d'expérience",
      description: "Expert en gestion de projets de construction avec une vision innovante pour l'industrie. Diplômé en ingénierie civile avec un MBA en management.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      achievements: ["Certification PMP", "MBA Management", "250+ Projets Dirigés"],
      linkedin: "https://www.linkedin.com/in/mouhamed-bouzayan-9a7222344/",
      email: "m.bouzayan@constructionxpert.ma"
    },
    {
      id: 2,
      name: "Sarah Alami",
      position: "Directrice Technique",
      specialty: "Architecture & Design",
      experience: "12 ans d'expérience",
      description: "Architecte passionnée spécialisée dans les projets durables et l'architecture contemporaine. Expertise en BIM et conception 3D.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      achievements: ["Architecte DPLG", "Expert BIM", "Prix Architecture Durable"],
      linkedin: "#",
      email: "s.alami@constructionxpert.ma"
    },
    {
      id: 3,
      name: "Ahmed Benjelloun",
      position: "Directeur des Opérations",
      specialty: "Gestion de Chantier & Sécurité",
      experience: "18 ans d'expérience",
      description: "Expert en gestion opérationnelle et sécurité des chantiers. Spécialiste des grands projets industriels et commerciaux.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      achievements: ["Certification NEBOSH", "Expert HSE", "Zéro Accident en 5 ans"],
      linkedin: "#",
      email: "a.benjelloun@constructionxpert.ma"
    },
    {
      id: 4,
      name: "Fatima Zahra Idrissi",
      position: "Directrice Qualité",
      specialty: "Contrôle Qualité & Conformité",
      experience: "10 ans d'expérience",
      description: "Ingénieure qualité spécialisée dans les normes internationales et la gestion des processus qualité dans la construction.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      achievements: ["Certification ISO Lead Auditor", "Expert Lean Construction", "Formation Six Sigma"],
      linkedin: "#",
      email: "f.idrissi@constructionxpert.ma"
    }
  ];

  // Certifications
  const certifications = [
    {
      name: "ISO 9001:2015",
      description: "Système de Management de la Qualité",
      icon: Award,
      year: "2020"
    },
    {
      name: "ISO 14001:2015",
      description: "Management Environnemental",
      icon: Globe,
      year: "2021"
    },
    {
      name: "OHSAS 18001",
      description: "Santé et Sécurité au Travail",
      icon: Shield,
      year: "2019"
    },
    {
      name: "BIM Level 2",
      description: "Building Information Modeling",
      icon: Building2,
      year: "2022"
    }
  ];

  // Timeline milestones
  const timeline = [
    {
      year: "2009",
      title: "Création de l'entreprise",
      description: "Fondation de ConstructionXpert avec une vision d'excellence",
      icon: Target
    },
    {
      year: "2012",
      title: "Premier grand projet",
      description: "Réalisation du complexe résidentiel Les Jardins de Casablanca",
      icon: Building2
    },
    {
      year: "2015",
      title: "Expansion régionale",
      description: "Ouverture de bureaux à Rabat et Marrakech",
      icon: Globe
    },
    {
      year: "2018",
      title: "Innovation technologique",
      description: "Lancement de notre plateforme digitale de gestion",
      icon: Zap
    },
    {
      year: "2020",
      title: "Certification ISO",
      description: "Obtention des certifications ISO 9001 et ISO 14001",
      icon: Award
    },
    {
      year: "2024",
      title: "250ème projet",
      description: "Franchissement du cap des 250 projets réalisés",
      icon: Trophy
    }
  ];

  // Tab content data
  const tabContent = {
    histoire: {
      title: "Notre Histoire",
      content: (
        <div className="space-y-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed">
              Fondée en 2009 par <strong>Mouhamed Bouzayan</strong>, ConstructionXpert est née d'une vision simple mais ambitieuse : 
              révolutionner la gestion de projets de construction au Maroc en alliant expertise traditionnelle et innovation technologique.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              Depuis nos débuts modestes avec une équipe de 5 personnes, nous avons grandi pour devenir l'un des acteurs majeurs 
              de la construction au Maroc. Notre croissance s'est construite sur des valeurs solides : la qualité, l'innovation, 
              la transparence et un service client exceptionnel.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              Aujourd'hui, avec plus de <strong>250 projets réalisés</strong> et une équipe de <strong>150+ professionnels</strong>, 
              nous continuons d'innover et de repousser les limites de ce qui est possible dans la construction moderne.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-teal-300"></div>
            
            <div className="space-y-12">
              {timeline.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-center"
                >
                  <div className="w-16 h-16 bg-white border-4 border-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <milestone.icon className="w-8 h-8 text-teal-600" />
                  </div>
                  
                  <div className="ml-8">
                    <div className="text-2xl font-bold text-teal-600 mb-1">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    mission: {
      title: "Mission & Vision",
      content: (
        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Accompagner nos clients dans la réalisation de leurs projets de construction en fournissant des solutions 
                innovantes, durables et de haute qualité. Nous nous engageons à dépasser les attentes tout en respectant 
                les délais, budgets et normes de sécurité les plus strictes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Devenir la référence en matière de gestion de projets de construction au Maroc et en Afrique du Nord, 
                en établissant de nouveaux standards d'excellence, d'innovation et de responsabilité environnementale 
                dans l'industrie de la construction.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white"
          >
            <div className="text-center">
              <Quote className="w-12 h-12 text-teal-400 mx-auto mb-6" />
              <blockquote className="text-2xl font-light italic mb-6">
                "Notre engagement est de transformer chaque projet en une réussite exceptionnelle, 
                en combinant savoir-faire traditionnel et innovation technologique."
              </blockquote>
              <cite className="text-teal-400 font-semibold">- Mouhamed Bouzayan, Fondateur & CEO</cite>
            </div>
          </motion.div>
        </div>
      )
    },
    valeurs: {
      title: "Nos Valeurs",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      )
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
              <Building2 className="w-5 h-5 mr-2 text-teal-400" />
              <span className="text-sm font-medium">À Propos de ConstructionXpert</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Construire l'Avenir avec <span className="text-teal-400">Passion</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Depuis 2009, nous transformons les rêves architecturaux en réalité grâce à notre expertise, 
              notre innovation et notre engagement envers l'excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-full hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg"
              >
                <Users className="mr-2 w-5 h-5" />
                Rencontrer l'Équipe
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all"
              >
                <Play className="mr-2 w-5 h-5" />
                Notre Histoire
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.projets}+</div>
              <div className="text-gray-600">Projets Réalisés</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.clients}+</div>
              <div className="text-gray-600">Clients Satisfaits</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.experience}</div>
              <div className="text-gray-600">Ans d'Expérience</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.satisfaction}%</div>
              <div className="text-gray-600">Satisfaction</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  {tabContent[tab].title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {tabContent[activeTab].title}
                </h2>
              </div>
              {tabContent[activeTab].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Notre <span className="text-teal-600">Équipe</span> d'Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels passionnés et expérimentés qui font la différence dans chaque projet
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setActiveTeamMember(member)}
              >
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.position}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-teal-600 mb-3">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{member.experience}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{member.specialty}</p>
                  
                  <div className="flex gap-2">
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Member Modal */}
      <AnimatePresence>
        {activeTeamMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setActiveTeamMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-6 mb-6">
                <img 
                  src={activeTeamMember.image} 
                  alt={activeTeamMember.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeTeamMember.name}</h3>
                  <p className="text-teal-600 font-semibold mb-2">{activeTeamMember.position}</p>
                  <p className="text-gray-600 mb-3">{activeTeamMember.specialty}</p>
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{activeTeamMember.experience}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{activeTeamMember.description}</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Réalisations</h4>
                <div className="flex flex-wrap gap-2">
                  {activeTeamMember.achievements.map((achievement, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href={activeTeamMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn
                </a>
                <a 
                  href={`mailto:${activeTeamMember.email}`}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
                <button
                  onClick={() => setActiveTeamMember(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors ml-auto"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certifications Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              Certifications & <span className="text-teal-400">Accréditations</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Notre engagement envers la qualité est reconnu par les organismes de certification les plus exigeants
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{cert.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{cert.description}</p>
                <div className="text-teal-400 font-semibold text-sm">Depuis {cert.year}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <HardHat className="w-16 h-16 text-white mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Rejoignez Notre Aventure
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Découvrez comment notre expertise et notre passion peuvent donner vie à vos projets les plus ambitieux
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
              >
                <Building2 className="w-5 h-5" />
                Voir nos Projets
              </motion.a>
              
              <motion.a
                href="tel:+212690815605"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-800 transition-all border-2 border-teal-400"
              >
                <Phone className="w-5 h-5" />
                Nous Contacter
              </motion.a>
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

export default About;