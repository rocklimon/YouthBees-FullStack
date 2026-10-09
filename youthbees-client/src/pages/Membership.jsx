import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import {
  FaCrown,
  FaCheckCircle,
  FaArrowRight,
  FaTimes,
  FaMobileAlt,
  FaStar,
  FaShieldAlt,
} from "react-icons/fa";

const plans = [
  {
    id: "beepass",
    name: "BeePass Membership",
    badge: "STARTER",
    price: "80 BDT / mo",
    numericPrice: 80,
    color: "from-blue-600 via-indigo-600 to-indigo-800",
    glowColor: "group-hover:shadow-blue-500/20",
    buttonBg: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
    features: [
      "Community Group Access",
      "6 Month Personal Counselor",
      "Unlimited Skill Resources",
      "Special Separated Care",
    ],
  },
  {
    id: "growth",
    name: "Growth Membership",
    badge: "ACCELERATOR",
    price: "450 BDT",
    numericPrice: 450,
    subPrice: "50 BDT / mo",
    color: "from-emerald-500 via-teal-600 to-teal-800",
    glowColor: "group-hover:shadow-emerald-500/20",
    buttonBg: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
    features: [
      "6 Month Personal Counselor",
      "Special Separated Care",
      "Academic Support",
      "Unlimited Skill Resources",
      "Workshops & Live Courses",
      "Certificate & Special Discounts",
      "1-on-1 Job Guidance",
    ],
  },
  {
    id: "career_plus",
    name: "Career Plus Membership",
    badge: "INTERNSHIP",
    price: "750 BDT",
    numericPrice: 750,
    subPrice: "100 BDT / mo",
    color: "from-amber-500 via-orange-500 to-red-500",
    glowColor: "shadow-orange-500/25 group-hover:shadow-orange-500/40",
    buttonBg: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-gray-900 font-extrabold",
    popular: true,
    features: [
      "6 Month Personal Counselor",
      "In-House Internship Track",
      "Unlimited Skill Resources",
      "Complete Academic Support",
      "Job Readiness Guidance",
      "Certificates & Discounts",
      "Exclusive VIP Sessions",
    ],
  },
  {
    id: "signature",
    name: "Signature Membership",
    badge: "PROFESSIONAL",
    price: "3,499 BDT",
    numericPrice: 3499,
    subPrice: "150 BDT / mo",
    color: "from-purple-600 via-violet-600 to-purple-900",
    glowColor: "group-hover:shadow-purple-500/20",
    buttonBg: "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700",
    features: [
      "6 Month Personal Counselor",
      "Special Separated Care",
      "Unlimited Skill Resources",
      "Complete Academic Support",
      "Dedicated Job Application Agent",
      "Tailored Premium CV per Job",
      "LinkedIn Profile Optimization",
      "Exclusive Sessions & Discounts",
    ],
  },
  {
    id: "supreme",
    name: "Career Transformation",
    badge: "SUPREME",
    price: "12,500 BDT",
    numericPrice: 12500,
    color: "from-gray-900 via-slate-800 to-black",
    glowColor: "group-hover:shadow-gray-900/30",
    buttonBg: "bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-black",
    features: [
      "CV, LinkedIn & Portfolio Build",
      "Full Job Placement Support",
      "Personal PR & Brand Manager",
      "Assignments, Thesis & Research",
      "Mock Interviews & IELTS Help",
      "Complete Career Overhaul",
    ],
  },
];

