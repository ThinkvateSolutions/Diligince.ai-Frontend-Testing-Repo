import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Diligince.ai</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting industrial ecosystems with artificial intelligence.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter size={22} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition">Careers</Link></li>
              <li><a href="mailto:careers@diligince.ai" className="text-gray-400 hover:text-white transition">Join us!</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Visakhapatnam, Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-gray-400" />
                <a href="tel:+919848756956" className="text-gray-400 hover:text-white transition">+91 9848756956</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-gray-400" />
                <a href="mailto:support@diligince.ai" className="text-gray-400 hover:text-white transition">support@diligince.ai</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500">© {new Date().getFullYear()} Diligince.ai. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
