import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaUserCircle, 
  FaArrowLeft, 
  FaPaperPlane, 
  FaArrowRight, 
  FaLightbulb, 
  FaClock, 
  FaBolt 
} from "react-icons/fa";
import { articles } from "./Blog"; 

export default function BlogDetails() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id));

  // 🟢 IMPROVED LOGIC: Category-based with Fallback
  // This ensures the recommendation section is NEVER empty.
  const recommendedBlogs = articles
    .filter((a) => a.id !== parseInt(id)) // Remove the current article
    .sort((a, b) => {
      // Prioritize articles with the same category
      if (a.category === article?.category && b.category !== article?.category) return -1;
      if (a.category !== article?.category && b.category === article?.category) return 1;
      return 0;
    })
    .slice(0, 3); // Always grab exactly 3

  if (!article) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest text-[#FF8C1A]">Article Not Found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FDF8F4] pb-20 selection:bg-orange-300"
    >
      {/* 1. NAVIGATION HUB */}
      <div className="max-w-4xl mx-auto pt-10 px-6 flex justify-between items-center text-left">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#FF8C1A] font-black uppercase text-[10px] tracking-[0.2em] group">
          <FaArrowLeft className="group-hover:-translate-x-2 transition-transform" /> Back to Insights
        </Link>
        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
           <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
           <span className="text-[#0F172A] font-black text-[9px] uppercase tracking-widest">
             {article.category}
           </span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 pt-12">
        {/* 2. ARTICLE HEADER */}
        <h1 className="text-4xl md:text-7xl font-black text-[#0F172A] leading-[0.95] uppercase tracking-tighter mb-10 text-left">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-8 mb-12 py-6 border-y border-orange-100 text-left">
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-[#FF8C1A] text-xl" />
            <div className="text-left">
               <p className="text-[10px] font-black uppercase tracking-widest leading-none text-[#0F172A]">{article.author}</p>
               <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">Author</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border-l border-slate-100 pl-8">
            <FaClock className="text-slate-300 text-lg" />
            <div className="text-left">
               <p className="text-[10px] font-black uppercase tracking-widest leading-none text-[#0F172A]">5 Min Read</p>
               <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">Reading Time</p>
            </div>
          </div>
        </div>

        {/* Hero Image Frame */}
        <div className="rounded-[3.5rem] overflow-hidden border-[12px] border-white shadow-[0_50px_100px_rgba(0,0,0,0.12)] mb-16 h-[300px] md:h-[550px]">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* 3. CONTENT AREA */}
        <div className="prose prose-orange max-w-none text-left">
          <p className="text-xl md:text-2xl font-medium text-slate-700 leading-relaxed mb-10 text-left">
            {article.content}
          </p>
          <div className="p-8 bg-orange-50 rounded-[2.5rem] border border-orange-100 mb-12 italic text-slate-600 font-medium text-left">
             "The 2026 job market requires a hybrid mindset—fusing technical excellence with deep cultural adaptability."
          </div>
        </div>

        {/* 🟢 4. ENHANCED RECOMMENDED SECTION */}
        <div className="mt-32 border-t border-orange-100 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left">
               <div className="flex items-center gap-2 mb-4 text-left">
                  <FaBolt className="text-[#FF8C1A] animate-bounce" />
                  <span className="text-[#FF8C1A] font-black uppercase tracking-[0.3em] text-[10px] block">The Hive Recommends</span>
               </div>
               <h3 className="text-4xl lg:text-5xl font-black text-[#0F172A] uppercase tracking-tighter text-left">Recommended <span className="italic text-[#FF8C1A]">Insights.</span></h3>
            </div>
            <Link to="/blog" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#FF8C1A] transition-colors border-b-2 border-slate-100 pb-1">View Full Archive</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedBlogs.map((item, idx) => (
              <Link key={item.id} to={`/blog/${item.id}`} className="group block relative">
                {/* "Trending" Badge for the first item */}
                {idx === 0 && (
                   <div className="absolute -top-3 -right-3 z-30 bg-[#0F172A] text-white px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span> Trending
                   </div>
                )}

                <div className="bg-white rounded-[3rem] border-[10px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.06)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden flex flex-col h-full">
                  <div className="h-44 overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                    <div className="absolute bottom-4 left-6 px-3 py-1 bg-[#0F172A]/80 backdrop-blur-md rounded-lg text-[7px] font-black text-white uppercase tracking-widest border border-white/10">
                       {item.category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow text-left">
                    <h4 className="text-xl font-black uppercase leading-[1.2] mb-6 group-hover:text-[#FF8C1A] transition-colors text-left">{item.title}</h4>
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-slate-400">
                         <FaClock size={10} />
                         <span className="text-[9px] font-bold uppercase tracking-widest">4 Min Read</span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#0F172A] group-hover:bg-[#FF8C1A] group-hover:text-white transition-all shadow-sm">
                        <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 5. COMMENTS HUB */}
        <div className="mt-32 bg-[#0F172A] rounded-[4rem] p-10 lg:p-20 text-white text-left relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 text-[15rem] font-black text-white/5 select-none pointer-events-none italic">YB</div>
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-12 text-left">Community <span className="text-[#FF8C1A]">Voices</span></h3>
          <div className="flex gap-6 mb-16 items-start text-left">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 shrink-0 flex items-center justify-center font-black text-[#FF8C1A] text-xl shadow-inner">Me</div>
            <div className="flex-grow relative text-left">
              <textarea placeholder="Share your perspective with the hive..." className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] p-8 focus:border-[#FF8C1A] outline-none text-base font-medium h-40 transition-all text-left" />
              <button className="absolute bottom-6 right-6 bg-[#FF8C1A] p-4 rounded-2xl hover:scale-110 transition-transform shadow-2xl group">
                 <FaPaperPlane className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}