export default function Membership() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [trxId, setTrxId] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const paymentNumbers = {
    bkash: "01797-765669",
    nagad: "01797-765669",
  };

  // 🔑 ট্র্যাক রাখা আসল ইউজার লগইন স্টেট
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
    return () => unsubscribe();
  }, []);

  // 🔒 প্ল্যান সিলেক্ট করার সময় লগইন চেক
  const handleSelectPlan = (plan) => {
    if (!authUser) {
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "Please log in first to purchase or access membership.",
        confirmButtonText: "Log In Now",
        confirmButtonColor: "#f97316",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        customClass: {
          popup: "rounded-2xl shadow-xl border border-gray-100",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location.pathname } });
        }
      });
      return;
    }
    setSelectedPlan(plan);
  };

  // 🔒 পেমেন্ট সাবমিট করার সময় ফাইনাল চেক
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!trxId.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please enter a valid Transaction ID!",
        confirmButtonColor: "#f97316",
        customClass: { popup: "rounded-2xl" },
      });
    }

    // সিকিউরিটি চেক
    if (!authUser) {
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Your session has expired. Please log in again.",
        confirmButtonText: "Log In Now",
        confirmButtonColor: "#f97316",
        customClass: { popup: "rounded-2xl" },
      }).then(() => {
        setSelectedPlan(null);
        navigate("/login", { state: { from: location.pathname } });
      });
      return;
    }

    setLoading(true);

    try {
      // 🔑 ফায়ারবেস আইডি টোকেন নেওয়া
      const token = await authUser.getIdToken(true);

      const paymentData = {
        planName: selectedPlan.name,
        amount: selectedPlan.numericPrice || 80,
        paymentMethod: paymentMethod.toUpperCase(),
        senderNumber: senderNumber || "N/A",
        transactionId: trxId.trim(),
      };

      const res = await axios.post(
        `${API_BASE_URL}/api/payment/submit`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Payment Submitted!",
          html: `
            <div class="text-left text-sm space-y-1">
              <p><strong>Plan:</strong> ${selectedPlan.name}</p>
              <p><strong>Method:</strong> ${paymentMethod.toUpperCase()}</p>
              <p><strong>TrxID:</strong> ${trxId}</p>
              <p class="text-xs text-gray-500 mt-2">* Status: Pending Approval</p>
            </div>
          `,
          confirmButtonColor: "#10b981",
          customClass: { popup: "rounded-2xl" },
        });

        setSelectedPlan(null);
        setTrxId("");
        setSenderNumber("");
      }
    } catch (err) {
      console.error("PAYMENT SUBMIT ERROR:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          err.response?.data?.message ||
          "Failed to submit payment. Please try again.",
        confirmButtonColor: "#ef4444",
        customClass: { popup: "rounded-2xl" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-orange-50/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-orange-200/40 via-amber-100/30 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-200 shadow-xs">
            <FaCrown className="text-orange-500" />
            Membership Plans
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Invest in Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Future Success
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
            Your 6-month hands-on support system for Academics, Career Growth,
            Skill Mastery & Internships.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`group relative bg-white rounded-3xl border ${
                plan.popular
                  ? "border-2 border-orange-500 shadow-2xl scale-[1.03] z-20"
                  : "border-gray-100/80 shadow-md hover:shadow-2xl hover:-translate-y-1.5"
              } transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                plan.glowColor
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-orange-500 to-amber-500 text-gray-900 text-[11px] font-black uppercase tracking-wider py-1.5 text-center flex items-center justify-center gap-1 shadow-xs z-20">
                  <FaStar className="text-gray-900 text-xs" /> Most Popular
                </div>
              )}

              <div
                className={`relative bg-gradient-to-br ${plan.color} ${
                  plan.popular ? "pt-10" : "pt-8"
                } pb-8 px-6 text-white text-center shadow-inner`}
              >
                <span className="inline-block bg-white/15 backdrop-blur-md text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-3 uppercase border border-white/20">
                  {plan.badge}
                </span>

                <h3 className="font-bold text-lg leading-tight tracking-snug">
                  {plan.name}
                </h3>

                <div className="mt-4 flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight">
                    {plan.price}
                  </span>
                  {plan.subPrice && (
                    <span className="text-[11px] text-white/80 font-medium mt-1 bg-black/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      {plan.subPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs text-gray-600 font-medium leading-relaxed"
                    >
                      <FaCheckCircle className="text-emerald-500 text-sm shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3 ${plan.buttonBg}`}
                >
                  <span>Get Started Now</span>
                  <FaArrowRight className="text-xs transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center flex items-center justify-center gap-2 text-xs font-semibold text-gray-500">
          <FaShieldAlt className="text-orange-500 text-sm" />
          <span>
            Secure Payments • Guaranteed 1-on-1 Guidance • Transparent Support
          </span>
        </div>
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>

              <div className="mb-6 border-b border-gray-100 pb-5">
                <span className="text-[11px] font-bold text-orange-500 uppercase tracking-widest bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                  Checkout
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-3">
                  {selectedPlan.name}
                </h3>
                <div className="mt-2 text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {selectedPlan.price}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bkash")}
                  className={`py-3 px-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === "bkash"
                      ? "border-pink-500 bg-pink-500 text-white shadow-md shadow-pink-500/20"
                      : "border-gray-200 text-gray-700 hover:border-gray-300 bg-gray-50/50"
                  }`}
                >
                  <FaMobileAlt />
                  bKash
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("nagad")}
                  className={`py-3 px-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === "nagad"
                      ? "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "border-gray-200 text-gray-700 hover:border-gray-300 bg-gray-50/50"
                  }`}
                >
                  <FaMobileAlt />
                  Nagad
                </button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 text-xs text-slate-600">
                <p className="leading-relaxed">
                  Send{" "}
                  <strong className="text-slate-900 font-bold">
                    {selectedPlan.price}
                  </strong>{" "}
                  via Send Money to{" "}
                  <strong className="text-slate-900 font-bold uppercase">
                    {paymentMethod}
                  </strong>
                  :
                </p>
                <div className="mt-2 p-2.5 bg-white rounded-xl border border-slate-200/80 text-center text-sm font-black text-slate-900 tracking-wider">
                  {paymentNumbers[paymentMethod]}
                </div>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Sender Mobile Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={senderNumber}
                    onChange={(e) => setSenderNumber(e.target.value)}
                    placeholder="e.g. 01700000000"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Transaction ID (TrxID) *
                  </label>
                  <input
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="e.g. 9J82KLM1"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-mono"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs text-white shadow-lg transition-all ${
                    paymentMethod === "bkash"
                      ? "bg-pink-600 hover:bg-pink-700 shadow-pink-600/20"
                      : "bg-orange-600 hover:bg-orange-700 shadow-orange-600/20"
                  } disabled:opacity-50`}
                >
                  {loading ? "Submitting..." : "Confirm & Submit Payment"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}