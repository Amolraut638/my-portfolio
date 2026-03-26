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
      className="min-h-[calc(100vh-80px)] bg-darkBg flex items-center pt-20 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left flex-1"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-lightText leading-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Amol Raut
              </span>
            </h1>

            <div className="text-mutedText text-xl sm:text-2xl mb-4 flex flex-col sm:flex-row items-center md:items-start gap-2">
              <span>I build</span>
              <RotatingText />
            </div>

            <p className="text-mutedText text-base mb-8 max-w-lg leading-relaxed mx-auto md:mx-0">
              Backend-focused Full Stack Developer passionate about scalable APIs,
              system design, and AI-assisted products. 200+ DSA problems solved.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              
              <a
                href="https://www.linkedin.com/in/amolraut9272"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-darkCard border border-gray-800 rounded-lg hover:shadow-glow hover:border-primary transition duration-300 text-sm"
              >
                <FaLinkedin className="text-primary" />
                LinkedIn
              </a>

              <a
                href="https://github.com/Amolraut638"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-darkCard border border-gray-800 rounded-lg hover:shadow-glow hover:border-primary transition duration-300 text-sm"
              >
                <FaGithub className="text-primary" />
                GitHub
              </a>

              <a
                href="https://leetcode.com/u/Amolraut638/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-darkCard border border-gray-800 rounded-lg hover:shadow-glow hover:border-primary transition duration-300 text-sm"
              >
                <SiLeetcode className="text-primary" />
                LeetCode
              </a>

              <a
                href="https://takeuforward.org/profile/amolraut_638"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-darkCard border border-gray-800 rounded-lg hover:shadow-glow hover:border-primary transition duration-300 text-sm"
              >
                <img
                  src="/tuf.png"
                  alt="TakeUforward"
                  className="w-4 h-4 object-contain"
                />
                <span>takeUforward</span>
              </a>

              <a
                href="https://drive.google.com/file/d/1TxuBqhGoetCeQtEIkmRT7O9ZkV-X1EZs/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-accent transition duration-300 shadow-glow text-sm"
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
            <div className="relative">
              {/* Glow ring behind image */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl scale-110 pointer-events-none" />

              {/* Image */}
              <img
                src="/desk.jpeg"
                alt="Developer working illustration"
                className="relative w-64 sm:w-80 md:w-[360px] h-64 sm:h-80 md:h-[360px] object-cover object-center rounded-2xl border border-gray-800 shadow-xl hover:scale-105 transition duration-500"
              />

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-darkCard border border-gray-800 rounded-xl px-4 py-2 shadow-lg">
                <p className="text-xs text-mutedText">Problems Solved</p>
                <p className="text-lg font-bold text-primary">200+</p>
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -top-4 -right-4 bg-darkCard border border-gray-800 rounded-xl px-4 py-2 shadow-lg">
                <p className="text-xs text-mutedText">Projects Built</p>
                <p className="text-lg font-bold text-primary">8+</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}