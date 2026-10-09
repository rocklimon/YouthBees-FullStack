import { motion } from "framer-motion";
import { 
  FaBullhorn, 
  FaEnvelopeOpenText, 
  FaUsers, 
  FaRocket, 
  FaCheck, 
  FaArrowRight,
  FaMagnet,
  FaChartPie
} from "react-icons/fa";

// Image import (Update paths based on your assets)
import marketingImg from "../../assets/about/workshop.jpg"; 

const marketingServices = [
  { 
    title: "Social Media Growth", 
    desc: "End-to-end management and content strategy to scale your brand presence across Meta, LinkedIn, and Instagram.", 
    icon: FaRocket,
    tags: ["Content Strategy", "Community Management"]
  },
  { 
    title: "Lead Generation & Media Buying", 
    desc: "Strategic lead collection and pipeline building using advanced targeting and high-conversion landing pages.", 
    icon: FaMagnet,
    tags: ["Data Collection", "Sales Funnels"]
  },
  { 
    title: "Macro Influencer Sync", 
    desc: "Connecting your brand with top-tier industry influencers for maximum authority and trust-building.", 
    icon: FaUsers,
    tags: ["PR & Outreach", "Brand Authority"]
  },
  { 
    title: "Precision Email Marketing", 
    desc: "High-ROI automated email sequences designed for lead nurturing and customer retention.", 
    icon: FaEnvelopeOpenText,
    tags: ["Automation", "Direct Response"]
  }
];

export default function MarketingSupport() {
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
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Growth Marketing Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.2rem] font-black text-[#0F172A] leading-[0.9] uppercase tracking-tighter mb-8">
              Amplify <br /> <span className="text-[#FF8C1A] italic">Growth.</span>
            </h1>
            
            <p className="text-base lg:text-lg text-slate-500 max-w-xl border-l-[3px] border-[#FF8C1A] pl-6 mb-10 font-medium leading-relaxed text-left">
              Data-driven marketing strategies for modern companies. From social dominance to high-intent lead collection, we build the engine that drives your revenue.
            </p>

            <div className="flex flex-wrap gap-4 justify-start">
              <button className="px-10 py-5 bg-[#0F172A] text-white font-black rounded-2xl shadow-xl hover:bg-[#FF8C1A] transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest group">
                Request a Strategy Audit <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
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
                <img src={marketingImg} alt="Marketing Strategy Session" className="w-full h-full object-cover" />
             </motion.div>
             
             {/* Floating Performance Badge */}
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ repeat: Infinity, duration: 4.5 }}
               className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-orange-100 z-20 hidden sm:block"
             >
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg">
                      <FaChartPie size={14} />
                   </div>
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-left">Campaign Performance</p>
                </div>
                <p className="text-3xl font-black text-[#0F172A] text-left">3.2x ROAS</p>
                <p className="text-[9px] font-bold text-green-500 mt-1 text-left">▲ 22% vs Last Quarter</p>
             </motion.div>
          </div>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {marketingServices.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.01 }}
              className="bg-white p-10 rounded-[3rem] border-[10px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row gap-8 group transition-all duration-500 hover:shadow-2xl"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF8C1A] group-hover:bg-[#FF8C1A] group-hover:text-white transition-all shrink-0">
                <s.icon size={28} />
              </div>
              <div className="text-left flex flex-col justify-center">
                <h3 className="text-2xl font-black text-[#0F172A] uppercase tracking-tighter mb-2 text-left">{s.title}</h3>
                <p className="text-sm font-bold text-slate-400 leading-relaxed mb-6 opacity-80 text-left">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                   {s.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-50 text-[8px] font-black text-slate-500 uppercase tracking-widest rounded-full border border-slate-100">{tag}</span>
                   ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA SECTION */}
        <div className="mt-20 p-12 lg:p-24 rounded-[4rem] bg-[#0F172A] text-white flex flex-col lg:flex-row items-center justify-between gap-12 text-left relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8C1A]/5 rounded-full blur-3xl pointer-events-none" />
           
           <div className="max-w-xl text-left">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-6 text-left">Scale your brand with YouthBees.</h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed text-left">Request a custom growth proposal and learn how we can optimize your digital presence for maximum ROI.</p>
           </div>
           
           <div className="flex flex-col gap-4 w-full lg:w-auto">
              <button className="px-12 py-6 bg-[#FF8C1A] text-white font-black rounded-2xl uppercase text-sm tracking-widest hover:bg-white hover:text-[#0F172A] transition-all shadow-2xl">
                 Contact Growth Team
              </button>
              <p className="text-[10px] text-slate-500 text-center font-bold uppercase tracking-widest">Global Marketing Partners</p>
           </div>
        </div>

      </div>
    </div>
  );
}