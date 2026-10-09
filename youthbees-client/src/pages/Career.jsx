import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaSearch,
  FaLock,
  FaArrowRight,
  FaFire,
  FaTimes,
  FaCheckCircle,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* ================= AUTH & EXTENDED DATA ================= */
const isLoggedIn = false;

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "FiroTech",
    location: "Dhaka / Remote",
    type: "Full-time",
    salary: "৳60k – ৳85k",
    deadline: "Jan 30, 2026",
    category: "Technology",
    isHot: true,
    details: {
      about: "Join a fast-paced team building the next generation of fintech solutions in Bangladesh.",
      responsibilities: ["Develop scalable React architectures", "Lead a team of 3 junior developers", "Optimize applications for maximum speed"],
      requirements: ["4+ years of React experience", "Strong CSS/Tailwind skills", "Experience with Redux or TanStack Query"]
    }
  },
  {
    id: 2,
    title: "Brand Strategy Intern",
    company: "ePaathshalaBD",
    location: "Remote",
    type: "Internship",
    salary: "৳12k – ৳15k",
    deadline: "Jan 25, 2026",
    category: "Marketing",
    isHot: false,
    details: {
      about: "A perfect role for students looking to understand digital brand positioning.",
      responsibilities: ["Assist in creating social media campaigns", "Conduct market research", "Support content ideation"],
      requirements: ["Pursuing a Marketing degree", "Excellent written English", "Basic Canva skills"]
    }
  },
  {
    id: 3,
    title: "Lead UI/UX Designer",
    company: "Creative Pulse",
    location: "Banani, Dhaka",
    type: "Full-time",
    salary: "৳50k – ৳70k",
    deadline: "Feb 15, 2026",
    category: "Design",
    isHot: true,
    details: {
      about: "Help us redefine visual storytelling for national brands.",
      responsibilities: ["Create high-fidelity wireframes", "Conduct user testing", "Maintain design systems"],
      requirements: ["Mastery of Figma", "Portfolio of problem solving", "3+ years agency experience"]
    }
  }
];

export default function Career() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [selectedJob, setSelectedJob] = useState(null);

  const categories = ["All Categories", "Technology", "Marketing", "Design", "Data"];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeCategory === "All Categories" || job.category === activeCategory;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="bg-[#FFF9F5] min-h-screen pb-32 selection:bg-orange-300">
      
      {/* ================= HERO ================= */}
      <section className="pt-40 pb-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6">
            Your Next <span className="text-orange-500">Chapter.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium">Verified professional opportunities from the YouthBees ecosystem.</p>
        </motion.div>
      </section>

      {/* ================= INTEGRATED SEARCH & DROPDOWN ================= */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-white rounded-3xl md:rounded-full p-2 shadow-2xl shadow-orange-900/5 border border-orange-100 flex flex-col md:flex-row items-center">
          
          {/* Input Field */}
          <div className="flex items-center gap-4 px-6 flex-grow w-full border-b md:border-b-0 md:border-r border-slate-100">
            <FaSearch className="text-orange-500" />
            <input
              type="text"
              placeholder="Search by job title or company..."
              className="w-full py-4 bg-transparent outline-none font-bold text-slate-700 placeholder:text-slate-300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Integrated Dropdown */}
          <div className="relative w-full md:w-64 group">
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full px-6 py-4 bg-transparent text-slate-500 font-bold outline-none cursor-pointer appearance-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none group-hover:translate-y-[-40%] transition-transform" />
          </div>

          {/* Search Button */}
          <button className="w-full md:w-auto px-10 py-4 bg-slate-900 text-white font-black rounded-2xl md:rounded-full hover:bg-orange-500 transition-all uppercase tracking-widest text-xs">
            Find Jobs
          </button>
        </div>
      </section>

      {/* ================= JOB LISTING ================= */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onOpen={() => setSelectedJob(job)} />
          ))}
        </AnimatePresence>
      </section>

      {/* ================= JOB DETAIL OVERLAY ================= */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              className="relative w-full max-w-2xl h-full bg-white shadow-2xl p-8 md:p-12 overflow-y-auto"
            >
              <button onClick={() => setSelectedJob(null)} className="absolute top-8 right-8 text-slate-400 hover:text-orange-500 transition-colors">
                <FaTimes size={24} />
              </button>

              <div className="mt-8">
                <span className="text-orange-500 font-black uppercase text-[10px] tracking-[0.3em]">{selectedJob.company}</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2 mb-8 leading-none">{selectedJob.title}</h2>
                
                <div className="flex flex-wrap gap-3 mb-12">
                   <DetailBadge icon={FaMapMarkerAlt} text={selectedJob.location} />
                   <DetailBadge icon={FaMoneyBillWave} text={selectedJob.salary} />
                   <DetailBadge icon={FaClock} text={selectedJob.type} />
                </div>

                <div className="space-y-12">
                  <section>
                    <h4 className="text-sm font-black text-orange-500 uppercase tracking-widest mb-4">About the Role</h4>
                    <p className="text-slate-600 leading-relaxed font-medium">{selectedJob.details.about}</p>
                  </section>

                  <section>
                    <h4 className="text-sm font-black text-orange-500 uppercase tracking-widest mb-4">Responsibilities</h4>
                    <ul className="space-y-4">
                      {selectedJob.details.responsibilities.map((item, i) => (
                        <li key={i} className="flex gap-3 text-slate-600 text-sm font-medium items-start">
                          <FaCheckCircle className="text-orange-400 mt-1 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <button 
                  onClick={() => {
                    if (!isLoggedIn) navigate("/login");
                    else navigate(`/career/apply/${selectedJob.id}`);
                  }}
                  className="w-full mt-16 py-5 bg-slate-900 hover:bg-orange-500 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
                >
                  Apply Now {!isLoggedIn && <FaLock className="text-xs opacity-50" />} <FaArrowRight />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function JobCard({ job, onOpen }) {
  return (
    <motion.div
      layout whileHover={{ y: -10 }}
      className="bg-white p-10 rounded-[3rem] border border-orange-100 shadow-xl shadow-orange-900/5 group"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center font-black group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
          {job.company.charAt(0)}
        </div>
        {job.isHot && <div className="bg-red-50 p-2 rounded-lg"><FaFire className="text-red-500" /></div>}
      </div>

      <h3 className="text-2xl font-black text-slate-900 mb-1 leading-tight group-hover:text-orange-500 transition-colors">{job.title}</h3>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">{job.company}</p>
      
      <div className="space-y-3 mb-10">
         <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
            <FaMapMarkerAlt className="text-orange-300" /> {job.location}
         </div>
         <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
            <FaMoneyBillWave className="text-orange-300" /> {job.salary}
         </div>
      </div>

      <button onClick={onOpen} className="w-full py-4 bg-orange-50 text-orange-500 font-black rounded-2xl hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 text-sm">
        View Details <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform" />
      </button>
    </motion.div>
  );
}

function DetailBadge({ icon: Icon, text }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold text-[10px] uppercase tracking-widest border border-slate-100">
            <Icon size={12} className="text-orange-500" /> {text}
        </div>
    );
}