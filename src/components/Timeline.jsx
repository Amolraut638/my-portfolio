import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

const educationData = [
  {
    year: "2022 - 2026",
    title: "B.E in Electronics and Telecommunication",
    details: "Dr.D.Y.Patil Institute of Engineering Management and Research, Akurdi.",
    description:
      "CGPA: 7.78 | Demonstrated strong engineering fundamentals and problem-solving ability through real-world project development.",
  },
  {
    year: "2019 - 2020",
    title: "HSC",
    details: "R.B.Narayanrao Borawake College, Shrirampur.",
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
    year: "Jan 2025",
    title: "Backend Developer Intern",
    details: "AD Infocom Systems.",
    description:
      "Worked on Blog Platform backend. Developed controllers, Authentication middlewares, REST API's for blog management and Admin Panel, written clear and readable code for better debugging.",
  },
/*   {
    year: "May 2024 - July 2024",
    title: "Full Stack Developer Intern",
    details: "Site Galleria",
    description:
      "Built LMS backend architecture and database schema. Contributed to frontend implementation.",
  }, */
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function Timeline() {
  return (
    <section
      id="journey"
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
          className="text-4xl md:text-5xl font-bold text-center mb-20"
        >
          My{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Journey
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          <TimelineSection
            title="Education"
            data={educationData}
            icon={<GraduationCap size={20} />}
          />

          <TimelineSection
            title="Experience"
            data={experienceData}
            icon={<Briefcase size={20} />}
          />
        </div>
      </div>
    </section>
  );
}

function TimelineSection({ title, data, icon }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-primary mb-8 text-center md:text-left">
        {title}
      </h3>

      <VerticalTimeline
        layout="1-column"
        lineColor="#1F2937" // subtle gray line
      >
        {data.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            contentStyle={{
              background: "#111827",
              borderRadius: "12px",
              border: "1px solid #1F2937",
              boxShadow: "none",
              padding: "1.5rem",
            }}
            contentArrowStyle={{
              borderRight: "7px solid #111827",
            }}
            date={item.year}
            dateClassName="text-mutedText"
            iconStyle={{
              background: "#6366F1",
              color: "#fff",
            }}
            icon={icon}
          >
            <h4 className="text-lg font-semibold text-lightText mb-1">
              {item.title}
            </h4>

            <p className="text-sm text-mutedText mb-2">
              {item.details}
            </p>

            <p className="text-sm text-gray-400 leading-relaxed">
              {item.description}
            </p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default Timeline;