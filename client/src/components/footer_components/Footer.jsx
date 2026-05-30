import React from "react";
import { CiFacebook, FaGithub, CiTwitter, CiLinkedin } from "../../icons/Icons";

const Footer = () => {
  return (
    <div>
      {/* Top Footer */}
      <div className="bg-gray-900 px-4 py-6">
        <div className="footer_parent grid grid-cols-1 md:grid-cols-3  gap-6 text-sm text-center p-5">
          {/* Web Links */}
          <div>
            <p className="font-bold mb-2 text-white">Web Links</p>
            <nav className="flex flex-col gap-2">
              <a href="/home" className="text-gray-50 hover:text-blue-400">
                Home
              </a>
              <a href="/about-us" className="text-gray-50 hover:text-blue-400">
                About Us
              </a>
              <a href="/contact-us" className="text-gray-50 hover:text-blue-400">
                Contact Us
              </a>
              <a href="/all-blogs" className="text-gray-50 hover:text-blue-400">
                Blog
              </a>
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <p className="font-bold mb-2 text-lg text-white">Social Links</p>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-gray-50 hover:text-blue-400">
                Facebook
              </a>
              <a href="#" className="text-gray-50 hover:text-blue-400">
                Twitter
              </a>
              <a href="#" className="text-gray-50 hover:text-blue-400">
                LinkedIn
              </a>
            </nav>
          </div>

          {/* Address */}
          <div>
            <p className="font-bold mb-2 text-lg text-white">Address</p>
            <nav className="flex flex-col gap-2">
              <span className="text-gray-50">HMS Hospital</span>
              <span className="text-gray-50">Bangalore, Karnataka</span>
              <span className="text-gray-50">India - 560057</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
<div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-700 bg-gray-900 text-white px-4 py-4">
          <small className="text-sm text-center sm:text-left">
          &copy; 2026 HMS Hospital Management System.
All rights reserved.
        </small>
        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-blue-400">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-blue-400">
            <CiLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
