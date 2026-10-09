import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCommentDots,
  FaShieldAlt,
  FaDownload
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Logo
import logoImg from "../assets/logo/logo.png";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

        {/* 1. BRAND COLUMN */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <Link to="/">
              <img
                src={logoImg}
                alt="YouthBees Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>

          <p className="text-xs leading-relaxed text-slate-400 mb-6">
            YouthBees is a career-focused learning ecosystem connecting students
            to real-world skills and opportunities.
          </p>

          <div className="flex gap-3 mt-6">
            <SocialIcon href="https://www.facebook.com/YouthBees" icon={<FaFacebookF />} />
            <SocialIcon href="https://www.linkedin.com/company/youthbees/" icon={<FaLinkedinIn />} />
            <SocialIcon href="https://www.instagram.com/youthbeesofficial" icon={<FaInstagram />} />
            <SocialIcon href="https://youtube.com" icon={<FaYoutube />} />
          </div>
        </div>

        {/* 2. RESOURCES & DISCOVERY */}
        <FooterColumn title="Resources">
          <FooterLink label="Training Programs" to="/training-programs" />
          <FooterLink label="Partner Programs" to="/partner-programs" />
          <FooterLink label="Blog & Insights" to="/blog" />
          <FooterLink label="Free Downloads" to="/resources/downloads" icon={<FaDownload className="inline mr-1 text-[8px]"/>} />
          <FooterLink label="Give Feedback" to="/feedback" icon={<FaCommentDots className="inline mr-1 text-[8px]"/>} />
        </FooterColumn>

        {/* 3. LEGAL & POLICIES */}
        <FooterColumn title="Legal Hub">
          <FooterLink label="Privacy Policy" to="/privacy" />
          <FooterLink label="Terms & Conditions" to="/terms" />
          <FooterLink label="Refund Policy" to="/refund" />
          <FooterLink label="Community Guidelines" to="/guidelines" />
          <FooterLink label="Do Not Sell My Info" to="/privacy#do-not-sell" />
          <FooterLink label="Accessibility" to="/accessibility" />
        </FooterColumn>

        {/* 4. ETHICS & DISCLAIMERS */}
        <FooterColumn title="Our Commitment">
          <div className="space-y-4">
            <div>
               <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest mb-1 flex items-center gap-1">
                 <FaShieldAlt size={8}/> Ethical Commitment
               </p>
               <p className="text-[10px] leading-relaxed text-slate-500 italic">
                 We are dedicated to nurturing youth mindset with integrity and transparency.
               </p>
            </div>
            <div>
               <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest mb-1">
                 Disclaimer
               </p>
               <p className="text-[10px] leading-relaxed text-slate-500">
                 While we empower growth, YouthBees provides no direct job guarantees. Success depends on individual merit.
               </p>
            </div>
          </div>
        </FooterColumn>

        {/* 5. SUPPORT HUB */}
        <div className="lg:col-span-1">
          <h4 className="text-sm font-bold tracking-wider text-white mb-5 uppercase">
            Support Hub
          </h4>

          <div className="space-y-4">
            {/* PHONE */}
            <div className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-[#FF8C1A] transition-colors">
                <FaPhoneAlt className="text-[#FF8C1A] group-hover:text-white text-[10px]" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Hotline</span>
                <a href="tel:+8801797765669" className="block text-[11px] font-bold hover:text-[#FF8C1A] transition-colors">+880 1797-765669</a>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-[#FF8C1A] transition-colors">
                <FaEnvelope className="text-[#FF8C1A] group-hover:text-white text-[10px]" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Email</span>
                <a href="mailto:youthbees.bd@gmail.com" className="block text-[11px] font-bold break-all hover:text-[#FF8C1A] transition-colors">youthbees.bd@gmail.com</a>
              </div>
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-3 group text-left">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-[#FF8C1A] transition-colors">
                <FaMapMarkerAlt className="text-[#FF8C1A] group-hover:text-white text-[10px]" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Location</span>
                <a href="https://share.google/9UkVJkKSrXOct2P9B" target="_blank" rel="noopener noreferrer" className="block text-[11px] font-bold hover:text-[#FF8C1A] transition-colors">Dhaka, Bangladesh</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-800 py-8 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} YouthBees Ltd. All rights reserved.</p>
            <p className="text-[9px] mt-1 opacity-50 uppercase tracking-widest font-black">Empowering the next generation of leaders</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 font-bold uppercase tracking-widest text-[9px]">
            <Link to="/privacy" className="hover:text-[#FF8C1A]">Privacy</Link>
            <Link to="/terms" className="hover:text-[#FF8C1A]">Terms</Link>
            <Link to="/refund" className="hover:text-[#FF8C1A]">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- HELPERS ---------- */

function FooterColumn({ title, children }) {
  return (
    <div className="text-left">
      <h4 className="text-sm font-bold tracking-wider text-white mb-6 uppercase">
        {title}
      </h4>
      <ul className="space-y-3 text-[11px]">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ label, to, icon }) {
  return (
    <li>
      <Link
        to={to}
        className="hover:text-[#FF8C1A] transition-colors font-bold uppercase tracking-wide text-slate-400 flex items-center"
      >
        {icon && icon}
        {label}
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-xl
                 bg-slate-800 text-slate-300 hover:bg-[#FF8C1A]
                 hover:text-white transition-all shadow-lg hover:-translate-y-1"
    >
      {icon}
    </a>
  );
}