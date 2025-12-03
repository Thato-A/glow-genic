// src/components/Footer.jsx
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white pt-16 pb-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand + Social */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Glow Genic</h2>
          <p className="text-gray-200 mb-6">
            Your journey to radiant, healthy skin starts here. Personalized
            skincare solutions for every concern.
          </p>

          <div className="flex items-center gap-4">
            {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
              <button
                key={i}
                type="button"
                className="p-3 bg-teal-700 rounded-full hover:bg-teal-600 hover:-translate-y-0.5 transition transform"
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-3 text-gray-200 text-sm">
            <li>Skin Consultations</li>
            <li>Custom Routines</li>
            <li>Virtual Sessions</li>
            <li>Product Recommendations</li>
            <li>Follow-up Support</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-200 text-sm">
            <li>About Us</li>
            <li>Our Products</li>
            <li>Skin Quiz</li>
            <li>Blog</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-200 text-sm">
            <li>
              1234 Beauty Boulevard <br />
              Suite 567 <br />
              Los Angeles, CA 90028
            </li>
            <li>+1 (310) 555-1234</li>
            <li>hello@glowgenic.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-teal-700 mt-10 pt-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-gray-300 text-xs md:text-sm">
        <p>© 2025 Glow Genic. All rights reserved.</p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="cursor-pointer hover:text-white">
            Privacy Policy
          </span>
          <span className="cursor-pointer hover:text-white">
            Terms of Service
          </span>
          <span className="cursor-pointer hover:text-white">Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
}
