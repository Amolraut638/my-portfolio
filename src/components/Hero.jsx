import React, { useEffect, useState } from "react";
import { SiLeetcode } from "react-icons/si";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "modern web applications.",
  "scalable backend systems.",
  "MERN stack projects.",
  "efficient C++ solutions.",
];

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={phrases[index]}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4 }}
        className="text-primary font-medium"
      >
        {phrases[index]}
      </motion.span>
    </AnimatePresence>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-80px)] bg-darkBg flex items-center pt-20"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left flex-1"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-lightText">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Amol Raut
              </span>
            </h1>

            <div className="text-mutedText text-xl sm:text-2xl mb-8 flex flex-col sm:flex-row items-center md:items-start gap-2">
              <span>I build</span>
              <RotatingText />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">

              <a
                href="https://www.linkedin.com/in/amolraut9272"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-darkCard border border-gray-800 rounded-lg hover:shadow-glow hover:border-primary transition duration-300"
              >
                <FaLinkedin />
                LinkedIn
              </a>

              <a
                href="https://github.com/Amolraut638"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-darkCard border border-gray-800 rounded-lg hover:shadow-glow hover:border-primary transition duration-300"
              >
                <FaGithub />
                GitHub
              </a>

              <a
                href="https://leetcode.com/u/Amolraut638/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-darkCard border border-gray-800 rounded-lg hover:shadow-glow hover:border-primary transition duration-300"
              >
                <SiLeetcode />
                LeetCode
              </a>

              <a
                href="https://takeuforward.org/profile/amolraut_638"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-darkCard border border-gray-800 rounded-lg hover:shadow-glow hover:border-primary transition duration-300"
              >
                <img
                  src="/tuf.png"
                  alt="TakeUforward"
                  className="w-5 h-5 object-contain"
                />
                <span>takeUforward</span>
              </a>

              <a
                href="https://drive.google.com/file/d/1oqhSQ6avK6C-OqAL3xbqgIuhb24g-XSz/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-lg hover:bg-accent transition duration-300 shadow-glow"
              >
                <TiDocumentText />
                Resume
              </a>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center md:justify-end"
          >
            <img
              src="/hero_image.gif"
              alt="Developer working illustration"
              className="w-60 sm:w-80 md:w-96 rounded-2xl border border-gray-800 shadow-xl hover:scale-105 transition duration-500"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}