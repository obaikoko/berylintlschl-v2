import Link from "next/link";
import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-green-500"
    >
      <path d="M20.52 3.48A12.07 12.07 0 0 0 3.49 20.52l-1.4 5.17 5.17-1.4A12.07 12.07 0 0 0 20.52 3.48zM12 21.5c-1.79 0-3.56-.47-5.1-1.36l-.36-.2-3.06.83.83-3.06-.2-.36A9.5 9.5 0 1 1 21.5 12 9.52 9.52 0 0 1 12 21.5zm4.73-6.78c-.26-.13-1.52-.75-1.75-.84s-.4-.13-.57.13-.66.84-.81 1.01-.3.2-.57.07a7.68 7.68 0 0 1-2.26-1.4 8.54 8.54 0 0 1-1.57-1.93c-.17-.3 0-.46.13-.59.13-.13.3-.33.43-.5s.17-.3.26-.5a.55.55 0 0 0-.03-.53c-.08-.13-.57-1.38-.78-1.88s-.41-.44-.57-.44H8.07a1.11 1.11 0 0 0-.8.37A3.37 3.37 0 0 0 6 10.83c0 1 .69 1.96.78 2.1s1.37 2.12 3.33 2.96c1.96.84 1.96.56 2.31.53s1.14-.46 1.3-.9.65-1.15.83-1.3.39-.2.65-.13 1.65.78 1.94.91.46.2.53.3.07.5-.03.97-.61 1.06-.83 1.13z" />
    </svg>
  );

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Contact Details
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:text-blue-300 transition-colors" />
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  07060511978, 09073091617
                </p>
              </div>

              <div className="flex items-start space-x-3 group">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:text-blue-300 transition-colors" />
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  berylintlschl@gmail.com
                </p>
              </div>

              <div className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:text-blue-300 transition-colors" />
                <p className="text-gray-300 group-hover:text-white transition-colors text-sm leading-relaxed">
                  Plot 1, Block 1, Ikot Eneobong (Federal Housing Estate) Calabar Municipality, Cross River State
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Quick Links
              </h2>
            </div>

            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/events", label: "Events" },
                { href: "/admission", label: "Admission" },
                { href: "/gallery", label: "Gallery" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Social Media
              </h2>
            </div>

            <ul className="space-y-3">
              <li>
                <Link
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <Instagram className="w-5 h-5 mr-3 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <Linkedin className="w-5 h-5 mr-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <span>LinkedIn</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <Facebook className="w-5 h-5 mr-3 text-blue-500 group-hover:text-blue-400 transition-colors" />
                  <span>Facebook</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://wa.me/2347060511978"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <WhatsAppIcon />
                  <span className="ml-3">WhatsApp</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/@berylinternationalschools9663"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <Youtube className="w-5 h-5 mr-3 text-red-500 group-hover:text-red-400 transition-colors" />
                  <span>YouTube</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* School Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-sm"></div>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                About Us
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                Beryl International Schools is committed to providing quality education and fostering academic excellence in a nurturing environment.
              </p>

              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Our Mission
                </h3>
                <p className="text-gray-300 text-sm">
                  To develop well-rounded individuals who are prepared for the challenges of tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} Beryl International Schools. All rights reserved.
            </p>

            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <div className="text-gray-400 text-sm">
                Powered by Beryl International Schools
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
