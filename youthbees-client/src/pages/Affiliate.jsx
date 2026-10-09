import { motion } from "framer-motion";
import {
  FaUsers,
  FaLink,
  FaMoneyBillWave,
  FaCheckCircle,
  FaArrowRight,
  FaLock,
  FaRocket,
  FaChartLine,
  FaWallet,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* MOCK AUTH — replace later */
const isLoggedIn = false;

export default function Affiliate() {
  const navigate = useNavigate();

  const handleApply = () => {
    if (!isLoggedIn) {
      alert("Please login to apply as an affiliate.");
      navigate("/login");
      return;
    }
    navigate("/affiliate/apply");
  };

  return (
    <div className="bg-[#FFF9F5] selection:bg-orange-300 selection:text-white overflow-hidden">
      
      {/* ================= HERO: DYNAMIC & BOLD ================= */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-[120px] -mr-40 -mt-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-xs uppercase tracking-widest mb-6">
              <FaRocket className="animate-bounce" /> Affiliate Program 2026
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">
              Grow with <br />
              <span className="text-orange-500">YouthBees.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg border-l-4 border-orange-500 pl-8">
              Turn your network into net worth. Promote industry-leading career services and earn high-ticket commissions on every referral.
            </p>
          </motion.div>

          {/* Stats Bento Box for Social Proof */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard value="20%" label="Max Commission" />
            <StatCard value="500+" label="Active Partners" />
            <div className="col-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white flex justify-between items-center group cursor-default">
               <div>
                  <p className="text-orange-500 font-black uppercase tracking-widest text-[10px] mb-1">Total Payouts</p>
                  <p className="text-3xl font-black">৳5,00,000+</p>
               </div>
               <FaChartLine className="text-4xl text-white/20 group-hover:text-orange-500 transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS: CONNECTED STEPS ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tighter">The Path to <span className="text-orange-500">Earnings</span></h2>
        
        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connecting Line (Hidden on Mobile) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-orange-100 -z-10" />
          
          <StepCard step="01" icon={FaUsers} title="Join" text="Quick application and admin verification." />
          <StepCard step="02" icon={FaLink} title="Promote" text="Get custom links and brand assets." />
          <StepCard step="03" icon={FaCheckCircle} title="Track" text="Watch conversions on your dashboard." />
          <StepCard step="04" icon={FaMoneyBillWave} title="Payout" text="Withdraw monthly to your wallet." />
        </div>
      </section>

      {/* ================= BENEFITS: PREMIUM SPLIT ================= */}
      <section className="py-32 px-6 bg-white rounded-[5rem] mx-4 shadow-sm border border-orange-100/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
             <motion.div 
               whileHover={{ y: -10 }}
               className="bg-slate-900 p-12 rounded-[4rem] text-white relative overflow-hidden group"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20" />
                <FaWallet className="text-orange-500 text-5xl mb-8" />
                <h3 className="text-4xl font-black mb-4">Commission <br />Structure</h3>
                <p className="text-7xl font-black text-orange-500 mb-6 tracking-tighter">10-20%</p>
                <p className="text-slate-400 font-medium italic">"Earn per successful enrollment in our high-ticket mentorship programs and specialized courses."</p>
             </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-5xl font-black mb-10 text-slate-900 tracking-tight">Why Partner <br />With Us?</h2>
            <div className="space-y-6">
              <BenefitItem text="Zero Investment Required" />
              <BenefitItem text="High-Conversion Educational Products" />
              <BenefitItem text="Advanced Tracking Dashboard" />
              <BenefitItem text="Dedicated Affiliate Support" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA: THE FINAL PUSH ================= */}
      <section className="py-40 px-6">
        <motion.div
          whileHover={{ scale: 0.99 }}
          className="max-w-6xl mx-auto bg-orange-500 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-500/30"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 border-[40px] border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
            Ready to Build <br /> Your Income?
          </h2>
          <p className="text-orange-100 max-w-xl mx-auto mb-12 text-lg font-medium">
            Join the YouthBees ecosystem and start earning by promoting career growth in Bangladesh.
          </p>

          <button
            onClick={handleApply}
            className="group relative px-16 py-6 bg-white text-orange-600 font-black text-xl rounded-2xl hover:bg-slate-900 hover:text-white transition-all flex items-center gap-4 mx-auto overflow-hidden shadow-xl"
          >
            <span className="relative z-10">Apply as Affiliate</span>
            <div className="flex items-center gap-2 relative z-10">
                {!isLoggedIn && <FaLock className="text-sm opacity-50" />}
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </motion.div>
      </section>

    </div>
  );
}

/* ================= ENHANCED COMPONENTS ================= */

function StepCard({ step, icon: Icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white p-10 rounded-[3rem] border border-orange-100 shadow-xl shadow-orange-900/5 text-center group"
    >
      <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-colors">
        <span className="text-orange-500 font-black text-xs group-hover:text-white">{step}</span>
      </div>
      <Icon className="text-orange-500 text-4xl mx-auto mb-6" />
      <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm font-medium leading-relaxed">{text}</p>
    </motion.div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-orange-100 shadow-sm text-center flex flex-col justify-center">
      <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{value}</h3>
      <p className="text-orange-500 font-bold uppercase tracking-widest text-[10px]">{label}</p>
    </div>
  );
}

function BenefitItem({ text }) {
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-orange-50 shadow-sm hover:border-orange-200 transition-colors">
      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
        <FaCheckCircle className="text-orange-500 text-sm" />
      </div>
      <span className="font-bold text-slate-700 text-sm">{text}</span>
    </div>
  );
}