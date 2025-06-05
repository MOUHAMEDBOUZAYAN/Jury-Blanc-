import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, Facebook, Github, Linkedin, Twitter, Youtube,
  Phone, Mail, MapPin, Clock, Send, ExternalLink, 
  HardHat, Building2, Users, Shield, Award, ArrowUp,
  CheckCircle, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfessionalFooter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(true);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    { name: "Gestion de Projets", link: "/services/gestion" },
    { name: "Construction Résidentielle", link: "/services/residentiel" },
    { name: "Construction Commerciale", link: "/services/commercial" },
    { name: "Rénovation & Extension", link: "/services/renovation" },
    { name: "Consulting Technique", link: "/services/consulting" },
    { name: "Sécurité & Conformité", link: "/services/securite" }
  ];

  const quickLinks = [
    { name: "À Propos", link: "/about" },
    { name: "Nos Projets", link: "/projects" },
    { name: "Équipe", link: "/team" },
    { name: "Carrières", link: "/careers" },
    { name: "Blog", link: "/blog" },
    { name: "FAQ", link: "/faq" }
  ];

  const legalLinks = [
    { name: "Mentions Légales", link: "/legal" },
    { name: "Politique de Confidentialité", link: "/privacy" },
    { name: "Conditions d'Utilisation", link: "/terms" },
    { name: "RGPD", link: "/gdpr" }
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://www.linkedin.com/in/mouhamed-bouzayan-9a7222344/', 
      color: 'hover:text-blue-600 hover:bg-blue-50' 
    },
    { 
      name: 'GitHub', 
      icon: Github, 
      url: 'https://github.com/MOUHAMEDBOUZAYAN', 
      color: 'hover:text-gray-900 hover:bg-gray-50' 
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://www.instagram.com', 
      color: 'hover:text-pink-600 hover:bg-pink-50' 
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      url: 'https://www.facebook.com', 
      color: 'hover:text-blue-700 hover:bg-blue-50' 
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      url: 'https://twitter.com', 
      color: 'hover:text-blue-400 hover:bg-blue-50' 
    },
    { 
      name: 'YouTube', 
      icon: Youtube, 
      url: 'https://youtube.com', 
      color: 'hover:text-red-600 hover:bg-red-50' 
    }
  ];

  const certifications = [
    { name: "ISO 9001", description: "Qualité" },
    { name: "ISO 14001", description: "Environnement" },
    { name: "OHSAS 18001", description: "Sécurité" },
    { name: "BIM Level 2", description: "Innovation" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-700">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <Send className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Restez Informé de Nos Derniers Projets
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Recevez nos actualités, conseils d'experts et invitations aux événements exclusifs
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              
              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center justify-center text-green-400"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Merci ! Vous êtes maintenant abonné à notre newsletter.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-12"
          >
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Link to="/" className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4">
                  <HardHat className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">ConstructionXpert</h3>
                  <p className="text-sm text-gray-400">Solutions Professionnelles</p>
                </div>
              </Link>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Leader en gestion de projets de construction au Maroc. 
                Nous transformons vos idées en réalité avec expertise, 
                innovation et un engagement total envers la qualité.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">+212 6 90 81 56 05</p>
                    <p className="text-sm text-gray-400">Disponible 24h/7j</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">contact@constructionxpert.ma</p>
                    <p className="text-sm text-gray-400">Réponse sous 24h</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Casablanca, Maroc</p>
                    <p className="text-sm text-gray-400">Zone Industrielle Ain Sebaâ</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Lun - Ven: 8h00 - 18h00</p>
                    <p className="text-sm text-gray-400">Sam: 9h00 - 13h00</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <Award className="w-5 h-5 text-teal-400 mr-2" />
                  Certifications
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
                      <Shield className="w-5 h-5 text-teal-400 mr-3" />
                      <div>
                        <div className="text-white font-medium text-sm">{cert.name}</div>
                        <div className="text-gray-400 text-xs">{cert.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Building2 className="w-6 h-6 text-teal-400 mr-2" />
                Services
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service.link}
                      className="flex items-center text-gray-300 hover:text-white transition-colors group"
                    >
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                      <span className="group-hover:translate-x-1 transition-transform">{service.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Users className="w-6 h-6 text-teal-400 mr-2" />
                Liens Rapides
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.link}
                      className="flex items-center text-gray-300 hover:text-white transition-colors group"
                    >
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Social */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6">Légal & Social</h3>
              
              {/* Legal Links */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-300">Informations Légales</h4>
                <ul className="space-y-3">
                  {legalLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.link}
                        className="flex items-center text-gray-400 hover:text-white transition-colors text-sm group"
                      >
                        <ExternalLink className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-300">Suivez-nous</h4>
                <div className="grid grid-cols-3 gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 transition-all ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">
                © {currentYear} ConstructionXpert. Tous droits réservés.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Développé avec 💙 par{' '}
                <a 
                  href="https://www.linkedin.com/in/mouhamed-bouzayan-9a7222344/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
                >
                  Mouhamed Bouzayan
                </a>
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>4.9/5 - 150+ Avis Clients</span>
              </div>
              <div className="hidden md:block">|</div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                <span>Entreprise Certifiée</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full shadow-2xl hover:shadow-teal-500/25 transition-all flex items-center justify-center group"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
    </footer>
  );
};

export default ProfessionalFooter;