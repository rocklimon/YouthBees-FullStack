import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaStar, FaRegClock, FaCalendarCheck, FaHistory, FaAward,
  FaArrowRight, FaSearch, FaTimes, FaUserCheck, FaThList, FaThLarge,
  FaSlidersH, FaMapMarkerAlt, FaBriefcase, FaLayerGroup, FaTags
} from "react-icons/fa";

// ✅ IMAGE IMPORTS
import founderImg from "../../assets/about/founder.jpg"; 
import teamImg from "../../assets/about/team.jpg";   

const allMentors = [
  {
    id: 1,
    name: "Mahib Sadman",
    role: "Founder & Career Strategist",
    quote: "Building the bridge between academic certificates and industry excellence through elite mentorship.",
    price: 1200,
    rating: "5.0",
    reviews: "150",
    tags: ["Career Coaching", "Leadership", "Resume Mastery"],
    experience: "5+",
    sessions: "600+",
    level: "Platinum Tier",
    availability: "Available Today",
    img: founderImg,
    category: "Career",
    location: "Dhaka",
    industry: "Corporate"
  },
  {
    id: 2,
    name: "Sakib Hasan",
    role: "Chief Operating Officer",
    quote: "Expert in operational efficiency and helping students navigate high-pressure corporate landscapes.",
    price: 900,
    rating: "4.9",
    reviews: "125",
    tags: ["Operations", "Strategic Planning", "FinTech"],
    experience: "4+",
    sessions: "450+",
    level: "Gold Tier",
    availability: "Available Tomorrow",
    img: teamImg,
    category: "Technology",
    location: "Virtual",
    industry: "FinTech"
  }
];

