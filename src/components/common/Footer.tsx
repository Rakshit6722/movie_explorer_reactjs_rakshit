import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'Movies', href: '#' },
  { label: 'TV Shows', href: '#' },
  { label: 'New Releases', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
];

const socialLinks = [
  { icon: <FaTwitter size={24} />, href: 'https://twitter.com', label: 'Twitter' },
  { icon: <FaFacebookF size={24} />, href: 'https://facebook.com', label: 'Facebook' },
  { icon: <FaInstagram size={24} />, href: 'https://instagram.com', label: 'Instagram' },
  { icon: <FaYoutube size={24} />, href: 'https://youtube.com', label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer className="bg-black border-t-2 mt-52 border-gray-700 text-gray-300 py-16">
      <div className="container mx-auto px-8">

        <div className="flex flex-col md:flex-row justify-between items-start mb-16 space-y-12 md:space-y-0 md:space-x-12">
          <div className="mb-8 md:mb-0 w-full md:w-1/3">
            <div className="mb-8">
              <div className="h-16 w-64 bg-gray-900 flex items-center justify-center text-white text-xl font-bold rounded">
                MOVIE EXPLORER
              </div>
            </div>
            <p className="text-gray-400 mb-6 pr-8 leading-relaxed">
              Your ultimate destination for discovering and exploring the world of cinema. Finding your next favorite film has never been easier.
            </p>
          </div>

          <div className="w-full md:w-1/3 mb-8 md:mb-0 px-4">
            <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-4">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-red-500 transition duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 mt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Movie Explorer. All rights reserved.</p>
          <div className="flex space-x-10">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;