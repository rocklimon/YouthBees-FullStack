import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { auth } from "../../firebase";
import API_BASE_URL from "../../config/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("pendingTeachers");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Payments State
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [paymentFilter, setPaymentFilter] = useState("All");

  const navigate = useNavigate();

  // Helper function to get Firebase Token
  const getAuthToken = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;
    return await currentUser.getIdToken();
  };

  // 1. Fetch Users
  const fetchUsers = async () => {
    try {
      const token = await getAuthToken();
      if (!token) return;

      const res = await axios.get(`${API_BASE_URL}/api/admin/all-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data || {});
    } catch (err) {
      console.error("FETCH USERS ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Payments
  const fetchPayments = async () => {
    setLoadingPayments(true);
    try {
      const token = await getAuthToken();
      const res = await axios.get(`${API_BASE_URL}/api/payment/pending`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const paymentData = Array.isArray(res.data) ? res.data : res.data.payments || [];
      console.log("PAYMENT DATA LOADED:", paymentData);
      setPayments(paymentData);
    } catch (err) {
      console.error("PAYMENT FETCH ERROR:", err.response?.data || err.message);
    } finally {
      setLoadingPayments(false);
    }
  };

  // 3. Payment Status Change
  const handlePaymentStatusChange = async (id, actionType) => {
    try {
      const token = await getAuthToken();
      await axios.patch(
        `${API_BASE_URL}/api/payment/verify/${id}`,
        { action: actionType },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      const newStatus = actionType === "approve" ? "approved" : "rejected";

      setPayments((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err) {
      console.error("PAYMENT UPDATE ERROR:", err.response?.data || err.message);
      alert("Payment status update failed!");
    }
  };

  // User Actions
  const approve = async (id) => {
    try {
      const token = await getAuthToken();
      await axios.patch(
        `${API_BASE_URL}/api/admin/approve/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error("APPROVE ERROR:", err.response?.data || err.message);
    }
  };

  const suspendUser = async (id) => {
    try {
      const token = await getAuthToken();
      await axios.patch(
        `${API_BASE_URL}/api/admin/suspend/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error("SUSPEND ERROR:", err.response?.data || err.message);
    }
  };

  const unsuspendUser = async (id) => {
    try {
      const token = await getAuthToken();
      await axios.patch(
        `${API_BASE_URL}/api/admin/unsuspend/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error("UNSUSPEND ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUsers();
        fetchPayments();
      } else {
        setLoading(false);
        setLoadingPayments(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const tabs = [
    { key: "pendingTeachers", label: "Pending" },
    { key: "activeTeachers", label: "Teachers" },
    { key: "suspendedTeachers", label: "Suspended" },
    { key: "students", label: "Students" },
    { key: "partners", label: "Partners" },
    { key: "affiliates", label: "Affiliates" },
    { key: "payments", label: "Payments" },
  ];

  const menuItems = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Users", path: "/dashboard/admin" },
    { label: "Courses", path: "/dashboard/admin/courses" },
    { label: "Services", path: "/dashboard/admin/services" },
    { label: "Events", path: "/dashboard/admin/events" },
    { label: "Analytics", path: "/dashboard/admin/analytics" },
    { label: "Settings", path: "/dashboard/admin/settings" },
  ];

  const users = data[activeTab] || [];

  const filteredUsers = useMemo(() => {
    const text = search.toLowerCase();
    return users.filter((u) => {
      const fullName = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
      return u.email?.toLowerCase().includes(text) || fullName.includes(text);
    });
  }, [users, search]);

  // Payments Search & Filter (Updated to search Name & Email as well)
  const filteredPayments = useMemo(() => {
    const text = search.toLowerCase();
    return payments.filter((p) => {
      const trxId = (p.transactionId || p.trxID || "").toLowerCase();
      const plan = (p.planName || p.plan || "").toLowerCase();
      const sender = (p.senderNumber || p.sender || "").toLowerCase();
      
      // Extract User Details
      const userName = typeof p.userId === "object" ? (p.userId?.name || p.userId?.displayName || "").toLowerCase() : "";
      const userEmail = typeof p.userId === "object" ? (p.userId?.email || "").toLowerCase() : "";
      const userIdStr = typeof p.userId === "string" ? p.userId.toLowerCase() : "";

      const matchesSearch =
        trxId.includes(text) ||
        plan.includes(text) ||
        sender.includes(text) ||
        userName.includes(text) ||
        userEmail.includes(text) ||
        userIdStr.includes(text);

      if (paymentFilter === "All") return matchesSearch;

      const currentStatus = (p.status || "").toLowerCase();
      const selectedFilter = paymentFilter.toLowerCase();

      return matchesSearch && currentStatus === selectedFilter;
    });
  }, [payments, search, paymentFilter]);

  const pendingPaymentsCount = useMemo(() => {
    return payments.filter((p) => (p.status || "").toLowerCase() === "pending").length;
  }, [payments]);

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex font-sans antialiased text-slate-800">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1E293B] m-4 rounded-[2rem] text-white flex flex-col shadow-2xl overflow-hidden hidden lg:flex">
        <div className="p-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
              <span className="text-black font-black text-xl">Y</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">YouthBees</h1>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                item.label === "Dashboard" || item.label === "Users"
                  ? "bg-white/10 text-yellow-400 shadow-inner"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto">
          <button
            onClick={() => auth.signOut()}
            className="w-full py-4 rounded-2xl bg-red-500/10 text-red-400 font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
          >
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium mt-1">Manage YouthBees ecosystem</p>
          </div>
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <div className="bg-white p-2 rounded-2xl shadow-sm flex items-center gap-3 pr-6 border border-white">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shihab"
                className="w-10 h-10 rounded-xl bg-slate-100"
                alt="admin"
              />
              <div className="text-left">
                <p className="text-xs font-black text-slate-900 leading-tight">Shihab Khan</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Metric Cards Section */}
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-4 mb-8">
          <MetricCard title="Pending" count={data.pendingTeachers?.length} color="yellow" />
          <MetricCard title="Teachers" count={data.activeTeachers?.length} color="purple" />
          <MetricCard title="Suspended" count={data.suspendedTeachers?.length} color="red" />
          <MetricCard title="Students" count={data.students?.length} color="green" />
          <MetricCard title="Partners" count={data.partners?.length} color="blue" />
          <MetricCard title="Affiliates" count={data.affiliates?.length} color="pink" />
          <MetricCard title="Pending Pay" count={pendingPaymentsCount} color="orange" />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <button onClick={() => navigate("/dashboard/admin/services")} className="bg-white p-5 rounded-2xl shadow font-black hover:bg-slate-50 transition-colors">
            Manage Services
          </button>
          <button onClick={() => navigate("/dashboard/admin/courses")} className="bg-white p-5 rounded-2xl shadow font-black hover:bg-slate-50 transition-colors">
            Manage Courses
          </button>
          <button onClick={() => navigate("/dashboard/admin/events")} className="bg-white p-5 rounded-2xl shadow font-black hover:bg-slate-50 transition-colors">
            Manage Events
          </button>
          <button onClick={() => navigate("/dashboard/admin/analytics")} className="bg-white p-5 rounded-2xl shadow font-black hover:bg-slate-50 transition-colors">
            Analytics
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-white overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-white to-slate-50/50">
            <div className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === t.key
                      ? "bg-slate-900 text-white shadow-lg"
                      : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {t.label}
                  {t.key === "payments" && pendingPaymentsCount > 0 && (
                    <span className="ml-2 bg-orange-500 text-white px-2 py-0.5 rounded-full text-[9px]">
                      {pendingPaymentsCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder={activeTab === "payments" ? "Search Name, Email, TrxID..." : "Search resources..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 pr-6 py-3 bg-slate-100 border-none rounded-2xl w-full md:w-64 text-sm focus:ring-2 focus:ring-slate-900 transition-all outline-none"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-lg">🔍</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            {activeTab === "payments" ? (
              <div>
                <div className="px-8 py-3 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mr-2">Filter Status:</span>
                  {["All", "Pending", "Approved", "Rejected"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setPaymentFilter(status)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        paymentFilter === status
                          ? "bg-slate-900 text-white"
                          : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {loadingPayments ? (
                  <div className="p-20 text-center font-bold text-slate-300 animate-pulse uppercase tracking-[.2em]">
                    Synchronizing Payments...
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-[.2em] text-slate-400 font-black border-b border-slate-50">
                        <th className="px-8 py-6">Customer Identity</th>
                        <th className="px-8 py-6">Plan Info</th>
                        <th className="px-8 py-6">Method & Sender</th>
                        <th className="px-8 py-6">TrxID</th>
                        <th className="px-8 py-6">Amount</th>
                        <th className="px-8 py-6">Status</th>
                        <th className="px-8 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-700">
                      {filteredPayments.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="p-12 text-center text-slate-400 font-bold">
                            No payment records found.
                          </td>
                        </tr>
                      ) : (
                        filteredPayments.map((p) => {
                          // Extract user information intelligently
                          const isPopulated = typeof p.userId === "object" && p.userId !== null;
                          const userName = isPopulated ? (p.userId.name || p.userId.displayName || "Unknown User") : "Guest/User";
                          const userEmail = isPopulated ? p.userId.email : (typeof p.userId === "string" ? p.userId : "N/A");

                          return (
                            <tr key={p._id} className="hover:bg-slate-50/80 transition-all">
                              {/* 👤 User Name & Email Cell */}
                              <td className="px-8 py-6">
                                <p className="font-black text-slate-900">{userName}</p>
                                <p className="text-[10px] text-slate-400 font-mono">{userEmail}</p>
                              </td>

                              <td className="px-8 py-6">
                                <p className="font-black text-slate-900">{p.planName || p.plan}</p>
                                <p className="text-[10px] text-slate-400">{p.serviceId || "Service"}</p>
                              </td>

                              <td className="px-8 py-6">
                                <span className="font-bold text-slate-800">{p.paymentMethod || p.method}</span>
                                <p className="text-[10px] font-mono text-slate-400">{p.senderNumber || p.sender}</p>
                              </td>

                              <td className="px-8 py-6 font-mono font-black text-orange-600">
                                {p.transactionId || p.trxID}
                              </td>

                              <td className="px-8 py-6 font-black text-slate-900">৳{p.amount}</td>

                              <td className="px-8 py-6">
                                <span
                                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                    (p.status || "").toLowerCase() === "approved"
                                      ? "bg-emerald-50 text-emerald-600"
                                      : (p.status || "").toLowerCase() === "rejected"
                                      ? "bg-rose-50 text-rose-600"
                                      : "bg-amber-50 text-amber-600"
                                  }`}
                                >
                                  {p.status}
                                </span>
                              </td>

                              <td className="px-8 py-6 text-right">
                                {(p.status || "").toLowerCase() === "pending" ? (
                                  <div className="flex justify-end gap-2">
                                    <button
                                      onClick={() => handlePaymentStatusChange(p._id, "approve")}
                                      className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => handlePaymentStatusChange(p._id, "reject")}
                                      className="bg-rose-500 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-colors"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                                    Completed
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            ) : (
              /* Users Table */
              <div>
                {loading ? (
                  <div className="p-20 text-center font-bold text-slate-300 animate-pulse uppercase tracking-[.2em]">
                    Synchronizing...
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-[.2em] text-slate-400 font-black border-b border-slate-50">
                        <th className="px-10 py-6">Identity</th>
                        <th className="px-10 py-6">Engagement</th>
                        <th className="px-10 py-6 text-right">Operational Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="p-12 text-center text-slate-400 font-bold">
                            No user records found.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((u) => (
                          <tr key={u._id} className="group hover:bg-slate-50/80 transition-all">
                            <td className="px-10 py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-sm group-hover:scale-110 transition-transform shadow-lg shadow-slate-900/10">
                                  {u.firstName?.[0]}{u.lastName?.[0]}
                                </div>
                                <div>
                                  <p className="font-black text-slate-900">{u.firstName} {u.lastName}</p>
                                  <p className="text-xs text-slate-400 font-medium">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-10 py-6">
                              <div className="flex items-center gap-3">
                                <StatusChip status={u.status} />
                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className="text-[10px] font-black uppercase text-slate-400">{u.role}</span>
                              </div>
                            </td>
                            <td className="px-10 py-6 text-right">
                              <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                {activeTab === "pendingTeachers" && (
                                  <button
                                    onClick={() => approve(u._id)}
                                    className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
                                  >
                                    Approve
                                  </button>
                                )}
                                {u.status === "suspended" ? (
                                  <button
                                    onClick={() => {
                                      if (window.confirm("Unsuspend this user?")) {
                                        unsuspendUser(u._id);
                                      }
                                    }}
                                    className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
                                  >
                                    Unsuspend
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      if (window.confirm("Suspend this user?")) {
                                        suspendUser(u._id);
                                      }
                                    }}
                                    className="bg-white border border-slate-200 text-slate-400 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                                  >
                                    Suspend
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, count, color }) {
  const themes = {
    yellow: "from-amber-400 to-orange-500 shadow-amber-500/10",
    purple: "from-indigo-500 to-purple-600 shadow-purple-500/10",
    green: "from-emerald-400 to-teal-600 shadow-emerald-500/10",
    blue: "from-sky-400 to-blue-600 shadow-blue-500/10",
    pink: "from-rose-400 to-pink-600 shadow-pink-500/10",
    red: "from-red-400 to-red-600 shadow-red-500/10",
    orange: "from-orange-500 to-amber-600 shadow-orange-500/10",
  };

  return (
    <div className={`bg-gradient-to-br ${themes[color] || themes.blue} rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden group`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
      <p className="text-[9px] font-black uppercase tracking-[.2em] opacity-80">{title}</p>
      <h2 className="text-3xl font-black mt-3 tracking-tighter">{count || 0}</h2>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full w-2/3" />
        </div>
        <span className="text-[9px] font-black">Live</span>
      </div>
    </div>
  );
}

function StatusChip({ status }) {
  const styles = {
    active: "bg-emerald-50 text-emerald-600",
    pending: "bg-amber-50 text-amber-600",
    suspended: "bg-rose-50 text-rose-600",
  };
  return (
    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${styles[status] || "bg-slate-100"}`}>
      {status || "N/A"}
    </span>
  );
}