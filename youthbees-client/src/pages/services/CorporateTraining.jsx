import { motion } from "framer-motion";
import { 
  FaBuilding, 
  FaUsersCog, 
  FaChartLine, 
  FaHandshake, 
  FaArrowRight, 
  FaCheckCircle,
  FaShieldAlt,
  FaCogs
} from "react-icons/fa";

// Image import (Update paths based on your assets)
import corporateImg from "../../assets/about/workshop.jpg"; 

const trainingModules = [
  { 
    title: "Leadership & Management", 
    desc: "Training mid-to-senior level managers in strategic decision making and team empathy.", 
    icon: FaUsersCog 
  },
  { 
    title: "Digital Transformation", 
    desc: "Upskilling staff in AI integration, workflow automation, and modern tech stacks.", 
    icon: FaCogs 
  },
  { 
    title: "Soft Skills & Etiquette", 
    desc: "Mastering professional communication, conflict resolution, and corporate grooming.", 
    icon: FaHandshake 
  },
  { 
    title: "Sales & Performance", 
    desc: "Results-driven training to optimize conversion rates and client relationship management.", 
    icon: FaChartLine 
  }
];

export default function CorporateTraining() {
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
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">B2B Enterprise Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.2rem] font-black text-[#0F172A] leading-[0.9] uppercase tracking-tighter mb-8">
              Corporate <br /> <span className="text-[#FF8C1A] italic">Training.</span>
            </h1>
            
            <p className="text-base lg:text-lg text-slate-500 max-w-xl border-l-[3px] border-[#FF8C1A] pl-6 mb-10 font-medium leading-relaxed text-left">
              Empower your workforce with industry-aligned skills. We provide customized training frameworks that bridge the gap between employee potential and organizational goals.
            </p>

            <div className="flex flex-wrap gap-4 justify-start">
              <button className="px-10 py-5 bg-[#0F172A] text-white font-black rounded-2xl shadow-xl hover:bg-[#FF8C1A] transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest group">
                Request a Proposal <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
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
                <img src={corporateImg} alt="Corporate Workshop" className="w-full h-full object-cover" />
             </motion.div>
             
             {/* Floating Efficiency Badge */}
             <motion.div 
               animate={{ x: [0, 10, 0] }}
               transition={{ repeat: Infinity, duration: 6 }}
               className="absolute -bottom-8 -left-8 bg-[#0F172A] p-8 rounded-[2.5rem] shadow-2xl z-20 hidden sm:block text-white"
             >
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 text-left">Team ROI Increase</p>
                <p className="text-4xl font-black text-[#FF8C1A] text-left tracking-tighter">+40%</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase">
                   <FaShieldAlt className="text-[#FF8C1A]" /> Verified Solutions
                </div>
             </motion.div>
          </div>
        </div>

        {/* TRAINING MODULES GRID */}
        <div className="text-left mb-16">
           <h2 className="text-4xl font-black text-[#0F172A] uppercase tracking-tighter mb-4 text-left">Customized Modules.</h2>
           <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Designed for scalable business growth</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainingModules.map((module, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] border-[8px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-left group transition-all duration-500 hover:shadow-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-[#FF8C1A] mb-8 shadow-inner">
                <module.icon size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0F172A] uppercase tracking-tighter mb-4 text-left leading-tight">{module.title}</h3>
              <p className="text-xs font-bold text-slate-400 leading-relaxed text-left opacity-80">{module.desc}</p>
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-2 text-[#FF8C1A] text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                 Learn More <FaArrowRight />
              </div>
            </motion.div>
          ))}
        </div>

        {/* PARTNERSHIP CTA */}
        <div className="mt-24 p-1 rounded-[4rem] bg-gradient-to-r from-orange-500 to-orange-300">
           <div className="bg-white rounded-[3.8rem] p-10 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 text-left">
              <div className="max-w-2xl text-left">
                 <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] uppercase tracking-tighter mb-6 text-left">Partner with YouthBees for <span className="text-[#FF8C1A]">Excellence.</span></h2>
                 <ul className="grid sm:grid-cols-2 gap-4">
                    <li className="flex items-center gap-2 font-bold text-slate-600 text-sm"><FaCheckCircle className="text-orange-500"/> Custom Curriculum</li>
                    <li className="flex items-center gap-2 font-bold text-slate-600 text-sm"><FaCheckCircle className="text-orange-500"/> Industry Experts</li>
                    <li className="flex items-center gap-2 font-bold text-slate-600 text-sm"><FaCheckCircle className="text-orange-500"/> Performance Reports</li>
                    <li className="flex items-center gap-2 font-bold text-slate-600 text-sm"><FaCheckCircle className="text-orange-500"/> Post-Training Support</li>
                 </ul>
              </div>
              <div className="w-full lg:w-auto text-left">
                 <button className="w-full lg:w-auto px-12 py-6 bg-[#0F172A] text-white font-black rounded-2xl uppercase text-sm tracking-widest hover:bg-[#FF8C1A] transition-all shadow-2xl">
                    Contact Enterprise Sales
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}