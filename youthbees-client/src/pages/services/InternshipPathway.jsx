import { motion } from "framer-motion";
import { 
  FaBriefcase, 
  FaIdCard, 
  FaUserGraduate, 
  FaBuilding, 
  FaArrowRight, 
  FaCheckCircle,
  FaLightbulb,
  FaCertificate
} from "react-icons/fa";

// Image import (Update paths based on your assets)
import teamImg from "../../assets/about/team.jpg"; 

const pathwaySteps = [
  { 
    title: "Skill Assessment", 
    desc: "Evaluate your technical and soft skills to find the perfect industry match.", 
    icon: FaLightbulb 
  },
  { 
    title: "Partner Matching", 
    desc: "Placement opportunities with FiroTech and our network of 15+ industry partners.", 
    icon: FaBuilding 
  },
  { 
    title: "Hands-on Training", 
    desc: "Work on live projects under the direct supervision of industry founders.", 
    icon: FaIdCard 
  },
  { 
    title: "Full-Time Transition", 
    desc: "High-performing interns receive direct job offers or performance certificates.", 
    icon: FaCertificate 
  }
];

export default function InternshipPathway() {
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
              <span className="w-2 h-2 rounded-full bg-[#FF8C1A] animate-pulse"></span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Career Launchpad Program</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.2rem] font-black text-[#0F172A] leading-[0.9] uppercase tracking-tighter mb-8">
              Internship <br /> <span className="text-[#FF8C1A] italic">Pathway.</span>
            </h1>
            
            <p className="text-base lg:text-lg text-slate-500 max-w-xl border-l-[3px] border-[#FF8C1A] pl-6 mb-10 font-medium leading-relaxed text-left">
              The bridge between academic theory and corporate reality. We don't just teach; we place you in the heart of the industry to build a career that lasts.
            </p>

            <div className="flex flex-wrap gap-4 justify-start">
              <button className="px-10 py-5 bg-[#0F172A] text-white font-black rounded-2xl shadow-xl hover:bg-[#FF8C1A] transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest group">
                Apply for Cohort <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
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
                <img src={teamImg} alt="YouthBees Interns" className="w-full h-full object-cover" />
             </motion.div>
             
             {/* Floating Career Badge */}
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ repeat: Infinity, duration: 5 }}
               className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-orange-100 z-20 hidden sm:flex items-center gap-4"
             >
                <div className="w-10 h-10 rounded-full bg-[#FF8C1A] flex items-center justify-center text-white shadow-lg">
                   <FaUserGraduate size={18} />
                </div>
                <div className="text-left">
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 text-left">Placements</p>
                   <p className="text-xl font-black text-[#0F172A] text-left uppercase tracking-tighter">1000+ Students</p>
                </div>
             </motion.div>
          </div>
        </div>

        {/* ROADMAP STEPS GRID */}
        <div className="text-left mb-16">
           <h2 className="text-4xl font-black text-[#0F172A] uppercase tracking-tighter mb-4 text-left">Your Journey to Professional.</h2>
           <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">A structured path from freshman to employee</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Decorative path line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-orange-100 -z-10 -translate-y-1/2" />
          
          {pathwaySteps.map((step, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] border-[8px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-left group transition-all duration-500 hover:shadow-2xl relative"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-[10px] font-black z-20">0{i+1}</div>
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-[#FF8C1A] mb-8 shadow-inner transition-transform group-hover:rotate-6">
                <step.icon size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0F172A] uppercase tracking-tighter mb-4 text-left leading-tight">{step.title}</h3>
              <p className="text-xs font-bold text-slate-400 leading-relaxed text-left opacity-80">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* PARTNER LOGO AREA PREVIEW */}
        <div className="mt-20 p-12 lg:p-24 rounded-[4rem] bg-[#0F172A] text-white flex flex-col lg:flex-row items-center justify-between gap-12 text-left relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8C1A]/5 rounded-full blur-3xl pointer-events-none" />
           
           <div className="max-w-xl text-left">
              <span className="text-[#FF8C1A] font-black uppercase tracking-widest text-[9px] mb-4 block">Elite Network</span>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-6 text-left">Real Industry Exposure.</h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed text-left">Get the chance to intern with top-tier companies in Bangladesh, including our lead partner <span className="text-white font-black underline">FiroTech</span>.</p>
           </div>
           
           <div className="flex flex-col gap-4 w-full lg:w-auto">
              <button className="px-12 py-6 bg-[#FF8C1A] text-white font-black rounded-2xl uppercase text-sm tracking-widest hover:bg-white hover:text-[#0F172A] transition-all shadow-2xl">
                 Submit Application
              </button>
              <p className="text-[10px] text-slate-500 text-center font-bold uppercase tracking-widest">Enrollment Opens Quarterly</p>
           </div>
        </div>

      </div>
    </div>
  );
}