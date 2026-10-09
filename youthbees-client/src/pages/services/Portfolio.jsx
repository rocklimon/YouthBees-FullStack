import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCheckCircle, FaLaptopCode, FaLayerGroup, FaArrowRight, 
  FaImage, FaListUl, FaEye, FaGlobe 
} from "react-icons/fa";

// ✅ ASSET IMPORTS (Using placeholders based on your design aesthetic)
const personalSample = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800";
const businessSample = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800";

const plans = [
  {
    id: "basic",
    name: "Basic Portfolio",
    price: "৳1,500",
    icon: FaLaptopCode,
    tag: "Personal",
    points: ["One-page site", "Project showcase", "Responsive design", "Standard Speed"],
    popular: false,
    image: personalSample
  },
  {
    id: "advanced",
    name: "Advanced Portfolio",
    price: "৳2,500+",
    icon: FaLayerGroup,
    tag: "Business Tier",
    points: ["Multi-section site", "Custom domain", "SEO setup", "Premium Animations"],
    popular: true,
    image: businessSample
  },
];

export default function Portfolio() {
  const [viewMode, setViewMode] = useState("image");

  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-32 pb-20 px-6 selection:bg-orange-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER & VIEW TOGGLE ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="text-center md:text-left">
            <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Digital Presence
            </span>
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-4">
              Website & <span className="text-orange-500 italic text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Portfolio.</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-md">Own your piece of the internet with a high-performance personal brand site.</p>
          </motion.div>

          {/* VIEW MODE TOGGLE */}
          <div className="bg-white p-2 rounded-2xl border border-orange-100 shadow-xl flex gap-2 w-fit relative z-20">
             <button 
                onClick={() => setViewMode("image")}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'image' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <FaImage /> Design Gallery
             </button>
             <button 
                onClick={() => setViewMode("clean")}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'clean' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <FaListUl /> Detail View
             </button>
          </div>
        </div>

        {/* ================= INTERACTIVE PRICING GRID ================= */}
        <motion.div layout className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
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
                  relative group rounded-[4rem] border flex flex-col h-full transition-all duration-500 overflow-hidden
                  ${p.popular 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xl shadow-orange-500/20' 
                    : 'bg-white text-slate-900 border-orange-100 shadow-xl shadow-orange-900/5 hover:border-orange-300'}
                `}
              >
                {/* CONDITIONAL IMAGE HEADER */}
                <AnimatePresence>
                  {viewMode === "image" && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 320, opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden relative"
                    >
                      <img 
                        src={p.image} 
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${p.popular ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} 
                        alt={p.name} 
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${p.popular ? 'from-slate-900' : 'from-white'} via-transparent to-transparent`} />
                      <div className="absolute top-6 right-6">
                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 text-white group-hover:bg-orange-500 transition-colors">
                           <FaEye />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-12 flex flex-col flex-grow">
                  {/* ICON BLOCK */}
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:rotate-6 ${p.popular ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500'}`}>
                    <p.icon size={24} />
                  </div>

                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${p.popular ? 'text-orange-400' : 'text-slate-400'}`}>
                    {p.tag}
                  </span>
                  <h3 className="text-3xl font-black mb-1 leading-tight group-hover:text-orange-500 transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-10">
                     <p className={`text-5xl font-black italic ${p.popular ? 'text-white' : 'text-slate-900'}`}>
                       {p.price}
                     </p>
                  </div>

                  <ul className="space-y-5 mb-12 flex-grow">
                    {p.points.map((pt, j) => (
                      <li key={j} className="flex gap-4 items-start text-sm font-medium">
                        <FaCheckCircle className={`mt-1 shrink-0 ${p.popular ? 'text-orange-500' : 'text-orange-400'}`} />
                        <span className={p.popular ? 'text-slate-400' : 'text-slate-500'}>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`
                      w-full py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3
                      ${p.popular 
                        ? 'bg-orange-500 text-white hover:bg-white hover:text-slate-900 shadow-lg shadow-orange-500/30' 
                        : 'bg-slate-900 text-white hover:bg-orange-500 shadow-lg shadow-slate-200'}
                    `}
                  >
                    Launch My Site <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform" />
                  </button>
                </div>

                {p.popular && (
                  <div className="absolute top-8 left-8 bg-orange-500 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                    Recommended
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ================= FEATURE STRIP ================= */}
        <div className="mt-40 grid md:grid-cols-3 gap-12 text-center">
           <Feature icon={FaGlobe} title="Global Reach" desc="Host your site on lightning-fast global CDNs." />
           <Feature icon={FaLayerGroup} title="Modern UI" desc="Crafted with React and high-end Framer animations." />
           <Feature icon={FaCheckCircle} title="SEO Ready" desc="Rank for your name on Google search results." />
        </div>

      </div>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
    return (
        <div className="group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-orange-50 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                <Icon size={20} />
            </div>
            <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{title}</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
        </div>
    );
}