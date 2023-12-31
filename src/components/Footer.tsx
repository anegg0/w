import React from "react";
import logo from "@p/logo-sm.png";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    // <div className="footer">
    <div className="max-w-screen-xl px-2  mx-auto sm:px-2 lg:px-2 ">
      <div className="lg:flex lg:items-center lg:gap-8">
        <ul className="flex flex-grow justify-end col-span-2 gap-6 lg:col-span-5">
          <li>
            <a
              href="https://github.com/anegg0/W"
              rel="noreferrer"
              target="_blank"
              className="text-white transition hover:opacity-75"
            >
              <span className="sr-only">GitHub</span>
              <svg
                className="w-9 h-9"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ul>
        <div className="grid grid-cols-2 gap-8 mt-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
          <div className="col-span-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-500"></h2>
              <p className="mt-4 text-white"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8 mt-8 border-t border-gray-100">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <p className="text-xs text-left text-gray-300">
            © 2023. gr0wing. All rights reserved.
          </p>
          <nav aria-label="Footer Navigation - Support">
            <ul className="flex flex-wrap justify-start gap-4 text-xs lg:justify-end">
              <li>
                <a
                  href="#"
                  className="text-gray-300 transition hover:opacity-75"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 transition hover:opacity-75"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 transition hover:opacity-75"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default Footer;
