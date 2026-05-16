import { useEffect, useState } from "react";
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
      className="min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] flex items-center justify-center pt-16 sm:pt-20 pb-10 sm:pb-0 overflow-hidden relative"
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <p className="text-[22vw] font-black text-lightText/[0.03] whitespace-nowrap">
          AMOL RAUT
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for opportunities
          </div>

          {/* Name */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-lightText leading-none tracking-tight">
            Amol{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Raut
            </span>
          </h1>

          {/* Rotating Text */}
          <div className="text-mutedText text-base sm:text-xl md:text-2xl flex flex-wrap justify-center items-center gap-2">
            <span>I build</span>
            <RotatingText />
          </div>

          {/* Description */}
          <p className="text-mutedText text-xs sm:text-sm md:text-base leading-relaxed max-w-xs sm:max-w-md md:max-w-xl">
            Backend-focused Full Stack Developer passionate about scalable APIs,
            system design, and AI-assisted products.
          </p>

          {/* Stats */}
          <div className="flex gap-6 sm:gap-8 md:gap-12 py-3 sm:py-4 md:py-5 border-y border-gray-800 w-full justify-center">
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">200+</p>
              <p className="text-[10px] sm:text-xs text-mutedText">Problems Solved</p>
            </div>
            <div className="w-px bg-gray-800" />
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">6+</p>
              <p className="text-[10px] sm:text-xs text-mutedText">Projects Built</p>
            </div>
            <div className="w-px bg-gray-800" />
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">15+</p>
              <p className="text-[10px] sm:text-xs text-mutedText">Technologies Known</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">

            <a href="https://www.linkedin.com/in/amolraut9272" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-darkCard border border-gray-800 rounded-lg hover:shadow-glow hover:border-primary transition duration-300 text-xs sm:text-sm">
              <FaLinkedin className="text-primary" /> LinkedIn
            </a>

            <a href="https://github.com/Amolraut638" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-darkCard border border-gray-800 rounded-lg hover:shadow-glow hover:border-primary transition duration-300 text-xs sm:text-sm">
              <FaGithub className="text-primary" /> GitHub
            </a>

            <a href="https://leetcode.com/u/Amolraut638/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-darkCard border border-gray-800 rounded-lg hover:shadow-glow hover:border-primary transition duration-300 text-xs sm:text-sm">
              <SiLeetcode className="text-primary" /> LeetCode
            </a>

            <a href="https://takeuforward.org/profile/amolraut_638" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-darkCard border border-gray-800 rounded-lg hover:shadow-glow hover:border-primary transition duration-300 text-xs sm:text-sm">
              <img src="/tuf.png" alt="TakeUforward" className="w-4 h-4 object-contain" />
              takeUforward
            </a>

            <a href="https://drive.google.com/file/d/1Qx3PCmxcKuSI4ZmZ1OmHYTa-mtf4xrCa/view?usp=sharing" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-primary text-white rounded-lg hover:bg-accent transition duration-300 shadow-glow text-xs sm:text-sm">
              <TiDocumentText /> Resume
            </a>

          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sm:hidden w-full flex justify-center pt-2"
          >
            <div className="relative px-4 py-4">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl scale-110 pointer-events-none" />
              <img
                src="/desk.jpeg"
                alt="Amol Raut workspace"
                className="relative w-64 h-52 object-cover object-center rounded-2xl border border-gray-800 shadow-xl"
              />
              {/* <div className="absolute bottom-0 left-0 bg-darkCard border border-gray-800 rounded-xl px-3 py-2 shadow-lg">
                <p className="text-[10px] text-mutedText">Problems Solved</p>
                <p className="text-sm font-bold text-primary">200+</p>
              </div>
              <div className="absolute top-0 right-0 bg-darkCard border border-gray-800 rounded-xl px-3 py-2 shadow-lg">
                <p className="text-[10px] text-mutedText">Projects Built</p>
                <p className="text-sm font-bold text-primary">6+</p>
              </div> */}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}