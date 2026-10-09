import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import membershipRoutes from "./routes/membership.routes.js";
import userRoutes from "./routes/user.router.js";
import courseRoutes from "./routes/course.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import paymentRoutes from "./routes/payment.routes.js"; // 👈 ১. পেমেন্ট রাউট ইমপোর্ট করা হলো

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/payment", paymentRoutes); // 👈 ২. পেমেন্ট এপিআই এন্ডপয়েন্ট কানেক্ট করা হলো

app.get("/", (req, res) => res.send("YouthBees API running"));

connectDB();

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);