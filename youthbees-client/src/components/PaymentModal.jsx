// File: src/components/PaymentModal.jsx
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

export default function PaymentModal({ service, plan, onClose, userId }) {
  const [method, setMethod] = useState("bKash");
  const [trxId, setTrxId] = useState("");
  const [senderNum, setSenderNum] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/payment/submit`, {
        userId: userId || "USER_ID_HERE",
        serviceId: service._id,
        planName: plan.name,
        amount: plan.price,
        paymentMethod: method,
        transactionId: trxId,
        senderNumber: senderNum,
      });
      alert("পেমেন্ট সাবমিট হয়েছে! এডমিন ভেরিফাই করার পর সার্ভিস চালু হবে।");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "সাবমিট করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-3xl max-w-md w-full shadow-2xl border border-orange-100">
        <h3 className="text-xl font-black text-slate-900 mb-1">পেমেন্ট সম্পন্ন করুন</h3>
        <p className="text-xs text-slate-500 mb-4">
          আমাদের <span className="font-bold text-orange-600">017XXXXXXXX</span> নম্বরে Send Money/Cash Out করুন।
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Payment Method</label>
            <select 
              value={method} 
              onChange={(e) => setMethod(e.target.value)} 
              className="w-full border border-slate-200 p-3 rounded-xl text-sm font-bold bg-slate-50 focus:outline-orange-500"
            >
              <option value="bKash">bKash</option>
              <option value="Nagad">Nagad</option>
              <option value="Rocket">Rocket</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Sender Number</label>
            <input
              type="text"
              placeholder="01712345678"
              value={senderNum}
              onChange={(e) => setSenderNum(e.target.value)}
              required
              className="w-full border border-slate-200 p-3 rounded-xl text-sm focus:outline-orange-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Transaction ID (TrxID)</label>
            <input
              type="text"
              placeholder="e.g. 8N7A6D5E"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              required
              className="w-full border border-slate-200 p-3 rounded-xl text-sm font-mono focus:outline-orange-500 uppercase"
            />
          </div>

          <div className="flex gap-2 pt-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl text-xs text-slate-600 uppercase tracking-wider cursor-pointer transition-colors"
            >
              বাতিল
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="w-1/2 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 cursor-pointer transition-all"
            >
              {loading ? "সাবমিট হচ্ছে..." : "সাবমিট করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}