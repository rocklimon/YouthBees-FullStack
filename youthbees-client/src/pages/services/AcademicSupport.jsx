import { motion } from "framer-motion";
import { 
  FaGraduationCap, 
  FaFileSignature, 
  FaUserEdit, 
  FaSearchPlus, 
  FaArrowRight, 
  FaChartBar,
  FaFileAlt
} from "react-icons/fa";

const scholarlyServices = [
  { 
    id: 1, 
    title: "Academic Tuition", 
    desc: "1-on-1 personalized academic coaching for school, college, and university subjects.", 
    icon: FaGraduationCap, 
    price: "Starts ৳500/hr" 
  },
  { 
    id: 2, 
    title: "Assignment Support", 
    desc: "Expert guidance to help you master and excel in institutional projects and coursework.", 
    icon: FaFileSignature, 
    price: "Custom Quote" 
  },
  { 
    id: 3, 
    title: "Research Paper Support", 
    desc: "Professional assistance with academic research, paper structuring, and publications.", 
    icon: FaFileAlt, 
    price: "Consultation" 
  },
  
  { 
    id: 4, 
    title: "Survey Support", 
    desc: "Comprehensive support for data collection, tool design, and professional survey analysis.", 
    icon: FaChartBar, 
    price: "Starts ৳2,000" 
  }
];

export default function ScholarlySuccess() {
  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Academic Excellence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[7.2rem] font-black text-[#0F172A] leading-[0.9] uppercase tracking-tighter mb-8 text-left">
            Scholarly <br /> <span className="text-[#FF8C1A] italic">Success.</span>
          </h1>
          
          <p className="text-base lg:text-lg text-slate-500 max-w-xl border-l-[3px] border-[#FF8C1A] pl-6 text-left font-medium leading-relaxed">
            Elevating your academic journey through expert mentorship and professional documentation support tailored for the next generation of global leaders.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {scholarlyServices.map((service) => (
            <motion.div 
              whileHover={{ y: -10 }} 
              key={service.id} 
              className="bg-white p-8 lg:p-10 rounded-[2.5rem] border-[10px] border-white shadow-[0_40px_80px_rgba(0,0,0,0.08)] flex flex-col items-start group transition-all duration-500 hover:shadow-[0_50px_100px_rgba(0,0,0,0.12)]"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF8C1A] group-hover:bg-[#FF8C1A] group-hover:text-white transition-all mb-8 shrink-0 shadow-sm">
                <service.icon size={28} />
              </div>
              
              <div className="flex-grow flex flex-col">
                <h3 className="text-2xl font-black text-[#0F172A] uppercase tracking-tighter mb-3 leading-none group-hover:text-[#FF8C1A] transition-colors">{service.title}</h3>
                <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8 opacity-70">{service.desc}</p>
                
                <div className="mt-auto pt-6 border-t border-slate-50 w-full flex justify-between items-center">
                  <span className="text-[#FF8C1A] font-black uppercase tracking-widest text-[10px]">{service.price}</span>
                  <button className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-[#0F172A] hover:text-[#FF8C1A] transition-colors group/btn">
                    Enquire <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}