import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaClock,
  FaBolt,
  FaCircle,
} from "react-icons/fa";

// ✅ IMAGE IMPORTS (KEPT SAME)
import eventImg from "../assets/about/event.jpg";
import workshopImg from "../assets/about/workshop.jpg";
import stallImg from "../assets/about/event-stall-1.jpg";
import awardImg from "../assets/about/award-ceremony-1.jpg";
import teamImg from "../assets/about/team.jpg";

export default function Events() {
  const [filter, setFilter] = useState("upcoming");

  // Realistic Data Structure
  const allEvents = [
    {
      id: 1,
      status: "ongoing",
      title: "National Youth Summit 2026",
      date: "Jan 07 - Jan 10",
      time: "Live Now",
      location: "Dhaka, Bangladesh",
      image: teamImg,
      desc: "Our biggest summit is currently happening! Join the live sessions or visit our stall at the main venue.",
      badge: "Flagship",
    },
    {
      id: 2,
      status: "upcoming",
      title: "Career Mentorship Bootcamp",
      date: "March 2026",
      time: "10:00 AM - 04:00 PM",
      location: "Virtual / Zoom",
      image: eventImg,
      desc: "An immersive mentorship program focusing on career clarity, interview skills, and professional networking.",
      badge: "Workshop",
    },
    {
      id: 3,
      status: "upcoming",
      title: "Youth Skill Development",
      date: "April 2026",
      time: "02:00 PM - 06:00 PM",
      location: "University Campus",
      image: workshopImg,
      desc: "Hands-on technical workshops with industry leaders to bridge the academic-professional gap.",
      badge: "Technical",
    },
    {
      id: 4,
      status: "past",
      title: "Corporate Stall Exhibit",
      date: "Nov 2025",
      time: "Completed",
      location: "International Convention Center",
      image: stallImg,
      desc: "YouthBees successfully showcased youth talent to over 50+ corporate partners.",
      badge: "Exhibition",
    },
    {
      id: 5,
      status: "past",
      title: "Annual Excellence Awards",
      date: "Dec 2025",
      time: "Completed",
      location: "Grand Ballroom",
      image: awardImg,
      desc: "Celebrating the achievements of our most dedicated mentors and active community members.",
      badge: "Ceremony",
    },
  ];

  const filteredEvents = allEvents.filter((e) => e.status === filter);

  return (
    <div className="bg-[#FFF9F5] selection:bg-orange-300 selection:text-white overflow-hidden min-h-screen">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-xs uppercase tracking-widest mb-6">
              <FaBolt /> YouthBees Hub
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">
              Experience <br />
              <span className="text-orange-500">Progress.</span>
            </h1>
          </motion.div>
          <p className="text-xl text-slate-500 leading-relaxed border-l-4 border-orange-500 pl-6 max-w-md">
            Stay updated with our ongoing initiatives, upcoming workshops, and past success stories.
          </p>
        </div>
      </section>

      {/* ================= TABS NAVIGATION ================= */}
      <section className="sticky top-0 z-50 bg-[#FFF9F5]/80 backdrop-blur-md border-b border-orange-100 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-center md:justify-start gap-4 md:gap-8">
          {["upcoming", "ongoing", "past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`text-sm md:text-base font-black uppercase tracking-widest pb-2 transition-all relative ${
                filter === tab ? "text-orange-500" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab} Events
              {filter === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ================= EVENTS GRID ================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto min-h-[600px]">
        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">No {filter} events at the moment.</p>
          </div>
        )}
      </section>

      {/* ================= CTA: JOIN THE MOVEMENT ================= */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <h2 className="text-5xl font-black mb-8 tracking-tighter">Become a <span className="text-orange-500">Partner.</span></h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-10">Host your next career event or workshop with YouthBees and reach thousands of students.</p>
          <button className="px-10 py-5 bg-orange-500 hover:bg-orange-600 font-black rounded-2xl transition-all flex items-center gap-3 mx-auto">
            Get Started <FaArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}

/* ================= COMPONENT: EVENT CARD ================= */

function EventCard({ title, date, location, image, desc, time, badge, status }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[3rem] overflow-hidden border border-orange-100 shadow-xl flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-6 left-6 px-4 py-1 bg-white/90 backdrop-blur-md text-orange-600 font-black text-[10px] uppercase tracking-widest rounded-full shadow-sm">
          {badge}
        </div>
        {status === "ongoing" && (
          <div className="absolute top-6 right-6 px-4 py-1 bg-red-500 text-white font-black text-[10px] uppercase tracking-widest rounded-full flex items-center gap-2 animate-pulse">
            <FaCircle className="text-[6px]" /> Live Now
          </div>
        )}
      </div>
      
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-3 text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-4">
          <span className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-lg"><FaCalendarAlt /> {date}</span>
          <span className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-lg"><FaClock /> {time}</span>
          <span className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-lg"><FaMapMarkerAlt /> {location}</span>
        </div>
        
        <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight leading-none group-hover:text-orange-500 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 leading-relaxed mb-8 flex-grow">{desc}</p>

        <button className={`flex items-center justify-between w-full font-black text-sm uppercase tracking-widest border-t border-slate-100 pt-6 group-hover:text-orange-500 transition-colors ${status === 'past' ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {status === 'past' ? 'Event Completed' : 'See Details'}
          <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}