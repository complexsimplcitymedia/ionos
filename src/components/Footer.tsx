import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://lh3.googleusercontent.com/JrfHUooYKBIw5QMd7Zb1v9PB8uqBqVv5mwpFUtGWjDRCcFAK96--l8RTgnBsVF53IlkVG7F0psXTIXKwz6aGlgkau5wMULIov-E-rHM=s192"
                alt="Kustom Auto Wrx Logo"
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-xl font-bold text-white">Kustom Auto Wrx</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Gainesville's premier destination for vehicle wraps, custom paint, and professional auto body services.
            </p>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/kustomautowrx/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Instagram className="w-6 h-6" />
                <span>@kustomautowrx</span>
              </a>
              <a
                href="https://x.com/kustomautowrx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <XIcon />
                <span>@kustomautowrx</span>
              </a>
              <a
                href="https://www.facebook.com/kustomautowrx/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Facebook className="w-6 h-6" />
                <span>KustomAutoWrx</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start text-gray-400">
                <MapPin className="w-5 h-5 mr-2 text-blue-400 shrink-0 mt-1" />
                <span>2445 Hilton Dr, Ste 125W<br />Gainesville, GA 30501</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-2 text-blue-400" />
                <span>(470) 545-0570</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-2 text-blue-400" />
                <span>info@kustomautowrx.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Business Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Saturday</span>
                <span>10:00 AM - 3:00 PM</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Kustom Auto Wrx
            </p>
            <a 
              href="https://app.netlify.com/sites/helpful-crisp-4ea766/deploys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden"
            >
              <img 
                src="https://api.netlify.com/api/v1/badges/ab173410-2119-4436-a93a-365fbe4b9a1b/deploy-status" 
                alt="Netlify Status"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}