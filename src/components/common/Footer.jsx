import { Link } from "react-router-dom";
import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link
              to="/"
              className="text-2xl font-display font-bold text-primary-600"
            >
              NestFinder
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              A centralized platform for parents in Cyprus to discover, book
              appointments with, and enroll their children in kindergartens
              across the island.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.234.585 1.8 1.15.566.566.902 1.132 1.152 1.8.247.636.416 1.363.465 2.427.048 1.024.06 1.379.06 3.808 0 2.43-.013 2.784-.06 3.808-.049 1.064-.218 1.791-.465 2.427-.25.668-.586 1.234-1.151 1.8-.566.566-1.132.902-1.8 1.152-.636.247-1.363.416-2.427.465-1.024.048-1.379.06-3.808.06-2.43 0-2.784-.013-3.808-.06-1.064-.049-1.791-.218-2.427-.465-.668-.25-1.234-.586-1.8-1.151-.566-.566-.902-1.132-1.152-1.8-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.379-.06-3.808 0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427.25-.668.586-1.234 1.151-1.8.566-.566 1.132-.902 1.8-1.152.636-.247 1.363-.416 2.427-.465 1.024-.048 1.379-.06 3.808-.06zm0 1.665c-2.393 0-2.717.01-3.74.057-.887.04-1.39.19-1.744.314-.454.177-.842.4-1.204.762-.362.362-.585.75-.762 1.204-.124.354-.274.857-.314 1.744-.047 1.023-.058 1.347-.058 3.74 0 2.393.01 2.717.058 3.74.04.887.19 1.39.314 1.744.177.454.4.842.762 1.204.362.362.75.585 1.204.762.354.124.857.274 1.744.314 1.023.047 1.347.058 3.74.058 2.393 0 2.717-.01 3.74-.058.887-.04 1.39-.19 1.744-.314.454-.177.842-.4 1.204-.762.362-.362.585-.75.762-1.204.124-.354.274-.857.314-1.744.047-1.023.058-1.347.058-3.74 0-2.393-.01-2.717-.058-3.74-.04-.887-.19-1.39-.314-1.744-.177-.454-.4-.842-.762-1.204-.362-.362-.75-.585-1.204-.762-.354-.124-.857-.274-1.744-.314-1.023-.047-1.347-.058-3.74-.058zm0 2.83a3.475 3.475 0 100 6.95 3.475 3.475 0 000-6.95zm0 5.72a2.245 2.245 0 110-4.49 2.245 2.245 0 010 4.49zm4.705-5.875a.81.81 0 10-1.62 0 .81.81 0 001.62 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Find Kindergartens
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/privacy"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} NestFinder Cyprus. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
