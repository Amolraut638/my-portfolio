import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const projects = [
  {
    name: "Resume-Builder",
    image: "/resumeBuilder.png",
    description: "An intelligent web application that helps users generate professional, ATS-friendly resumes instantly using AI and job description matching.",
    github: "https://github.com/Amolraut638/Resume-Builder",
    live: "https://resume-builder-amol-raut.vercel.app",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
  },
  {
    name: "QuickBlog",
    image: "/QuickBlog.png",
    description: "QuickBlog is a Full Stack modern blogging platform designed for fast content sharing with a clean UI and responsive design. Built using MERN Stack, it offers an intuitive way for users to create, read, and manage blog posts with ease.",
    github: "https://github.com/Amolraut638/QuickBlog",
    live: "https://quick-blog-638.vercel.app",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API", "JWT"],
  },
  {
    name: "Prescripto",
    image: "/prescripto.jpg",
    description: "Prescripto is a full-stack doctor appointment booking system developed from scratch. It facilitates seamless interactions between patients, doctors, and administrators, ensuring efficient appointment scheduling and management.",
    github: "https://github.com/Amolraut638/Prescripto",
    live: "https://github.com/Amolraut638/Prescripto",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Gemini API", "Razorpay API"],
  },
    {
    name: "URL-Shortener",
    image: "/url-shortener.png",
    description: "Built a full-stack URL Shortening System to understand system design concepts in real implementation. It converts long URLs into short links using Base62 encoding, PostgreSQL for storage, and Redis for fast redirects.",
    github: "https://github.com/Amolraut638/url-shortener",
    live: "https://github.com/Amolraut638/url-shortener",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Base62 encoding"],
  },
    {
    name: "Bank Management System",
    image: "/bankManagement.png",
    description: "A Banking Console Application is a menu-driven system developed to simulate basic banking operations such as account creation, deposits, withdrawals, and balance inquiry. The application uses file handling to securely store and manage customer data while demonstrating core programming concepts.",
    github: "https://github.com/Amolraut638/BankManagementSystem",
    live: "https://github.com/Amolraut638/BankManagementSystem",
    tech: ["C++", "OOP", "STL"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Projects() {
  return (
    <section
      id="projects"
      className="py-20 bg-darkBg text-lightText scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-14"
        >
          My{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Projects
          </span>
        </motion.h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="bg-darkCard border border-gray-800 rounded-xl overflow-hidden hover:shadow-glow hover:-translate-y-1 transition duration-300"
            >
              {/* Image (Reduced height) */}
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-44 object-cover"
              />

              {/* Content (Reduced padding + spacing) */}
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold">
                  {project.name}
                </h3>

                <p className="text-mutedText text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-800 rounded-full text-mutedText"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons (Slightly smaller) */}
                <div className="flex gap-3 pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-700 rounded-lg hover:border-indigo-500 hover:shadow-glow transition duration-300"
                  >
                    <FaGithub size={14} />
                    Code
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-purple-600 transition duration-300"
                  >
                    <FaExternalLinkAlt size={14} />
                    Live
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

export default Projects;