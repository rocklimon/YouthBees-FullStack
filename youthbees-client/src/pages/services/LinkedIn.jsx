import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCheckCircle, FaRocket, FaCrown, FaLinkedin, 
  FaChartLine, FaArrowRight, FaImage, FaListUl, FaMagic 
} from "react-icons/fa";

// ✅ ASSET IMPORTS (Using a placeholder or your actual LinkedIn sample)
// import linkedinSample from "../../assets/services/linkedin-optimization.jpg";
const linkedinSample = "https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&q=80&w=800";

const plans = [
  {
    id: "starter",
    name: "Starter Setup",
    price: "৳300",
    icon: FaLinkedin,
    tag: "Essential",
    points: ["Profile creation", "Professional formatting", "SEO basics"],
    popular: false,
    image: linkedinSample
  },
  {
    id: "growth",
    name: "Growth Pack",
    price: "৳500",
    icon: FaChartLine,
    tag: "Networking",
    points: ["Headline & summary", "Networking strategy", "Content guidance"],
    popular: false,
    image: linkedinSample
  },
  {
    id: "accelerator",
    name: "Career Accelerator",
    price: "৳750",
    icon: FaRocket,
    tag: "Authority",
    points: ["Full optimization", "Banner design", "Authority positioning"],
    popular: true,
    image: linkedinSample
  },
];

export default function LinkedIn() {
  const [viewMode, setViewMode] = useState("image");

  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-32 pb-20 px-6 selection:bg-orange-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER & VIEW TOGGLE ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="text-center md:text-left">
            <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Recruiter Attraction
            </span>
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-4">
              LinkedIn <span className="text-orange-500 italic">Optimization.</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-md">Transform your profile into a professional landing page that works while you sleep.</p>
          </motion.div>

          {/* VIEW MODE TOGGLE CONTROL */}
          <div className="bg-white p-2 rounded-2xl border border-orange-100 shadow-xl flex gap-2 w-fit relative z-20">
             <button 
                onClick={() => setViewMode("image")}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'image' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <FaImage /> Visual Gallery
             </button>
             <button 
                onClick={() => setViewMode("clean")}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'clean' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <FaListUl /> Minimalist
             </button>
          </div>
        </div>

        {/* ================= INTERACTIVE PRICING GRID ================= */}
        <motion.div 
          layout
          className="grid md:grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {plans.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -15 }}
                className={`
                  relative group rounded-[3.5rem] border flex flex-col h-full transition-all duration-500 overflow-hidden
                  ${p.popular 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xl shadow-orange-500/20 z-10' 
                    : 'bg-white text-slate-900 border-orange-100 shadow-xl shadow-orange-900/5 hover:border-orange-300'}
                `}
              >
                {/* CONDITIONAL IMAGE HEADER */}
                <AnimatePresence>
                  {viewMode === "image" && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 220, opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden relative"
                    >
                      <img 
                        src={p.image} 
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${p.popular ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} 
                        alt={p.name} 
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${p.popular ? 'from-slate-900' : 'from-white'} via-transparent to-transparent`} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-10 flex flex-col flex-grow">
                  {/* ICON BLOCK */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:rotate-12 ${p.popular ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500'}`}>
                    <p.icon size={20} />
                  </div>

                  <span className={`text-[9px] font-black uppercase tracking-widest mb-2 ${p.popular ? 'text-orange-400' : 'text-slate-400'}`}>
                    {p.tag}
                  </span>
                  <h3 className="text-2xl font-black mb-1 leading-tight uppercase group-hover:text-orange-500 transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-8">
                     <p className={`text-4xl font-black italic ${p.popular ? 'text-white' : 'text-slate-900'}`}>
                       {p.price}
                     </p>
                  </div>

                  <ul className="space-y-4 mb-12 flex-grow">
                    {p.points.map((pt, j) => (
                      <li key={j} className="flex gap-3 items-start text-[13px] font-medium leading-snug">
                        <FaCheckCircle className={`mt-1 shrink-0 ${p.popular ? 'text-orange-500' : 'text-orange-400'}`} />
                        <span className={p.popular ? 'text-slate-400' : 'text-slate-500'}>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`
                      w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3
                      ${p.popular 
                        ? 'bg-orange-500 text-white hover:bg-white hover:text-slate-900 shadow-lg shadow-orange-500/30' 
                        : 'bg-slate-900 text-white hover:bg-orange-500 shadow-lg shadow-slate-200'}
                    `}
                  >
                    Optimize Profile <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform" />
                  </button>
                </div>

                {p.popular && (
                  <div className="absolute top-6 right-6 bg-orange-500 text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                    Highest Impact
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ================= OPTIMIZATION STATS SECTION ================= */}
        <div className="mt-32 bg-slate-900 rounded-[4rem] p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute -left-10 -bottom-10 text-[15rem] text-white opacity-5 -rotate-12 pointer-events-none uppercase font-black tracking-tighter italic">LI</div>
           <div className="relative z-10 max-w-xl text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-6">Why <span className="text-orange-500">Authority</span> Matters?</h2>
              <p className="text-slate-400 font-bold mb-8 italic">95% of recruiters use LinkedIn to find talent. If your profile isn't optimized, you don't exist in the modern market.</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                 <div className="px-6 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">3x More Connections</div>
                 <div className="px-6 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">5x More Profile Views</div>
              </div>
           </div>
           
           <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="bg-orange-500 p-8 rounded-[2.5rem] text-center shadow-xl">
                 <p className="text-5xl font-black mb-1">200%</p>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Search Appearances</p>
              </div>
              <div className="bg-white text-slate-900 p-8 rounded-[2.5rem] text-center shadow-xl">
                 <FaLinkedin className="text-orange-500 text-4xl mx-auto mb-2" />
                 <p className="text-[10px] font-black uppercase tracking-widest">Recruiter Ready</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}