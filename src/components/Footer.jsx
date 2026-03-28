import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darkBg border-t border-gray-800 mt-0 md:mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">

          {/* Left Side */}
          <p className="text-mutedText text-sm text-center md:text-left">
            © {currentYear} Amol{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Raut
            </span>. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-mutedText text-sm">

            <a
              href="https://github.com/Amolraut638"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/amolraut9272"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              LinkedIn
            </a>

            <a
              href="https://leetcode.com/u/Amolraut638/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              LeetCode
            </a>

            <a
              href="https://takeuforward.org/profile/amolraut_638"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              takeUforward
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}