import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaLinkedin, 
  FaPlus,
  FaQuoteRight,
  FaCompass,
  FaEnvelope
} from "react-icons/fa";

// ✅ IMAGE IMPORTS FROM ASSETS/TEAM
import founderImg from "../assets/team/founder.jpg";
import marketingImg from "../assets/team/Sudipto Kumar Day- Marketing Team Lead.jpg";
import salesLeadImg from "../assets/team/Pradhumna Biswas-Sales Lead.jpg";
import hrImg from "../assets/team/Junaidur Rahman Digonto-HR.jpg";
import salesTeamLeadImg from "../assets/team/Abdul Hassan-Sales Team lead.jpg";
import communityImg from "../assets/team/Joan Mickey Biswas-Community manager.jpg";
import techImg from "../assets/team/Shihab uddin khan- Software Developer.jpg"; 
import manager from "../assets/team/Annaya Roy-Manager.jpg";
const allTeam = [
  {
    id: 1,
    name: "Mahib Sadman",
    role: "Founder & CEO",
    dept: "Leadership",
    specialty: "Vision & Career Strategy",
    quote: "Building the next generation of Bangladeshi talent through practical innovation.",
    linkedin: "https://www.linkedin.com/in/mahib-sadman/?originalSubdomain=bd",
    email: "mahibsadman20@gmail.com",
    img: founderImg
  },
  {
    id: 8,
    name: "Annaya Roy",
    role: "Manager",
    dept: "Management",
    specialty: "Management & Operations",
    quote: "Optimizing the hive's efficiency to ensure every student journey is seamless.",
    linkedin: "https://www.linkedin.com/in/roy333/",
    email: "royananya142333@gmail.com",
    img: manager
  },
  
  {
    id: 3,
    name: "Sudipto Kumar Dey",
    role: "Marketing Team Lead",
    dept: "Marketing",
    specialty: "Data Analytics & Growth",
    quote: "Driving brand success through data-backed marketing narratives.",
    linkedin: "https://www.linkedin.com/in/sudiptokumerdeydataanalyst/",
    email: "deysudipto828@gmail.com",
    img: marketingImg
  },
  {
    id: 4,
    name: "Pradhumna Biswas",
    role: "Sales Lead",
    dept: "Sales",
    specialty: "Revenue Strategy",
    quote: "Connecting the right talent with the right industry opportunities.",
    linkedin: "https://www.linkedin.com/in/pradhumna-biswas-b656b3319",
    email: "pradhumnabiswas@gmail.com",
    img: salesLeadImg
  },
  {
    id: 5,
    name: "Junaidur Rahman Digonto",
    role: "HR",
    dept: "Human Resources",
    specialty: "Talent Acquisition",
    quote: "Nurturing an internal ecosystem where creativity and efficiency thrive.",
    linkedin: "https://www.linkedin.com/in/junaidur-rahman-digonto/",
    email: "rahmandigonto557@gmail.com",
    img: hrImg
  },
  {
    id: 6,
    name: "Abdul Hasan",
    role: "Sales Team Lead",
    dept: "Sales",
    specialty: "Market Expansion",
    quote: "Execution-focused leadership to scale our professional footprint.",
    linkedin: "https://www.linkedin.com/in/abdul-hassan-37201b35b",
    email: "himel.hawo@gmail.com",
    img: salesTeamLeadImg
  },
  {
    id: 7,
    name: "Joan Mickey Biswas",
    role: "Community Manager",
    dept: "Operations",
    specialty: "Engagement & Support",
    quote: "Empowering the hive community through active support and collaboration.",
    linkedin: "https://www.linkedin.com/in/joan-mickey-biswas-6ba8a52ab/",
    email: "jo.mickeyb@gmail.com",
    img: communityImg
  },
  {
    id: 2,
    name: "Shihab Uddin Khan",
    role: "Full Stack Web developer",
    dept: "Technology",
    specialty: "Full-Stack Development",
    quote: "Architecting robust digital solutions to empower our career ecosystem.",
    linkedin: "https://www.linkedin.com/in/shihab-uddin-khan/",
    email: "khanshihab252@gmail.com",
    img: techImg 
  },
];

