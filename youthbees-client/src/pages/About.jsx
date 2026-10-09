import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaHandshake,
  FaAward,
  FaBullseye,
  FaEye,
  FaQuoteLeft,
  FaArrowRight,
  FaLinkedin,
  FaGlobe,
  FaHistory,
  FaRocket,
  FaChartLine,
  FaMobileAlt,
} from "react-icons/fa";

/* ===== IMAGE IMPORTS ===== */
import teamImg from "../assets/about/team.jpg";
import eventImg from "../assets/about/event.jpg";
import eventStallImg from "../assets/about/event-stall-1.jpg";
import awardImg from "../assets/about/award-ceremony-1.jpg";
import founderImg from "../assets/about/founder.jpg";
import firotechImg from "../assets/about/collaboration-firotech.jpg";
import epaathImg from "../assets/about/collaboration-epaathshala.jpg";
import mouImg from "../assets/about/mou-signing.jpg";
import marketingImg from "../assets/team/Sudipto Kumar Day- Marketing Team Lead.jpg";
import communityImg from "../assets/team/Joan Mickey Biswas-Community manager.jpg";
import hrImg from "../assets/team/Junaidur Rahman Digonto-HR.jpg";


export default function About() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Executive Team Preview (Fixed / New Team Roster)
  const team = [
    {
      name: "Mahib Sadman",
      role: "Founder & CEO",
      img: founderImg,
      linkedin: "https://www.linkedin.com/in/mahib-sadman/"
    },
     {
      name: "Junaidur Rahman Digonto",
      role: "HR",
      img: hrImg,
    linkedin: "https://www.linkedin.com/in/junaidur-rahman-digonto/",
    },
    {
      name: "Sudipto Kumar Day",
      role: "Marketing Team Lead",
      img: marketingImg,
    linkedin: "https://www.linkedin.com/in/sudiptokumerdeydataanalyst/",
    },
    {
      name: "Joan Mickey Biswas",
      role: "Community Manager",
      img: communityImg,
    linkedin: "https://www.linkedin.com/in/joan-mickey-biswas-6ba8a52ab/",
    }
  ];

  return (
    <div className="bg-[#FFF9F5] overflow-hidden selection:bg-orange-300 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10 text-left">
          <motion.div className="lg:col-span-7" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 font-bold text-xs tracking-widest uppercase mb-8 text-left">Est. April 21, 2021</span>
            <h1 className="text-7xl md:text-9xl font-black text-slate-900 leading-[0.85] tracking-tighter mb-8 uppercase text-left">Potential to <br /><span className="text-orange-500 italic">Success.</span></h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl border-l-4 border-orange-500 pl-8 ml-2 italic font-medium text-left">YouthBees is a movement designed to transition Bangladeshi students from classroom theory to industry mastery.</p>
          </motion.div>
          <motion.div className="lg:col-span-5 relative" style={{ scale }}>
            <div className="relative z-10 rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-2xl rotate-3 border-[12px] border-white">
              <img src={teamImg} alt="Team" className="w-full aspect-[4/5] object-cover" />
            </div>
            <div className="absolute inset-0 bg-orange-500 rounded-[3rem] md:rounded-[5rem] -rotate-3 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* 2. HISTORY & ORIGINS */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-6">
              <FaHistory className="text-orange-500 text-2xl" />
              <span className="text-orange-500 font-black uppercase tracking-widest text-sm text-left">Our Origins</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase mb-10 leading-none text-left">A Journey of <br />Frustration & <span className="text-orange-500 italic">Action.</span></h2>
            <div className="space-y-6 text-slate-600 text-lg font-medium leading-relaxed text-left">
              <p>YouthBees began on April 21, 2021 as a humble yet ambitious initiative driven by a shared frustration — traditional education often left young people without clear direction.</p>
              <p>During the COVID-19 lockdown, what started as a small network of 30 members grew into a vibrant movement. Our community expanded to over 1,000 people hunger for practical learning.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 p-10 rounded-[3rem] flex flex-col justify-center items-center text-center">
               <h4 className="text-5xl font-black text-orange-500 mb-2">30</h4>
               <p className="text-xs font-black uppercase tracking-widest text-slate-400">Initial Members</p>
            </div>
            <div className="bg-slate-900 p-10 rounded-[3rem] mt-12 flex flex-col justify-center items-center text-center text-white">
               <h4 className="text-5xl font-black text-orange-500 mb-2">10K+</h4>
               <p className="text-xs font-black uppercase tracking-widest text-slate-400">Students Enabled</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUNDER SECTION */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center text-left">
          <div className="lg:col-span-5 relative group">
            <div className="rounded-[4rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 border-[12px] border-white shadow-2xl relative">
                <img src={founderImg} alt="Founder" className="w-full h-[650px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href="https://www.linkedin.com/in/mahib-sadman/" target="_blank" rel="noreferrer" className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-900 hover:bg-orange-500 hover:text-white transition-all shadow-2xl">
                        <FaLinkedin size={30} />
                    </a>
                </div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-10 rounded-3xl shadow-xl max-w-[320px] hidden md:block border border-orange-100 text-left">
              <FaQuoteLeft className="text-orange-500 text-3xl mb-4" />
              <p className="text-slate-700 italic font-bold leading-relaxed text-left">"We invest in the skills, confidence, and clarity students actually need."</p>
            </div>
          </div>
          <div className="lg:col-span-7 text-left">
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight uppercase leading-none mb-4 text-left">Mahib <br /> <span className="text-orange-500 italic">Sadman.</span></h2>
            <h3 className="text-xl font-black text-slate-400 mb-8 uppercase tracking-[0.3em] text-left">Founder & CEO, YouthBees</h3>
            <div className="space-y-6 text-slate-600 text-lg font-medium italic mb-10 text-left">
              <p>Mahib founded YouthBees in 2021 after seeing capable young people struggle—not for lack of talent, but for lack of guidance and visibility.</p>
              <p>He has personally helped over 100 students secure direct jobs and internships across education, technology, and HR consultancy sectors.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {["Career Coach", "Marketing Strategist", "Talent Connector", "Community Visionary"].map((text, i) => (
                <motion.div key={i} whileHover={{ x: 10 }} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-orange-100 shadow-sm"><div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center"><FaAward className="text-orange-500 text-sm" /></div><span className="font-black text-slate-800 text-[10px] uppercase tracking-widest text-left">{text}</span></motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE TEAM SECTION (FIXED / NEW TEAMS) */}
      <section className="py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 text-left">
            <div className="text-left">
              <span className="text-orange-500 font-black uppercase text-[10px] tracking-[0.4em] mb-4 block text-left">Core Architects</span>
              <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none text-left">The <br /><span className="text-orange-500 italic uppercase">Drivers.</span></h2>
            </div>
            <p className="text-slate-500 max-w-sm pb-2 italic border-l-2 border-orange-500 pl-6 font-medium text-left">The dedicated team working behind the scenes to scale impact across Bangladesh.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative">
                <div className="relative h-[450px] rounded-[3.5rem] overflow-hidden shadow-2xl border-[8px] border-white grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-10 flex flex-col justify-end text-left">
                    <div className="flex gap-3 mt-4">
                        <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-orange-500 transition-colors"><FaLinkedin /></a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-left px-4">
                  <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter text-left">{member.name}</h4>
                  <p className="text-orange-500 font-black uppercase text-[10px] tracking-widest mt-1 italic text-left">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center md:justify-start">
             <Link to="/team" className="inline-flex items-center gap-4 px-12 py-6 bg-slate-900 text-white font-black rounded-2xl hover:bg-orange-500 transition-all uppercase tracking-widest text-xs shadow-2xl group">
               Meet the Full Squad <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* 5. AWARDS & PARTNERS (FIXED) */}
      <section className="py-32 px-6 bg-slate-900 rounded-[5rem] mx-4 overflow-hidden relative shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 text-left">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none text-left">Strategic <br /><span className="text-orange-500 italic text-left">Ecosystem.</span></h2>
            <p className="text-slate-400 max-w-sm pb-2 font-medium text-left">Collaborating with the best to deliver the highest quality career resources.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <PartnerCard img={firotechImg} title="FiroTech" tag="Tech Partner" />
            <PartnerCard img={epaathImg} title="ePaathshalaBD" tag="Learning Partner" />
            <PartnerCard img={mouImg} title="Strategic MOUs" tag="Global Reach" />
          </div>
          <div className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <AwardTile img={awardImg} title="Leadership Recognition" />
            <AwardTile img={eventStallImg} title="National Presence" />
            <div className="lg:col-span-2 bg-orange-500 rounded-[3rem] p-12 flex items-center justify-between group cursor-pointer shadow-xl shadow-orange-500/20">
              <h4 className="text-4xl font-black text-white uppercase text-left leading-none tracking-tighter italic">Join our <br />Network</h4>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform"><FaArrowRight size={30} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. IMPACT STATS (REAL DATA) */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-16 text-left">
          <StatBox value="5K+" label="Active Members" />
          <StatBox value="80+" label="Institutions Reached" />
          <StatBox value="40+" label="Flagship Events" />
          <StatBox value="100K+" label="Organic Impressions" />
        </div>
      </section>

      {/* 7. FUTURE ROADMAP */}
      <section className="py-32 px-6 bg-white border-t border-orange-100">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-12 text-left">Looking <span className="text-orange-500 italic">Ahead.</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             <RoadmapCard icon={<FaMobileAlt />} title="App Launch" desc="Mobile app for wider access to career resources." />
             <RoadmapCard icon={<FaChartLine />} title="Employer Hub" desc="Hiring dashboards for corporate partners." />
             <RoadmapCard icon={<FaUsers />} title="Uni Portals" desc="University collaboration portals across South Asia." />
             <RoadmapCard icon={<FaRocket />} title="Scale" desc="Expanding our subscription-based support models." />
          </div>
        </div>
      </section>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function PartnerCard({ img, title, tag }) {
  return (
    <motion.div whileHover={{ y: -15 }} className="group bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-[3.5rem] transition-all text-left">
      <div className="overflow-hidden rounded-[2.8rem] h-64 mb-6"><img src={img} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-700" /></div>
      <div className="px-6 pb-6 text-left">
        <span className="text-orange-500 text-[8px] font-black uppercase tracking-widest text-left">{tag}</span>
        <h4 className="text-2xl font-black text-white uppercase tracking-tight mt-1 text-left">{title}</h4>
      </div>
    </motion.div>
  );
}

function AwardTile({ img, title }) {
  return (
    <div className="relative h-64 rounded-[3rem] overflow-hidden group border border-white/10 shadow-xl text-left">
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
      <div className="absolute bottom-8 left-8 text-left"><h5 className="text-white font-black text-sm uppercase tracking-widest text-left">{title}</h5></div>
    </div>
  );
}

function StatBox({ value, label }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-left md:text-left">
      <h3 className="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter mb-2 leading-none uppercase text-left">{value}</h3>
      <div className="w-12 h-1.5 bg-orange-500 mb-6 rounded-full text-left" />
      <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] text-left">{label}</p>
    </motion.div>
  );
}

function RoadmapCard({ icon, title, desc }) {
  return (
    <div className="p-8 bg-orange-50 rounded-[2.5rem] border border-orange-100 flex flex-col h-full text-left">
      <div className="text-3xl text-orange-500 mb-6">{icon}</div>
      <h4 className="text-xl font-black text-slate-900 uppercase mb-3 text-left">{title}</h4>
      <p className="text-sm text-slate-500 font-medium leading-relaxed text-left">{desc}</p>
    </div>
  );
}