import express from "express";
import {
  submitPayment,
  getPendingOrders,
  verifyOrder,
} from "../controllers/payment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔒 ১. পেমেন্ট সাবমিট (Strict Authorization)
router.post("/submit", authMiddleware, submitPayment);

// 📋 ২. পেন্ডিং পেমেন্ট অর্ডার লিস্ট (Admin Dashboard)
router.get("/pending", getPendingOrders);

// 🔒 ৩. অর্ডার এপ্রুভ বা রিজেক্ট করা
router.patch("/verify/:orderId", verifyOrder);

export default router;