export default function Team() {
  const [activeDept, setActiveDept] = useState("All");
  const depts = ["All", "Leadership", "Technology", "Marketing", "Sales", "Human Resources", "Operations"];

  const filteredTeam = allTeam.filter(member => 
    activeDept === "All" || member.dept === activeDept
  );

  return (
    <div className="bg-[#FFF9F5] min-h-screen pt-40 pb-32 px-6 selection:bg-slate-900 selection:text-orange-500">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-32">
          <motion.div className="lg:col-span-8" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-8xl md:text-[12rem] font-black text-slate-900 leading-[0.75] tracking-[-0.05em] uppercase text-left">
              The <br />
              <span className="text-orange-500 italic font-outline-2">Force.</span>
            </h1>
          </motion.div>
          <div className="lg:col-span-4 pb-4">
            <p className="text-lg text-slate-500 font-bold border-l-2 border-orange-500 pl-6 uppercase tracking-tighter text-left">
              Meet the minds turning <br /> academic theory into <br /> industry reality.
            </p>
          </div>
        </div>

        {/* ================= FILTER SECTION ================= */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-20 border-b border-orange-100 pb-8">
          <div className="flex items-center gap-1.5 opacity-40">
            <FaCompass size={10} className="text-slate-900" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-900">Filter by Sphere</span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {depts.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`text-xl font-black uppercase transition-all hover:text-orange-500 relative group ${
                  activeDept === dept ? "text-slate-900" : "text-slate-300"
                }`}
              >
                {dept}
                {activeDept === dept && (
                  <motion.div layoutId="underline" className="absolute -bottom-8 left-0 right-0 h-1 bg-orange-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ================= TEAM GRID ================= */}
        <div className="grid grid-cols-1 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredTeam.map((member, index) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-[4rem] overflow-hidden border border-orange-100 hover:border-orange-500 transition-colors shadow-2xl shadow-orange-900/5"
              >
                <div className="grid lg:grid-cols-12 items-center">
                  
                  {/* Photo Section */}
                  <div className="lg:col-span-4 h-[450px] overflow-hidden relative">
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-orange-500/10 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* Details Section */}
                  <div className="lg:col-span-8 p-12 lg:p-20 relative text-left">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                      <div className="text-left">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter">
                          {member.name}
                        </h2>
                        <p className="text-orange-500 font-black uppercase text-xs tracking-[0.3em] mt-2 italic">
                          {member.role} — {member.dept}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <a 
                          href={`mailto:${member.email}`}
                          className="w-14 h-14 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-lg"
                        >
                          <FaEnvelope size={20} />
                        </a>
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-lg"
                        >
                          <FaLinkedin size={20} />
                        </a>
                      </div>
                    </div>

                    <div className="max-w-xl text-left">
                      <FaQuoteRight className="text-orange-100 text-6xl absolute top-10 right-20 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p className="text-xl text-slate-500 font-medium leading-relaxed italic mb-8">
                        "{member.quote}"
                      </p>
                      <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest border border-slate-100 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                        Sphere of influence: {member.specialty}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ================= JOIN SECTION ================= */}
        <section className="mt-40 text-center text-left">
           <motion.div whileHover={{ scale: 0.98 }} className="bg-slate-900 rounded-[5rem] p-20 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-[25rem] font-black text-white/5 pointer-events-none uppercase italic opacity-20">BEES</div>
              <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-10 relative z-10 text-center">We're always <br /> <span className="text-orange-500 text-center">Expanding.</span></h2>
              <button className="relative z-10 px-12 py-6 bg-orange-500 text-white font-black rounded-2xl hover:bg-white hover:text-slate-900 transition-all uppercase text-xs tracking-widest shadow-2xl flex items-center gap-4 mx-auto group">
                Join the Internal Hub <FaPlus className="group-hover:rotate-90 transition-transform" />
              </button>
           </motion.div>
        </section>
      </div>
    </div>
  );
}