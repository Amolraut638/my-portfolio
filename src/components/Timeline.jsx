import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Calendar } from "lucide-react";

const educationData = [
  {
    year: "2022 - 2026",
    title: "B.E in Electronics and Telecommunication",
    details: "Dr. D.Y. Patil Institute of Engineering Management and Research, Akurdi.",
    description:
      "CGPA: 7.78 | Demonstrated strong engineering fundamentals and problem-solving ability through real-world project development.",
  },
  {
    year: "2019 - 2020",
    title: "HSC",
    details: "R.B. Narayanrao Borawake College, Shrirampur.",
    description:
      "73.38% | Built a strong foundation in Physics, Chemistry and Mathematics.",
  },
  {
    year: "2017 - 2018",
    title: "SSC",
    details: "New English School, Bherdapur.",
    description:
      "86.80% | Secured Rank 2 in Batch. Awarded for academic excellence.",
  },
];

const experienceData = [
  {
    year: "Jan 2025 - Present",
    title: "Backend Developer Intern",
    details: "AD Infocom Systems.",
    description:
      "Worked on Blog Platform backend. Developed controllers, Authentication middlewares, and REST APIs for blog management and Admin Panel. Wrote clear, maintainable code for efficient debugging.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function JourneyCard({ item }) {
  return (
    <div className="relative pl-7 sm:pl-8 pb-10 sm:pb-12 last:pb-0 group">
      {/* Timeline Line */}
      <div className="absolute left-[11px] top-0 h-full w-[2px] bg-gray-800 group-last:h-0" />

      {/* Glowing Dot */}
      <div className="absolute left-0 top-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-darkBg border-2 border-primary flex items-center justify-center z-10 transition-transform duration-300 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
      </div>

      <div className="bg-darkCard border border-gray-800 p-4 sm:p-6 rounded-2xl hover:border-primary/40 transition-all duration-300 group-hover:shadow-glow">
        {/* Date Label */}
        <div className="flex items-center gap-2 text-mutedText text-xs font-medium mb-2 sm:mb-3 uppercase tracking-widest">
          <Calendar size={13} className="text-primary" />
          {item.year}
        </div>

        {/* Title */}
        <h4 className="text-base sm:text-xl font-bold text-lightText mb-1.5 sm:mb-2 leading-snug">
          {item.title}
        </h4>

        {/* Institution */}
        <p className="text-indigo-400 font-semibold text-xs sm:text-sm mb-3 sm:mb-4 tracking-wide">
          {item.details}
        </p>

        {/* Description */}
        <p className="text-mutedText text-xs sm:text-sm leading-relaxed pt-3 sm:pt-4 border-t border-gray-800/60">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="journey" className="py-16 md:py-24 bg-darkBg text-lightText scroll-mt-20 overflow-hidden">
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
            My{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full opacity-50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Experience Column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-7 sm:mb-10 pl-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Briefcase className="text-primary" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Experience</h3>
            </div>

            <div className="space-y-2">
              {experienceData.map((item, index) => (
                <JourneyCard key={index} item={item} />
              ))}
            </div>
          </motion.div>

          {/* Education Column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-7 sm:mb-10 pl-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <GraduationCap className="text-accent" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Education</h3>
            </div>

            <div className="space-y-2">
              {educationData.map((item, index) => (
                <JourneyCard key={index} item={item} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}