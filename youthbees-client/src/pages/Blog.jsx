import { motion } from "framer-motion";
import { useState } from "react";
import { FaCalendarAlt, FaUserCircle, FaArrowRight, FaSearch, FaBolt, FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";

// ✅ Shared Data (Add more items as needed)
export const articles = [
  {
    id: 1,
    title: "The Future of Remote Work in Bangladesh: 2026 Trends",
    excerpt: "As global markets shift, how can Bangladeshi students prepare for high-paying remote roles?",
    content: "The landscape of work in Bangladesh is undergoing a seismic shift. Following the structural changes in the job market post-2024, remote work stands as a pillar of economic resilience. For students, mastering global communication and niche technical skills is no longer optional—it is the baseline for success in a borderless economy.",
    category: "Industry News",
    author: "Mahib Sadman",
    date: "Jan 12, 2026",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800",
    featured: true
  },
  {
    id: 2,
    title: "Mastering the STAR Method for Mock Interviews",
    excerpt: "Learn how to structure your interview answers to impress recruiters at top-tier corporate firms.",
    content: "The STAR (Situation, Task, Action, Result) method is the gold standard for behavioral interviews. By focusing on quantifiable results, candidates can demonstrate their impact clearly to hiring managers in the competitive 2026 job market.",
    category: "Career Strategy",
    author: "Sakib Hasan",
    date: "Jan 08, 2026",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
    featured: false
  },
  {
    id: 3,
    title: "The Rise of AI Literacy in Local Education",
    excerpt: "Why AI literacy is becoming the most sought-after skill for fresh graduates in 2026.",
    content: "Academic institutions are now integrating AI literacy into core curriculums...",
    category: "Academic Tips",
    author: "Nabila Islam",
    date: "Jan 05, 2026",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600",
    featured: false
  }
];

const categories = ["All", "Career Strategy", "Academic Tips", "Industry News", "Student Life"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(a => 
    (activeCategory === "All" || a.category === activeCategory) &&
    (a.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const featuredPost = articles.find(a => a.featured);
  
  // 🟢 Logic for "Must Read" Recommendations (Picks top 3 non-featured)
  const recommendedArticles = articles.filter(a => !a.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FDF8F4] pb-20 selection:bg-orange-300 overflow-x-hidden">
      <section className="pt-20 lg:pt-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <header className="text-left mb-16">
            <motion.span 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="text-[#FF8C1A] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block"
            >
              Ecosystem Insights
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-[#0F172A] leading-none uppercase tracking-tighter"
            >
              Inside <br /> <span className="text-[#FF8C1A] italic uppercase">YouthBees.</span>
            </motion.h1>
          </header>

          {/* FEATURED POST */}
          {featuredPost && activeCategory === "All" && (
            <Link to={`/blog/${featuredPost.id}`}>
              <motion.div whileHover={{ y: -10 }} className="relative bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white flex flex-col lg:flex-row group mb-24">
                <div className="lg:w-1/2 h-[400px] lg:h-auto overflow-hidden">
                  <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center text-left">
                  <span className="bg-[#FF8C1A] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest w-fit mb-6">Featured Story</span>
                  <h2 className="text-3xl lg:text-5xl font-black text-[#0F172A] leading-tight uppercase mb-6 group-hover:text-[#FF8C1A] transition-colors tracking-tighter">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-500 font-medium text-lg mb-8 line-clamp-2">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-6 pt-8 border-t border-slate-50">
                    <span className="text-[10px] font-black uppercase text-[#0F172A] italic">By {featuredPost.author}</span>
                    <span className="text-[10px] font-black uppercase text-slate-400">{featuredPost.date}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          {/* FILTERS */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-[#FF8C1A] text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
              <input 
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text" placeholder="Search articles..." 
                className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:border-[#FF8C1A] shadow-sm font-bold text-sm" 
              />
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
            {filteredArticles.filter(a => activeCategory !== "All" || !a.featured).map((article) => (
              <motion.article layout key={article.id} className="bg-white rounded-[3rem] border-[10px] border-white overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                <Link to={`/blog/${article.id}`}>
                  <div className="h-64 overflow-hidden relative">
                    <img src={article.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={article.title} />
                  </div>
                  <div className="p-10 flex flex-col h-full text-left">
                    <h3 className="text-2xl font-black text-[#0F172A] uppercase mb-4 group-hover:text-[#FF8C1A] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-8 line-clamp-3">{article.excerpt}</p>
                    <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase text-[#0F172A] italic">By {article.author}</span>
                      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF8C1A] group-hover:bg-[#FF8C1A] group-hover:text-white transition-all shadow-sm">
                        <FaArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          

        </div>
      </section>
    </div>
  );
}