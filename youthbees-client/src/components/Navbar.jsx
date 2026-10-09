import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import logoImg from "../assets/logo/logo.png";

// Exact Services List (Membership added at the top of the list items)
const SERVICES_LIST = [
  { title: "Membership", path: "/membership" },
  { title: "CV Writing Services", path: "/services/cv-writing" },
  { title: "LinkedIn Services", path: "/services/linkedin" },
  { title: "Website & Portfolio Services", path: "/services/portfolio" },
  { title: "Counselling", path: "/services/counselling" },
  { title: "Academic Course", path: "/services/academic-course" },
  { title: "Mock Interview Support", path: "/services/mock-interview" },
  { title: "Study Abroad Support", path: "/services/study-abroad" },
  { title: "Corporate Training for Companies", path: "/services/corporate-training" },
  { title: "Marketing Support for Companies", path: "/services/marketing-support" },
  { title: "Internship Pathway Program", path: "/services/internship-pathway" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef();
  const location = useLocation();

  const baseLink =
    "hover:text-[#FF8C1A] transition font-semibold text-slate-700";

  // AUTO-REFRESH/UPDATE ON ROUTE CHANGES
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setRole(storedRole);
    setUser(storedUser);
    setOpen(false); // Close mobile menu on navigate
  }, [location]);

  // CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="YouthBees Logo" className="h-14 w-auto object-contain" />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8">
          {/* --- ADMIN LINKS --- */}
          {role === "admin" && (
            <>
              <NavLink to="/dashboard/admin" className={baseLink}>Dashboard</NavLink>
              <NavLink to="/admin/users" className={baseLink}>Users</NavLink>
              <NavLink to="/admin/courses" className={baseLink}>Courses</NavLink>
              <NavLink to="/admin/events" className={baseLink}>Events</NavLink>
              <NavLink to="/admin/analytics" className={baseLink}>Analytics</NavLink>
            </>
          )}

          {/* --- TEACHER LINKS --- */}
          {role === "teacher" && (
            <>
              <NavLink to="/dashboard/teacher" className={baseLink}>Dashboard</NavLink>
              <CoursesDropdown baseLink={baseLink} />
              <NavLink to="/events" className={baseLink}>Events</NavLink>
              <NavLink to="/my-courses" className={baseLink}>My Courses</NavLink>
              <NavLink to="/create-course" className={baseLink}>Create Course</NavLink>
            </>
          )}

          {/* --- STUDENT LINKS --- */}
          {role === "student" && (
            <>
              <NavLink to="/dashboard/student" className={baseLink}>Dashboard</NavLink>
              <ServicesDropdown baseLink={baseLink} />
              <CoursesDropdown baseLink={baseLink} />
              <NavLink to="/membership" className={baseLink}>Membership</NavLink>
              <NavLink to="/events" className={baseLink}>Events</NavLink>
              <NavLink to="/career" className={baseLink}>Career</NavLink>
            </>
          )}

          {/* --- GUEST LINKS --- */}
          {!role && (
            <>
              <NavLink to="/" className={baseLink}>Home</NavLink>
              <NavLink to="/about" className={baseLink}>About</NavLink>
              <ServicesDropdown baseLink={baseLink} />
              <CoursesDropdown baseLink={baseLink} />
              <NavLink to="/membership" className={baseLink}>Membership</NavLink>
              <NavLink to="/events" className={baseLink}>Events</NavLink>
              <NavLink to="/blog" className={baseLink}>Blog</NavLink>
              <NavLink to="/career" className={baseLink}>Career</NavLink>
              <NavLink to="/affiliate" className={baseLink}>Affiliate</NavLink>
            </>
          )}
        </nav>

        {/* RIGHT SIDE AUTH ACTIONS */}
        <div className="hidden md:flex items-center gap-4 relative">
          {!role ? (
            <>
              <Link to="/login" className="font-bold text-slate-700 hover:text-[#FF8C1A] transition">
                Login
              </Link>
              <Link to="/register" className="px-6 py-3 rounded-2xl bg-[#FF8C1A] text-white font-black hover:bg-[#FF5F1F] transition shadow-lg">
                Register
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-slate-800 rounded-xl font-bold hover:bg-orange-200 transition"
              >
                {user?.firstName || user?.fullName || "Profile"}
                <FaChevronDown className="text-xs" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-orange-100 rounded-xl shadow-lg p-2 z-50">
                  {role === "student" && (
                    <>
                      <DropdownLink label="My Profile" to="/profile" />
                      <DropdownLink label="Dashboard" to="/dashboard/student" />
                      <DropdownLink label="My Learning" to="/my-learning" />
                      <DropdownLink label="Subscription" to="/subscription" />
                    </>
                  )}

                  {role === "teacher" && (
                    <>
                      <DropdownLink label="Dashboard" to="/dashboard/teacher" />
                      <DropdownLink label="My Courses" to="/my-courses" />
                      <DropdownLink label="Analytics" to="/teacher/analytics" />
                    </>
                  )}

                  {role === "admin" && (
                    <DropdownLink label="Admin Panel" to="/dashboard/admin" />
                  )}

                  <div className="border-t border-orange-100 my-1 mx-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-red-50 text-red-600 rounded-lg transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl text-slate-700" aria-label="Toggle menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU PANEL */}
      <div
        className={`md:hidden fixed inset-x-0 top-20 bg-white border-t border-orange-100 h-[calc(100vh-80px)] overflow-y-auto transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-6 space-y-4 font-semibold text-slate-700">
          {!role && (
            <>
              <MobileLink to="/" setOpen={setOpen}>Home</MobileLink>
              <MobileLink to="/about" setOpen={setOpen}>About</MobileLink>
              <MobileServicesAndCourses type="services" setOpen={setOpen} />
              <MobileServicesAndCourses type="courses" setOpen={setOpen} />
              <MobileLink to="/membership" setOpen={setOpen}>Membership</MobileLink>
              <MobileLink to="/events" setOpen={setOpen}>Events</MobileLink>
              <MobileLink to="/blog" setOpen={setOpen}>Blog</MobileLink>
              <MobileLink to="/career" setOpen={setOpen}>Career</MobileLink>
              <MobileLink to="/affiliate" setOpen={setOpen}>Affiliate</MobileLink>
            </>
          )}

          {role === "student" && (
            <>
              <MobileLink to="/" setOpen={setOpen}>Home</MobileLink>
              <MobileServicesAndCourses type="services" setOpen={setOpen} />
              <MobileServicesAndCourses type="courses" setOpen={setOpen} />
              <MobileLink to="/membership" setOpen={setOpen}>Membership</MobileLink>
              <MobileLink to="/events" setOpen={setOpen}>Events</MobileLink>
              <MobileLink to="/career" setOpen={setOpen}>Career</MobileLink>
            </>
          )}

          <div className="pt-4 border-t border-orange-100 space-y-3">
            {!role ? (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="block w-full py-3 text-center border-2 border-[#FF8C1A] text-[#FF8C1A] rounded-xl font-black">
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="block w-full py-3 text-center bg-[#FF8C1A] text-white rounded-xl font-black">
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full py-3 text-center bg-red-50 text-red-600 rounded-xl font-black transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ================= SUB-COMPONENTS ================= */

function ServicesDropdown({ baseLink }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link to="/services" className={`${baseLink} flex items-center gap-1 py-4`}>
        Services
        <FaChevronDown className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Link>

      {isOpen && (
        <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-orange-100 py-2 z-50 max-h-[65vh] overflow-y-auto">
          {/* 1. All Services (Top Header Item) */}
          <DropdownLink 
            label="All Services" 
            to="/services" 
            closeMenu={() => setIsOpen(false)} 
          />
          
          {/* Divider Line */}
          <div className="border-t border-orange-100 my-1 mx-4"></div>

          {/* 2. Membership, CV Writing Services & Rest of the list */}
          {SERVICES_LIST.map((service, index) => (
            <DropdownLink
              key={index}
              label={service.title}
              to={service.path}
              closeMenu={() => setIsOpen(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CoursesDropdown({ baseLink }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className={`${baseLink} flex items-center gap-1 py-4`}>
        Courses 
        <FaChevronDown className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-60 bg-white rounded-2xl shadow-xl border border-orange-100 py-2 z-50">
          <DropdownLink label="Training Programs" to="/training-programs" closeMenu={() => setIsOpen(false)} />
          <DropdownLink label="Partner Programs" to="/partner-programs" closeMenu={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}

function MobileServicesAndCourses({ type, setOpen }) {
  if (type === "services") {
    return (
      <>
        <div className="text-orange-500 text-xs uppercase tracking-widest font-black pt-2">Our Services</div>
        <div className="pl-4 space-y-2 border-l-2 border-orange-100 max-h-60 overflow-y-auto">
          <MobileLink to="/services" setOpen={setOpen}>
            <span className="font-bold text-orange-600">All Services</span>
          </MobileLink>
          {SERVICES_LIST.map((item, index) => (
            <MobileLink key={index} to={item.path} setOpen={setOpen}>
              {item.title}
            </MobileLink>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-orange-500 text-xs uppercase tracking-widest font-black pt-2">Courses</div>
      <div className="pl-4 space-y-3 border-l-2 border-orange-100">
        <MobileLink to="/training-programs" setOpen={setOpen}>Training Programs</MobileLink>
        <MobileLink to="/partner-programs" setOpen={setOpen}>Partner Programs</MobileLink>
      </div>
    </>
  );
}

function DropdownLink({ label, to, closeMenu }) {
  return (
    <Link
      to={to}
      onClick={closeMenu}
      className="block px-6 py-2.5 text-sm font-medium hover:bg-[#FFF3E6] hover:text-[#FF8C1A] text-slate-700 transition rounded-lg mx-1 cursor-pointer"
    >
      {label}
    </Link>
  );
}

function MobileLink({ to, children, setOpen }) {
  return (
    <Link to={to} onClick={() => setOpen(false)} className="block py-1 text-slate-700 hover:text-[#FF8C1A]">
      {children}
    </Link>
  );
}