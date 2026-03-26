import React from "react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", image: "/react.png" },
      { name: "JavaScript", image: "/javascript.png" },
      { name: "TypeScript", image: "/icons8-typescript-48.png" },
      { name: "Tailwind CSS", image: "/tailwind.png" },
      { name: "Redux", image: "/redux.png" },
      { name: "HTML", image: "/html.png" },
      { name: "CSS", image: "/css.png" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", image: "/node.png" },
      { name: "Express.js", image: "/ejs.png" },
      { name: "MongoDB", image: "/mongo.png" },
      { name: "PostgreSQL", image: "/icons8-postgresql-50.png" },
      { name: "Redis", image: "/icons8-redis-48.png" },
      { name: "JWT", image: "/jwt.png" },
    ],
  },
  {
    title: "Programming & Tools",
    skills: [
      { name: "C", image: "/c.png" },
      { name: "C++", image: "/c++.png" },
      { name: "Git", image: "/git.png" },
      { name: "GitHub", image: "/github.png" },
      { name: "DSA", image: "/dsa.png" },
      { name: "VS Code", image: "/icons8-visual-studio-code-48.png" },
      { name: "Postman", image: "/icons8-postman-inc-48.png" },
    ],
  },
];

// Consistent with Hero/About/Journey (y: 20 for professional feel)
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function SkillCard({ name, image }) {
  return (
    <motion.div
      className="bg-darkCard border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/40 hover:shadow-glow group"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
        {/* Subtle background glow on icon hover */}
        <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src={image}
          alt={name}
          className="relative w-full h-full object-contain filter grayscale-[0.2] group-hover:grayscale-0 transition-all duration-300"
        />
      </div>
      <p className="text-sm font-semibold text-mutedText group-hover:text-lightText transition-colors duration-300">
        {name}
      </p>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-darkBg text-lightText scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Technical{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Proficiency
            </span>
          </h2>
          <div className="h-1.5 w-12 bg-primary mx-auto mt-4 rounded-full opacity-40" />
        </motion.div>

        {/* Categories */}
        <div className="space-y-20">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-2xl font-bold text-lightText whitespace-nowrap">
                  {category.title}
                </h3>
                <div className="h-[1px] w-full bg-gradient-to-r from-gray-800 to-transparent" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {category.skills.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    name={skill.name}
                    image={skill.image}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}