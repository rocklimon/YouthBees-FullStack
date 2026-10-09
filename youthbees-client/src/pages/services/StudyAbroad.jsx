import { motion } from "framer-motion";
import { 
  FaGlobeAmericas, 
  FaBookOpen, 
  FaPassport, 
  FaUniversity, 
  FaArrowRight, 
  FaCheckCircle,
  FaMapMarkerAlt
} from "react-icons/fa";

// Image imports (Update paths based on your assets)
import abroadImg from "../../assets/about/event.jpg"; 

const supportSteps = [
  { 
    title: "IELTS Mastery", 
    desc: "Rigorous training with mock tests to achieve Band 7.5+ for top-tier universities.", 
    icon: FaBookOpen,
    color: "bg-blue-50 text-blue-600"
  },
  { 
    title: "University Selection", 
    desc: "Personalized matching with institutions in USA, Canada, UK, and Europe.", 
    icon: FaUniversity,
    color: "bg-orange-50 text-orange-600"
  },
  { 
    title: "SOP & Visa Support", 
    desc: "End-to-end documentation assistance, from scholarship essays to visa interviews.", 
    icon: FaPassport,
    color: "bg-green-50 text-green-600"
  }
];

export default function StudyAbroad() {
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
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Global Education Pathway</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.2rem] font-black text-[#0F172A] leading-[0.9] uppercase tracking-tighter mb-8">
              Study <br /> <span className="text-[#FF8C1A] italic">Abroad.</span>
            </h1>
            
            <p className="text-base lg:text-lg text-slate-500 max-w-xl border-l-[3px] border-[#FF8C1A] pl-6 mb-10 font-medium leading-relaxed text-left">
              Your bridge to the world's most prestigious universities. We simplify the complex journey of international education with expert IELTS preparation and ethical admission support.
            </p>

            <div className="flex flex-wrap gap-4 justify-start">
              <button className="px-10 py-5 bg-[#0F172A] text-white font-black rounded-2xl shadow-xl hover:bg-[#FF8C1A] transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest group">
                Free Consultation <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
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
                <img src={abroadImg} alt="Students Studying Abroad" className="w-full h-full object-cover" />
             </motion.div>
             
             {/* Floating Location Badge */}
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ repeat: Infinity, duration: 5 }}
               className="absolute -top-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-blue-100 z-20 hidden sm:flex items-center gap-4"
             >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg">
                   <FaMapMarkerAlt size={18} />
                </div>
                <div className="text-left">
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 text-left">Popular Destination</p>
                   <p className="text-xl font-black text-[#0F172A] text-left uppercase tracking-tighter">Canada & UK</p>
                </div>
             </motion.div>
          </div>
        </div>

        {/* SUPPORT STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportSteps.map((step, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] border-[8px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.06)] text-left group transition-all duration-500 hover:shadow-xl"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm transition-transform group-hover:rotate-6 ${step.color}`}>
                <step.icon size={28} />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] uppercase tracking-tighter mb-4 text-left">{step.title}</h3>
              <p className="text-sm font-bold text-slate-400 leading-relaxed text-left opacity-80">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-20 bg-white border-[10px] border-white rounded-[4rem] shadow-2xl p-10 lg:p-20 flex flex-col md:flex-row items-center gap-12 text-left relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-slate-50 -z-10 select-none hidden lg:block uppercase tracking-tighter">GLOBAL</div>
           
           <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[#FF8C1A] flex items-center justify-center text-white text-5xl shadow-xl shrink-0">
              <FaGlobeAmericas />
           </div>
           
           <div className="flex-grow text-left">
              <h2 className="text-4xl font-black text-[#0F172A] uppercase tracking-tighter mb-4 text-left">Achieve your global band score.</h2>
              <p className="text-slate-500 font-medium text-lg text-left">Enroll in our premium IELTS crash course and get a <span className="text-[#FF8C1A] font-black underline">Free Admission Profile Evaluation.</span></p>
           </div>
           
           <button className="w-full md:w-auto px-12 py-6 bg-[#0F172A] text-white font-black rounded-2xl uppercase text-sm tracking-widest hover:bg-[#FF8C1A] transition-all shadow-2xl shrink-0">
              Apply Now
           </button>
        </div>

      </div>
    </div>
  );
}