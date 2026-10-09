import { motion } from "framer-motion";
import { 
  FaUserTie, 
  FaMicrophone, 
  FaVideo, 
  FaClipboardCheck, 
  FaArrowRight, 
  FaHistory,
  FaCheckCircle
} from "react-icons/fa";

// Image import (Update path based on your assets)
import interviewImg from "../../assets/about/workshop.jpg"; 

const labFeatures = [
  { 
    title: "1-on-1 Simulation", 
    desc: "45-minute intensive roleplay with HR experts from top MNCs.", 
    icon: FaUserTie 
  },
  { 
    title: "Recording & Playback", 
    desc: "Review your body language and tone with high-definition session recordings.", 
    icon: FaVideo 
  },
  { 
    title: "Detailed Scorecard", 
    desc: "Receive a metric-based report card covering 10+ professional parameters.", 
    icon: FaClipboardCheck 
  },
  { 
    title: "Behavioral Coaching", 
    desc: "Master the STAR method for answering complex situational questions.", 
    icon: FaMicrophone 
  }
];

export default function InterviewMastery() {
  return (
    <div className="min-h-screen bg-[#FDF8F4] pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-12 gap-16 items-center mb-24">
          {/* LEFT: CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Career Readiness Lab</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.2rem] font-black text-[#0F172A] leading-[0.9] uppercase tracking-tighter mb-8">
              Interview <br /> <span className="text-[#FF8C1A] italic">Mastery.</span>
            </h1>
            
            <p className="text-base lg:text-lg text-slate-500 max-w-xl border-l-[3px] border-[#FF8C1A] pl-6 mb-10 font-medium leading-relaxed">
              Don't practice until you get it right. Practice until you can't get it wrong. Our simulation lab bridges the gap between your skills and your dream job offer.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-10 py-5 bg-[#0F172A] text-white font-black rounded-2xl shadow-xl hover:bg-[#FF8C1A] transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest group">
                Book a Session <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT: FLOATING IMAGE FRAME */}
          <div className="lg:col-span-5 relative h-[400px] sm:h-[500px]">
             <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 rounded-[4rem] overflow-hidden border-[12px] border-white shadow-2xl z-10"
             >
                <img src={interviewImg} alt="Interview Session" className="w-full h-full object-cover" />
             </motion.div>
             {/* Floating Score Badge */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 4 }}
               className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-orange-100 z-20 hidden sm:block"
             >
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 text-left">Success Rate</p>
                <p className="text-3xl font-black text-[#0F172A] text-left">94.2%</p>
                <div className="flex gap-1 mt-2 text-orange-500">
                  <FaCheckCircle size={10}/><FaCheckCircle size={10}/><FaCheckCircle size={10}/><FaCheckCircle size={10}/><FaCheckCircle size={10}/>
                </div>
             </motion.div>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {labFeatures.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-[2.5rem] border border-orange-50 shadow-sm text-left hover:shadow-xl transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF8C1A] mb-8">
                <f.icon size={22} />
              </div>
              <h3 className="text-xl font-black text-[#0F172A] uppercase tracking-tighter mb-3">{f.title}</h3>
              <p className="text-xs font-bold text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* PRICING CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-[3rem] bg-[#0F172A] text-white flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-left">
            <h2 className="text-3xl font-black uppercase mb-2">Ready to ace your viva?</h2>
            <p className="text-slate-400 font-medium">Get professional feedback starting from <span className="text-orange-500 font-black">৳1,500/session</span></p>
          </div>
          <button className="w-full md:w-auto px-12 py-6 bg-[#FF8C1A] text-white font-black rounded-2xl uppercase text-sm tracking-widest hover:bg-white hover:text-[#0F172A] transition-all shadow-2xl">
            Start Preparation
          </button>
        </div>

      </div>
    </div>
  );
}