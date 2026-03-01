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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function SkillCard({ name, image }) {
  return (
    <motion.div
      className="bg-darkCard border border-gray-800 rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-glow hover:-translate-y-2 transition duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={image}
        alt={name}
        className="w-14 h-14 object-contain mb-3"
      />
      <p className="text-sm font-medium text-lightText">{name}</p>
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
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          My{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Skills
          </span>
        </motion.h2>

        {/* Categories */}
        <div className="space-y-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-8 text-primary">
                {category.title}
              </h3>

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