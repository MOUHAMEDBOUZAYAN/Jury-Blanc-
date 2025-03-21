import React from 'react';
import { Instagram, Facebook, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        {/* Section supérieure : Nom, Directeur, Téléphone et Icônes */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Nom, Directeur et Téléphone (alignés à gauche) */}
          <div className="text-left mb-4 md:mb-0">
            <a href="#"><p className="text-lg font-semibold hover:text-teal-400">Mouhamed Bouzayan</p></a>
            <p className="text-sm text-gray-400">Directeur</p>
            <p className="text-sm text-gray-400">+212 6 90 81 56 05</p>
          </div>

          {/* Icônes des réseaux sociaux (alignées à droite) */}
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-400 transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-400 transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-400 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Copyright (centré en bas) */}
        <div className="text-center border-t border-gray-800 pt-6">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Tous droits réservés. Développé par Mouhamed Bouzayan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;