import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function AboutMe() {
  return (
    <section
      id="about"
      className="py-24 bg-darkBg text-lightText scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Section Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          About{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Me
          </span>
        </motion.h2>

        {/* Content Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-darkCard border border-gray-800 rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-glow transition duration-300"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">
            Hi, I'm <span className="text-primary">Amol Raut</span>
          </h3>

          <div className="space-y-6 text-mutedText text-base md:text-lg leading-relaxed">
            <p>
              I am currently pursuing a B.E. in Electronics and Telecommunication
              Engineering (2026 batch), with a strong inclination toward backend and
              full-stack development. Despite coming from an ENTC background, I have
              built solid expertise in software engineering through consistent
              hands-on practice and real-world projects.
            </p>

            <p>
              I am a backend-focused Full Stack Developer with strong foundations in
              Data Structures, Algorithms, and system design fundamentals. I enjoy
              designing scalable APIs, optimizing performance, and building clean,
              maintainable backend architectures using Node.js, Express, MongoDB,
              PostgreSQL, and Redis.
            </p>

            <p>
              I have solved over{" "}
              <span className="text-lightText font-medium">200+ DSA problems</span>{" "}
              across multiple coding platforms, which has significantly strengthened
              my analytical thinking, debugging skills, and ability to design
              efficient solutions.
            </p>

            <p>Some of my notable projects include:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="text-lightText font-medium">DsaMentor.ai</span>{" "}
                - A purpose-built AI-powered DSA and LeetCode mentor chatbot with a
                dual-mode system prompt. Concept mode teaches topics with code and
                complexity analysis, while mentor mode guides users through problems
                with progressive hints instead of direct answers. Built with React,
                Node.js, and Groq LLM API.
              </li>
              <li>
                <span className="text-lightText font-medium">
                  AI Movie Insight Builder
                </span>{" "}
                - A full-stack AI-powered movie insight platform integrating TMDB API
                for rich metadata and Groq AI for real-time audience sentiment
                analysis. Built with Next.js for clean architecture and fast
                performance.
              </li>
              <li>
                <span className="text-lightText font-medium">Resume Builder</span>{" "}
                - An intelligent web application that helps users generate
                ATS-friendly resumes instantly using AI and job description matching.
              </li>
              <li>
                <span className="text-lightText font-medium">ZipURL</span>{" "}
                - A scalable URL shortener using Base62 encoding, PostgreSQL, and
                Redis caching for optimized redirect performance.
              </li>
            
              <li>
                <span className="text-lightText font-medium">QuickBlog</span>{" "}
                - An AI-powered blogging platform with JWT authentication, role-based
                access, and Google Gemini integration for automated content
                generation.
              </li>
            </ul>

            <p>
              I am particularly interested in backend engineering, AI-assisted
              systems, and building products that solve real-world problems. I focus
              on writing production-ready code and continuously improving my
              system-level thinking.
            </p>

            <p className="text-primary font-medium text-lg">
              "Build scalable systems. Think long-term. Improve daily."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutMe;