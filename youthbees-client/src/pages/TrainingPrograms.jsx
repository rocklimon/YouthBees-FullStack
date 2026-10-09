import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaCertificate,
  FaArrowRight,
  FaSearch,
} from "react-icons/fa";

/* ================= PROGRAM IMAGES ================= */
import pythonImg from "../assets/programs/python-fundamentals.jpg";
import careerGroomingImg from "../assets/programs/career-grooming.jpg";
import cvMasteryImg from "../assets/programs/cv-mastery.jpg";
// Note: If you don't have a specific image for Cybersecurity yet, 
// you can use one of the others or a placeholder.
import cyberImg from "../assets/programs/python-fundamentals.jpg"; 

const programsData = [
  {
    id: 1,
    title: "AI & Digital Literacy",
    desc: "Build a strong foundation in AI concepts and essential digital tools.",
    level: "Beginner",
    duration: "4 Weeks",
    source: "youthbees",
    thumbnail: pythonImg, // Mapping to uploaded python-fundamentals.jpg
  },
  {
    id: 2,
    title: "Cybersecurity Fundamentals",
    desc: "Learn cyber hygiene, threats, and security basics.",
    level: "Intermediate",
    duration: "6 Weeks",
    source: "youthbees",
    thumbnail: cyberImg,
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    desc: "Mentor-led intensive program covering frontend and backend.",
    level: "All Levels",
    duration: "8 Weeks",
    source: "mentor",
    mentor: "John Doe",
    thumbnail: careerGroomingImg, // Mapping to uploaded career-grooming.jpg
  },
  {
    id: 4,
    title: "Career Readiness Bootcamp",
    desc: "Mock interviews, CV review, LinkedIn optimization, and career planning.",
    level: "All Levels",
    duration: "3 Weeks",
    source: "mentor",
    mentor: "Sarah Ahmed",
    thumbnail: cvMasteryImg, // Mapping to uploaded cv-mastery.jpg
  },
];

export default function TrainingPrograms() {
  const [search, setSearch] = useState("");

  const filteredPrograms = programsData.filter((program) =>
    `${program.title} ${program.desc}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-32 px-4 selection:bg-orange-300 selection:text-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
            Training Programs
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Skill-focused programs delivered by YouthBees and approved mentors.
          </p>
        </motion.div>

        {/* SEARCH BAR */}
        <div className="relative max-w-xl mb-16">
          <FaSearch className="absolute top-1/2 left-6 -translate-y-1/2 text-orange-400" />
          <input
            type="text"
            placeholder="Search training programs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full pl-14 pr-5 py-4 rounded-2xl
              border border-orange-200
              bg-white
              text-slate-700 font-medium
              placeholder:text-slate-400
              focus:outline-none
              focus:ring-4 focus:ring-orange-200
              transition
            "
          />
        </div>

        {/* PROGRAM GRID */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))
          ) : (
            <p className="col-span-full text-center text-slate-400 text-lg">
              No programs found.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ================= PROGRAM CARD ================= */

function ProgramCard({ program }) {
  const isYouthBees = program.source === "youthbees";

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-[2.5rem] border border-orange-100 overflow-hidden
                 shadow-[0_15px_40px_-20px_rgba(255,140,26,0.25)]
                 hover:shadow-[0_30px_70px_-20px_rgba(255,140,26,0.35)]
                 transition-all"
    >
      {/* THUMBNAIL */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={program.thumbnail} 
          alt={program.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <div
            className={`px-4 py-1.5 rounded-full text-xs font-black shadow-md ${
              isYouthBees
                ? "bg-orange-500 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {isYouthBees ? "YouthBees Certified" : "Mentor-Led"}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* TITLE */}
        <h3 className="text-2xl font-black text-slate-900 mb-3">
          {program.title}
        </h3>

        {/* DESC */}
        <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">
          {program.desc}
        </p>

        {/* META */}
        <div className="space-y-3 text-sm text-slate-600 mb-8">
          <div className="flex items-center gap-2">
            <FaCertificate className="text-orange-500" />
            Certificate Included
          </div>
          <div className="flex items-center gap-2">
            <FaChalkboardTeacher className="text-orange-500" />
            {isYouthBees ? "YouthBees Team" : `Mentor: ${program.mentor}`}
          </div>
          <div className="flex justify-between text-xs text-slate-500 pt-4 border-t border-slate-50">
            <span className="font-bold">Level: {program.level}</span>
            <span className="font-bold">{program.duration}</span>
          </div>
        </div>

        {/* ACTION */}
        <a
          href={`/program/${program.id}`}
          className="inline-flex items-center justify-center w-full py-4 rounded-2xl
                    bg-[#FFF3E6] text-[#FF8C1A] font-extrabold
                    hover:bg-[#FF8C1A] hover:text-white transition gap-2"
        >
          View Program <FaArrowRight />
        </a>
      </div>
    </motion.div>
  );
}