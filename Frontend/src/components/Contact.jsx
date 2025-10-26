import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Send, 
  MessageSquare, FileText, CheckCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l'envoi du formulaire
    console.log('Formulaire envoyé:', formData);
    setIsSubmitted(true);
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      content: "+212 6 90 81 56 05",
      link: "tel:+212690815605",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@constructionxpert.ma",
      link: "mailto:contact@constructionxpert.ma",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "Casablanca, Maroc",
      link: "#",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun - Ven: 8h00 - 18h00",
      link: "#",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <main className="min-h-screen w-full pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contactez-Nous
            </h1>
            <p className="text-xl text-teal-100">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                  onClick={() => info.link !== '#' && window.open(info.link)}
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-600">{info.content}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Envoyez-nous un Message
              </h2>
              <p className="text-gray-600 mb-8">
                Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-teal-50 border border-teal-200 rounded-lg p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-teal-900 mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-teal-700">
                    Nous vous répondrons très bientôt.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="+212 6 XX XX XX XX"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="Objet de votre message"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer le Message
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg p-8 text-white h-full">
                <h2 className="text-3xl font-bold mb-6">
                  Pourquoi Nous Contacter ?
                </h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <MessageSquare className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Consultation Gratuite</h3>
                      <p className="text-teal-100 text-sm">
                        Discutez de votre projet sans engagement
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Devis Détaillé</h3>
                      <p className="text-teal-100 text-sm">
                        Recevez une estimation précise et transparente
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Réponse Rapide</h3>
                      <p className="text-teal-100 text-sm">
                        Nos experts vous répondent sous 24h
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="font-semibold mb-4 text-lg">
                    Besoin d'une réponse immédiate ?
                  </h3>
                  <a
                    href="tel:+212690815605"
                    className="inline-flex items-center px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Appeler Maintenant
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Où Nous Trouver
            </h2>
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg" style={{ height: '400px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.95761755199!2d-7.589835583525918!3d33.57325328074089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d295b8b5d11f%3A0x5e2b8a3c1c7c5c7d!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sus!4v1627894567890!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

