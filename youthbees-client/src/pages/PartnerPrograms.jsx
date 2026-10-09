import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaAward, FaHandshake } from "react-icons/fa";

const partnerPrograms = [
  {
    id: 1,
    title: "Google Data Analytics",
    partner: "Google",
    url: "https://grow.google",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536ad31?auto=format&fit=crop&q=80&w=600", // Representative Data image
    category: "Data Science"
  },
  {
    id: 2,
    title: "Meta Digital Marketing",
    partner: "Meta",
    url: "https://www.facebook.com/business/learn",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600", // Representative Marketing image
    category: "Marketing"
  },
  {
    id: 3,
    title: "AWS Cloud Foundations",
    partner: "Amazon Web Services",
    url: "https://aws.amazon.com/training/",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600", // Representative Tech image
    category: "Cloud Computing"
  },
];

export default function PartnerPrograms() {
  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-32 pb-20 px-6 selection:bg-orange-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-[10px] uppercase tracking-widest mb-6">
            <FaHandshake /> Global Collaborations
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
            Partner <span className="text-orange-500 font-outline-2 uppercase">Learning.</span>
          </h1>
          <p className="text-slate-500 max-w-2xl text-xl font-medium leading-relaxed border-l-4 border-orange-500 pl-8">
            Access world-class certifications from verified global leaders. Note: Enrollment and payment happen directly on the partner’s platform.
          </p>
        </motion.div>

        {/* Partner Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {partnerPrograms.map((program) => (
            <motion.div
              key={program.id}
              whileHover={{ y: -12 }}
              className="group bg-white rounded-[3.5rem] overflow-hidden border border-orange-100 shadow-xl shadow-orange-900/5 hover:shadow-2xl transition-all flex flex-col h-full"
            >
              {/* THUMBNAIL */}
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-xl shadow-sm">
                  {program.category}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-10 flex flex-col flex-grow text-left">
                <div className="flex items-center gap-2 text-orange-500 font-black text-[10px] uppercase tracking-widest mb-4">
                   <FaAward /> Global Certification
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-orange-500 transition-colors">
                  {program.title}
                </h3>

                <p className="text-sm text-slate-500 mb-10 font-medium italic">
                  Verified educational content powered by <span className="text-slate-900 font-black not-italic">{program.partner}</span>
                </p>

                <div className="mt-auto">
                  <a
                    href={program.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all gap-3 shadow-lg shadow-slate-200"
                  >
                    Visit Partner Site <FaExternalLinkAlt size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}