export default function MentorDirectory() {
  const [viewMode, setViewMode] = useState("premium");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter States
  const [filters, setFilters] = useState({
    category: "All",
    location: "All",
    priceRange: 2000,
    experience: "All"
  });

  const filteredMentors = allMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mentor.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filters.category === "All" || mentor.category === filters.category;
    const matchesLocation = filters.location === "All" || mentor.location === filters.location;
    const matchesPrice = mentor.price <= filters.priceRange;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-32 selection:bg-orange-300 overflow-x-hidden relative">
      
      {/* ================= HEADER & VIEW TOGGLE ================= */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="text-left">
            <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Mentorship Hub</span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none uppercase">
              Expert <br /> <span className="text-orange-500 italic uppercase">Guidance.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 relative z-20">
             <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border ${showFilters ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-900 border-orange-100 shadow-xl'}`}
             >
                <FaSlidersH /> {showFilters ? 'Close Filters' : 'Advanced Filters'}
             </button>

             <div className="bg-white p-2 rounded-2xl border border-orange-100 shadow-xl flex gap-1">
                <button onClick={() => setViewMode("premium")} className={`p-3 rounded-xl transition-all ${viewMode === 'premium' ? 'bg-orange-500 text-white' : 'text-slate-300'}`}><FaThLarge /></button>
                <button onClick={() => setViewMode("classic")} className={`p-3 rounded-xl transition-all ${viewMode === 'classic' ? 'bg-orange-500 text-white' : 'text-slate-300'}`}><FaThList /></button>
             </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        
        {/* ================= 🟢 ADVANCED FILTER PANEL ================= */}
        <AnimatePresence>
          {showFilters && (
            <motion.aside 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="lg:col-span-3 space-y-8 sticky top-32 h-fit"
            >
              <FilterSection title="Industry Sphere" icon={FaBriefcase}>
                {["All", "Technology", "Marketing", "Career", "Design"].map(cat => (
                  <FilterChip 
                    key={cat} 
                    label={cat} 
                    active={filters.category === cat} 
                    onClick={() => setFilters({...filters, category: cat})} 
                  />
                ))}
              </FilterSection>

              <FilterSection title="Geo Location" icon={FaMapMarkerAlt}>
                {["All", "Dhaka", "Chattogram", "Virtual"].map(loc => (
                  <FilterChip 
                    key={loc} 
                    label={loc} 
                    active={filters.location === loc} 
                    onClick={() => setFilters({...filters, location: loc})} 
                  />
                ))}
              </FilterSection>

              <FilterSection title="Budget Cap" icon={FaAward}>
                <div className="px-2">
                   <input 
                    type="range" min="500" max="5000" step="100" 
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="w-full h-1 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                   />
                   <div className="flex justify-between mt-4 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                      <span>৳500</span>
                      <span className="text-orange-500">Max: ৳{filters.priceRange}</span>
                   </div>
                </div>
              </FilterSection>

              <button 
                onClick={() => setFilters({category: "All", location: "All", priceRange: 2000, experience: "All"})}
                className="w-full py-4 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2"
              >
                <FaTimes /> Clear All Filters
              </button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ================= MENTOR LISTING ================= */}
        <section className={`${showFilters ? 'lg:col-span-9' : 'lg:col-span-12'} transition-all duration-500 pb-40`}>
          
          {/* Top Search Bar (Integrated) */}
          <div className="bg-white border border-orange-100 p-2 rounded-[2.5rem] shadow-2xl flex items-center mb-12">
              <FaSearch className="text-orange-500 ml-6" />
              <input 
                  type="text" 
                  placeholder="Search mentors by expertise or name..." 
                  className="w-full py-5 px-6 bg-transparent outline-none text-slate-800 font-bold placeholder:text-slate-300" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>

          <motion.div layout className={`grid grid-cols-1 ${viewMode === 'classic' ? 'gap-6' : 'gap-12'}`}>
            <AnimatePresence mode="popLayout">
              {filteredMentors.length > 0 ? (
                  filteredMentors.map((mentor) => (
                      viewMode === "premium" 
                      ? <PremiumCard key={mentor.id} {...mentor} /> 
                      : <ClassicCard key={mentor.id} {...mentor} />
                  ))
              ) : (
                  <div className="text-center py-40">
                      <p className="text-slate-300 font-black text-2xl uppercase tracking-widest italic">No matching mentors</p>
                  </div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

/* ================= FILTER COMPONENTS ================= */

function FilterSection({ title, icon: Icon, children }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-orange-100 shadow-sm text-left">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="text-orange-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${active ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-orange-200'}`}
    >
      {label}
    </button>
  );
}

/* ================= LISTING COMPONENTS (PREMIUM CARD) ================= */

function PremiumCard({ name, role, quote, price, rating, reviews, tags, experience, sessions, level, availability, img }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-white rounded-[3.5rem] border border-orange-50 shadow-2xl shadow-orange-900/5 flex flex-col lg:flex-row overflow-hidden transition-all duration-500 hover:border-orange-200"
    >
      <div className="relative lg:w-80 h-80 lg:h-auto overflow-hidden shrink-0">
        <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt={name} />
        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-3xl flex justify-between items-center shadow-xl border border-orange-50">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Rate</span>
            <span className="text-xl font-black text-slate-900">৳{price}</span>
        </div>
      </div>
      <div className="flex-grow p-10 text-left">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1 leading-none">{name}</h3>
            <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">{role}</p>
          </div>
          <div className="bg-orange-50 px-4 py-2 rounded-2xl flex items-center gap-2">
            <FaStar className="text-orange-500 text-xs" />
            <span className="font-black text-slate-900 text-sm">{rating}</span>
          </div>
        </div>
        <p className="text-slate-500 italic font-medium text-sm leading-relaxed mb-8 border-l-4 border-orange-100 pl-6">"{quote}"</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span key={tag} className="text-[9px] font-black uppercase px-4 py-2 bg-slate-50 text-slate-500 rounded-xl border border-slate-100">{tag}</span>
          ))}
        </div>
        <div className="mt-auto grid grid-cols-3 gap-6 pt-6 border-t border-slate-50">
           <MentorStat icon={FaHistory} value={experience} label="Experience" />
           <MentorStat icon={FaCalendarCheck} value={sessions} label="Mentored" />
           <MentorStat icon={FaAward} value={level.split(' ')[0]} label="Tier" />
        </div>
      </div>
      <div className="lg:w-20 bg-slate-900 flex lg:flex-col items-center justify-center p-6 lg:p-0">
         <button className="flex-grow w-full flex flex-col items-center justify-center text-white hover:bg-orange-500 transition-all py-6 group">
            <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform text-xl" />
            <span className="text-[8px] font-black uppercase tracking-widest opacity-40 mt-3">View</span>
         </button>
      </div>
    </motion.div>
  );
}

function ClassicCard({ name, role, price, rating, reviews, tags, availability, img }) {
  return (
    <motion.div 
      layout
      className="bg-white rounded-[2.5rem] p-6 border border-orange-100 shadow-lg flex items-center gap-8 group hover:border-orange-500 transition-all"
    >
      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-50 shrink-0">
        <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={name} />
      </div>
      <div className="flex-grow text-left">
        <h3 className="text-lg font-black text-slate-900 leading-none mb-1">{name}</h3>
        <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-3">{role}</p>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[8px] font-black uppercase bg-slate-50 px-3 py-1 rounded-lg text-slate-400">{tag}</span>
          ))}
        </div>
      </div>
      <div className="text-right shrink-0">
         <p className="text-xl font-black text-slate-900 mb-1 leading-none">৳{price}</p>
         <div className="flex items-center justify-end gap-1 text-orange-500 text-xs mb-4">
            <FaStar /> <span className="font-black text-slate-900">{rating}</span>
         </div>
         <button className="px-5 py-2.5 bg-slate-900 text-white font-black text-[9px] uppercase rounded-xl hover:bg-orange-500 transition-all shadow-lg shadow-orange-900/10">Book Now</button>
      </div>
    </motion.div>
  );
}

function MentorStat({ icon: Icon, value, label }) {
    return (
        <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
                <Icon className="text-orange-500 text-[10px]" />
                <span className="text-[10px] font-black text-slate-900 uppercase">{value}</span>
            </div>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        </div>
    );
}