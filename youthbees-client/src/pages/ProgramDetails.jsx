import { motion } from "framer-motion";

export default function ProgramDetails() {
  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-32 px-4">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-[3rem] shadow-xl border border-orange-100"
        >
          <span className="text-xs font-bold uppercase text-orange-600">
            Training Program
          </span>

          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6">
            AI & Digital Literacy
          </h1>

          <p className="text-slate-600 text-lg leading-relaxed mb-10">
            This program introduces modern AI concepts and practical digital tools
            that are essential for today’s job market.
          </p>

          <ul className="space-y-3 text-slate-600 mb-10">
            <li>• Live sessions via Google Meet / Zoom</li>
            <li>• Certificate upon completion</li>
            <li>• Mentor-guided learning</li>
            <li>• Career-focused curriculum</li>
          </ul>

          <button className="px-10 py-4 rounded-2xl bg-[#FF8C1A] text-white font-black hover:bg-[#FF5F1F] transition">
            Enroll Now (Login Required)
          </button>
        </motion.div>
      </div>
    </div>
  );
}
