import React from "react";
import { motion } from "framer-motion";
import { FaServer, FaDatabase, FaBrain, FaRobot } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const focusAreas = [
  {
    title: "Backend Engineering",
    desc: "Designing scalable APIs & systems",
    icon: <FaServer className="text-primary" />,
  },
  {
    title: "Database Design",
    desc: "Efficient schema & data handling",
    icon: <FaDatabase className="text-accent" />,
  },
  {
    title: "Problem Solving",
    desc: "Strong DSA & logical thinking",
    icon: <FaBrain className="text-primary" />,
  },
  {
    title: "AI Integration",
    desc: "Building LLM-powered applications",
    icon: <FaRobot className="text-accent" />,
  },
];

export default function AboutMe() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-darkBg text-lightText scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="h-1.5 w-12 bg-primary mx-auto mt-4 rounded-full opacity-40" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

          {/* LEFT - Focus Areas */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4"
          >
            {focusAreas.map((item, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 md:p-6 bg-darkCard border border-gray-800 rounded-2xl hover:border-primary/40 transition duration-300 group"
              >
                <div className="text-xl sm:text-2xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-lightText">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-mutedText mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>

          {/* RIGHT - Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-darkCard border border-gray-800 rounded-2xl p-6 sm:p-8 md:p-10">

              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6">
                Backend-focused Developer building{" "}
                <span className="text-primary">scalable systems</span>
              </h3>

              <div className="space-y-4 sm:space-y-5 text-mutedText leading-relaxed text-sm sm:text-base">

                <p>
                  I'm currently pursuing a B.E. in Electronics and Telecommunication (2026), with a strong focus on backend and full-stack development. I've built my skills through hands-on projects and consistent problem solving.
                </p>

                <p>
                  My primary interest lies in designing efficient APIs, managing structured data, and building systems that scale. I enjoy working with Node.js, databases like MongoDB and PostgreSQL, and optimizing performance using Redis.
                </p>

                <p>
                  I focus on writing clean, maintainable code and thinking in terms of system design rather than just implementation.
                </p>

                {/* Project Highlights */}
                <div className="pt-3 sm:pt-4">
                  <p className="text-lightText font-medium mb-2">
                    Some things I've built:
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <li>• AI-powered DSA mentor with guided problem solving</li>
                    <li>• Movie insight platform with real-time sentiment analysis</li>
                    <li>• ATS-friendly resume generator using AI</li>
                    <li>• Scalable URL shortener with caching & encoding</li>
                    <li>• QuickBlog - AI-powered blogging platform</li>
                  </ul>
                </div>

                <p className="text-primary font-medium pt-4 border-t border-gray-800/60 mt-4 text-sm sm:text-base">
                  "Build scalable systems. Think long-term. Improve daily."
                </p>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}