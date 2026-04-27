import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const projects = [

  {
    name: "Olive frontend clone",
    image: "/olive.png",
    description:"Recreated a pixel-accurate landing page inspired by Olive as part of a frontend assessment using React and Vite. Focused on responsive design, smooth interactions, and clean UI implementation. Ensured a modern, mobile-friendly experience with attention to detail and performance.",
    github: "https://github.com/Amolraut638/Olive-clone",
    live: "https://olive-clone-hmi.vercel.app",
    tech: ["React.js", "CSS", "Vite", "lucide-react", "framer-motion"],
  },
  {
    name: "DsaMentor.ai",
    image: "/dsamentor.png",
    description:
      "Built a purpose-built DSA and LeetCode mentor chatbot that teaches instead of just answering. Integrated Groq LLM API on a Node.js backend with concept and mentor modes.",
    github: "https://github.com/Amolraut638/dsa-mentor-ai",
    live: "https://dsa-mentor-ai-amolraut638.vercel.app",
    tech: ["React.js", "Node.js", "Groq AI", "REST API"],
  },
  {
    name: "AI Movie Insight Builder",
    image: "/movieInsight.png",
    description:
      "AI-powered web app fetching movie data via TMDB API and enhancing it with audience sentiment analysis using Groq AI. Focused on clean architecture and real-time insights.",
    github: "https://github.com/Amolraut638/ai-movie-insight-builder",
    live: "https://ai-movie-insight-builder-tau.vercel.app",
    tech: ["Next.js", "React", "TMDB API", "Groq AI"],
  },
  {
    name: "Resume-Builder",
    image: "/resumeBuilder.png",
    description:
      "An intelligent web application that helps users generate professional, ATS-friendly resumes instantly using AI and job description matching.",
    github: "https://github.com/Amolraut638/Resume-Builder",
    live: "https://resume-builder-amol-raut.vercel.app",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    name: "URL-Shortener",
    image: "/url-shortener.png",
    description:
      "Full-stack system converting long URLs into short links using Base62 encoding. Utilizes PostgreSQL for storage and Redis for high-speed redirects.",
    github: "https://github.com/Amolraut638/url-shortener",
    live: "https://github.com/Amolraut638/url-shortener",
    tech: ["React.js", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    name: "QuickBlog",
    image: "/QuickBlog.png",
    description:
      "Modern blogging platform with AI content generation via Gemini API. Features include JWT authentication and a full MERN stack architecture.",
    github: "https://github.com/Amolraut638/QuickBlog",
    live: "https://quick-blog-638.vercel.app",
    tech: ["React.js", "MongoDB", "Gemini API", "JWT"],
  },
  {
    name: "My Portfolio Website",
    image: "/portfolio.png",
    description:
      "A modern, responsive developer portfolio featuring glassmorphism, Framer Motion animations, and a clean UI/UX designed to showcase technical expertise and project work.",
    github: "https://github.com/Amolraut638/my-portfolio",
    live: "https://amolraut.vercel.app",
    tech: ["React.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Bank Management System",
    image: "/bankManagement.png",
    description:
      "A C++ console application simulating core banking operations using OOP principles and file handling for secure customer data management.",
    github: "https://github.com/Amolraut638/BankManagementSystem",
    live: "https://github.com/Amolraut638/BankManagementSystem",
    tech: ["C++", "OOP", "File Handling"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-16 md:py-24 text-lightText scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="h-1.5 w-12 bg-primary mx-auto mt-4 rounded-full opacity-40" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group bg-darkCard border border-gray-800 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-glow flex flex-col"
            >

              {/* Image */}
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay (Desktop) */}
                <div className="absolute inset-0 bg-darkBg/90 backdrop-blur-sm flex-col items-center justify-center gap-4 px-5 hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-lightText text-xs text-center leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-600 rounded-lg hover:border-primary hover:text-primary transition duration-300"
                    >
                      <FaGithub size={13} />
                      Code
                    </a>

                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-accent transition duration-300"
                    >
                      <FaExternalLinkAlt size={11} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="text-base sm:text-lg font-bold text-lightText mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>

                {/* Mobile description */}
                <p className="text-mutedText text-xs leading-relaxed mb-3 line-clamp-2 md:hidden">
                  {project.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-md text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Mobile buttons */}
                <div className="flex gap-3 mt-auto md:hidden">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-700 rounded-xl hover:bg-gray-800 transition duration-300"
                  >
                    <FaGithub size={13} />
                    Code
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-primary text-white rounded-xl hover:bg-accent transition duration-300"
                  >
                    <FaExternalLinkAlt size={11} />
                    Live Demo
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}