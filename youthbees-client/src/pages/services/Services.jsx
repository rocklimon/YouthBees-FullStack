import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaLinkedin,
  FaGlobe,
  FaUserTie,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";

const services = [
  {
    title: "CV Writing Services",
    icon: FaFileAlt,
    price: "Starts from ৳180",
    points: [
      "ATS-optimized CV formats",
      "Student & professional CVs",
      "Editable Word & PDF files",
      "Recruiter-friendly design",
    ],
    link: "/services/cv-writing",
  },
  {
    title: "LinkedIn Services",
    icon: FaLinkedin,
    price: "Starts from ৳300",
    points: [
      "Profile optimization",
      "Professional headline & summary",
      "Career branding strategy",
      "Visibility & growth setup",
    ],
    link: "/services/linkedin",
  },
  {
    title: "Website & Portfolio Services",
    icon: FaGlobe,
    price: "Starts from ৳1,500",
    points: [
      "Personal & business websites",
      "Modern responsive design",
      "Portfolio & project showcase",
      "Domain & hosting guidance",
    ],
    link: "/services/portfolio",
  },
  {
    title: "Career & Academic Counselling",
    icon: FaUserTie,
    price: "Starts from ৳100",
    points: [
      "Career roadmap planning",
      "Academic guidance",
      "Mock interviews",
      "1-to-1 mentor sessions",
    ],
    link: "/services/counselling",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-32 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="max-w-3xl mb-20">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Professional Services
          </h1>
          <p className="text-lg text-slate-600">
            Career-focused services designed to help you stand out, get hired,
            and grow with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ title, icon: Icon, price, points, link }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="
        group bg-white p-10 rounded-[2.5rem]
        border border-orange-100
        shadow-[0_15px_40px_-20px_rgba(255,140,26,0.25)]
        hover:shadow-[0_35px_80px_-20px_rgba(255,140,26,0.45)]
        transition-all duration-300
        flex flex-col
      "
    >
      <div className="w-16 h-16 bg-[#FF8C1A] text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition">
        <Icon size={28} />
      </div>

      <h3 className="text-2xl font-black mb-2 group-hover:text-[#FF8C1A] transition">
        {title}
      </h3>

      <p className="text-[#FF8C1A] font-extrabold mb-6">{price}</p>

      <ul className="space-y-3 text-sm text-slate-600 mb-10">
        {points.map((p, i) => (
          <li key={i} className="flex gap-3">
            <FaCheck className="text-orange-500 mt-1 group-hover:scale-110 transition" />
            {p}
          </li>
        ))}
      </ul>

      <a
        href={link}
        className="
          mt-auto w-full py-4 rounded-2xl
          bg-gradient-to-r from-[#FF8C1A] to-[#FF5F1F]
          text-white font-extrabold text-center
          shadow-lg hover:scale-[1.03]
          hover:shadow-[0_20px_40px_rgba(255,140,26,0.5)]
          transition-all
        "
      >
        View Details <FaArrowRight className="inline ml-2" />
      </a>
    </motion.div>
  );
}
